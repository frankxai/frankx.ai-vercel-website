import { defineEval } from 'eve/evals'

export default defineEval({
  description: 'Architecture advice searches the public corpus and returns a practical next move with citations.',
  tags: ['release', 'grounding'],
  async test(t) {
    await t.send('I have an expensive multi-agent stack and no paying users. What is the smallest architecture I should ship this week?')
    t.succeeded()
    t.calledTool('search_public_knowledge')
    t.messageIncludes(/\]\(\//)
    t.maxToolCalls(4)
    t.noFailedActions()
  },
})
