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
  BedDouble,
  BookOpen,
  CalendarCheck,
  ChefHat,
  ClipboardList,
  Hotel,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

type HospitalityNodeKind =
  | "attention"
  | "booking"
  | "guest"
  | "service"
  | "hotel"
  | "team"
  | "memory"
  | "content"
  | "trust";

type HospitalityNodeData = {
  label: string;
  eyebrow: string;
  kind: HospitalityNodeKind;
  description: string;
};

const kindStyles: Record<
  HospitalityNodeKind,
  { icon: typeof Sparkles; ring: string; fill: string; iconClass: string }
> = {
  attention: {
    icon: Star,
    ring: "border-amber-100/38",
    fill: "from-amber-100/18 to-white/[0.04]",
    iconClass: "text-amber-100",
  },
  booking: {
    icon: CalendarCheck,
    ring: "border-emerald-100/32",
    fill: "from-emerald-100/14 to-white/[0.04]",
    iconClass: "text-emerald-100",
  },
  guest: {
    icon: MessageSquareText,
    ring: "border-cyan-100/26",
    fill: "from-cyan-100/12 to-white/[0.035]",
    iconClass: "text-cyan-100",
  },
  service: {
    icon: ChefHat,
    ring: "border-[#d7b27a]/36",
    fill: "from-[#d7b27a]/18 to-white/[0.04]",
    iconClass: "text-[#f4dfb5]",
  },
  hotel: {
    icon: Hotel,
    ring: "border-[#8bc7a2]/32",
    fill: "from-[#8bc7a2]/14 to-white/[0.04]",
    iconClass: "text-[#b9f0c8]",
  },
  team: {
    icon: UsersRound,
    ring: "border-white/18",
    fill: "from-white/[0.08] to-white/[0.03]",
    iconClass: "text-white/78",
  },
  memory: {
    icon: BookOpen,
    ring: "border-[#d7b27a]/28",
    fill: "from-[#d7b27a]/12 to-white/[0.035]",
    iconClass: "text-[#d7b27a]",
  },
  content: {
    icon: ClipboardList,
    ring: "border-rose-100/24",
    fill: "from-rose-100/10 to-white/[0.035]",
    iconClass: "text-rose-100",
  },
  trust: {
    icon: ShieldCheck,
    ring: "border-emerald-200/28",
    fill: "from-emerald-200/12 to-white/[0.035]",
    iconClass: "text-emerald-100",
  },
};

function HospitalityNode({
  data,
  selected,
}: NodeProps<Node<HospitalityNodeData>>) {
  const styles = kindStyles[data.kind];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "w-[268px] rounded-[1.8rem] border bg-gradient-to-br p-4 shadow-[0_24px_96px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition",
        styles.ring,
        styles.fill,
        selected &&
          "scale-[1.03] border-white/50 shadow-[0_28px_110px_rgba(215,178,122,0.20)]",
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
          <h3 className="mt-1 text-base font-black leading-5 text-white">
            {data.label}
          </h3>
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
  hospitality: HospitalityNode,
};

const mobileFlow = [
  {
    label: "Reputation spike",
    detail:
      "Michelin attention increases curiosity, bookings, messages, and expectation.",
    icon: Star,
    tone: "text-amber-100",
  },
  {
    label: "Booking and pre-arrival",
    detail:
      "Human-approved routines support reservations, allergies, celebration notes, and guest preparation.",
    icon: CalendarCheck,
    tone: "text-emerald-100",
  },
  {
    label: "Service and stay",
    detail:
      "Restaurant and hotel teams get sharper briefings without turning hospitality into automation theatre.",
    icon: BedDouble,
    tone: "text-[#f4dfb5]",
  },
  {
    label: "Memory and team learning",
    detail:
      "Private notes, producer stories, menu changes, and review patterns become useful internal memory.",
    icon: BookOpen,
    tone: "text-cyan-100",
  },
  {
    label: "Trust boundary",
    detail:
      "AI drafts and organizes. Humans decide, promise, serve, and protect guest data.",
    icon: ShieldCheck,
    tone: "text-emerald-100",
  },
];

const initialNodes: Node<HospitalityNodeData>[] = [
  {
    id: "attention",
    type: "hospitality",
    position: { x: 0, y: 212 },
    data: {
      eyebrow: "Now",
      label: "Michelin Momentum",
      kind: "attention",
      description:
        "Public recognition creates more demand, higher expectations, and new guests who need careful orientation.",
    },
  },
  {
    id: "booking",
    type: "hospitality",
    position: { x: 310, y: 52 },
    data: {
      eyebrow: "Before",
      label: "Booking Intelligence",
      kind: "booking",
      description:
        "Waitlist notes, reservation context, allergy checks, celebrations, hotel linkage, and message drafts.",
    },
  },
  {
    id: "guest",
    type: "hospitality",
    position: { x: 310, y: 372 },
    data: {
      eyebrow: "Care",
      label: "Guest Conversation",
      kind: "guest",
      description:
        "Helpful replies, follow-up language, and tone guidance without pretending AI is the host.",
    },
  },
  {
    id: "service",
    type: "hospitality",
    position: { x: 620, y: 212 },
    data: {
      eyebrow: "Room",
      label: "Service Briefing",
      kind: "service",
      description:
        "Daily run-of-show, table notes, menu stories, local products, known risks, and owner priorities.",
    },
  },
  {
    id: "hotel",
    type: "hospitality",
    position: { x: 930, y: 52 },
    data: {
      eyebrow: "Stay",
      label: "Hotel Görtler Loop",
      kind: "hotel",
      description:
        "Restaurant guests, rooms, arrangements, breakfast, local suggestions, and second dining path stay connected.",
    },
  },
  {
    id: "team",
    type: "hospitality",
    position: { x: 930, y: 372 },
    data: {
      eyebrow: "People",
      label: "Team Enablement",
      kind: "team",
      description:
        "Training notes, debriefs, review learnings, new staff onboarding, and calmer shift preparation.",
    },
  },
  {
    id: "memory",
    type: "hospitality",
    position: { x: 1240, y: 52 },
    data: {
      eyebrow: "Private",
      label: "House Memory",
      kind: "memory",
      description:
        "Producer knowledge, service standards, repeat guest preferences, and owner decisions in a private workspace.",
    },
  },
  {
    id: "content",
    type: "hospitality",
    position: { x: 1240, y: 372 },
    data: {
      eyebrow: "Public",
      label: "Approved Stories",
      kind: "content",
      description:
        "Only approved, non-private patterns become website copy, newsletters, posts, and workshop examples.",
    },
  },
  {
    id: "trust",
    type: "hospitality",
    position: { x: 1550, y: 212 },
    data: {
      eyebrow: "Rule",
      label: "Human Trust Gate",
      kind: "trust",
      description:
        "AI can draft, search, summarize, and prepare. Humans approve commitments, guest decisions, and publication.",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "attention", target: "booking" },
  { id: "e2", source: "attention", target: "guest" },
  { id: "e3", source: "booking", target: "service" },
  { id: "e4", source: "guest", target: "service" },
  { id: "e5", source: "service", target: "hotel" },
  { id: "e6", source: "service", target: "team" },
  { id: "e7", source: "hotel", target: "memory" },
  { id: "e8", source: "team", target: "content" },
  { id: "e9", source: "memory", target: "trust" },
  { id: "e10", source: "content", target: "trust" },
  { id: "e11", source: "trust", target: "booking" },
];

export default function HarzfensterHospitalityMap() {
  const styledEdges = useMemo(
    () =>
      initialEdges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#d7b27a" },
        style: { stroke: "#d7b27a", strokeWidth: 1.8, opacity: 0.72 },
      })),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);

  return (
    <div className="relative min-h-[590px] overflow-hidden rounded-[2.6rem] border border-white/12 bg-[#080b09]/76 shadow-[0_34px_140px_rgba(0,0,0,0.48)] backdrop-blur-2xl md:h-[720px] md:min-h-0">
      <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/58">
          Hospitality Intelligence Loop
        </span>
        <span className="rounded-full bg-[#d7b27a]/12 px-3 py-1 text-xs font-bold text-[#f4dfb5]">
          Human approved
        </span>
      </div>

      <div
        data-hospitality-mobile-flow="true"
        className="grid gap-3 px-4 pb-5 pt-20 md:hidden"
      >
        {mobileFlow.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/25">
                  <Icon className={`h-5 w-5 ${step.tone}`} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#d7b27a]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-sm font-black leading-5 text-white">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/62">
                    {step.detail}
                  </p>
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
          fitViewOptions={{ padding: 0.06 }}
          minZoom={0.54}
          maxZoom={1.04}
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
