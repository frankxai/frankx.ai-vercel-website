import fs from 'fs'
import path from 'path'
import type { EmailSequence, EmailDelivery, SequenceAnalytics, EmailSequencesData } from '@/types/email-sequences'

const DATA_FILE = path.join(process.cwd(), 'data/email-sequences/email-sequences.json')

function readData(): EmailSequencesData {
  if (!fs.existsSync(DATA_FILE)) {
    return {
      subscribers: [],
      sequences: [],
      templates: [],
      deliveries: [],
      lastUpdated: new Date().toISOString()
    }
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeData(data: EmailSequencesData): void {
  data.lastUpdated = new Date().toISOString()
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// Sequence operations

export function getAllSequences(): EmailSequence[] {
  const data = readData()
  return data.sequences
}

export function getSequenceById(id: string): EmailSequence | null {
  const data = readData()
  return data.sequences.find(s => s.id === id) || null
}

export function getActiveSequences(): EmailSequence[] {
  const data = readData()
  return data.sequences.filter(s => s.active)
}

export function updateSequence(
  sequenceId: string,
  updates: Partial<Omit<EmailSequence, 'id' | 'createdAt'>>
): EmailSequence | null {
  const data = readData()
  const index = data.sequences.findIndex(s => s.id === sequenceId)
  
  if (index === -1) return null
  
  data.sequences[index] = {
    ...data.sequences[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  writeData(data)
  return data.sequences[index]
}

// Delivery operations

export function getAllDeliveries(): EmailDelivery[] {
  const data = readData()
  return data.deliveries
}

export function getDeliveriesBySubscriber(subscriberId: string): EmailDelivery[] {
  const data = readData()
  return data.deliveries.filter(d => d.subscriberId === subscriberId)
}

export function getDeliveriesBySequence(sequenceId: string): EmailDelivery[] {
  const data = readData()
  return data.deliveries.filter(d => d.sequenceId === sequenceId)
}

export function getPendingDeliveries(): EmailDelivery[] {
  const data = readData()
  const now = new Date().toISOString()
  return data.deliveries.filter(d => 
    d.status === 'scheduled' && 
    d.scheduledFor <= now
  )
}

export function createDelivery(
  delivery: Omit<EmailDelivery, 'id' | 'createdAt'>
): EmailDelivery {
  const data = readData()
  
  const newDelivery: EmailDelivery = {
    ...delivery,
    id: `del_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString()
  }
  
  data.deliveries.push(newDelivery)
  writeData(data)
  
  return newDelivery
}

export function updateDelivery(
  deliveryId: string,
  updates: Partial<Omit<EmailDelivery, 'id' | 'createdAt'>>
): EmailDelivery | null {
  const data = readData()
  const index = data.deliveries.findIndex(d => d.id === deliveryId)
  
  if (index === -1) return null
  
  data.deliveries[index] = {
    ...data.deliveries[index],
    ...updates
  }
  
  writeData(data)
  return data.deliveries[index]
}

export function markDeliveryAsSent(
  deliveryId: string,
  providerId: string
): EmailDelivery | null {
  return updateDelivery(deliveryId, {
    status: 'sent',
    sentAt: new Date().toISOString(),
    providerId
  })
}

export function markDeliveryAsOpened(deliveryId: string): EmailDelivery | null {
  return updateDelivery(deliveryId, {
    opened: true,
    openedAt: new Date().toISOString()
  })
}

export function markDeliveryAsClicked(
  deliveryId: string,
  url: string
): EmailDelivery | null {
  const data = readData()
  const delivery = data.deliveries.find(d => d.id === deliveryId)
  if (!delivery) return null

  const clickedUrls = delivery.clickedUrls || []
  if (!clickedUrls.includes(url)) {
    clickedUrls.push(url)
  }

  return updateDelivery(deliveryId, {
    clicked: true,
    clickedAt: delivery.clickedAt || new Date().toISOString(),
    clickedUrls
  })
}

export function markDeliveryAsFailed(
  deliveryId: string,
  error: { code: string; message: string }
): EmailDelivery | null {
  return updateDelivery(deliveryId, {
    status: 'failed',
    error: {
      ...error,
      timestamp: new Date().toISOString()
    }
  })
}

// Analytics

export function getSequenceAnalytics(
  sequenceId: string,
  period: 'day' | 'week' | 'month' | 'all' = 'all'
): SequenceAnalytics | null {
  const data = readData()
  const sequence = data.sequences.find(s => s.id === sequenceId)
  
  if (!sequence) return null
  
  // Filter deliveries by period
  let deliveries = data.deliveries.filter(d => d.sequenceId === sequenceId)
  
  if (period !== 'all') {
    const now = new Date()
    const periodStart = new Date()
    
    if (period === 'day') {
      periodStart.setDate(now.getDate() - 1)
    } else if (period === 'week') {
      periodStart.setDate(now.getDate() - 7)
    } else if (period === 'month') {
      periodStart.setMonth(now.getMonth() - 1)
    }
    
    deliveries = deliveries.filter(d => 
      new Date(d.createdAt) >= periodStart
    )
  }
  
  const sent = deliveries.filter(d => d.status === 'sent').length
  const delivered = deliveries.filter(d => 
    d.status === 'sent' && !d.error
  ).length
  const opened = deliveries.filter(d => d.opened).length
  const clicked = deliveries.filter(d => d.clicked).length
  const bounced = deliveries.filter(d => d.status === 'bounced').length
  
  // Calculate unsubscribes triggered by this sequence
  const unsubscribed = data.subscribers.filter(sub => {
    const enrollment = sub.sequences.find(seq => seq.sequenceId === sequenceId)
    return enrollment && sub.status === 'unsubscribed' && 
      sub.unsubscribedAt && 
      sub.unsubscribedAt >= enrollment.startedAt
  }).length
  
  // Step performance
  const stepPerformance = sequence.steps.map(step => {
    const stepDeliveries = deliveries.filter(d => d.stepId === step.id)
    const stepSent = stepDeliveries.filter(d => d.status === 'sent').length
    const stepOpened = stepDeliveries.filter(d => d.opened).length
    const stepClicked = stepDeliveries.filter(d => d.clicked).length
    
    return {
      stepId: step.id,
      stepOrder: step.order,
      sent: stepSent,
      opened: stepOpened,
      clicked: stepClicked,
      openRate: stepSent > 0 ? Math.round((stepOpened / stepSent) * 100) : 0,
      clickRate: stepSent > 0 ? Math.round((stepClicked / stepSent) * 100) : 0
    }
  })
  
  return {
    sequenceId,
    period,
    sent,
    delivered,
    opened,
    clicked,
    bounced,
    unsubscribed,
    deliveryRate: sent > 0 ? Math.round((delivered / sent) * 100) : 0,
    openRate: delivered > 0 ? Math.round((opened / delivered) * 100) : 0,
    clickRate: delivered > 0 ? Math.round((clicked / delivered) * 100) : 0,
    unsubscribeRate: sent > 0 ? Math.round((unsubscribed / sent) * 100) : 0,
    conversions: 0, // TODO: Track conversions
    conversionRate: 0,
    revenue: 0,
    stepPerformance
  }
}

export function getAllSequencesStats() {
  const data = readData()
  
  return data.sequences.map(sequence => {
    const analytics = getSequenceAnalytics(sequence.id, 'all')
    
    return {
      id: sequence.id,
      name: sequence.name,
      active: sequence.active,
      analytics
    }
  })
}
