// Technical Specifications Component
'use client';

import { useState } from 'react';

type TabId = 'infrastructure' | 'database' | 'aiml' | 'security';

export function TechnicalSpecs() {
  const [activeTab, setActiveTab] = useState<TabId>('infrastructure');

  const tabs = [
    { id: 'infrastructure' as TabId, label: 'Infrastructure', icon: '🏗️' },
    { id: 'database' as TabId, label: 'Database', icon: '💾' },
    { id: 'aiml' as TabId, label: 'AI & ML', icon: '🤖' },
    { id: 'security' as TabId, label: 'Security', icon: '🔒' },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-4 border-red-600 text-red-600 bg-red-50'
                    : 'border-b-4 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'infrastructure' && <InfrastructureTab />}
          {activeTab === 'database' && <DatabaseTab />}
          {activeTab === 'aiml' && <AIMLTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}

function InfrastructureTab() {
  const specs = [
    {
      category: 'OKE Kubernetes Cluster',
      items: [
        { name: 'General Nodes', spec: '20 nodes (auto-scale to 50)', details: 'VM.Standard.E4.Flex (8 OCPU, 64GB RAM)' },
        { name: 'GPU Nodes (Rendering)', spec: '10× VM.GPU.A10.1', details: '1× NVIDIA A10 (24GB VRAM), 15 OCPU, 240GB RAM' },
        { name: 'AI Cluster Nodes', spec: '8× VM.GPU.A10.2', details: '2× NVIDIA A10 (48GB VRAM), 30 OCPU, 480GB RAM' },
        { name: 'Kubernetes Version', spec: 'v1.28+', details: 'OKE managed control plane, auto-upgrade enabled' },
      ],
    },
    {
      category: 'Networking',
      items: [
        { name: 'Load Balancer', spec: 'Flexible, 8000 Mbps', details: 'SSL termination, health checks, session persistence' },
        { name: 'VCN', spec: '10.0.0.0/16', details: 'Public (10.0.0.0/24), Private (10.0.1.0/24), Database (10.0.2.0/24)' },
        { name: 'FastConnect', spec: '10 Gbps', details: 'Dedicated connection to on-premises (optional)' },
        { name: 'CDN', spec: 'Akamai, 500TB/mo', details: 'Global edge caching, DDoS protection, WAF' },
      ],
    },
    {
      category: 'Storage',
      items: [
        { name: 'Object Storage', spec: '700TB', details: 'Standard tier, 99.999999999% durability, versioning enabled' },
        { name: 'Block Volume', spec: '50TB', details: 'High Performance (100 VPU/GB), automatic backups' },
        { name: 'File Storage', spec: '10TB', details: 'NFS v3/v4, concurrent access, snapshots' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {specs.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Performance Benchmarks */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Benchmarks</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">100K</div>
            <div className="text-sm text-gray-600">Concurrent Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">&lt;100ms</div>
            <div className="text-sm text-gray-600">API Response Time (p95)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">99.99%</div>
            <div className="text-sm text-gray-600">Uptime SLA</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DatabaseTab() {
  const specs = [
    {
      category: 'Autonomous Database (ATP)',
      items: [
        { name: 'OCPU', spec: '16 (auto-scale 8-32)', details: 'Elastic scaling based on workload' },
        { name: 'Storage', spec: '20TB', details: 'Auto-expandable, encrypted at rest' },
        { name: 'Backup', spec: 'Automatic daily', details: '60-day retention, point-in-time recovery' },
        { name: 'High Availability', spec: 'Active Data Guard', details: 'Multi-AZ deployment, automatic failover' },
      ],
    },
    {
      category: 'Autonomous Data Warehouse (ADW)',
      items: [
        { name: 'OCPU', spec: '8', details: 'Analytics workloads, OLAP queries' },
        { name: 'Storage', spec: '10TB', details: 'Columnar format, compression enabled' },
        { name: 'Performance', spec: 'In-Memory', details: 'Auto-indexing, query optimization' },
      ],
    },
    {
      category: 'MySQL HeatWave',
      items: [
        { name: 'Nodes', spec: '4× HeatWave nodes', details: '16 OCPU, 512GB RAM each' },
        { name: 'Analytics', spec: '1000× faster', details: 'Real-time analytics on operational data' },
        { name: 'Storage', spec: '5TB', details: 'InnoDB, row-based storage' },
      ],
    },
    {
      category: 'Redis Cache',
      items: [
        { name: 'Nodes', spec: '3× Redis instances', details: 'High availability cluster mode' },
        { name: 'Memory', spec: '96GB total', details: '32GB per node, persistence enabled' },
        { name: 'Use Cases', spec: 'Session store, cache', details: 'Sub-millisecond latency' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {specs.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Database Schema Snippet */}
      <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-gray-400 mb-2">-- Sample schema excerpt (30+ tables total)</div>
        <pre>{`CREATE TABLE users (
  user_id VARCHAR2(50) PRIMARY KEY,
  username VARCHAR2(100) UNIQUE NOT NULL,
  email VARCHAR2(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avatars (
  avatar_id VARCHAR2(50) PRIMARY KEY,
  user_id VARCHAR2(50) UNIQUE NOT NULL,
  position SDO_GEOMETRY,  -- 3D coordinates (X, Y, Z)
  equipped_items JSON,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Spatial index for 3D proximity queries
CREATE INDEX avatar_spatial_idx ON avatars(position)
  INDEXTYPE IS MDSYS.SPATIAL_INDEX;`}</pre>
      </div>
    </div>
  );
}

function AIMLTab() {
  const specs = [
    {
      category: 'OCI Generative AI (Managed)',
      items: [
        { name: 'Cohere Command-R+', spec: 'On-demand', details: 'Advanced reasoning, RAG, multi-turn conversations' },
        { name: 'Meta Llama 3 70B', spec: 'On-demand', details: 'General purpose, high performance' },
        { name: 'Custom Fine-Tuned', spec: 'Dedicated endpoint', details: 'Domain-specific models trained on customer data' },
        { name: 'API Calls', spec: '1M calls/month', details: '$0.003 per 1K tokens (estimated)' },
      ],
    },
    {
      category: 'Dedicated AI Cluster (Self-Hosted)',
      items: [
        { name: 'GPU Instances', spec: '8× VM.GPU.A10.2', details: '16× NVIDIA A10 GPUs (384GB VRAM total)' },
        { name: 'Llama 3.1 70B', spec: '20 tokens/sec', details: 'vLLM inference, FP16 precision' },
        { name: 'Qwen 2.5 72B', spec: '18 tokens/sec', details: 'Multilingual support (English, Chinese, etc.)' },
        { name: 'Mistral Large 2', spec: '12 tokens/sec', details: 'Code generation, function calling' },
        { name: 'Cost', spec: '$9,344/month', details: 'Break-even at 300K tokens/day vs managed' },
      ],
    },
    {
      category: 'Oracle ADK Multi-Agent System',
      items: [
        { name: 'Music Curator', spec: 'Claude Sonnet 4.5', details: 'Playlists, music discovery, recommendations' },
        { name: 'Auction Assistant', spec: 'Cohere Command-R', details: 'Valuations, bid strategies, competition analysis' },
        { name: 'Customer Support', spec: 'Meta Llama 3', details: 'Order help, refunds, technical troubleshooting' },
        { name: 'Metaverse Guide', spec: 'GPT-4o', details: 'World navigation, event recommendations' },
        { name: 'Content Moderator', spec: 'Claude Haiku 4', details: 'Automated content review (text, images, audio)' },
        { name: 'Creator Assistant', spec: 'Claude Sonnet 4.5', details: 'Music generation prompts, monetization advice' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {specs.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* vLLM Code Example */}
      <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-gray-400 mb-2"># Deploy Llama 3.1 70B on Dedicated AI Cluster</div>
        <pre>{`# Start vLLM server on GPU instance
python -m vllm.entrypoints.openai.api_server \\
  --model meta-llama/Llama-3.1-70B-Instruct \\
  --tensor-parallel-size 2 \\
  --dtype float16 \\
  --max-model-len 8192 \\
  --port 8000

# Use with Oracle ADK
from oci_adk import Agent

agent = Agent(
    name="self_hosted_agent",
    model="openai/llama-3.1-70b",
    base_url="http://ai-cluster-lb.internal:8000/v1",
    api_key="not-needed-for-vllm"
)

response = agent.execute("Generate personalized playlist for jazz fans")`}</pre>
      </div>
    </div>
  );
}

function SecurityTab() {
  const specs = [
    {
      category: 'Identity & Access Management',
      items: [
        { name: 'IAM', spec: 'OCI Identity', details: 'Groups, dynamic groups, policy-based access control' },
        { name: 'MFA', spec: 'Enabled for all users', details: 'TOTP, FIDO2 hardware keys supported' },
        { name: 'Federation', spec: 'SAML 2.0, OIDC', details: 'SSO with Active Directory, Okta, Azure AD' },
        { name: 'API Keys', spec: 'Rotate every 90 days', details: 'Stored in OCI Vault, encrypted' },
      ],
    },
    {
      category: 'Network Security',
      items: [
        { name: 'WAF', spec: 'OCI WAF', details: 'OWASP Top 10 protection, custom rules' },
        { name: 'DDoS Protection', spec: 'Akamai + OCI', details: 'Always-on, automatic mitigation' },
        { name: 'NSG', spec: '10+ groups', details: 'Micro-segmentation (web, app, db, AI tiers)' },
        { name: 'VCN Flow Logs', spec: 'Enabled', details: 'All network traffic logged for forensics' },
        { name: 'Bastion Service', spec: 'Managed SSH access', details: 'No public jump hosts, session recording' },
      ],
    },
    {
      category: 'Data Protection',
      items: [
        { name: 'Encryption at Rest', spec: 'AES-256', details: 'All storage services (Object, Block, Database)' },
        { name: 'Encryption in Transit', spec: 'TLS 1.3', details: 'All API and database connections' },
        { name: 'Customer-Managed Keys', spec: 'OCI Vault (HSM)', details: 'FIPS 140-2 Level 3 certified' },
        { name: 'Backup Encryption', spec: 'AES-256', details: 'Cross-region encrypted backups' },
      ],
    },
    {
      category: 'Compliance',
      items: [
        { name: 'GDPR', spec: 'Compliant', details: 'Data residency, right to erasure, consent management' },
        { name: 'HIPAA', spec: 'BAA available', details: 'PHI encryption, audit logs, access controls' },
        { name: 'SOC 2 Type II', spec: 'Certified', details: 'Annual audits, security + availability' },
        { name: 'PCI DSS', spec: 'Level 1', details: 'Payment data tokenization, secure card storage' },
        { name: 'ISO 27001', spec: 'Certified', details: 'Information security management system' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {specs.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Implementation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.spec}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Security Highlights */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Security Highlights</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { metric: 'Zero Trust Architecture', value: '✓', desc: 'Least privilege, continuous verification' },
            { metric: 'Automated Patching', value: '✓', desc: 'Autonomous Database, OKE control plane' },
            { metric: 'Security Monitoring', value: '24/7', desc: 'OCI Cloud Guard, Security Advisor' },
            { metric: 'Incident Response', value: '<15min', desc: 'Automated runbooks, on-call rotation' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{item.metric}</span>
                <span className="text-2xl font-bold text-red-600">{item.value}</span>
              </div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
