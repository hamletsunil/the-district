"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CityRecord, CityProfile } from "@/data/civic-guide/types-city";
import { loadCities, searchCities, expandCity } from "@/data/civic-guide/citySearch";
import { GovernmentProfile } from "./GovernmentProfile";

export function CityLookup() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityRecord[]>([]);
  const [cities, setCities] = useState<CityRecord[]>([]);
  const [selected, setSelected] = useState<CityProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load city data on mount
  useEffect(() => {
    setIsLoading(true);
    loadCities()
      .then(setCities)
      .finally(() => setIsLoading(false));
  }, []);

  // Search on query change
  useEffect(() => {
    if (cities.length === 0) return;
    const matches = searchCities(cities, query);
    setResults(matches);
    setIsOpen(matches.length > 0 && query.length >= 2);
  }, [query, cities]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = useCallback((city: CityRecord) => {
    setSelected(expandCity(city));
    setQuery("");
    setIsOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setSelected(null);
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // If a city is selected, show the profile
  if (selected) {
    return (
      <div className="lg-lookup-wrapper">
        <GovernmentProfile city={selected} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="lg-lookup-wrapper" ref={containerRef}>
      <div className="lg-lookup-search-container">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isLoading ? "Loading cities..." : "Enter your city name..."}
          className="lg-lookup-input lg-lookup-input-large"
          disabled={isLoading}
          autoComplete="off"
          aria-label="Search for your city"
          aria-expanded={isOpen}
          role="combobox"
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
            if (e.key === "Enter" && results.length > 0) {
              handleSelect(results[0]);
            }
          }}
        />
        <span className="lg-lookup-icon" aria-hidden="true">
          {isLoading ? "\u23F3" : "\u{1F50D}"}
        </span>
      </div>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            className="lg-lookup-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            role="listbox"
          >
            {results.map((city, i) => (
              <li key={`${city.n}-${city.s}`} role="option">
                <button
                  className="lg-lookup-option"
                  onClick={() => handleSelect(city)}
                  tabIndex={0}
                >
                  <span className="lg-lookup-option-name">
                    {city.n}, {city.s}
                  </span>
                  <span className="lg-lookup-option-pop">
                    {city.p.toLocaleString()}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <p className="lg-lookup-hint-text">
        Search {cities.length > 0 ? cities.length.toLocaleString() : "..."} cities to discover
        how your government is structured
      </p>
    </div>
  );
}
