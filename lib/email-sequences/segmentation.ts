import type { Subscriber, EmailSequence } from '@/types/email-sequences'
import { getAllSubscribers } from './subscribers'
import { getAllSequences } from './sequences'

/**
 * Find subscribers eligible for a sequence based on targeting rules
 */
export function getEligibleSubscribers(sequenceId: string): Subscriber[] {
  const subscribers = getAllSubscribers()
  const sequences = getAllSequences()
  const sequence = sequences.find(s => s.id === sequenceId)
  
  if (!sequence || !sequence.active) return []
  
  return subscribers.filter(subscriber => {
    // Must be active
    if (subscriber.status !== 'active') return false
    
    // Check if already enrolled in this sequence
    const enrolled = subscriber.sequences.find(seq => seq.sequenceId === sequenceId)
    if (enrolled && enrolled.status === 'active') return false
    
    // Check target tags (must have ALL)
    if (sequence.targetTags && sequence.targetTags.length > 0) {
      const hasAllTags = sequence.targetTags.every(tag => subscriber.tags.includes(tag))
      if (!hasAllTags) return false
    }
    
    // Check exclude tags (must have NONE)
    if (sequence.excludeTags && sequence.excludeTags.length > 0) {
      const hasExcludedTag = sequence.excludeTags.some(tag => subscriber.tags.includes(tag))
      if (hasExcludedTag) return false
    }
    
    // Check source targeting
    if (sequence.targetSource && sequence.targetSource.length > 0) {
      if (!sequence.targetSource.includes(subscriber.source)) return false
    }
    
    // Check sequence-specific conditions
    if (!checkTriggerConditions(subscriber, sequence)) return false
    
    return true
  })
}

/**
 * Check if subscriber meets sequence trigger conditions
 */
function checkTriggerConditions(subscriber: Subscriber, sequence: EmailSequence): boolean {
  const { trigger } = sequence
  
  switch (trigger.type) {
    case 'signup':
      // Welcome series - triggers on signup (handled separately)
      return true
    
    case 'inactivity':
      // Re-engagement - check days inactive
      const conditions = trigger.conditions || {}
      const daysInactive = conditions.daysInactive || 30
      
      // Check if completed welcome series
      if (conditions.completedWelcome) {
        const hasTag = subscriber.tags.includes('welcome-series-completed')
        if (!hasTag) return false
      }
      
      // Check if no purchases
      if (conditions.noPurchases) {
        if (subscriber.purchases > 0) return false
      }
      
      // Check last opened date
      if (subscriber.lastOpenedAt) {
        const lastOpened = new Date(subscriber.lastOpenedAt)
        const daysSince = Math.floor((Date.now() - lastOpened.getTime()) / (1000 * 60 * 60 * 24))
        return daysSince >= daysInactive
      }
      
      // If never opened, check subscription date
      const subscribed = new Date(subscriber.subscribedAt)
      const daysSinceSubscribe = Math.floor((Date.now() - subscribed.getTime()) / (1000 * 60 * 60 * 24))
      return daysSinceSubscribe >= daysInactive
    
    case 'purchase':
      // Upsell - check if purchased specific product
      const productConditions = trigger.conditions || {}
      const targetProductId = productConditions.productId
      
      // Check if has purchased target product
      if (targetProductId && subscriber.purchasedProducts) {
        const hasPurchased = subscriber.purchasedProducts.includes(targetProductId)
        if (!hasPurchased) return false
      }
      
      // Check if doesn't have excluded products
      const excludeProducts = productConditions.excludeProducts || []
      if (subscriber.purchasedProducts && excludeProducts.length > 0) {
        const hasExcluded = excludeProducts.some(pid => 
          subscriber.purchasedProducts?.includes(pid)
        )
        if (hasExcluded) return false
      }
      
      return true
    
    case 'abandon_cart':
      // Checkout recovery - handled by checkout webhook
      return true
    
    default:
      return true
  }
}

/**
 * Segment subscribers by engagement level
 */
export function segmentByEngagement(): {
  active: Subscriber[]
  engaged: Subscriber[]
  dormant: Subscriber[]
  inactive: Subscriber[]
} {
  const subscribers = getAllSubscribers()
  const now = Date.now()
  
  return {
    // Opened in last 7 days
    active: subscribers.filter(sub => {
      if (!sub.lastOpenedAt) return false
      const daysSince = (now - new Date(sub.lastOpenedAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSince <= 7
    }),
    
    // Opened in last 30 days
    engaged: subscribers.filter(sub => {
      if (!sub.lastOpenedAt) return false
      const daysSince = (now - new Date(sub.lastOpenedAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSince > 7 && daysSince <= 30
    }),
    
    // Opened 30-90 days ago
    dormant: subscribers.filter(sub => {
      if (!sub.lastOpenedAt) return false
      const daysSince = (now - new Date(sub.lastOpenedAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSince > 30 && daysSince <= 90
    }),
    
    // Haven't opened in 90+ days or never opened
    inactive: subscribers.filter(sub => {
      if (!sub.lastOpenedAt) {
        // Never opened - check subscription date
        const daysSinceSubscribe = (now - new Date(sub.subscribedAt).getTime()) / (1000 * 60 * 60 * 24)
        return daysSinceSubscribe > 30
      }
      const daysSince = (now - new Date(sub.lastOpenedAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSince > 90
    })
  }
}

/**
 * Segment subscribers by purchase behavior
 */
export function segmentByPurchase(): {
  buyers: Subscriber[]
  goldPathBuyers: Subscriber[]
  lifeSymphonyBuyers: Subscriber[]
  nonBuyers: Subscriber[]
} {
  const subscribers = getAllSubscribers()
  
  return {
    // Any purchase
    buyers: subscribers.filter(sub => sub.purchases > 0),
    
    // Golden Path buyers
    goldPathBuyers: subscribers.filter(sub => 
      sub.purchasedProducts?.includes('golden-path') || false
    ),
    
    // Life Symphony buyers
    lifeSymphonyBuyers: subscribers.filter(sub => 
      sub.purchasedProducts?.includes('life-symphony') || false
    ),
    
    // Never purchased
    nonBuyers: subscribers.filter(sub => sub.purchases === 0)
  }
}

/**
 * Get recommended segment for A/B testing
 */
export function getTestSegment(testType: 'active' | 'new' | 'dormant' | 'full'): Subscriber[] {
  const subscribers = getAllSubscribers()
  const engagement = segmentByEngagement()
  
  switch (testType) {
    case 'active':
      // Most engaged subscribers
      return engagement.active
    
    case 'new':
      // Subscribed in last 30 days
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
      return subscribers.filter(sub => 
        new Date(sub.subscribedAt).getTime() > thirtyDaysAgo
      )
    
    case 'dormant':
      // Re-engagement candidates
      return engagement.dormant
    
    case 'full':
    default:
      // All active subscribers
      return subscribers.filter(sub => sub.status === 'active')
  }
}
