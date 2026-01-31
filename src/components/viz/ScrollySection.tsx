"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import scrollama from "scrollama";

export interface ScrollyStep {
  content: ReactNode;
  id?: string;
}

export interface ScrollySectionProps {
  /**
   * Array of content to show as scroll steps
   */
  steps: ScrollyStep[];
  /**
   * Render function for the sticky visualization
   * Receives the current step index (0-based)
   */
  renderVisualization: (stepIndex: number, progress: number) => ReactNode;
  /**
   * Callback when a step is entered
   */
  onStepEnter?: (index: number, direction: "up" | "down") => void;
  /**
   * Callback when a step is exited
   */
  onStepExit?: (index: number, direction: "up" | "down") => void;
  /**
   * Offset for triggering step (0-1, default 0.5 = middle of viewport)
   */
  offset?: number;
  /**
   * Whether to track scroll progress within each step
   */
  trackProgress?: boolean;
  /**
   * Background color for the section
   */
  backgroundColor?: string;
  /**
   * Position of the text steps: 'left', 'right', or 'center'
   */
  textPosition?: "left" | "right" | "center";
  /**
   * Additional class names for the container
   */
  className?: string;
}

export function ScrollySection({
  steps,
  renderVisualization,
  onStepEnter,
  onStepExit,
  offset = 0.5,
  trackProgress = false,
  backgroundColor = "transparent",
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
    // Initialize scrollama
    scrollerRef.current = scrollama()
      .setup({
        step: ".scrolly-step",
        offset,
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
        if (response.index === currentStep) {
          setProgress(response.progress);
        }
      });
    }

    // Handle resize
    window.addEventListener("resize", handleResize);

    return () => {
      scrollerRef.current?.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [offset, trackProgress, onStepEnter, onStepExit, handleResize, currentStep]);

  const textPositionClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };

  return (
    <section
      ref={containerRef}
      className={`scrolly-container relative ${className}`}
      style={{ backgroundColor }}
    >
      {/* Sticky visualization container */}
      <div className="scrolly-sticky sticky top-0 h-screen flex items-center justify-center z-0">
        <div className="w-full h-full flex items-center justify-center">
          {renderVisualization(currentStep, progress)}
        </div>
      </div>

      {/* Scrolling text steps */}
      <div
        className={`scrolly-steps relative z-10 flex flex-col ${textPositionClasses[textPosition]}`}
      >
        {steps.map((step, index) => (
          <div
            key={step.id ?? index}
            className="scrolly-step min-h-screen flex items-center px-4 md:px-8"
            data-step={index}
          >
            <div
              className={`scrolly-card bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-md shadow-lg ${
                textPosition === "center" ? "mx-auto" : ""
              }`}
            >
              {step.content}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator for first step */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-50">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

/**
 * Helper component for step content with consistent styling
 */
export interface StepContentProps {
  title?: string;
  children: ReactNode;
  highlight?: string;
}

export function StepContent({ title, children, highlight }: StepContentProps) {
  return (
    <div>
      {highlight && (
        <span className="text-xs font-semibold text-coral-600 uppercase tracking-wider mb-2 block">
          {highlight}
        </span>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-navy-900 mb-3">{title}</h3>
      )}
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}
