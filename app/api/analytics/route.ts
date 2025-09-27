import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsQuery {
  metric: string
  timeframe: '24h' | '7d' | '30d' | '90d' | '1y'
  agent_id?: string
  category?: string
  consciousness_level?: string
}

interface AnalyticsResponse {
  metric: string
  timeframe: string
  data: any[]
  summary: {
    total: number
    average: number
    trend: 'up' | 'down' | 'stable'
    change_percentage: number
  }
  consciousness_metrics: {
    transformation_score: number
    human_empowerment: number
    creative_enhancement: number
    wisdom_integration: number
  }
}

const MOCK_ANALYTICS_DATA = {
  consciousness_metrics: {
    '24h': {
      transformation_score: 8.7,
      human_empowerment: 9.2,
      creative_enhancement: 8.9,
      wisdom_integration: 7.8
    },
    '7d': {
      transformation_score: 8.5,
      human_empowerment: 9.0,
      creative_enhancement: 8.7,
      wisdom_integration: 7.9
    },
    '30d': {
      transformation_score: 8.3,
      human_empowerment: 8.8,
      creative_enhancement: 8.5,
      wisdom_integration: 7.7
    }
  },
  agent_performance: {
    'starlight-architect': {
      requests: [1847, 1923, 2134, 2287, 2456],
      success_rate: [94.2, 94.8, 95.1, 95.3, 95.7],
      consciousness_score: [8.9, 9.0, 9.1, 9.2, 9.1]
    },
    'creation-engine': {
      requests: [2341, 2456, 2578, 2634, 2789],
      success_rate: [96.8, 97.1, 97.3, 97.5, 97.2],
      consciousness_score: [9.1, 9.2, 9.3, 9.1, 9.2]
    },
    'frequency-alchemist': {
      requests: [892, 934, 978, 1023, 1087],
      success_rate: [98.1, 98.3, 98.5, 98.2, 98.7],
      consciousness_score: [9.4, 9.5, 9.3, 9.4, 9.6]
    },
    'luminor-oracle': {
      requests: [634, 678, 712, 756, 798],
      success_rate: [97.3, 97.6, 97.8, 97.5, 97.9],
      consciousness_score: [9.2, 9.3, 9.4, 9.2, 9.5]
    }
  },
  content_performance: {
    views: [24567, 26234, 28456, 30123, 32567],
    engagement: [87.3, 88.1, 89.2, 87.8, 90.1],
    transformation_scores: [8.9, 9.0, 8.8, 9.1, 9.2],
    shares: [1247, 1334, 1456, 1523, 1678]
  },
  user_journey: {
    discovery: [12847, 13234, 13567, 13892, 14123],
    exploration: [3006, 3145, 3234, 3356, 3478],
    integration: [1043, 1089, 1134, 1178, 1223],
    mastery: [586, 612, 634, 667, 689]
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query: AnalyticsQuery = {
      metric: searchParams.get('metric') || 'overview',
      timeframe: (searchParams.get('timeframe') as any) || '30d',
      agent_id: searchParams.get('agent_id') || undefined,
      category: searchParams.get('category') || undefined,
      consciousness_level: searchParams.get('consciousness_level') || undefined
    }

    const analyticsData = generateAnalyticsResponse(query)

    return NextResponse.json(analyticsData)

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // This would handle analytics event tracking in production
    const event = {
      timestamp: new Date().toISOString(),
      type: body.event_type || 'interaction',
      agent_id: body.agent_id,
      user_id: body.user_id || 'anonymous',
      consciousness_level: body.consciousness_level || 'understanding',
      data: body.data || {}
    }

    // In production, this would store the event in a database
    console.log('Analytics event tracked:', event)

    return NextResponse.json({
      status: 'Event tracked successfully',
      event_id: generateEventId(),
      timestamp: event.timestamp
    })

  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

function generateAnalyticsResponse(query: AnalyticsQuery): AnalyticsResponse {
  const baseData = MOCK_ANALYTICS_DATA

  switch (query.metric) {
    case 'consciousness':
      return generateConsciousnessAnalytics(query, baseData)
    case 'agents':
      return generateAgentAnalytics(query, baseData)
    case 'content':
      return generateContentAnalytics(query, baseData)
    case 'users':
      return generateUserAnalytics(query, baseData)
    default:
      return generateOverviewAnalytics(query, baseData)
  }
}

function generateConsciousnessAnalytics(query: AnalyticsQuery, data: any): AnalyticsResponse {
  const timeframeData = data.consciousness_metrics[query.timeframe] || data.consciousness_metrics['30d']

  return {
    metric: 'consciousness',
    timeframe: query.timeframe,
    data: [
      { dimension: 'Transformation Score', value: timeframeData.transformation_score },
      { dimension: 'Human Empowerment', value: timeframeData.human_empowerment },
      { dimension: 'Creative Enhancement', value: timeframeData.creative_enhancement },
      { dimension: 'Wisdom Integration', value: timeframeData.wisdom_integration }
    ],
    summary: {
      total: Object.values(timeframeData).reduce((a: any, b: any) => a + b, 0),
      average: Object.values(timeframeData).reduce((a: any, b: any) => a + b, 0) / 4,
      trend: 'up',
      change_percentage: 3.2
    },
    consciousness_metrics: timeframeData
  }
}

function generateAgentAnalytics(query: AnalyticsQuery, data: any): AnalyticsResponse {
  const agentData = query.agent_id ?
    data.agent_performance[query.agent_id] :
    Object.values(data.agent_performance).reduce((acc: any, agent: any) => ({
      requests: acc.requests?.map((val: number, idx: number) => val + agent.requests[idx]) || agent.requests,
      success_rate: acc.success_rate?.map((val: number, idx: number) => (val + agent.success_rate[idx]) / 2) || agent.success_rate,
      consciousness_score: acc.consciousness_score?.map((val: number, idx: number) => (val + agent.consciousness_score[idx]) / 2) || agent.consciousness_score
    }), {})

  return {
    metric: 'agents',
    timeframe: query.timeframe,
    data: agentData.requests?.map((requests: number, index: number) => ({
      period: index + 1,
      requests,
      success_rate: agentData.success_rate[index],
      consciousness_score: agentData.consciousness_score[index]
    })) || [],
    summary: {
      total: agentData.requests?.reduce((a: number, b: number) => a + b, 0) || 0,
      average: agentData.requests?.reduce((a: number, b: number) => a + b, 0) / agentData.requests?.length || 0,
      trend: 'up',
      change_percentage: 12.3
    },
    consciousness_metrics: data.consciousness_metrics[query.timeframe] || data.consciousness_metrics['30d']
  }
}

function generateContentAnalytics(query: AnalyticsQuery, data: any): AnalyticsResponse {
  const contentData = data.content_performance

  return {
    metric: 'content',
    timeframe: query.timeframe,
    data: contentData.views.map((views: number, index: number) => ({
      period: index + 1,
      views,
      engagement: contentData.engagement[index],
      transformation_score: contentData.transformation_scores[index],
      shares: contentData.shares[index]
    })),
    summary: {
      total: contentData.views.reduce((a: number, b: number) => a + b, 0),
      average: contentData.views.reduce((a: number, b: number) => a + b, 0) / contentData.views.length,
      trend: 'up',
      change_percentage: 18.7
    },
    consciousness_metrics: data.consciousness_metrics[query.timeframe] || data.consciousness_metrics['30d']
  }
}

function generateUserAnalytics(query: AnalyticsQuery, data: any): AnalyticsResponse {
  const userJourneyData = data.user_journey

  return {
    metric: 'users',
    timeframe: query.timeframe,
    data: userJourneyData.discovery.map((discovery: number, index: number) => ({
      period: index + 1,
      discovery,
      exploration: userJourneyData.exploration[index],
      integration: userJourneyData.integration[index],
      mastery: userJourneyData.mastery[index]
    })),
    summary: {
      total: userJourneyData.discovery.reduce((a: number, b: number) => a + b, 0),
      average: userJourneyData.discovery.reduce((a: number, b: number) => a + b, 0) / userJourneyData.discovery.length,
      trend: 'up',
      change_percentage: 15.4
    },
    consciousness_metrics: data.consciousness_metrics[query.timeframe] || data.consciousness_metrics['30d']
  }
}

function generateOverviewAnalytics(query: AnalyticsQuery, data: any): AnalyticsResponse {
  return {
    metric: 'overview',
    timeframe: query.timeframe,
    data: [
      { category: 'Total Users', value: 18467, change: '+12%' },
      { category: 'Active Agents', value: 247, change: '+8%' },
      { category: 'Content Generated', value: 1847, change: '+23%' },
      { category: 'Transformations', value: 342, change: '+45%' }
    ],
    summary: {
      total: 20903,
      average: 5225.75,
      trend: 'up',
      change_percentage: 22.0
    },
    consciousness_metrics: data.consciousness_metrics[query.timeframe] || data.consciousness_metrics['30d']
  }
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}