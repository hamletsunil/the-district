"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";
import type { MapMouseEvent, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSimulation } from "@/hooks/useSimulation";
import { applyToTracts } from "@/engine/simulation";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const SOURCE_ID = "oakland-tracts";
const EXTRUSION_LAYER = "tract-3d";
const LABELS_SOURCE = "neighborhood-labels";
const LABELS_LAYER = "neighborhood-label-text";

/* ====================================================================
   OAKLAND NEIGHBORHOOD LABELS
   Approximate centroids for 8 key neighborhoods.
   ==================================================================== */
const NEIGHBORHOOD_LABELS: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2512, 37.8429] },
      properties: { name: "Rockridge" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2375, 37.7735] },
      properties: { name: "Fruitvale" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2711, 37.8044] },
      properties: { name: "Downtown" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2630, 37.8340] },
      properties: { name: "Temescal" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2558, 37.8088] },
      properties: { name: "Lake Merritt" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2870, 37.8125] },
      properties: { name: "West Oakland" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2050, 37.7635] },
      properties: { name: "East Oakland" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.2770, 37.7958] },
      properties: { name: "Jack London" },
    },
  ],
};

export function CityScapeMap() {
  const mapRef = useRef<MapRef>(null);
  const [baselines, setBaselines] = useState<Record<string, Record<string, number>> | null>(null);
  const [rawGeojson, setRawGeojson] = useState<GeoJSON.FeatureCollection | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const layerAdded = useRef(false);
  const labelsAdded = useRef(false);
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; name: string; scores: Record<string, number>;
  } | null>(null);

  const currentState = useSimulation((s) => s.currentState);
  const trajectory = useSimulation((s) => s.trajectory);

  // Load data
  useEffect(() => {
    Promise.all([
      fetch("/data/oakland-tracts.geojson").then((r) => r.json()),
      fetch("/data/oakland-tract-baseline.json").then((r) => r.json()),
    ]).then(([geo, base]) => {
      setRawGeojson(geo);
      setBaselines(base);
    });
  }, []);

  // Compute tract scores
  const tractScores = useMemo(() => {
    if (!baselines) return null;
    return applyToTracts(baselines, currentState, trajectory[0]);
  }, [baselines, currentState, trajectory]);

  // Enriched GeoJSON
  const enrichedGeojson = useMemo(() => {
    if (!rawGeojson || !tractScores || !baselines) return null;
    return {
      ...rawGeojson,
      features: rawGeojson.features.map((f: GeoJSON.Feature) => {
        const geoid = f.properties?.GEOID10 as string;
        const scores = tractScores[geoid] ?? {};
        const bl = baselines[geoid] as Record<string, unknown> | undefined;
        return {
          ...f,
          properties: {
            ...f.properties,
            composite: scores.composite ?? 50,
            education: scores.education ?? 50,
            safety: scores.safety ?? 50,
            prosperity: scores.prosperity ?? 50,
            affordability: scores.affordability ?? 50,
            tract_name: String(bl?.name ?? "Unknown"),
          },
        };
      }),
    };
  }, [rawGeojson, tractScores, baselines]);

  // Setup map on load
  const onMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    // Giraffe-style lighting: soft directional light for shadows
    map.setLight({
      anchor: "viewport",
      color: "#ffffff",
      intensity: 0.4,
      position: [1.5, 90, 80],
    });

    // Atmospheric fog for depth
    map.setFog({
      range: [1, 12],
      color: "#f0f0f0",
      "high-color": "#e8ecf0",
      "horizon-blend": 0.03,
    });

    setMapLoaded(true);
  }, []);

  // Add/update source and layer
  useEffect(() => {
    if (!mapLoaded || !enrichedGeojson || !mapRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current.getMap() as any;

    // Update or create source
    const source = map.getSource(SOURCE_ID);
    if (source) {
      source.setData(enrichedGeojson);
    } else {
      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: enrichedGeojson,
      });
    }

    // Add extrusion layer once
    if (!layerAdded.current && !map.getLayer(EXTRUSION_LAYER)) {
      map.addLayer({
        id: EXTRUSION_LAYER,
        type: "fill-extrusion",
        source: SOURCE_ID,
        paint: {
          // Red (low) -> Amber (mid) -> Green (high)
          "fill-extrusion-color": [
            "interpolate", ["linear"], ["get", "composite"],
            15, "#dc2626",
            30, "#ef4444",
            40, "#f59e0b",
            50, "#eab308",
            60, "#84cc16",
            70, "#22c55e",
            85, "#16a34a",
          ],
          // Heights 20-400m — visible but not absurd at zoom 12.5
          "fill-extrusion-height": [
            "interpolate", ["linear"], ["get", "composite"],
            10, 20,
            30, 80,
            50, 180,
            70, 300,
            90, 400,
          ],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.82,
          "fill-extrusion-vertical-gradient": true,
        },
      });
      layerAdded.current = true;
    }

    // Add neighborhood labels once (after extrusion layer so they render on top)
    if (!labelsAdded.current && !map.getSource(LABELS_SOURCE)) {
      map.addSource(LABELS_SOURCE, {
        type: "geojson",
        data: NEIGHBORHOOD_LABELS,
      });

      map.addLayer({
        id: LABELS_LAYER,
        type: "symbol",
        source: LABELS_SOURCE,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-size": 11,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.08,
          "text-anchor": "center",
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-padding": 4,
          // Offset upward slightly to float above extrusions
          "text-offset": [0, -0.5],
          "symbol-sort-key": 1,
        },
        paint: {
          "text-color": "rgba(255, 255, 255, 0.55)",
          "text-halo-color": "rgba(0, 21, 46, 0.7)",
          "text-halo-width": 1.5,
          "text-halo-blur": 1,
        },
      });
      labelsAdded.current = true;
    }
  }, [mapLoaded, enrichedGeojson]);

  // Hover
  const onHover = useCallback(
    (e: MapMouseEvent) => {
      if (!tractScores || !baselines || !mapRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map = mapRef.current.getMap() as any;
      const features = map.queryRenderedFeatures(e.point, { layers: [EXTRUSION_LAYER] });
      const f = features?.[0];
      if (f) {
        const geoid = f.properties?.GEOID10 as string;
        const scores = tractScores[geoid];
        const bl = baselines[geoid] as Record<string, unknown> | undefined;
        if (scores) {
          setTooltip({
            x: e.point.x, y: e.point.y,
            name: String(bl?.name ?? "Unknown"),
            scores,
          });
        }
        map.getCanvas().style.cursor = "pointer";
      } else {
        setTooltip(null);
        map.getCanvas().style.cursor = "grab";
      }
    },
    [tractScores, baselines]
  );

  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -122.22,
            latitude: 37.80,
            zoom: 12.5,
            pitch: 50,
            bearing: -15,
          }}
          style={{ width: "100%", height: "clamp(320px, 60vw, 550px)" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          onLoad={onMapLoad}
          onMouseMove={onHover}
          onMouseLeave={() => setTooltip(null)}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          touchPitch={false}
          keyboard={false}
          antialias
        />

      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3 px-1">
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-sans)" }}>
          Struggling
        </span>
        <div className="flex h-2 rounded-full overflow-hidden flex-1 max-w-[160px]">
          <div className="flex-1" style={{ background: "#dc2626" }} />
          <div className="flex-1" style={{ background: "#f59e0b" }} />
          <div className="flex-1" style={{ background: "#22c55e" }} />
        </div>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-sans)" }}>
          Thriving
        </span>
        <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}>
          Block height = composite score
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-30 px-4 py-3 rounded-xl shadow-2xl"
          style={{
            left: Math.min(tooltip.x + 16, typeof window !== "undefined" ? window.innerWidth - 250 : 480),
            top: Math.max(tooltip.y - 100, 50),
            background: "rgba(15, 23, 42, 0.94)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            maxWidth: 230,
          }}
        >
          <div className="text-sm font-semibold mb-2" style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>
            {tooltip.name}
          </div>
          {(["education", "safety", "prosperity", "affordability"] as const).map((key) => {
            const val = tooltip.scores[key] ?? 0;
            return (
              <div key={key} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-20 capitalize" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}>
                  {key}
                </span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${val}%`,
                      background: val < 35 ? "#ef4444" : val < 50 ? "#f59e0b" : "#22c55e",
                    }}
                  />
                </div>
                <span className="text-xs w-6 text-right font-mono" style={{ color: "#fff" }}>{val.toFixed(0)}</span>
              </div>
            );
          })}
          <div className="mt-2 pt-2 flex justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Composite</span>
            <span className="text-sm font-bold" style={{ color: "#fff" }}>{(tooltip.scores.composite ?? 0).toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
