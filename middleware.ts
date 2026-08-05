import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { proxy } from './proxy'

export async function middleware(request: NextRequest) {
  // First run proxy logic (redirects, auth, headers)
  const proxyResponse = await proxy(request)

  // If proxy returned a redirect or rewrite, return early
  if (proxyResponse.status !== 200 && proxyResponse.status !== 304 && !proxyResponse.headers.get('x-pathname')) {
    return proxyResponse
  }

  // Ensure experiment cookies exist for active A/B tests
  const response = proxyResponse || NextResponse.next()

  const expExperiments = [
    { name: 'fx_exp_ai_writing', id: 'exp_ai_writing_offer_v1' },
    { name: 'fx_exp_agent_stack', id: 'exp_agent_stack_funnel_v1' },
    { name: 'fx_exp_top_prompts', id: 'exp_top_prompts_v1' },
  ]

  for (const exp of expExperiments) {
    if (!request.cookies.has(exp.name)) {
      // Assign variant A or B (50/50 split based on random)
      const assignedVariant = Math.random() < 0.5 ? 'A' : 'B'
      response.cookies.set(exp.name, assignedVariant, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: 'lax',
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/dashboard/:path*',
    '/api/leads/:path*',
    '/((?!api/|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|images/|fonts/).*)',
  ],
}
