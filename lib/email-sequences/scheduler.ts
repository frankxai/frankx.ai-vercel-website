import type { Subscriber, EmailSequence } from '@/types/email-sequences'
import { getActiveSubscribers, advanceSequenceStep, completeSequence } from './subscribers'
import { getSequenceById, createDelivery, getPendingDeliveries, markDeliveryAsSent, markDeliveryAsFailed } from './sequences'
import { sendEmail } from './sender'

/**
 * Schedule email deliveries for a subscriber enrolled in a sequence
 * Called when subscriber first enrolls
 */
export function scheduleSequenceForSubscriber(
  subscriber: Subscriber,
  sequenceId: string
): void {
  const sequence = getSequenceById(sequenceId)
  if (!sequence || !sequence.active) return
  
  const enrollment = subscriber.sequences.find(s => s.sequenceId === sequenceId)
  if (!enrollment) return
  
  const now = new Date()
  
  sequence.steps.forEach((step, index) => {
    // Calculate delivery time
    const deliveryTime = new Date(enrollment.startedAt)
    deliveryTime.setHours(deliveryTime.getHours() + step.delay)
    
    // If step has specific send time (e.g., "09:00"), adjust
    if (step.sendTime) {
      const [hours, minutes] = step.sendTime.split(':').map(Number)
      deliveryTime.setHours(hours, minutes, 0, 0)
      
      // If that time already passed today, send tomorrow
      if (deliveryTime < now) {
        deliveryTime.setDate(deliveryTime.getDate() + 1)
      }
    }
    
    // Create scheduled delivery
    createDelivery({
      subscriberId: subscriber.id,
      sequenceId: sequence.id,
      stepId: step.id,
      templateId: step.template.id,
      status: 'scheduled',
      scheduledFor: deliveryTime.toISOString(),
      opened: false,
      clicked: false
    })
  })
}

/**
 * Process pending deliveries and send emails
 * Should be run by cron job every 5-15 minutes
 */
export async function processPendingDeliveries(): Promise<{
  processed: number
  sent: number
  failed: number
}> {
  const pending = getPendingDeliveries()
  let sent = 0
  let failed = 0
  
  for (const delivery of pending) {
    try {
      // Get subscriber
      const subscribers = getActiveSubscribers()
      const subscriber = subscribers.find(s => s.id === delivery.subscriberId)
      
      if (!subscriber || subscriber.status !== 'active') {
        // Skip unsubscribed/bounced subscribers
        await markDeliveryAsFailed(delivery.id, {
          code: 'SUBSCRIBER_INACTIVE',
          message: 'Subscriber is no longer active'
        })
        failed++
        continue
      }
      
      // Get sequence
      const sequence = getSequenceById(delivery.sequenceId)
      if (!sequence) {
        await markDeliveryAsFailed(delivery.id, {
          code: 'SEQUENCE_NOT_FOUND',
          message: 'Sequence not found'
        })
        failed++
        continue
      }
      
      // Get step
      const step = sequence.steps.find(s => s.id === delivery.stepId)
      if (!step) {
        await markDeliveryAsFailed(delivery.id, {
          code: 'STEP_NOT_FOUND',
          message: 'Step not found'
        })
        failed++
        continue
      }
      
      // Check conditions (if any)
      if (step.conditions && !checkConditions(step.conditions, subscriber, delivery.sequenceId)) {
        // Skip this email, advance to next step
        advanceSequenceStep(subscriber.id, delivery.sequenceId)
        await markDeliveryAsFailed(delivery.id, {
          code: 'CONDITIONS_NOT_MET',
          message: 'Step conditions not satisfied'
        })
        failed++
        continue
      }
      
      // Send email
      const result = await sendEmail({
        subscriber,
        template: step.template,
        step,
        sequenceId: sequence.id
      })
      
      if (result.success && result.providerId) {
        // Mark as sent
        await markDeliveryAsSent(delivery.id, result.providerId)
        
        // Advance sequence step
        advanceSequenceStep(subscriber.id, delivery.sequenceId)
        
        // If last step, mark sequence as complete
        if (step.order === sequence.steps.length) {
          completeSequence(subscriber.id, delivery.sequenceId)
        }
        
        sent++
      } else {
        // Mark as failed
        await markDeliveryAsFailed(delivery.id, result.error || {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to send email'
        })
        failed++
      }
    } catch (error) {
      console.error('[Scheduler] Error processing delivery:', delivery.id, error)
      await markDeliveryAsFailed(delivery.id, {
        code: 'PROCESSING_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
      failed++
    }
  }
  
  return {
    processed: pending.length,
    sent,
    failed
  }
}

/**
 * Check if step conditions are met
 */
function checkConditions(
  conditions: { type: string; data?: Record<string, unknown> }[],
  subscriber: Subscriber,
  sequenceId: string
): boolean {
  return conditions.every(condition => {
    switch (condition.type) {
      case 'opened_previous':
        // Check if previous email was opened
        // TODO: Implement based on deliveries
        return true
      
      case 'clicked_previous':
        // Check if previous email was clicked
        // TODO: Implement based on deliveries
        return true
      
      case 'purchased':
        // Check if subscriber made a purchase
        return subscriber.purchases > 0
      
      case 'custom':
        // Custom condition logic
        return true
      
      default:
        return true
    }
  })
}

/**
 * Manually trigger sequence for testing
 */
export async function triggerSequenceTest(
  subscriberId: string,
  sequenceId: string
): Promise<void> {
  const subscribers = getActiveSubscribers()
  const subscriber = subscribers.find(s => s.id === subscriberId)
  
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }
  
  scheduleSequenceForSubscriber(subscriber, sequenceId)
}
