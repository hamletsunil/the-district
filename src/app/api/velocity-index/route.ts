/**
 * Velocity Index API
 *
 * Measures bureaucratic speed - how long cities take to decide on development
 * Data from RegulatoryVelocityIndex table
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. Get cities with velocity data
  try {
    const velocityData = await db.$queryRaw<Array<{
      city: string;
      state: string;
      population: number | null;
      median_days: number;
      percentile: number;
      procedural_steps: number | null;
      approval_rate: number | null;
      trend_direction: string | null;
      trend_magnitude: number | null;
      total_matters: number;
    }>>`
      SELECT
        c.name as city,
        s.abbreviation as state,
        c.population,
        rvi."medianDaysToResolution" as median_days,
        rvi."nationalPercentile" as percentile,
        rvi."medianProceduralSteps" as procedural_steps,
        rvi."approvalRate" as approval_rate,
        rvi."trendDirection" as trend_direction,
        rvi."trendMagnitude" as trend_magnitude,
        rvi."totalMattersAnalyzed" as total_matters
      FROM "RegulatoryVelocityIndex" rvi
      JOIN "City" c ON rvi."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE rvi."meetsMinimumCoverage" = true
        AND rvi."medianDaysToResolution" IS NOT NULL
      ORDER BY rvi."medianDaysToResolution" ASC
    `;

    results.cities = velocityData.map(city => ({
      city: city.city,
      state: city.state,
      population: city.population,
      medianDays: city.median_days,
      percentile: city.percentile,
      proceduralSteps: city.procedural_steps,
      approvalRate: city.approval_rate,
      trendDirection: city.trend_direction,
      trendMagnitude: city.trend_magnitude,
      totalMatters: city.total_matters,
    }));

    // Summary stats
    const cities = velocityData;
    const totalCities = cities.length;
    const avgDays = totalCities > 0
      ? Math.round(cities.reduce((sum, c) => sum + c.median_days, 0) / totalCities)
      : 0;

    // Categorize by speed
    const fastCities = cities.filter(c => c.percentile >= 75);
    const slowCities = cities.filter(c => c.percentile <= 25);
    const medianCity = cities[Math.floor(cities.length / 2)];

    results.summary = {
      totalCities,
      averageDays: avgDays,
      medianDays: medianCity?.median_days || 0,
      fastestCity: cities[0] ? { city: cities[0].city, state: cities[0].state, days: cities[0].median_days } : null,
      slowestCity: cities[cities.length - 1] ? {
        city: cities[cities.length - 1].city,
        state: cities[cities.length - 1].state,
        days: cities[cities.length - 1].median_days
      } : null,
      fastCount: fastCities.length,
      slowCount: slowCities.length,
    };

    // Top 10 fastest
    results.fastest = cities.slice(0, 10).map(c => ({
      city: c.city,
      state: c.state,
      medianDays: c.median_days,
      approvalRate: c.approval_rate,
      proceduralSteps: c.procedural_steps,
      totalMatters: c.total_matters,
    }));

    // Top 10 slowest
    results.slowest = cities.slice(-10).reverse().map(c => ({
      city: c.city,
      state: c.state,
      medianDays: c.median_days,
      approvalRate: c.approval_rate,
      proceduralSteps: c.procedural_steps,
      totalMatters: c.total_matters,
    }));

  } catch (e) {
    errors.push(`velocityData: ${e}`);
    results.cities = [];
    results.summary = null;
  }

  // 2. State-level aggregation
  try {
    const stateData = await db.$queryRaw<Array<{
      state: string;
      city_count: number;
      avg_days: number;
      avg_approval: number;
    }>>`
      SELECT
        s.abbreviation as state,
        COUNT(DISTINCT c.id)::int as city_count,
        ROUND(AVG(rvi."medianDaysToResolution")::NUMERIC, 0)::int as avg_days,
        ROUND(AVG(rvi."approvalRate")::NUMERIC, 1) as avg_approval
      FROM "RegulatoryVelocityIndex" rvi
      JOIN "City" c ON rvi."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE rvi."meetsMinimumCoverage" = true
        AND rvi."medianDaysToResolution" IS NOT NULL
      GROUP BY s.abbreviation
      HAVING COUNT(DISTINCT c.id) >= 2
      ORDER BY avg_days ASC
    `;

    results.byState = stateData.map(s => ({
      state: s.state,
      cityCount: s.city_count,
      avgDays: s.avg_days,
      avgApproval: Number(s.avg_approval),
    }));
  } catch (e) {
    errors.push(`stateData: ${e}`);
    results.byState = [];
  }

  // 3. Speed vs Approval correlation
  try {
    const correlationData = await db.$queryRaw<Array<{
      speed_bucket: string;
      city_count: number;
      avg_approval: number;
    }>>`
      SELECT
        CASE
          WHEN rvi."medianDaysToResolution" <= 30 THEN 'Under 30 days'
          WHEN rvi."medianDaysToResolution" <= 60 THEN '30-60 days'
          WHEN rvi."medianDaysToResolution" <= 90 THEN '60-90 days'
          WHEN rvi."medianDaysToResolution" <= 180 THEN '90-180 days'
          ELSE 'Over 180 days'
        END as speed_bucket,
        COUNT(*)::int as city_count,
        ROUND(AVG(rvi."approvalRate")::NUMERIC, 1) as avg_approval
      FROM "RegulatoryVelocityIndex" rvi
      WHERE rvi."meetsMinimumCoverage" = true
        AND rvi."medianDaysToResolution" IS NOT NULL
        AND rvi."approvalRate" IS NOT NULL
      GROUP BY speed_bucket
      ORDER BY MIN(rvi."medianDaysToResolution")
    `;

    results.speedVsApproval = correlationData.map(d => ({
      bucket: d.speed_bucket,
      cityCount: d.city_count,
      avgApproval: Number(d.avg_approval),
    }));
  } catch (e) {
    errors.push(`correlationData: ${e}`);
    results.speedVsApproval = [];
  }

  // 4. Trend analysis - getting faster or slower
  try {
    const trendData = await db.$queryRaw<Array<{
      trend_direction: string;
      city_count: number;
    }>>`
      SELECT
        COALESCE(rvi."trendDirection", 'stable') as trend_direction,
        COUNT(*)::int as city_count
      FROM "RegulatoryVelocityIndex" rvi
      WHERE rvi."meetsMinimumCoverage" = true
        AND rvi."medianDaysToResolution" IS NOT NULL
      GROUP BY trend_direction
    `;

    results.trends = trendData.map(t => ({
      direction: t.trend_direction,
      cityCount: t.city_count,
    }));
  } catch (e) {
    errors.push(`trendData: ${e}`);
    results.trends = [];
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
