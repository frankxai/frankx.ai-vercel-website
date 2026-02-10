// Video Gallery Component
'use client';

import { useState } from 'react';

type Video = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
};

type Category = 'all' | 'getting-started' | 'architecture' | 'use-cases' | 'demos';

export function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: '1',
      title: 'OCI Generative AI - Getting Started',
      description: 'Learn how to get started with Oracle Cloud Infrastructure Generative AI Service using Cohere and Meta Llama models.',
      category: 'getting-started',
      thumbnail: '/thumbnails/oci-genai-intro.jpg',
      youtubeId: 'KuT6DksQpKc', // Oracle Cloud Infrastructure - Technical Deep Dive
      duration: '8:45',
    },
    {
      id: '2',
      title: 'Autonomous Database Deep Dive',
      description: 'Explore Oracle Autonomous Database features including auto-scaling, self-patching, and automatic performance tuning.',
      category: 'getting-started',
      thumbnail: '/thumbnails/adb-deep-dive.jpg',
      youtubeId: 'djcBOv3hqss',
      duration: '12:30',
    },
    {
      id: '3',
      title: 'Kubernetes on OCI - Best Practices',
      description: 'Deploy and manage production Kubernetes workloads on OCI Container Engine with auto-scaling and security best practices.',
      category: 'architecture',
      thumbnail: '/thumbnails/oke-best-practices.jpg',
      youtubeId: 'X48VuDVv0do',
      duration: '15:20',
    },
    {
      id: '4',
      title: 'Customer Churn Prediction with Oracle AI',
      description: 'Build ML models for customer churn prediction using OCI Data Science and Oracle AI Data Platform (AIDP).',
      category: 'use-cases',
      thumbnail: '/thumbnails/churn-prediction.jpg',
      youtubeId: 'zjkBMFhNj_g',
      duration: '10:15',
    },
    {
      id: '5',
      title: 'Multi-Region Architecture on OCI',
      description: 'Design highly available applications across multiple OCI regions with cross-region replication and disaster recovery.',
      category: 'architecture',
      thumbnail: '/thumbnails/multi-region.jpg',
      youtubeId: 's_o8dwzRlu4',
      duration: '18:40',
    },
    {
      id: '6',
      title: 'Building a Metaverse Platform on OCI',
      description: 'Demo of a metaverse music platform built on OCI with Unity, spatial audio, and real-time multiplayer features.',
      category: 'demos',
      thumbnail: '/thumbnails/metaverse-demo.jpg',
      youtubeId: 'd6WC5n9G_sM',
      duration: '22:15',
    },
    {
      id: '7',
      title: 'Oracle ADK - Multi-Agent Orchestration',
      description: 'Learn how to build and deploy multi-agent systems using Oracle Agent Development Kit with code examples.',
      category: 'getting-started',
      thumbnail: '/thumbnails/oracle-adk.jpg',
      youtubeId: '5V6c4oPCsvU',
      duration: '14:50',
    },
    {
      id: '8',
      title: 'Dedicated AI Cluster with vLLM',
      description: 'Set up a dedicated GPU cluster for self-hosted LLMs (Llama, Qwen, Mistral) using vLLM on OCI.',
      category: 'demos',
      thumbnail: '/thumbnails/vllm-cluster.jpg',
      youtubeId: 'bhBSlnQcq2k',
      duration: '16:30',
    },
    {
      id: '9',
      title: 'Real-Time Analytics with MySQL HeatWave',
      description: 'Perform real-time analytics on operational data using MySQL HeatWave - up to 1000× faster than traditional MySQL.',
      category: 'use-cases',
      thumbnail: '/thumbnails/heatwave-analytics.jpg',
      youtubeId: 'xqS5PDYbTsE',
      duration: '11:20',
    },
  ];

  const categories = [
    { id: 'all' as Category, label: 'All Videos', count: videos.length },
    { id: 'getting-started' as Category, label: 'Getting Started', count: videos.filter(v => v.category === 'getting-started').length },
    { id: 'architecture' as Category, label: 'Architecture', count: videos.filter(v => v.category === 'architecture').length },
    { id: 'use-cases' as Category, label: 'Use Cases', count: videos.filter(v => v.category === 'use-cases').length },
    { id: 'demos' as Category, label: 'Demos', count: videos.filter(v => v.category === 'demos').length },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Explore Oracle Cloud Videos</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              {/* Placeholder - Replace with actual thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-90"></div>
              <div className="relative z-10 text-white">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-red-600 uppercase">{video.category.replace('-', ' ')}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVideo(video);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Watch Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Description */}
            <div className="p-6 bg-gray-50">
              <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedVideo.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {selectedVideo.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Additional Learning Resources</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">📚</div>
            <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive guides, API references, and tutorials for all OCI services.
            </p>
            <a
              href="https://docs.oracle.com/en-us/iaas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Docs →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">🎓</div>
            <h4 className="font-semibold text-gray-900 mb-2">Training & Certification</h4>
            <p className="text-sm text-gray-600 mb-4">
              Free courses and certification programs to become an OCI expert.
            </p>
            <a
              href="https://education.oracle.com/oracle-cloud-infrastructure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Explore Training →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-900 mb-2">Community & Support</h4>
            <p className="text-sm text-gray-600 mb-4">
              Join Oracle Cloud Community forums and get help from experts.
            </p>
            <a
              href="https://community.oracle.com/customerconnect/categories/oci"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Join Community →
            </a>
          </div>
        </div>
      </div>

      {/* Search Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">Video Search Tips</h4>
            <p className="text-sm text-yellow-800">
              To find specific Oracle Cloud videos on YouTube, search for:
              <span className="font-mono ml-1">"OCI [service name] tutorial"</span>,
              <span className="font-mono ml-1">"Oracle Cloud [topic]"</span>, or
              <span className="font-mono ml-1">"OCI [use case] demo"</span>. Official Oracle channel:
              <a
                href="https://www.youtube.com/@OracleCloud"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                @OracleCloud
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
