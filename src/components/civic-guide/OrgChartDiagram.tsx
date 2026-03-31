"use client";

import { motion } from "framer-motion";
import type { GovernmentForm } from "@/data/civic-guide/types-city";

interface OrgChartDiagramProps {
  form: GovernmentForm;
  className?: string;
}

// Node types drive visual treatment
type NodeType = "voters" | "elected" | "appointed" | "department" | "badge";

interface OrgNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: NodeType;
}

interface OrgEdge {
  from: string;
  to: string;
  dashed?: boolean;
}

interface OrgLayout {
  nodes: OrgNode[];
  edges: OrgEdge[];
  viewHeight: number;
}

// -- Color palettes by node type --
const PALETTE: Record<NodeType, {
  fill: string;
  fillEnd: string;
  stroke: string;
  text: string;
  sublabel: string;
}> = {
  voters: {
    fill: "#b45309",
    fillEnd: "#d97706",
    stroke: "#f59e0b",
    text: "#ffffff",
    sublabel: "#fef3c7",
  },
  elected: {
    fill: "#1e40af",
    fillEnd: "#2563eb",
    stroke: "#3b82f6",
    text: "#ffffff",
    sublabel: "#bfdbfe",
  },
  appointed: {
    fill: "rgba(255,255,255,0.07)",
    fillEnd: "rgba(255,255,255,0.12)",
    stroke: "rgba(255,255,255,0.22)",
    text: "#e5e7eb",
    sublabel: "#9ca3af",
  },
  department: {
    fill: "rgba(255,255,255,0.04)",
    fillEnd: "rgba(255,255,255,0.08)",
    stroke: "rgba(255,255,255,0.15)",
    text: "#d1d5db",
    sublabel: "#9ca3af",
  },
  badge: {
    fill: "#065f46",
    fillEnd: "#047857",
    stroke: "#10b981",
    text: "#ecfdf5",
    sublabel: "#a7f3d0",
  },
};

// -- Layout definitions for each government form --
function getLayout(form: GovernmentForm): OrgLayout {
  switch (form) {
    case "CM":
      return {
        viewHeight: 380,
        nodes: [
          { id: "voters", label: "Voters", x: 250, y: 20, width: 150, height: 48, type: "voters" },
          { id: "council", label: "City Council", sublabel: "Sets policy", x: 280, y: 110, width: 170, height: 58, type: "elected" },
          { id: "mayor", label: "Mayor", sublabel: "Ceremonial", x: 90, y: 110, width: 130, height: 58, type: "elected" },
          { id: "manager", label: "City Manager", sublabel: "Runs operations", x: 250, y: 218, width: 170, height: 58, type: "appointed" },
          { id: "depts", label: "Departments", sublabel: "Police, Fire, Public Works...", x: 250, y: 320, width: 210, height: 52, type: "department" },
        ],
        edges: [
          { from: "voters", to: "council" },
          { from: "voters", to: "mayor" },
          { from: "council", to: "manager" },
          { from: "manager", to: "depts" },
        ],
      };
    case "SM":
      return {
        viewHeight: 360,
        nodes: [
          { id: "voters", label: "Voters", x: 250, y: 20, width: 150, height: 48, type: "voters" },
          { id: "mayor", label: "Mayor", sublabel: "Chief Executive", x: 150, y: 110, width: 150, height: 58, type: "elected" },
          { id: "council", label: "City Council", sublabel: "Legislative body", x: 355, y: 110, width: 160, height: 58, type: "elected" },
          { id: "veto", label: "Veto Power", x: 260, y: 178, width: 0, height: 0, type: "badge" },
          { id: "depts", label: "Departments", sublabel: "Report to Mayor", x: 150, y: 248, width: 180, height: 58, type: "department" },
        ],
        edges: [
          { from: "voters", to: "mayor" },
          { from: "voters", to: "council" },
          { from: "mayor", to: "depts" },
          { from: "mayor", to: "council", dashed: true },
        ],
      };
    case "WM":
      return {
        viewHeight: 380,
        nodes: [
          { id: "voters", label: "Voters", x: 250, y: 20, width: 150, height: 48, type: "voters" },
          { id: "council", label: "City Council", sublabel: "Legislative + Executive", x: 250, y: 110, width: 200, height: 58, type: "elected" },
          { id: "mayor", label: "Mayor", sublabel: "Chairs council", x: 250, y: 218, width: 150, height: 58, type: "appointed" },
          { id: "depts", label: "Departments", sublabel: "Shared oversight", x: 250, y: 320, width: 190, height: 52, type: "department" },
        ],
        edges: [
          { from: "voters", to: "council" },
          { from: "council", to: "mayor" },
          { from: "council", to: "depts" },
        ],
      };
    case "CO":
      return {
        viewHeight: 350,
        nodes: [
          { id: "voters", label: "Voters", x: 250, y: 20, width: 150, height: 48, type: "voters" },
          { id: "c1", label: "Commissioner", sublabel: "Police", x: 85, y: 120, width: 140, height: 58, type: "elected" },
          { id: "c2", label: "Commissioner", sublabel: "Fire", x: 250, y: 120, width: 140, height: 58, type: "elected" },
          { id: "c3", label: "Commissioner", sublabel: "Public Works", x: 415, y: 120, width: 140, height: 58, type: "elected" },
          { id: "note", label: "Each runs a department", x: 250, y: 240, width: 210, height: 44, type: "department" },
        ],
        edges: [
          { from: "voters", to: "c1" },
          { from: "voters", to: "c2" },
          { from: "voters", to: "c3" },
        ],
      };
    case "TM":
      return {
        viewHeight: 360,
        nodes: [
          { id: "voters", label: "All Voters", sublabel: "Vote directly", x: 250, y: 20, width: 160, height: 56, type: "voters" },
          { id: "meeting", label: "Town Meeting", sublabel: "Budget, laws, policy", x: 250, y: 118, width: 190, height: 58, type: "elected" },
          { id: "board", label: "Select Board", sublabel: "Elected executives", x: 140, y: 228, width: 160, height: 58, type: "appointed" },
          { id: "manager", label: "Town Manager", sublabel: "Day-to-day ops", x: 360, y: 228, width: 150, height: 58, type: "department" },
        ],
        edges: [
          { from: "voters", to: "meeting" },
          { from: "meeting", to: "board" },
          { from: "board", to: "manager" },
        ],
      };
    case "RT":
      return {
        viewHeight: 360,
        nodes: [
          { id: "voters", label: "Voters", x: 250, y: 20, width: 150, height: 48, type: "voters" },
          { id: "reps", label: "Town Meeting Members", sublabel: "Elected representatives", x: 250, y: 110, width: 210, height: 58, type: "elected" },
          { id: "board", label: "Select Board", sublabel: "Executive", x: 140, y: 218, width: 150, height: 58, type: "appointed" },
          { id: "manager", label: "Town Manager", x: 370, y: 218, width: 150, height: 48, type: "department" },
        ],
        edges: [
          { from: "voters", to: "reps" },
          { from: "reps", to: "board" },
          { from: "board", to: "manager" },
        ],
      };
  }
}

// -- Veto badge (arrow/shield shape, not a box) --
function VetoBadge({ node, index }: { node: OrgNode; index: number }) {
  const cx = node.x;
  const cy = node.y;
  const p = PALETTE.badge;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      {/* Shield / badge shape */}
      <path
        d={`M ${cx - 42} ${cy - 14} L ${cx + 42} ${cy - 14} L ${cx + 42} ${cy + 6} L ${cx} ${cy + 20} L ${cx - 42} ${cy + 6} Z`}
        fill="url(#grad-badge)"
        stroke={p.stroke}
        strokeWidth={1.5}
        filter="url(#shadow)"
      />
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        fill={p.text}
        fontSize={12}
        fontWeight={700}
        fontFamily="Inter, sans-serif"
        letterSpacing="0.05em"
      >
        VETO POWER
      </text>
    </motion.g>
  );
}

// -- Node box with gradient fill, shadow, rounded corners --
function NodeBox({ node, index }: { node: OrgNode; index: number }) {
  if (node.type === "badge") {
    return <VetoBadge node={node} index={index} />;
  }

  const p = PALETTE[node.type];
  const halfW = node.width / 2;
  const x = node.x - halfW;
  const y = node.y;
  const gradId = `grad-${node.id}`;

  return (
    <motion.g
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.09, duration: 0.45, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.fill} />
          <stop offset="100%" stopColor={p.fillEnd} />
        </linearGradient>
      </defs>

      {/* Shadow + filled rect */}
      <rect
        x={x}
        y={y}
        width={node.width}
        height={node.height}
        rx={10}
        fill={`url(#${gradId})`}
        stroke={p.stroke}
        strokeWidth={1.2}
        filter="url(#shadow)"
      />

      {/* Label */}
      <text
        x={node.x}
        y={node.sublabel ? y + node.height * 0.38 : y + node.height * 0.55}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={p.text}
        fontSize={15}
        fontWeight={700}
        fontFamily="Inter, sans-serif"
      >
        {node.label}
      </text>

      {/* Sublabel */}
      {node.sublabel && (
        <text
          x={node.x}
          y={y + node.height * 0.7}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={p.sublabel}
          fontSize={12}
          fontWeight={400}
          fontFamily="Inter, sans-serif"
        >
          {node.sublabel}
        </text>
      )}
    </motion.g>
  );
}

// -- Curved connecting edge with cubic bezier --
function EdgePath({
  from,
  to,
  index,
  dashed,
}: {
  from: OrgNode;
  to: OrgNode;
  index: number;
  dashed?: boolean;
}) {
  // For badge-type nodes, skip rendering edges to/from them
  if (from.type === "badge" || to.type === "badge") return null;

  const x1 = from.x;
  const y1 = from.y + from.height;
  const x2 = to.x;
  const y2 = to.y;

  // Vertical midpoint for control points
  const midY = y1 + (y2 - y1) * 0.5;

  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(148, 163, 184, 0.35)"
      strokeWidth={2}
      strokeDasharray={dashed ? "6 4" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.45, ease: "easeOut" }}
    />
  );
}

export function OrgChartDiagram({ form, className = "" }: OrgChartDiagramProps) {
  const layout = getLayout(form);
  const nodeMap = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));

  return (
    <div className={`lg-org-chart ${className}`}>
      <svg
        viewBox={`0 0 500 ${layout.viewHeight}`}
        width="100%"
        style={{ maxWidth: "100%" }}
      >
        {/* -- Definitions: shadow filter + badge gradient -- */}
        <defs>
          <filter id="shadow" x="-8%" y="-8%" width="116%" height="128%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          <linearGradient id="grad-badge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PALETTE.badge.fill} />
            <stop offset="100%" stopColor={PALETTE.badge.fillEnd} />
          </linearGradient>
        </defs>

        {/* Edges (behind nodes) */}
        {layout.edges.map((edge, i) => {
          const from = nodeMap[edge.from];
          const to = nodeMap[edge.to];
          if (!from || !to) return null;
          return (
            <EdgePath
              key={`${edge.from}-${edge.to}`}
              from={from}
              to={to}
              index={i}
              dashed={edge.dashed}
            />
          );
        })}

        {/* Nodes */}
        {layout.nodes.map((node, i) => (
          <NodeBox key={node.id} node={node} index={i} />
        ))}
      </svg>
    </div>
  );
}
