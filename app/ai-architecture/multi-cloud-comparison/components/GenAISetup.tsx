// GenAI Architecture Component
'use client';

export function GenAISetup() {
  return (
    <div className="space-y-8">
      {/* Strategy Overview */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">OCI Generative AI (Managed)</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Fully managed AI service with pre-configured models from Cohere and Meta
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Cohere Command-R+:</span>
                <span className="text-sm text-gray-600 ml-2">Advanced reasoning, multi-turn conversations</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Meta Llama 3 70B:</span>
                <span className="text-sm text-gray-600 ml-2">General purpose, high performance</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Custom Fine-Tuned:</span>
                <span className="text-sm text-gray-600 ml-2">Domain-specific models</span>
              </div>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-purple-900">Cost (1M API calls):</span>
              <span className="text-lg font-bold text-purple-600">~$3,000/mo</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Dedicated AI Cluster (Self-Hosted)</h3>
          </div>
          <p className="text-gray-600 mb-4">
            8× GPU instances running open-source models with vLLM for 70% cost savings
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Llama 3.1 70B:</span>
                <span className="text-sm text-gray-600 ml-2">20 tok/s throughput</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Qwen 2.5 72B:</span>
                <span className="text-sm text-gray-600 ml-2">Multilingual (18 tok/s)</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <div>
                <span className="font-medium text-gray-900">Mistral Large 2:</span>
                <span className="text-sm text-gray-600 ml-2">Coding tasks (12 tok/s)</span>
              </div>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-900">Infrastructure Cost:</span>
              <span className="text-lg font-bold text-blue-600">$9,344/mo</span>
            </div>
            <div className="text-xs text-blue-600 mt-1">Break-even at 300K tokens/day</div>
          </div>
        </div>
      </div>

      {/* AI Agents */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Multi-Agent System (Oracle ADK)</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Music Curator', model: 'Claude Sonnet 4.5', use: 'Personalized playlists, music discovery' },
            { name: 'Auction Assistant', model: 'Cohere Command-R', use: 'Bid strategies, valuations' },
            { name: 'Customer Support', model: 'Meta Llama 3', use: 'Order help, refunds, technical issues' },
            { name: 'Metaverse Guide', model: 'GPT-4o', use: 'World navigation, event recommendations' },
            { name: 'Content Moderator', model: 'Claude Haiku 4', use: 'Automated content review' },
            { name: 'Creator Assistant', model: 'Claude Sonnet 4.5', use: 'Music generation, monetization' },
          ].map((agent, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">{agent.name}</h4>
              <div className="text-xs text-gray-500 mb-2">Model: {agent.model}</div>
              <div className="text-sm text-gray-600">{agent.use}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Tools */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Developer Tools Integration</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Oracle Code Assistant',
              logo: '/logos/oracle.svg',
              desc: 'VS Code, IntelliJ IDEA',
              supported: true,
            },
            {
              name: 'Continue.dev',
              logo: '/logos/continue.svg',
              desc: 'Open source, custom backends',
              supported: true,
            },
            {
              name: 'Cursor',
              logo: '/logos/cursor.svg',
              desc: 'Custom endpoint integration',
              supported: true,
            },
            {
              name: 'Cline',
              logo: '/logos/claude.svg',
              desc: 'Claude + OCI models',
              supported: true,
            },
          ].map((tool, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {tool.name.charAt(0)}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
              <p className="text-xs text-gray-500">{tool.desc}</p>
              {tool.supported && (
                <span className="inline-block mt-2 text-xs text-green-600 font-medium">
                  ✓ Supported
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
