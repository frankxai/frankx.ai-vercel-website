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
  BriefcaseBusiness,
  Compass,
  FileText,
  Globe2,
  HeartHandshake,
  Library,
  MessagesSquare,
  Plane,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AnaNodeKind =
  | "voice"
  | "research"
  | "offers"
  | "delivery"
  | "letters"
  | "library"
  | "products"
  | "revenue";

type AnaNodeData = {
  label: string;
  eyebrow: string;
  kind: AnaNodeKind;
  description: string;
};

const kindStyles: Record<
  AnaNodeKind,
  { icon: typeof Sparkles; ring: string; fill: string; iconClass: string }
> = {
  voice: {
    icon: HeartHandshake,
    ring: "border-[#d4a574]/40",
    fill: "from-[#d4a574]/22 to-white/[0.045]",
    iconClass: "text-[#f5edd8]",
  },
  research: {
    icon: BookOpen,
    ring: "border-[#f5edd8]/22",
    fill: "from-[#f5edd8]/12 to-white/[0.035]",
    iconClass: "text-[#f5edd8]",
  },
  offers: {
    icon: BriefcaseBusiness,
    ring: "border-[#e8a951]/34",
    fill: "from-[#e8a951]/18 to-white/[0.04]",
    iconClass: "text-[#e8a951]",
  },
  delivery: {
    icon: MessagesSquare,
    ring: "border-[#1f5f4a]/45",
    fill: "from-[#1f5f4a]/24 to-white/[0.04]",
    iconClass: "text-emerald-100",
  },
  letters: {
    icon: FileText,
    ring: "border-[#d4a574]/32",
    fill: "from-[#d4a574]/16 to-white/[0.035]",
    iconClass: "text-[#d4a574]",
  },
  library: {
    icon: Library,
    ring: "border-cyan-100/24",
    fill: "from-cyan-100/12 to-white/[0.035]",
    iconClass: "text-cyan-100",
  },
  products: {
    icon: Sparkles,
    ring: "border-rose-100/24",
    fill: "from-rose-100/12 to-white/[0.035]",
    iconClass: "text-rose-100",
  },
  revenue: {
    icon: Plane,
    ring: "border-amber-100/30",
    fill: "from-amber-100/14 to-white/[0.035]",
    iconClass: "text-amber-100",
  },
};

function AnaNode({ data, selected }: NodeProps<Node<AnaNodeData>>) {
  const styles = kindStyles[data.kind];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "w-[264px] rounded-[1.75rem] border bg-gradient-to-br p-4 shadow-[0_24px_92px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition",
        styles.ring,
        styles.fill,
        selected && "scale-[1.03] border-white/50 shadow-[0_28px_110px_rgba(212,165,116,0.22)]",
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
          <p className="text-[10px] font-bold text-white/46">
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
  ana: AnaNode,
};

const mobileFlow = [
  {
    label: "Voice and research",
    detail: "Ana's language, reading, HR experience, and reflective work stay at the center.",
    icon: BookOpen,
    tone: "text-[#f5edd8]",
  },
  {
    label: "Offers",
    detail: "Clarity sessions, circles, workshops, and the proposed team path become clear packages.",
    icon: BriefcaseBusiness,
    tone: "text-[#e8a951]",
  },
  {
    label: "Delivery",
    detail: "Intake, session design, questions, and aftercare make the work repeatable.",
    icon: MessagesSquare,
    tone: "text-emerald-100",
  },
  {
    label: "Library",
    detail: "Approved insights become posts, guides, prompts, and small digital products.",
    icon: Library,
    tone: "text-cyan-100",
  },
  {
    label: "Freedom",
    detail: "Remote-friendly revenue fits around travel instead of demanding a fixed room.",
    icon: Plane,
    tone: "text-amber-100",
  },
];

const initialNodes: Node<AnaNodeData>[] = [
  {
    id: "voice",
    type: "ana",
    position: { x: 0, y: 190 },
    data: {
      eyebrow: "Center",
      label: "Ana's Voice",
      kind: "voice",
      description: "Her site, offers, research, faith, body, and self-knowledge language remain primary.",
    },
  },
  {
    id: "research",
    type: "ana",
    position: { x: 300, y: 44 },
    data: {
      eyebrow: "Inputs",
      label: "Research + Reading",
      kind: "research",
      description: "Articles, books, public notes, and questions become usable session material.",
    },
  },
  {
    id: "offers",
    type: "ana",
    position: { x: 300, y: 336 },
    data: {
      eyebrow: "Shape",
      label: "Offer Map",
      kind: "offers",
      description: "Clarity session, reflection circle, workshop, and proposed team offer.",
    },
  },
  {
    id: "delivery",
    type: "ana",
    position: { x: 600, y: 190 },
    data: {
      eyebrow: "Live work",
      label: "Session System",
      kind: "delivery",
      description: "Intake, scripts, prompts, container design, notes, and human follow-up.",
    },
  },
  {
    id: "letters",
    type: "ana",
    position: { x: 900, y: 44 },
    data: {
      eyebrow: "After",
      label: "Letters + Aftercare",
      kind: "letters",
      description: "Clear next steps, reflective letters, and private client memory.",
    },
  },
  {
    id: "library",
    type: "ana",
    position: { x: 900, y: 336 },
    data: {
      eyebrow: "Reuse",
      label: "Content Library",
      kind: "library",
      description: "Approved insights become posts, prompts, reading paths, and guides.",
    },
  },
  {
    id: "products",
    type: "ana",
    position: { x: 1200, y: 44 },
    data: {
      eyebrow: "Assets",
      label: "Digital Products",
      kind: "products",
      description: "Reflection cards, mini-guides, templates, and small paid resources.",
    },
  },
  {
    id: "revenue",
    type: "ana",
    position: { x: 1200, y: 336 },
    data: {
      eyebrow: "Freedom",
      label: "Travel-Friendly Revenue",
      kind: "revenue",
      description: "Remote sessions, circles, team workshops, and products that keep earning.",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "voice", target: "research" },
  { id: "e2", source: "voice", target: "offers" },
  { id: "e3", source: "research", target: "delivery" },
  { id: "e4", source: "offers", target: "delivery" },
  { id: "e5", source: "delivery", target: "letters" },
  { id: "e6", source: "letters", target: "library" },
  { id: "e7", source: "library", target: "products" },
  { id: "e8", source: "products", target: "revenue" },
  { id: "e9", source: "revenue", target: "offers" },
];

export default function AnaFreedomEngineMap() {
  const styledEdges = useMemo(
    () =>
      initialEdges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#d4a574" },
        style: { stroke: "#d4a574", strokeWidth: 1.8, opacity: 0.72 },
      })),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);

  return (
    <div className="relative min-h-[548px] overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#0b0a08]/72 shadow-[0_32px_128px_rgba(0,0,0,0.46)] backdrop-blur-2xl md:h-[676px] md:min-h-0">
      <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
        <span className="text-xs font-bold text-white/58">
          Ana Freedom Engine
        </span>
        <span className="rounded-full bg-[#d4a574]/12 px-3 py-1 text-xs font-bold text-[#f5edd8]">
          Voice first
        </span>
      </div>

      <div data-ana-mobile-flow="true" className="grid gap-3 px-4 pb-5 pt-20 md:hidden">
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
                  <p className="font-mono text-[10px] text-[#d4a574]">
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
