"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import scrollama from "scrollama";

export interface ScrollyStep {
  content: ReactNode;
  id?: string;
}

export interface ScrollySectionProps {
  steps: ScrollyStep[];
  renderVisualization: (stepIndex: number, progress: number) => ReactNode;
  onStepEnter?: (index: number, direction: "up" | "down") => void;
  onStepExit?: (index: number, direction: "up" | "down") => void;
  offset?: number;
  trackProgress?: boolean;
  textPosition?: "left" | "right" | "center";
  className?: string;
}

export function ScrollySection({
  steps,
  renderVisualization,
  onStepEnter,
  onStepExit,
  offset = 0.5,
  trackProgress = false,
  textPosition = "left",
  className = "",
}: ScrollySectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollerRef = useRef<ReturnType<typeof scrollama> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    scrollerRef.current?.resize();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use scoped step selector to avoid collisions
    const stepSelector = `#${container.id} .lg-scrolly-step`;

    scrollerRef.current = scrollama()
      .setup({
        step: stepSelector,
        offset: offset as 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
        progress: trackProgress,
      })
      .onStepEnter((response) => {
        setCurrentStep(response.index);
        onStepEnter?.(response.index, response.direction);
      })
      .onStepExit((response) => {
        onStepExit?.(response.index, response.direction);
      });

    if (trackProgress) {
      scrollerRef.current.onStepProgress((response) => {
        setProgress(response.progress);
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      scrollerRef.current?.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [offset, trackProgress, onStepEnter, onStepExit, handleResize]);

  // Generate a stable unique ID for scoped selectors
  const containerId = useRef(`scrolly-${Math.random().toString(36).slice(2, 8)}`);

  return (
    <section
      ref={containerRef}
      id={containerId.current}
      className={`lg-scrolly-container ${className}`}
    >
      {/* Sticky visualization */}
      <div className="lg-scrolly-sticky">
        <div className="lg-scrolly-viz-inner">
          {renderVisualization(currentStep, progress)}
        </div>
      </div>

      {/* Scrolling text steps */}
      <div className={`lg-scrolly-steps lg-scrolly-steps-${textPosition}`}>
        {steps.map((step, index) => (
          <div
            key={step.id ?? index}
            className={`lg-scrolly-step ${index === currentStep ? "lg-scrolly-step-active" : ""}`}
            data-step={index}
          >
            <div className={`lg-scrolly-card ${textPosition === "center" ? "lg-scrolly-card-center" : ""}`}>
              {step.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Helper for step content with consistent styling */
export function StepContent({
  title,
  children,
  label,
}: {
  title?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <div>
      {label && <span className="lg-scrolly-label">{label}</span>}
      {title && <h3 className="lg-scrolly-title">{title}</h3>}
      <div className="lg-scrolly-body">{children}</div>
    </div>
  );
}
