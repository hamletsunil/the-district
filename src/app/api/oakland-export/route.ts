import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const profilePath = join(process.cwd(), "public/data/oakland-profile.json");
    const raw = await readFile(profilePath, "utf-8");
    const profile = JSON.parse(raw);

    // Flatten nested objects into CSV rows
    const rows: string[][] = [["field", "value", "source"]];

    function flatten(obj: Record<string, unknown>, prefix = "") {
      for (const [key, val] of Object.entries(obj)) {
        const fieldName = prefix ? `${prefix}.${key}` : key;
        if (val !== null && typeof val === "object" && !Array.isArray(val)) {
          flatten(val as Record<string, unknown>, fieldName);
        } else {
          rows.push([
            fieldName,
            String(val ?? ""),
            "Oakland Profile Data",
          ]);
        }
      }
    }

    flatten(profile);

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="oakland-data.csv"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
