// Oracle Architecture Overview Component
'use client';

import { useState } from 'react';

export function ArchitectureOverview() {
  const [activeLayer, setActiveLayer] = useState<string>('all');

  const layers = [
    { id: 'frontend', name: 'Frontend', color: 'bg-blue-500', services: ['Next.js 15', 'React 19', 'Unity WebGL'] },
    { id: 'api', name: 'API Gateway', color: 'bg-green-500', services: ['OCI API Gateway', 'Load Balancer', 'WAF'] },
    { id: 'compute', name: 'Compute', color: 'bg-purple-500', services: ['OKE (20 nodes)', 'GPU (10 nodes)', 'AI Cluster (8 nodes)'] },
    { id: 'data', name: 'Data & Storage', color: 'bg-orange-500', services: ['ATP (16 OCPU)', 'ADW (8 OCPU)', 'Object Storage (700TB)'] },
    { id: 'ai', name: 'AI & ML', color: 'bg-pink-500', services: ['OCI GenAI', 'Dedicated AI Cluster', 'Oracle ADK'] },
  ];

  return (
    <div className="space-y-8">
      {/* Layer Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveLayer('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeLayer === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          All Layers
        </button>
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeLayer === layer.id
                ? `${layer.color} text-white`
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {layer.name}
          </button>
        ))}
      </div>

      {/* Architecture Diagram (SVG) */}
      <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Users */}
          <g opacity={activeLayer === 'all' || activeLayer === 'frontend' ? 1 : 0.3}>
            <rect x="400" y="20" width="400" height="60" fill="#3B82F6" rx="8" />
            <text x="600" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              Users (Global)
            </text>
          </g>

          {/* CDN */}
          <g opacity={activeLayer === 'all' || activeLayer === 'frontend' ? 1 : 0.3}>
            <rect x="400" y="120" width="400" height="60" fill="#10B981" rx="8" />
            <text x="600" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              Akamai CDN (500TB/mo)
            </text>
          </g>

          {/* Load Balancer + WAF */}
          <g opacity={activeLayer === 'all' || activeLayer === 'api' ? 1 : 0.3}>
            <rect x="200" y="220" width="250" height="60" fill="#059669" rx="8" />
            <text x="325" y="255" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              Load Balancer + WAF
            </text>

            <rect x="550" y="220" width="250" height="60" fill="#059669" rx="8" />
            <text x="675" y="255" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              API Gateway
            </text>
          </g>

          {/* OKE Cluster */}
          <g opacity={activeLayer === 'all' || activeLayer === 'compute' ? 1 : 0.3}>
            <rect x="50" y="320" width="1100" height="180" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2" rx="8" />
            <text x="600" y="345" textAnchor="middle" fill="#8B5CF6" fontSize="18" fontWeight="bold">
              OKE Kubernetes Cluster
            </text>

            {/* General Nodes */}
            <rect x="80" y="360" width="200" height="120" fill="#A78BFA" rx="6" />
            <text x="180" y="390" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              General Nodes
            </text>
            <text x="180" y="415" textAnchor="middle" fill="white" fontSize="12">
              20 nodes (auto-scale 50)
            </text>
            <text x="180" y="435" textAnchor="middle" fill="white" fontSize="12">
              Web, API, Music, Auction
            </text>

            {/* GPU Nodes */}
            <rect x="320" y="360" width="200" height="120" fill="#A78BFA" rx="6" />
            <text x="420" y="390" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              GPU Nodes
            </text>
            <text x="420" y="415" textAnchor="middle" fill="white" fontSize="12">
              10× VM.GPU.A10.1
            </text>
            <text x="420" y="435" textAnchor="middle" fill="white" fontSize="12">
              3D Rendering
            </text>

            {/* AI Cluster */}
            <rect x="560" y="360" width="200" height="120" fill="#A78BFA" rx="6" />
            <text x="660" y="390" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              AI Cluster
            </text>
            <text x="660" y="415" textAnchor="middle" fill="white" fontSize="12">
              8× VM.GPU.A10.2
            </text>
            <text x="660" y="435" textAnchor="middle" fill="white" fontSize="12">
              vLLM (Llama, Qwen)
            </text>

            {/* Monitoring */}
            <rect x="800" y="360" width="200" height="120" fill="#A78BFA" rx="6" />
            <text x="900" y="390" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Monitoring
            </text>
            <text x="900" y="415" textAnchor="middle" fill="white" fontSize="12">
              Prometheus + Grafana
            </text>
            <text x="900" y="435" textAnchor="middle" fill="white" fontSize="12">
              OCI APM
            </text>
          </g>

          {/* Data Layer */}
          <g opacity={activeLayer === 'all' || activeLayer === 'data' ? 1 : 0.3}>
            <rect x="50" y="540" width="350" height="220" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="2" rx="8" />
            <text x="225" y="565" textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="bold">
              Database Layer
            </text>

            <rect x="80" y="580" width="290" height="60" fill="#FBBF24" rx="6" />
            <text x="225" y="615" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Autonomous Database (ATP)
            </text>
            <text x="225" y="635" textAnchor="middle" fill="white" fontSize="12">
              16 OCPU (auto-scale 8-32)
            </text>

            <rect x="80" y="660" width="140" height="80" fill="#FBBF24" rx="6" />
            <text x="150" y="690" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              ADW
            </text>
            <text x="150" y="710" textAnchor="middle" fill="white" fontSize="11">
              Analytics
            </text>
            <text x="150" y="730" textAnchor="middle" fill="white" fontSize="11">
              8 OCPU
            </text>

            <rect x="230" y="660" width="140" height="80" fill="#FBBF24" rx="6" />
            <text x="300" y="690" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Redis
            </text>
            <text x="300" y="710" textAnchor="middle" fill="white" fontSize="11">
              Cache
            </text>
            <text x="300" y="730" textAnchor="middle" fill="white" fontSize="11">
              Session Store
            </text>
          </g>

          {/* Storage Layer */}
          <g opacity={activeLayer === 'all' || activeLayer === 'data' ? 1 : 0.3}>
            <rect x="450" y="540" width="350" height="220" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="2" rx="8" />
            <text x="625" y="565" textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="bold">
              Storage Layer
            </text>

            <rect x="480" y="580" width="290" height="60" fill="#FBBF24" rx="6" />
            <text x="625" y="615" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Object Storage
            </text>
            <text x="625" y="635" textAnchor="middle" fill="white" fontSize="12">
              700TB (Music, 3D Assets, Media)
            </text>

            <rect x="480" y="660" width="140" height="80" fill="#FBBF24" rx="6" />
            <text x="550" y="690" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Block Volume
            </text>
            <text x="550" y="710" textAnchor="middle" fill="white" fontSize="11">
              50TB
            </text>
            <text x="550" y="730" textAnchor="middle" fill="white" fontSize="11">
              High Perf
            </text>

            <rect x="630" y="660" width="140" height="80" fill="#FBBF24" rx="6" />
            <text x="700" y="690" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Streaming
            </text>
            <text x="700" y="710" textAnchor="middle" fill="white" fontSize="11">
              Kafka
            </text>
            <text x="700" y="730" textAnchor="middle" fill="white" fontSize="11">
              50 partitions
            </text>
          </g>

          {/* AI Layer */}
          <g opacity={activeLayer === 'all' || activeLayer === 'ai' ? 1 : 0.3}>
            <rect x="850" y="540" width="300" height="220" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="2" rx="8" />
            <text x="1000" y="565" textAnchor="middle" fill="#EC4899" fontSize="16" fontWeight="bold">
              AI & ML Layer
            </text>

            <rect x="880" y="580" width="240" height="60" fill="#F472B6" rx="6" />
            <text x="1000" y="615" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              OCI Generative AI
            </text>
            <text x="1000" y="635" textAnchor="middle" fill="white" fontSize="12">
              Cohere, Llama (Managed)
            </text>

            <rect x="880" y="660" width="240" height="80" fill="#F472B6" rx="6" />
            <text x="1000" y="690" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Oracle ADK
            </text>
            <text x="1000" y="710" textAnchor="middle" fill="white" fontSize="11">
              Multi-Agent System
            </text>
            <text x="1000" y="730" textAnchor="middle" fill="white" fontSize="11">
              6 Specialized Agents
            </text>
          </g>

          {/* Connection Lines */}
          <line x1="600" y1="80" x2="600" y2="120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="600" y1="180" x2="325" y2="220" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="600" y1="180" x2="675" y2="220" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="500" y1="280" x2="500" y2="320" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="500" y1="500" x2="225" y2="540" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="500" y1="500" x2="625" y2="540" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="660" y1="480" x2="1000" y2="540" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#666" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Service Details Cards */}
      {activeLayer !== 'all' && (
        <div className="grid md:grid-cols-3 gap-6">
          {layers
            .find((l) => l.id === activeLayer)
            ?.services.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">{service}</h4>
                <div className="text-sm text-gray-600">
                  Production-ready configuration with auto-scaling and high availability.
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
