"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface StatBarItem {
  label: string;
  value: number;
  displayValue: string;
  highlight?: boolean;
}

interface StatBarProps {
  items: StatBarItem[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function StatBar({ items, title, subtitle, className = "" }: StatBarProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const maxValue = Math.max(...items.map((d) => d.value));

  return (
    <figure ref={ref} className={`lg-stat-bar ${className}`}>
      <figcaption className="lg-stat-bar-header">
        <span className="lg-stat-bar-title">{title}</span>
        {subtitle && <span className="lg-stat-bar-subtitle">{subtitle}</span>}
      </figcaption>
      <div className="lg-stat-bar-items">
        {items.map((item, i) => {
          const pct = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div key={item.label} className="lg-stat-bar-row">
              <span className="lg-stat-bar-label">{item.label}</span>
              <div className="lg-stat-bar-track">
                <motion.div
                  className={`lg-stat-bar-fill ${item.highlight ? "lg-stat-bar-fill--highlight" : ""}`}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
                <span className="lg-stat-bar-value">{item.displayValue}</span>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
