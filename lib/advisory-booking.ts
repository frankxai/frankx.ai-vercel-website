// Publishing a booking schedule and its displayed fee requires a reviewed change here.
// Reconcile the provider's amount, currency, duration, seller and terms first.
export interface PaidSchedule {
  scheduleId: string
  feeMinor: number
  taxLabel: string
}

export const reviewedDecisionSchedule: PaidSchedule | null = null

export function paidAppointment(schedule: PaidSchedule | null) {
  if (!schedule || !/^[A-Za-z0-9_-]{16,250}$/.test(schedule.scheduleId)) return null
  if (!Number.isSafeInteger(schedule.feeMinor) || schedule.feeMinor <= 0 || !schedule.taxLabel.trim()) return null

  return {
    href: 'https://calendar.google.com/calendar/appointments/schedules/' + schedule.scheduleId,
    fee: new Intl.NumberFormat('en-IE', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 0,
    }).format(schedule.feeMinor / 100),
    taxLabel: schedule.taxLabel,
  }
}
