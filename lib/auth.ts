import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

/**
 * NextAuth.js Configuration
 *
 * Provides authentication for dashboard routes protecting:
 * - PDF analytics data
 * - Lead information (PII)
 * - Email delivery logs
 *
 * Uses credentials-based auth with bcrypt password hashing.
 * For production, consider adding OAuth providers (Google, GitHub).
 */

// Admin credentials — set ADMIN_EMAIL + ADMIN_PASSWORD_HASH in Vercel env vars
// Generate hash: node -e "require('bcryptjs').hash('yourpassword',10).then(console.log)"
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@frankx.ai',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || ''
}

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@frankx.ai' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.email !== ADMIN_CREDENTIALS.email) {
          return null
        }

        if (!ADMIN_CREDENTIALS.passwordHash) {
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          ADMIN_CREDENTIALS.passwordHash
        )

        if (!isValid) {
          return null
        }

        // Return user object on success
        return {
          id: '1',
          email: ADMIN_CREDENTIALS.email,
          name: 'FrankX Admin'
        }
      }
    })
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}

// NextAuth v5 exports
const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

export { handlers, auth, signIn, signOut }
