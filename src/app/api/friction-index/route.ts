/**
 * Friction Index API
 *
 * Measures civic contention - where debates run hottest
 * Data from RegulatoryFrictionIndex table
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. Get cities with friction data
  try {
    const frictionData = await db.$queryRaw<Array<{
      city: string;
      state: string;
      population: number | null;
      overall_score: number;
      discussion_intensity: number | null;
      contention_rate: number | null;
      opposition_frequency: number | null;
      deferral_rate: number | null;
      meetings_analyzed: number;
    }>>`
      SELECT
        c.name as city,
        s.abbreviation as state,
        c.population,
        rfi."overallScore" as overall_score,
        rfi."discussionIntensity" as discussion_intensity,
        rfi."contentionRate" as contention_rate,
        rfi."oppositionFrequency" as opposition_frequency,
        rfi."deferralRate" as deferral_rate,
        rfi."meetingsAnalyzed" as meetings_analyzed
      FROM "RegulatoryFrictionIndex" rfi
      JOIN "City" c ON rfi."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE rfi."meetsMinimumCoverage" = true
      ORDER BY rfi."contentionRate" DESC NULLS LAST
    `;

    results.cities = frictionData.map(city => ({
      city: city.city,
      state: city.state,
      population: city.population,
      overallScore: city.overall_score,
      discussionIntensity: city.discussion_intensity,
      contentionRate: city.contention_rate,
      oppositionFrequency: city.opposition_frequency,
      deferralRate: city.deferral_rate,
      meetingsAnalyzed: city.meetings_analyzed,
    }));

    // Summary
    const cities = frictionData;
    const totalCities = cities.length;

    results.summary = {
      totalCities,
      avgOverallScore: totalCities > 0
        ? Math.round(cities.reduce((sum, c) => sum + (c.overall_score || 0), 0) / totalCities * 10) / 10
        : 0,
      avgContentionRate: totalCities > 0
        ? Math.round(cities.reduce((sum, c) => sum + (c.contention_rate || 0), 0) / totalCities * 10) / 10
        : 0,
      avgOppositionFrequency: totalCities > 0
        ? Math.round(cities.reduce((sum, c) => sum + (c.opposition_frequency || 0), 0) / totalCities * 10) / 10
        : 0,
    };

    // Top 10 most contentious (highest overall score = most friction)
    results.hottestCities = [...cities]
      .sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0))
      .slice(0, 10)
      .map(c => ({
        city: c.city,
        state: c.state,
        overallScore: c.overall_score,
        contentionRate: c.contention_rate,
        oppositionFrequency: c.opposition_frequency,
        meetingsAnalyzed: c.meetings_analyzed,
      }));

    // Top 10 calmest (lowest overall score = least friction)
    results.calmestCities = [...cities]
      .sort((a, b) => (a.overall_score || 0) - (b.overall_score || 0))
      .slice(0, 10)
      .map(c => ({
        city: c.city,
        state: c.state,
        overallScore: c.overall_score,
        contentionRate: c.contention_rate,
        oppositionFrequency: c.opposition_frequency,
        meetingsAnalyzed: c.meetings_analyzed,
      }));

  } catch (e) {
    errors.push(`frictionData: ${e}`);
    results.cities = [];
    results.summary = null;
  }

  // 2. State-level aggregation
  try {
    const stateData = await db.$queryRaw<Array<{
      state: string;
      city_count: number;
      avg_contention: number;
      avg_opposition: number;
    }>>`
      SELECT
        s.abbreviation as state,
        COUNT(DISTINCT c.id)::int as city_count,
        ROUND(AVG(rfi."contentionRate")::NUMERIC, 1) as avg_contention,
        ROUND(AVG(rfi."oppositionFrequency")::NUMERIC, 1) as avg_opposition
      FROM "RegulatoryFrictionIndex" rfi
      JOIN "City" c ON rfi."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE rfi."meetsMinimumCoverage" = true
        AND rfi."contentionRate" IS NOT NULL
      GROUP BY s.abbreviation
      HAVING COUNT(DISTINCT c.id) >= 2
      ORDER BY avg_contention DESC
    `;

    results.byState = stateData.map(s => ({
      state: s.state,
      cityCount: s.city_count,
      avgContention: Number(s.avg_contention),
      avgOpposition: Number(s.avg_opposition),
    }));
  } catch (e) {
    errors.push(`stateData: ${e}`);
    results.byState = [];
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
