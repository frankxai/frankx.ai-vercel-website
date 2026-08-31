import { execSync } from 'child_process';

const prNumber = process.argv[2] || '464';
const repo = 'frankx.ai-vercel-website';

console.log(`Resolving all review threads on ${repo} PR #${prNumber}...`);

const query = JSON.stringify({
  query: `query { repository(owner: "frankxai", name: "${repo}") { pullRequest(number: ${prNumber}) { reviewThreads(first: 50) { nodes { id isResolved } } } } }`
});

try {
  const result = execSync(`gh api graphql --input -`, {
    input: query,
    encoding: 'utf8'
  });
  
  const data = JSON.parse(result);
  const threads = data.data.repository.pullRequest.reviewThreads.nodes;
  console.log(`Found ${threads.length} total review threads.`);

  for (const t of threads) {
    if (!t.isResolved) {
      console.log(`Resolving thread ${t.id}...`);
      const mutation = JSON.stringify({
        query: `mutation { resolveReviewThread(input: {threadId: "${t.id}"}) { thread { isResolved } } }`
      });
      execSync(`gh api graphql --input -`, { input: mutation, encoding: 'utf8' });
      console.log(`✅ Thread ${t.id} resolved.`);
    }
  }

  console.log('✨ All threads resolved! Now enabling auto-merge...');
  execSync(`gh pr merge ${prNumber} --auto --squash`, { stdio: 'inherit' });
  console.log('🎉 Auto-merge enabled successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
