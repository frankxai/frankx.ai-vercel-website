/** Public sources checked 2026-10-05. Exercises are FrankX editorial suggestions. */
export const HIGGSFIELD_REFERRAL = 'https://higgsfield.ai?fpr=frank-255866'
export const higgsfieldSources = {
  academy: 'https://higgsfield.ai/academy',
  cinema: 'https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-cinema-studio',
  marketing: 'https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-marketing-studio-to-create-video-ads',
  ads: 'https://higgsfield.ai/ads-studio',
  mcp: 'https://higgsfield.ai/mcp',
  pricing: 'https://higgsfield.ai/pricing',
} as const

export const higgsfieldWorkflows = [
  {
    id: 'first-video', label: 'My first video', tool: 'Image → video',
    deliverable: 'One short shot with a clear subject and a single movement.',
    inputs: 'An approved reference image, one action, and the destination aspect ratio.',
    steps: ['Prepare a clean reference image.', 'Describe one action and one camera move.', 'Generate one draft; inspect the whole clip before making variations.'],
    check: 'Keep the subject recognizable from the first frame to the last. Look for warped hands, objects, and text.',
    constraint: 'Keep the scene simple. Change one variable per retry.',
    anchor: 'first-video', source: higgsfieldSources.academy,
  },
  {
    id: 'cinematic', label: 'A cinematic scene', tool: 'Cinema Studio',
    deliverable: 'A deliberate shot with a defined camera, lighting, and action.',
    inputs: 'A shot brief and references for the character, location, and props.',
    steps: ['Save approved assets as Elements where supported.', 'Choose the Cinema Studio version and set the shot controls it exposes.', 'Render a short test; compare framing and motion with the brief.'],
    check: 'The camera should reveal something useful. Inspect subject drift and continuity at cuts.',
    constraint: 'Record your studio version. Controls differ between versions.',
    anchor: 'cinema-studio', source: higgsfieldSources.cinema,
  },
  {
    id: 'product-ad', label: 'A product video ad', tool: 'Marketing Studio',
    deliverable: 'One product video with a clear hook, demonstration, and next step.',
    inputs: 'Product imagery or a product URL, an audience, and one accurate benefit.',
    steps: ['Choose a video template that fits the placement.', 'Connect the product; check extracted brand details.', 'Review the displayed credit cost, then render and check the product and voiceover.'],
    check: 'Can a viewer identify the product and benefit without extra explanation? Correct logos, packaging, and claims.',
    constraint: 'Test one hook at a time. A generated performance score is an estimate.',
    anchor: 'marketing-studio', source: higgsfieldSources.marketing,
  },
  {
    id: 'static-ad', label: 'Static ad variations', tool: 'Ads Studio',
    deliverable: 'A small set of image ad concepts for a controlled test.',
    inputs: 'Product visuals, approved copy, brand references, and a placement.',
    steps: ['Open Ads Studio and inspect its current inputs.', 'Keep the offer fixed while varying one creative angle.', 'Check every word and product detail before exporting.'],
    check: 'Compare readable copy, visual hierarchy, and product fidelity. Measure real campaign results separately.',
    constraint: 'Ads Studio and Marketing Studio are separate workspaces. Check live costs.',
    anchor: 'ads-studio', source: higgsfieldSources.ads,
  },
  {
    id: 'consistent-character', label: 'A recurring character', tool: 'References + Elements',
    deliverable: 'A short sequence with an identifiable character across shots.',
    inputs: 'Approved character references, a wardrobe description, and a shot list.',
    steps: ['Build a reference sheet with useful views.', 'Reuse approved character and location assets.', 'Compare shots side by side before editing them into a sequence.'],
    check: 'Inspect face, wardrobe, proportions, and lighting. Reference reuse reduces ambiguity; it does not guarantee identity.',
    constraint: 'Use references you are entitled to use. Follow the current tool’s input requirements.',
    anchor: 'character-consistency', source: higgsfieldSources.cinema,
  },
  {
    id: 'agent-workflow', label: 'An agent workflow', tool: 'Higgsfield MCP',
    deliverable: 'A reviewed generation plan for a tool your connected account supports.',
    inputs: 'A production brief, approved references, and a generation budget.',
    steps: ['Follow the official MCP setup for your client.', 'Ask the agent to inspect available tools and propose a plan.', 'Review supported parameters and cost before approving a generation.'],
    check: 'Record the tool, inputs, output, and actual cost. Keep credentials outside prompts and public source code.',
    constraint: 'Template-based Marketing Studio is currently web-only according to its help page.',
    anchor: 'mcp-and-api', source: higgsfieldSources.mcp,
  },
] as const

export type HiggsfieldWorkflow = (typeof higgsfieldWorkflows)[number]

export function buildHiggsfieldBrief(workflow: HiggsfieldWorkflow, objective: string, ratio: string) {
  return [
    'Higgsfield production brief',
    `Workflow: ${workflow.tool}`,
    `Objective: ${objective.trim() || workflow.deliverable}`,
    `Delivery ratio: ${ratio}`,
    `Prepare: ${workflow.inputs}`,
    'Subject / product: [describe precisely]',
    'Action / message: [one action or one accurate benefit]',
    'Setting and lighting: [describe]',
    'Reference assets: [attach approved assets]',
    'Camera / composition: [one deliberate choice]',
    `Constraint: ${workflow.constraint}`,
    `Review: ${workflow.check}`,
    'Budget: [set a limit; check the live generation cost]',
    'Iteration: change one variable; keep the approved references fixed.',
    `Official reference: ${workflow.source}`,
  ].join('\n')
}

export const higgsfieldLessons = [
  {
    id: 'higgsfield-overview', youtubeId: '-vqocuhO1YE',
    title: 'Learn 98% of Higgsfield AI in 18 Minutes',
    creator: 'Youri van Hofwegen', creatorChannel: 'https://www.youtube.com/@Yourivanhofwegen',
    duration: '18:25', level: 'beginner' as const, tags: ['higgsfield', 'references', 'cinema-studio'],
    description: 'A platform tour with reference sheets, saved assets, Cinema Studio, and marketing examples. The title is the creator’s wording.',
    scope: 'Demonstrates Cinema Studio 3.5. Use current official docs for today’s controls and access.',
    lesson: 'At 2:47, Youri builds a multi-angle character sheet; at 7:22, he prepares reusable characters and a location before directing the scene.',
    exercise: 'Prepare one reference sheet and a three-shot brief. Keep the character and wardrobe descriptions fixed across all three shots.',
    start: 167,
    keyTakeaways: ['Prepare character references before animating.', 'Save reusable characters and locations before directing a scene.', 'Review the generated clip for unnatural movement.'],
  },
  {
    id: 'higgsfield-beginners', youtubeId: 'R7GZjRMsrzM',
    title: 'The ONLY Higgsfield AI Tutorial You Need 2026: Step-by-Step for Beginners',
    creator: 'Joshua Mayo', creatorChannel: 'https://www.youtube.com/@JoshuaMayo',
    duration: 'Beginner walkthrough', level: 'beginner' as const, tags: ['higgsfield', 'tutorial'],
    description: 'A second creator’s beginner walkthrough. Compare the demonstrated workflow with the current official help center.',
    scope: 'Earlier interface and pricing may differ. Confirm them in your own account.',
    lesson: 'At 3:44, Joshua separates the image, camera movement, and generation steps. At 7:41, he focuses the prompt on what happens in the scene.',
    exercise: 'Write down the required inputs for one workflow, then prepare those inputs before starting a generation.',
    start: 224,
  },
  {
    id: 'higgsfield-motion-design', youtubeId: '2OwMjg5As2g',
    title: 'Claude Fable 5.1 + Higgsfield AI = Insane Motion Graphics!',
    creator: 'Higgsfield AI', creatorChannel: 'https://www.youtube.com/@HiggsfieldAI',
    duration: '13:51', level: 'intermediate' as const, tags: ['higgsfield', 'motion-design', 'official'],
    description: 'An official Higgsfield motion-graphics demonstration. Treat demonstrated capabilities as vendor examples.',
    scope: 'Official demonstration. Check the current Marketing Studio help page for agent-channel limitations.',
    lesson: 'At 3:42, the official demonstration recommends approving a storyboard’s layout and visuals at the image stage before rendering video.',
    exercise: 'Sketch a short storyboard for your own logo: one message, one transition, and one end frame. Approve the layout and text before animating.',
    start: 222,
  },
] as const
