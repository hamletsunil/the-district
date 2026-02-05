"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface AnimatedStatProps {
  value: number;
  label: string;
  format?: "comma" | "decimal" | "percent";
  suffix?: string;
  duration?: number;
}

/**
 * Animated stat counter that triggers on scroll visibility.
 * Uses requestAnimationFrame with cubic easing for smooth counting.
 */
export function AnimatedStat({
  value,
  label,
  format = "comma",
  suffix = "",
  duration = 2000,
}: AnimatedStatProps) {
  const { ref, isVisible } = useIntersectionObserver();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (format === "decimal") {
        setCount(Math.round(eased * value * 10) / 10);
      } else {
        setCount(Math.round(eased * value));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration, format]);

  let displayValue: string;
  if (format === "comma") {
    displayValue = count.toLocaleString();
  } else if (format === "percent") {
    displayValue = `${count}%`;
  } else {
    displayValue = String(count);
  }

  return (
    <div ref={ref}>
      <span>
        {displayValue}
        {suffix}
      </span>
      <span>{label}</span>
    </div>
  );
}
