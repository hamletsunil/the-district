import type { CityRecord, CityProfile } from "@/data/civic-guide/types-city";

let citiesCache: CityRecord[] | null = null;

/**
 * Load the city dataset. Cached after first load.
 */
export async function loadCities(): Promise<CityRecord[]> {
  if (citiesCache) return citiesCache;

  const res = await fetch("/data/cities.json");
  citiesCache = await res.json();
  return citiesCache!;
}

/**
 * Search cities by name prefix. Returns top 8 matches sorted by population.
 */
export function searchCities(
  cities: CityRecord[],
  query: string
): CityRecord[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().trim();

  // Score matches: exact start > word start > contains
  const scored = cities
    .map((city) => {
      const name = city.n.toLowerCase();
      const full = `${city.n}, ${city.s}`.toLowerCase();

      if (name === q || full === q) return { city, score: 100 + city.p };
      if (name.startsWith(q)) return { city, score: 50 + city.p };
      if (full.startsWith(q)) return { city, score: 40 + city.p };
      if (name.includes(q)) return { city, score: 10 + city.p };
      return null;
    })
    .filter(Boolean) as { city: CityRecord; score: number }[];

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.city);
}

/**
 * Expand a compact CityRecord into a display-friendly CityProfile.
 */
export function expandCity(record: CityRecord): CityProfile {
  return {
    name: record.n,
    state: record.s,
    county: record.c,
    population: record.p,
    form: record.f,
    type: record.t,
  };
}
