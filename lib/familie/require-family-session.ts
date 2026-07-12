import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export async function requireFamilySession() {
  const session = await auth()

  if (!session) {
    redirect('/familie?zugang=erforderlich')
  }

  return session
}
