// Implementation Roadmap Component
'use client';

import { useState } from 'react';

type Phase = {
  id: number;
  name: string;
  duration: string;
  color: string;
  milestones: string[];
  deliverables: string[];
  team: string[];
};

export function ImplementationRoadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const phases: Phase[] = [
    {
      id: 1,
      name: 'Foundation & Planning',
      duration: 'Weeks 1-2',
      color: 'blue',
      milestones: [
        'Project kickoff and team assembly',
        'Requirements finalization',
        'Architecture review and approval',
        'OCI account setup and IAM configuration',
      ],
      deliverables: [
        'Project charter and timeline',
        'Technical architecture document',
        'Security and compliance checklist',
        'Development environment provisioned',
      ],
      team: ['Project Manager', 'Cloud Architect', 'Security Engineer'],
    },
    {
      id: 2,
      name: 'Infrastructure Provisioning',
      duration: 'Weeks 3-4',
      color: 'purple',
      milestones: [
        'VCN and networking setup',
        'OKE cluster deployment (general + GPU nodes)',
        'Autonomous Database provisioned',
        'Object Storage and CDN configured',
      ],
      deliverables: [
        'Terraform infrastructure code',
        'Kubernetes cluster (20 nodes)',
        'Autonomous Database (ATP + ADW)',
        'CI/CD pipeline (GitHub Actions)',
      ],
      team: ['DevOps Engineer', 'Cloud Architect', 'Database Administrator'],
    },
    {
      id: 3,
      name: 'AI & Data Services',
      duration: 'Weeks 5-6',
      color: 'pink',
      milestones: [
        'Dedicated AI Cluster setup (8× GPU instances)',
        'vLLM deployment (Llama, Qwen, Mistral)',
        'Oracle ADK agent development',
        'OCI Generative AI integration',
      ],
      deliverables: [
        'Self-hosted LLM inference cluster',
        '6 specialized Oracle ADK agents',
        'AI agent orchestration workflows',
        'MCP server integration (OCI resources)',
      ],
      team: ['ML Engineer', 'AI Specialist', 'Backend Developer'],
    },
    {
      id: 4,
      name: 'Application Development',
      duration: 'Weeks 7-9',
      color: 'green',
      milestones: [
        'Music platform microservices',
        'Metaverse backend (Unity/Unreal integration)',
        'Ecommerce and auction services',
        'Frontend (Next.js 15 + React 19)',
      ],
      deliverables: [
        'Music API (streaming, playlists, discovery)',
        'Metaverse world server (3D, spatial audio)',
        'Auction bidding engine (real-time WebSocket)',
        'Responsive web application',
      ],
      team: ['Full-Stack Developer', 'Game Developer', 'Frontend Engineer'],
    },
    {
      id: 5,
      name: 'Monitoring & Security',
      duration: 'Week 10',
      color: 'orange',
      milestones: [
        'OCI Monitoring and APM setup',
        'Logging and alerting configuration',
        'WAF and DDoS protection enabled',
        'Security audit and penetration testing',
      ],
      deliverables: [
        'Grafana dashboards (infrastructure + application)',
        'Centralized logging (OCI Logging Analytics)',
        'Security hardening checklist completed',
        'Penetration test report with remediation',
      ],
      team: ['DevOps Engineer', 'Security Engineer', 'SRE'],
    },
    {
      id: 6,
      name: 'Testing & Launch',
      duration: 'Weeks 11-12',
      color: 'red',
      milestones: [
        'Load testing (100K concurrent users)',
        'UAT and stakeholder sign-off',
        'Production deployment',
        'Post-launch monitoring and optimization',
      ],
      deliverables: [
        'Load test results (pass 100K users)',
        'Go-live checklist and runbook',
        'Production environment live',
        'Week 1 post-launch report',
      ],
      team: ['QA Engineer', 'Project Manager', 'DevOps Engineer', 'All Teams'],
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-500',
    },
    purple: {
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-500',
    },
    pink: {
      bg: 'bg-pink-500',
      light: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'border-pink-500',
    },
    green: {
      bg: 'bg-green-500',
      light: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-500',
    },
    orange: {
      bg: 'bg-orange-500',
      light: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-500',
    },
    red: {
      bg: 'bg-red-500',
      light: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-500',
    },
  };

  return (
    <div className="space-y-8">
      {/* Timeline Overview */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">12-Week Implementation Timeline</h3>

        {/* Timeline Bar */}
        <div className="relative mb-12">
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200"></div>
          <div className="relative flex justify-between">
            {phases.map((phase, idx) => (
              <div key={phase.id} className="flex flex-col items-center" style={{ width: '16.66%' }}>
                <div
                  className={`w-12 h-12 rounded-full ${colorClasses[phase.color as keyof typeof colorClasses].bg} flex items-center justify-center text-white font-bold shadow-lg z-10 cursor-pointer hover:scale-110 transition-transform`}
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                >
                  {phase.id}
                </div>
                <div className="text-xs font-medium text-gray-600 mt-2 text-center">{phase.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {phases.map((phase) => {
            const colors = colorClasses[phase.color as keyof typeof colorClasses];
            const isExpanded = expandedPhase === phase.id;

            return (
              <div
                key={phase.id}
                className={`border-2 ${colors.border} rounded-lg overflow-hidden transition-all ${
                  isExpanded ? 'shadow-lg' : 'shadow-sm'
                }`}
              >
                {/* Phase Header */}
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className={`w-full ${colors.light} p-6 flex items-center justify-between hover:bg-opacity-80 transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold`}>
                      {phase.id}
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-gray-900">{phase.name}</h4>
                      <p className="text-sm text-gray-600">{phase.duration}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 ${colors.text} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Phase Details (Expanded) */}
                {isExpanded && (
                  <div className="p-6 bg-white border-t-2 border-gray-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Milestones */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colors.bg}`}></span>
                          Key Milestones
                        </h5>
                        <ul className="space-y-2">
                          {phase.milestones.map((milestone, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className={`mt-1 ${colors.text}`}>✓</span>
                              <span className="text-sm text-gray-700">{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colors.bg}`}></span>
                          Deliverables
                        </h5>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className={`mt-1 ${colors.text}`}>📦</span>
                              <span className="text-sm text-gray-700">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h5 className="font-semibold text-gray-900 mb-3">Team Members</h5>
                      <div className="flex flex-wrap gap-2">
                        {phase.team.map((member, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 ${colors.light} ${colors.text} rounded-full text-xs font-medium`}
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Criteria */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Go-Live Success Criteria</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { metric: 'Performance', target: '<100ms API response (p95)', icon: '⚡' },
            { metric: 'Availability', target: '99.99% uptime SLA', icon: '🛡️' },
            { metric: 'Scale', target: '100K concurrent users', icon: '📈' },
            { metric: 'Security', target: 'Zero critical vulnerabilities', icon: '🔒' },
          ].map((criteria, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-2">{criteria.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{criteria.metric}</h4>
              <p className="text-sm text-gray-600">{criteria.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Team Resource Allocation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { role: 'Cloud Architects', count: 2, phases: 'All phases', commitment: 'Full-time' },
            { role: 'Backend Developers', count: 4, phases: 'Weeks 3-9', commitment: 'Full-time' },
            { role: 'Frontend Engineers', count: 2, phases: 'Weeks 7-12', commitment: 'Full-time' },
            { role: 'ML/AI Engineers', count: 2, phases: 'Weeks 5-8', commitment: 'Full-time' },
            { role: 'DevOps Engineers', count: 2, phases: 'All phases', commitment: 'Full-time' },
            { role: 'QA Engineers', count: 2, phases: 'Weeks 9-12', commitment: 'Full-time' },
            { role: 'Security Engineers', count: 1, phases: 'All phases', commitment: 'Part-time (50%)' },
            { role: 'Database Administrators', count: 1, phases: 'Weeks 3-6', commitment: 'Part-time (50%)' },
            { role: 'Project Manager', count: 1, phases: 'All phases', commitment: 'Full-time' },
          ].map((resource, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{resource.role}</h4>
                <span className="text-2xl font-bold text-blue-600">{resource.count}</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Duration: {resource.phases}</div>
                <div>Commitment: {resource.commitment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Risk Mitigation Strategies</h3>
        <div className="space-y-4">
          {[
            {
              risk: 'Scope Creep',
              mitigation: 'Fixed scope for MVP, change request process for new features',
              impact: 'High',
              probability: 'Medium',
            },
            {
              risk: 'AI Model Performance',
              mitigation: 'Benchmark testing before deployment, fallback to managed service',
              impact: 'Medium',
              probability: 'Low',
            },
            {
              risk: 'Security Vulnerabilities',
              mitigation: 'Continuous security scanning, penetration testing before go-live',
              impact: 'High',
              probability: 'Low',
            },
            {
              risk: 'Database Performance Bottlenecks',
              mitigation: 'Auto-scaling enabled, load testing at 150% target capacity',
              impact: 'Medium',
              probability: 'Medium',
            },
          ].map((item, idx) => (
            <div key={idx} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{item.risk}</h4>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Impact: {item.impact}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.probability === 'High' ? 'bg-red-100 text-red-700' :
                    item.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    Probability: {item.probability}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{item.mitigation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
