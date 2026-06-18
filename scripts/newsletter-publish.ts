import { prepareNewsletterPublish } from '../lib/newsletter/publish'

const slug = process.argv[2]
const providerArg = process.argv.find((arg) => arg.startsWith('--provider='))?.split('=')[1]
const approvalToken = process.argv.find((arg) => arg.startsWith('--approval-token='))?.split('=')[1]
const live = process.argv.includes('--live')

if (!slug) {
  console.error('Usage: tsx scripts/newsletter-publish.ts <slug> [--provider=repo|beehiiv] [--live] [--approval-token=token]')
  process.exit(1)
}

prepareNewsletterPublish({
  slug,
  provider: providerArg === 'beehiiv' ? 'beehiiv' : 'repo',
  dryRun: !live,
  approvalToken,
})
  .then((result) => {
    console.log(JSON.stringify(result, null, 2))
    process.exit(result.ok ? 0 : 1)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
