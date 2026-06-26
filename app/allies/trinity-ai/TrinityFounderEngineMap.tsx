"use client";

import { useMemo } from "react";
import {
  Background,
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
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Cpu,
  Film,
  Globe2,
  Library,
  Megaphone,
  Rocket,
  Sparkles,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TrinityNodeKind =
  | "story"
  | "startup"
  | "lab"
  | "agents"
  | "media"
  | "channels"
  | "offers"
  | "feedback";

type TrinityNodeData = {
  label: string;
  eyebrow: string;
  kind: TrinityNodeKind;
  description: string;
};

const kindStyles: Record<
  TrinityNodeKind,
  { icon: typeof Sparkles; ring: string; fill: string; iconClass: string }
> = {
  story: {
    icon: Store,
    ring: "border-[#d4b06e]/40",
    fill: "from-[#d4b06e]/22 to-white/[0.045]",
    iconClass: "text-[#f7e7c0]",
  },
  startup: {
    icon: Rocket,
    ring: "border-[#f7e7c0]/22",
    fill: "from-[#f7e7c0]/12 to-white/[0.035]",
    iconClass: "text-[#f7e7c0]",
  },
  lab: {
    icon: Cpu,
    ring: "border-[#125e4c]/45",
    fill: "from-[#125e4c]/25 to-white/[0.04]",
    iconClass: "text-emerald-100",
  },
  agents: {
    icon: Bot,
    ring: "border-cyan-100/26",
    fill: "from-cyan-100/14 to-white/[0.035]",
    iconClass: "text-cyan-100",
  },
  media: {
    icon: Film,
    ring: "border-rose-100/24",
    fill: "from-rose-100/12 to-white/[0.035]",
    iconClass: "text-rose-100",
  },
  channels: {
    icon: Megaphone,
    ring: "border-amber-100/30",
    fill: "from-amber-100/14 to-white/[0.035]",
    iconClass: "text-amber-100",
  },
  offers: {
    icon: BriefcaseBusiness,
    ring: "border-[#d4b06e]/34",
    fill: "from-[#d4b06e]/16 to-white/[0.035]",
    iconClass: "text-[#d4b06e]",
  },
  feedback: {
    icon: Library,
    ring: "border-violet-100/24",
    fill: "from-violet-100/12 to-white/[0.035]",
    iconClass: "text-violet-100",
  },
};

function TrinityNode({ data, selected }: NodeProps<Node<TrinityNodeData>>) {
  const styles = kindStyles[data.kind];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "w-[270px] rounded-[1.85rem] border bg-gradient-to-br p-4 shadow-[0_24px_92px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition",
        styles.ring,
        styles.fill,
        selected && "scale-[1.03] border-white/50 shadow-[0_28px_110px_rgba(212,176,110,0.22)]",
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-0 !w-0 !border-0 !bg-transparent !opacity-0"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!h-0 !w-0 !border-0 !bg-transparent !opacity-0"
      />
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/25">
          <Icon className={cn("h-5 w-5", styles.iconClass)} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/46">
            {data.eyebrow}
          </p>
          <h3 className="mt-1 text-base font-black leading-5 text-white">{data.label}</h3>
        </div>
      </div>
      <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-white/64">
        {data.description}
      </p>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-0 !w-0 !border-0 !bg-transparent !opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-0 !w-0 !border-0 !bg-transparent !opacity-0"
      />
    </div>
  );
}

const nodeTypes = {
  trinity: TrinityNode,
};

const mobileFlow = [
  {
    label: "Public story",
    detail: "Hashems 1959, food, family, culture, and public founder signal stay grounded.",
    icon: Store,
    tone: "text-[#f7e7c0]",
  },
  {
    label: "Startup offer",
    detail: "Trinity AI gets a clear first audience, first promise, and proof loop.",
    icon: Rocket,
    tone: "text-[#d4b06e]",
  },
  {
    label: "Local lab",
    detail: "OpenClaw, Jarvis-style voice, Hermes routines, ACOS, and SIS remain private tools.",
    icon: Cpu,
    tone: "text-emerald-100",
  },
  {
    label: "Media loop",
    detail: "One idea becomes a note, carousel, video, podcast segment, and academy seed.",
    icon: Film,
    tone: "text-rose-100",
  },
  {
    label: "Proof and revenue",
    detail: "Feedback improves the offer, content library, startup roadmap, and client path.",
    icon: BriefcaseBusiness,
    tone: "text-amber-100",
  },
];

const initialNodes: Node<TrinityNodeData>[] = [
  {
    id: "story",
    type: "trinity",
    position: { x: 0, y: 190 },
    data: {
      eyebrow: "Ground",
      label: "Ahmad's Public Story",
      kind: "story",
      description: "Family, food, culture, Hashems 1959, founder voice, and public profiles.",
    },
  },
  {
    id: "startup",
    type: "trinity",
    position: { x: 312, y: 44 },
    data: {
      eyebrow: "Shape",
      label: "Trinity AI Offer",
      kind: "startup",
      description: "Name the first audience, promise, demo, proof, and launch wedge.",
    },
  },
  {
    id: "lab",
    type: "trinity",
    position: { x: 312, y: 336 },
    data: {
      eyebrow: "Private tools",
      label: "OpenClaw Local Lab",
      kind: "lab",
      description: "Mac mini or Studio, Jarvis-style voice, Hermes routines, ACOS, SIS, and repos.",
    },
  },
  {
    id: "agents",
    type: "trinity",
    position: { x: 624, y: 190 },
    data: {
      eyebrow: "Operate",
      label: "Agent Swarm Roles",
      kind: "agents",
      description: "Founder chief of staff, repo accelerator, media crew, growth analyst, and guardian.",
    },
  },
  {
    id: "media",
    type: "trinity",
    position: { x: 936, y: 44 },
    data: {
      eyebrow: "Create",
      label: "Media Production Loop",
      kind: "media",
      description: "Images, videos, carousels, scripts, thumbnails, edits, and platform versions.",
    },
  },
  {
    id: "channels",
    type: "trinity",
    position: { x: 936, y: 336 },
    data: {
      eyebrow: "Publish",
      label: "Instagram, LinkedIn, Podcast",
      kind: "channels",
      description: "Public channels convert founder ideas into trust, demand, and learning.",
    },
  },
  {
    id: "offers",
    type: "trinity",
    position: { x: 1248, y: 44 },
    data: {
      eyebrow: "Business",
      label: "Offers + Academy",
      kind: "offers",
      description: "Consulting, local lab setup, creator academy, startup templates, and workshops.",
    },
  },
  {
    id: "feedback",
    type: "trinity",
    position: { x: 1248, y: 336 },
    data: {
      eyebrow: "Improve",
      label: "Proof Library",
      kind: "feedback",
      description: "Responses, metrics, client questions, demos, and approved examples refine the system.",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "story", target: "startup" },
  { id: "e2", source: "story", target: "lab" },
  { id: "e3", source: "startup", target: "agents" },
  { id: "e4", source: "lab", target: "agents" },
  { id: "e5", source: "agents", target: "media" },
  { id: "e6", source: "agents", target: "channels" },
  { id: "e7", source: "media", target: "offers" },
  { id: "e8", source: "channels", target: "feedback" },
  { id: "e9", source: "feedback", target: "startup" },
];

export default function TrinityFounderEngineMap() {
  const styledEdges = useMemo(
    () =>
      initialEdges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#d4b06e" },
        style: { stroke: "#d4b06e", strokeWidth: 1.8, opacity: 0.72 },
      })),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);

  return (
    <div className="relative min-h-[548px] overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#090a08]/72 shadow-[0_32px_128px_rgba(0,0,0,0.46)] backdrop-blur-2xl md:h-[676px] md:min-h-0">
      <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/58">
          Trinity Founder Engine
        </span>
        <span className="rounded-full bg-[#d4b06e]/12 px-3 py-1 text-xs font-bold text-[#f7e7c0]">
          Private tools, public clarity
        </span>
      </div>

      <div data-ahmad-mobile-flow="true" className="grid gap-3 px-4 pb-5 pt-20 md:hidden">
        {mobileFlow.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="rounded-[1.55rem] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/25">
                  <Icon className={`h-5 w-5 ${step.tone}`} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#d4b06e]">
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
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.62}
          maxZoom={1.08}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255,255,255,0.15)" gap={28} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
