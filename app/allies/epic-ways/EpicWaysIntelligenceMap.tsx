"use client";

import { useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  BarChart3,
  Brain,
  CalendarDays,
  FileText,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EpicNodeKind =
  | "human"
  | "signal"
  | "intelligence"
  | "room"
  | "memory"
  | "growth"
  | "proof";

type EpicNodeData = {
  label: string;
  eyebrow: string;
  kind: EpicNodeKind;
  description: string;
};

const kindStyles: Record<
  EpicNodeKind,
  { icon: typeof Sparkles; ring: string; fill: string; iconClass: string }
> = {
  human: {
    icon: Users,
    ring: "border-amber-200/35",
    fill: "from-amber-200/20 to-white/[0.045]",
    iconClass: "text-amber-100",
  },
  signal: {
    icon: MessageCircle,
    ring: "border-cyan-200/30",
    fill: "from-cyan-200/15 to-white/[0.04]",
    iconClass: "text-cyan-100",
  },
  intelligence: {
    icon: Brain,
    ring: "border-emerald-200/35",
    fill: "from-emerald-200/20 to-white/[0.045]",
    iconClass: "text-emerald-100",
  },
  room: {
    icon: CalendarDays,
    ring: "border-violet-200/30",
    fill: "from-violet-200/15 to-white/[0.04]",
    iconClass: "text-violet-100",
  },
  memory: {
    icon: FileText,
    ring: "border-sky-200/30",
    fill: "from-sky-200/15 to-white/[0.04]",
    iconClass: "text-sky-100",
  },
  growth: {
    icon: Sparkles,
    ring: "border-rose-200/30",
    fill: "from-rose-200/15 to-white/[0.04]",
    iconClass: "text-rose-100",
  },
  proof: {
    icon: BarChart3,
    ring: "border-lime-200/30",
    fill: "from-lime-200/15 to-white/[0.04]",
    iconClass: "text-lime-100",
  },
};

function EpicNode({ data, selected }: NodeProps<Node<EpicNodeData>>) {
  const styles = kindStyles[data.kind];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "min-w-[188px] rounded-[1.55rem] border bg-gradient-to-br p-3.5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition",
        styles.ring,
        styles.fill,
        selected && "scale-[1.03] border-white/50 shadow-[0_28px_110px_rgba(16,185,129,0.22)]",
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-white/40 !bg-white/30"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-white/40 !bg-white/30"
      />
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/25">
          <Icon className={cn("h-5 w-5", styles.iconClass)} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/46">
            {data.eyebrow}
          </p>
          <h3 className="mt-1 text-sm font-black leading-5 text-white">{data.label}</h3>
        </div>
      </div>
      <p className="mt-3 border-t border-white/10 pt-3 text-[11px] leading-5 text-white/62">
        {data.description}
      </p>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-white/40 !bg-white/30"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-white/40 !bg-white/30"
      />
    </div>
  );
}

const nodeTypes = {
  epic: EpicNode,
};

const mobileFlow = [
  {
    label: "Estefania leads the room",
    detail: "Voice, trust, warmth, and live facilitation stay visible.",
    icon: Users,
    tone: "text-amber-100",
  },
  {
    label: "Signal becomes a brief",
    detail: "Client context, tension, audience, and goals become useful preparation.",
    icon: MessageCircle,
    tone: "text-cyan-100",
  },
  {
    label: "Intelligence shapes delivery",
    detail: "Codex, Claude, templates, and memory support the workshop path.",
    icon: Brain,
    tone: "text-emerald-100",
  },
  {
    label: "The room becomes follow-up",
    detail: "Decisions, scripts, owner trackers, and next steps leave with the client.",
    icon: FileText,
    tone: "text-sky-100",
  },
  {
    label: "Approved insight compounds",
    detail: "Learning becomes better offers, talks, posts, and proof.",
    icon: Sparkles,
    tone: "text-rose-100",
  },
];

const initialNodes: Node<EpicNodeData>[] = [
  {
    id: "estefania",
    type: "epic",
    position: { x: 0, y: 150 },
    data: {
      eyebrow: "Human lead",
      label: "Estefania",
      kind: "human",
      description: "Voice, trust, room energy, and leadership presence stay in front.",
    },
  },
  {
    id: "client-signal",
    type: "epic",
    position: { x: 260, y: 40 },
    data: {
      eyebrow: "Before",
      label: "Client Signal",
      kind: "signal",
      description: "Calls, team context, goals, constraints, and hidden tension become a brief.",
    },
  },
  {
    id: "intelligence",
    type: "epic",
    position: { x: 520, y: 150 },
    data: {
      eyebrow: "Backstage",
      label: "Intelligence Hub",
      kind: "intelligence",
      description: "Codex, Claude, templates, research, and memory turn raw context into leverage.",
    },
  },
  {
    id: "offer",
    type: "epic",
    position: { x: 260, y: 265 },
    data: {
      eyebrow: "Shape",
      label: "Offer Architect",
      kind: "proof",
      description: "The need becomes a workshop, program, event, 1:1, or retainer.",
    },
  },
  {
    id: "room",
    type: "epic",
    position: { x: 790, y: 40 },
    data: {
      eyebrow: "During",
      label: "Room Design",
      kind: "room",
      description: "Agenda, exercises, prompts, slides, and energy cues support the live room.",
    },
  },
  {
    id: "memory",
    type: "epic",
    position: { x: 790, y: 265 },
    data: {
      eyebrow: "After",
      label: "Memory + Follow-Up",
      kind: "memory",
      description: "Summaries, decisions, manager scripts, owner trackers, and next steps.",
    },
  },
  {
    id: "growth",
    type: "epic",
    position: { x: 1048, y: 150 },
    data: {
      eyebrow: "Compound",
      label: "Impact + Content",
      kind: "growth",
      description: "Approved insights become proof, posts, talks, and improved offers.",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "estefania", target: "client-signal", animated: true },
  { id: "e2", source: "client-signal", target: "intelligence", animated: true },
  { id: "e3", source: "estefania", target: "offer" },
  { id: "e4", source: "offer", target: "intelligence", animated: true },
  { id: "e5", source: "intelligence", target: "room", animated: true },
  { id: "e6", source: "room", target: "memory", animated: true },
  { id: "e7", source: "memory", target: "growth", animated: true },
  { id: "e8", source: "growth", target: "intelligence" },
];

export default function EpicWaysIntelligenceMap() {
  const styledEdges = useMemo(
    () =>
      initialEdges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#a7f3d0" },
        style: { stroke: "#a7f3d0", strokeWidth: 1.8, opacity: 0.72 },
      })),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#071010]/70 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:h-[560px] md:min-h-0">
      <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/58">
          Client Intelligence Map
        </span>
        <span className="rounded-full bg-emerald-200/12 px-3 py-1 text-xs font-bold text-emerald-100">
          Human-led
        </span>
      </div>

      <div className="grid gap-3 px-4 pb-5 pt-20 md:hidden">
        {mobileFlow.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/25">
                  <Icon className={`h-5 w-5 ${step.tone}`} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-amber-100">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-sm font-black leading-5 text-white">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/62">{step.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden h-full md:block">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.24 }}
          minZoom={0.45}
          maxZoom={1.25}
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          className="epicways-flow"
        >
          <Background color="rgba(255,255,255,0.16)" gap={28} size={1} />
          <Controls className="!bottom-5 !left-5 !rounded-2xl !border !border-white/10 !bg-black/45 !backdrop-blur-xl [&>button]:!border-white/10 [&>button]:!bg-transparent [&>button]:!text-white" />
        </ReactFlow>
      </div>
    </div>
  );
}
