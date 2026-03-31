import type { ReactNode } from "react";

type CalloutVariant = "misconception" | "why-matters" | "state-variation" | "did-you-know";

interface CalloutBoxProps {
  variant: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const VARIANT_CONFIG: Record<
  CalloutVariant,
  { icon: string; defaultTitle: string; className: string }
> = {
  misconception: {
    icon: "\u26A0",
    defaultTitle: "Common Misconception",
    className: "lg-callout-misconception",
  },
  "why-matters": {
    icon: "\u2736",
    defaultTitle: "Why This Matters",
    className: "lg-callout-why-matters",
  },
  "state-variation": {
    icon: "\u25C6",
    defaultTitle: "How It Varies By State",
    className: "lg-callout-state-variation",
  },
  "did-you-know": {
    icon: "\u2605",
    defaultTitle: "Did You Know",
    className: "lg-callout-did-you-know",
  },
};

export function CalloutBox({ variant, title, children }: CalloutBoxProps) {
  const config = VARIANT_CONFIG[variant];
  return (
    <aside className={`lg-callout ${config.className}`}>
      <div className="lg-callout-header">
        <span className="lg-callout-icon">{config.icon}</span>
        <span className="lg-callout-title">{title || config.defaultTitle}</span>
      </div>
      <div className="lg-callout-body">{children}</div>
    </aside>
  );
}
