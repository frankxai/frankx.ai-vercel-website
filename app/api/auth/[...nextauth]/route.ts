// Use the single NextAuth instance from lib/auth — do NOT call NextAuth() again here
// Calling NextAuth(authOptions) twice causes JWT signing conflicts and 500 errors on /api/auth/session
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
