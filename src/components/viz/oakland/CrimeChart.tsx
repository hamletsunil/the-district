"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CrimeYear {
  year: number;
  violent_count: number;
  property_count: number;
  violent_rate_per_100k: number;
  property_rate_per_100k: number;
  total_rate_per_100k: number;
}

export function CrimeChart() {
  const [data, setData] = useState<CrimeYear[]>([]);

  useEffect(() => {
    fetch("/data/oakland-crime-annual.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data.length) return <ChartSkeleton label="Loading crime data..." />;

  return (
    <div className="my-8">
      <h3
        className="text-base font-semibold mb-1"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
      >
        Oakland Crime Rates Per 100,000 Residents
      </h3>
      <p
        className="text-xs mb-4"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}
      >
        Source: Oakland Police Department CrimeWatch Open Data (1.26M records)
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="gradViolent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProperty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#a39e96" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#a39e96" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => v.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                background: "#221f1b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#f5f0e8",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [
                `${Math.round(value ?? 0).toLocaleString()} per 100K`,
                name === "violent_rate_per_100k" ? "Violent Crime" : "Property Crime",
              ]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              labelFormatter={(label: any) => `${label}`}
            />
            <Legend
              formatter={(value: string) =>
                value === "violent_rate_per_100k" ? "Violent Crime" : "Property Crime"
              }
              wrapperStyle={{ fontFamily: "var(--font-inter)", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="property_rate_per_100k"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#gradProperty)"
            />
            <Area
              type="monotone"
              dataKey="violent_rate_per_100k"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#gradViolent)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Annotation */}
      <div
        className="mt-3 flex gap-6 text-xs"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}
      >
        <span>Peak: 2023 (violent 3,135 / property 10,943 per 100K)</span>
        <span>2024: -13% violent, -29% property from peak</span>
      </div>
    </div>
  );
}

function ChartSkeleton({ label }: { label: string }) {
  return (
    <div
      className="my-8 h-80 rounded-lg flex items-center justify-center animate-pulse"
      style={{ background: "var(--bg-secondary)" }}
    >
      <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "var(--type-small)" }}>
        {label}
      </span>
    </div>
  );
}
