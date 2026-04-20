#!/usr/bin/env python3
"""
Extract short clips from Swagit meeting videos for direct embedding.

Swagit deep-links into 10+ hour HLS streams, which take 30+ seconds to seek.
For featured quotes in articles, we pre-extract 30-60 second clips and host
them in /public/clips/ so readers get instant playback.

Pipeline:
  1. Scrape the Swagit embed page for the Granicus HLS playlist URL
  2. ffmpeg -ss {start} -i {m3u8} -t {duration} -c copy {out.mp4}
  3. Write a manifest that the article page reads at build time

Usage:
  python3 scripts/extract-swagit-clips.py --manifest scripts/swagit-clips.json
  python3 scripts/extract-swagit-clips.py --video 208390 --start 301 --duration 45 --slug linda-nuno-police-contract

Requires: ffmpeg on PATH, Python 3.9+.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
CLIPS_DIR = REPO_ROOT / "public" / "clips"
MANIFEST_OUT = CLIPS_DIR / "manifest.json"

HLS_PATTERN = re.compile(
    r'file:\s*"(https://archive-stream\.granicus\.com/[^"]+\.m3u8)"'
)


def fetch_hls_url(video_id: str) -> str:
    url = f"https://austintx.new.swagit.com/videos/{video_id}/embed"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    match = HLS_PATTERN.search(html)
    if not match:
        raise RuntimeError(f"No HLS URL found at {url}")
    return match.group(1)


def extract_clip(hls_url: str, start_sec: int, duration_sec: int, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_sec),
        "-i", hls_url,
        "-t", str(duration_sec),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        str(out_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg failed for {out_path.name}:\n{result.stderr[-1500:]}")


def process_entry(entry: dict) -> dict:
    video_id = str(entry["videoId"])
    start = int(entry["startSeconds"])
    duration = int(entry.get("durationSeconds", 45))
    slug = entry["slug"]
    out_path = CLIPS_DIR / f"{slug}.mp4"

    if out_path.exists() and not entry.get("force"):
        print(f"  [skip] {slug}.mp4 already exists")
    else:
        print(f"  [fetch] video {video_id} -> HLS lookup")
        hls = fetch_hls_url(video_id)
        print(f"  [ffmpeg] {slug}.mp4 ({duration}s from {start}s)")
        extract_clip(hls, start, duration, out_path)

    size_mb = out_path.stat().st_size / (1024 * 1024)
    return {
        **entry,
        "clipPath": f"/clips/{slug}.mp4",
        "sizeMB": round(size_mb, 2),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, help="JSON array of clip entries to extract")
    parser.add_argument("--video", help="Single video id (alternative to --manifest)")
    parser.add_argument("--start", type=int, help="Start seconds (with --video)")
    parser.add_argument("--duration", type=int, default=45, help="Clip length in seconds")
    parser.add_argument("--slug", help="Output filename slug (with --video)")
    parser.add_argument("--label", default="", help="Optional label for manifest")
    args = parser.parse_args()

    if args.manifest:
        entries = json.loads(args.manifest.read_text())
    elif args.video and args.start is not None and args.slug:
        entries = [{
            "videoId": args.video,
            "startSeconds": args.start,
            "durationSeconds": args.duration,
            "slug": args.slug,
            "label": args.label,
        }]
    else:
        parser.error("Supply either --manifest OR (--video --start --slug)")

    results = []
    for entry in entries:
        print(f"\nProcessing: {entry.get('label') or entry['slug']}")
        try:
            results.append(process_entry(entry))
        except Exception as e:
            print(f"  [error] {e}", file=sys.stderr)
            results.append({**entry, "error": str(e)})

    manifest = {"generated": __import__("datetime").datetime.now().isoformat(), "clips": results}
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2))
    print(f"\nWrote {MANIFEST_OUT} ({len(results)} entries)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
