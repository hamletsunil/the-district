"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface TimelineStep {
  label: string;
  description?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function Timeline({ steps, title, subtitle, className = "" }: TimelineProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <figure ref={ref} className={`lg-timeline ${className}`}>
      <figcaption className="lg-timeline-header">
        <span className="lg-timeline-title">{title}</span>
        {subtitle && <span className="lg-timeline-subtitle">{subtitle}</span>}
      </figcaption>
      <div className="lg-timeline-track">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="lg-timeline-step"
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg-timeline-dot-col">
              <div className="lg-timeline-dot" />
              {i < steps.length - 1 && <div className="lg-timeline-connector" />}
            </div>
            <div className="lg-timeline-content">
              <span className="lg-timeline-step-label">{step.label}</span>
              {step.description && (
                <p className="lg-timeline-step-desc">{step.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </figure>
  );
}
