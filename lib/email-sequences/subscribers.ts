import fs from 'fs'
import path from 'path'
import type { Subscriber, EmailSequencesData, SubscriberSource } from '@/types/email-sequences'

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

// Subscriber CRUD operations

export function getAllSubscribers(): Subscriber[] {
  const data = readData()
  return data.subscribers
}

export function getSubscriberById(id: string): Subscriber | null {
  const data = readData()
  return data.subscribers.find(s => s.id === id) || null
}

export function getSubscriberByEmail(email: string): Subscriber | null {
  const data = readData()
  return data.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase()) || null
}

export function getSubscribersBySource(source: SubscriberSource): Subscriber[] {
  const data = readData()
  return data.subscribers.filter(s => s.source === source)
}

export function getSubscribersByTag(tag: string): Subscriber[] {
  const data = readData()
  return data.subscribers.filter(s => s.tags.includes(tag))
}

export function getActiveSubscribers(): Subscriber[] {
  const data = readData()
  return data.subscribers.filter(s => s.status === 'active')
}

export function createSubscriber(
  input: Omit<Subscriber, 'id' | 'subscribedAt' | 'opens' | 'clicks' | 'purchases' | 'sequences'>
): Subscriber {
  const data = readData()
  
  // Check if email already exists
  const existing = data.subscribers.find(
    s => s.email.toLowerCase() === input.email.toLowerCase()
  )
  if (existing) {
    throw new Error('Subscriber with this email already exists')
  }
  
  const subscriber: Subscriber = {
    ...input,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    opens: 0,
    clicks: 0,
    purchases: 0,
    sequences: [],
    subscribedAt: new Date().toISOString()
  }
  
  data.subscribers.push(subscriber)
  writeData(data)
  
  return subscriber
}

export function updateSubscriber(
  subscriberId: string,
  updates: Partial<Omit<Subscriber, 'id' | 'subscribedAt'>>
): Subscriber | null {
  const data = readData()
  const index = data.subscribers.findIndex(s => s.id === subscriberId)
  
  if (index === -1) return null
  
  data.subscribers[index] = {
    ...data.subscribers[index],
    ...updates
  }
  
  writeData(data)
  return data.subscribers[index]
}

export function deleteSubscriber(subscriberId: string): boolean {
  const data = readData()
  const index = data.subscribers.findIndex(s => s.id === subscriberId)
  
  if (index === -1) return false
  
  data.subscribers.splice(index, 1)
  writeData(data)
  
  return true
}

// Tag management

export function addTagToSubscriber(subscriberId: string, tag: string): Subscriber | null {
  const data = readData()
  const subscriber = data.subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) return null
  
  if (!subscriber.tags.includes(tag)) {
    subscriber.tags.push(tag)
    writeData(data)
  }
  
  return subscriber
}

export function removeTagFromSubscriber(subscriberId: string, tag: string): Subscriber | null {
  const data = readData()
  const subscriber = data.subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) return null
  
  subscriber.tags = subscriber.tags.filter(t => t !== tag)
  writeData(data)
  
  return subscriber
}

// Sequence enrollment

export function enrollInSequence(subscriberId: string, sequenceId: string): Subscriber | null {
  const data = readData()
  const subscriber = data.subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) return null
  
  // Check if already enrolled
  const existingEnrollment = subscriber.sequences.find(seq => seq.sequenceId === sequenceId)
  if (existingEnrollment) {
    return subscriber
  }
  
  subscriber.sequences.push({
    sequenceId,
    status: 'active',
    currentStep: 1,
    startedAt: new Date().toISOString()
  })
  
  writeData(data)
  return subscriber
}

export function completeSequence(subscriberId: string, sequenceId: string): Subscriber | null {
  const data = readData()
  const subscriber = data.subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) return null
  
  const enrollment = subscriber.sequences.find(seq => seq.sequenceId === sequenceId)
  if (!enrollment) return subscriber
  
  enrollment.status = 'completed'
  enrollment.completedAt = new Date().toISOString()
  
  writeData(data)
  return subscriber
}

export function advanceSequenceStep(subscriberId: string, sequenceId: string): Subscriber | null {
  const data = readData()
  const subscriber = data.subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) return null
  
  const enrollment = subscriber.sequences.find(seq => seq.sequenceId === sequenceId)
  if (!enrollment) return subscriber
  
  enrollment.currentStep += 1
  
  writeData(data)
  return subscriber
}

// Analytics

export function getSubscriberStats() {
  const data = readData()
  const total = data.subscribers.length
  const active = data.subscribers.filter(s => s.status === 'active').length
  const unsubscribed = data.subscribers.filter(s => s.status === 'unsubscribed').length
  const bounced = data.subscribers.filter(s => s.status === 'bounced').length
  
  const avgOpens = total > 0 
    ? data.subscribers.reduce((sum, s) => sum + s.opens, 0) / total 
    : 0
  
  const avgClicks = total > 0
    ? data.subscribers.reduce((sum, s) => sum + s.clicks, 0) / total
    : 0
  
  return {
    total,
    active,
    unsubscribed,
    bounced,
    avgOpens: Math.round(avgOpens * 10) / 10,
    avgClicks: Math.round(avgClicks * 10) / 10,
    activeRate: total > 0 ? Math.round((active / total) * 100) : 0,
    churnRate: total > 0 ? Math.round((unsubscribed / total) * 100) : 0
  }
}

export function getSubscribersBySourceStats() {
  const data = readData()
  const sources = ['blog', 'soulbook', 'product', 'social', 'direct'] as SubscriberSource[]
  
  return sources.map(source => ({
    source,
    count: data.subscribers.filter(s => s.source === source).length,
    active: data.subscribers.filter(s => s.source === source && s.status === 'active').length
  }))
}
