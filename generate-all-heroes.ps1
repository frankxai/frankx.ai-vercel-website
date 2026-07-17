$ErrorActionPreference = "Stop"

$commands = @(
    @("awesome-agent-operating-systems", "A futuristic glowing holographic matrix displaying multiple AI agent operating systems, floating above a monolithic black obsidian desk, cinematic lighting, ultra high-end tech aesthetic"),
    @("awesome-agentic-income", "A sleek biomechanical golden tree with digital leaves representing wealth and income streams, growing inside a dark futuristic glass chamber, highly detailed, premium luxury aesthetic"),
    @("awesome-ai-coe", "A massive futuristic circular command center glowing with cyan and purple holograms, representing an enterprise Center of Excellence, glass and dark metal materials, cinematic sci-fi lighting"),
    @("awesome-automation-agent-skills", "Intricate clockwork made of glowing neon lines and dark chrome, representing perfect automation, infinitely complex, floating in a dark void, unreal engine 5 render"),
    @("awesome-cosmos-ai-agents", "A futuristic telescope lens capturing a swirling neon galaxy, surrounded by floating data screens and AI code, dark space background, awe-inspiring cinematic lighting"),
    @("awesome-design-agent-skills", "A sleek modern designer's workspace with a floating holographic user interface, glassmorphism UI elements, dark mode, glowing neon accents, hyper-realistic, 8k resolution"),
    @("awesome-gamification-agent-skills", "A glowing futuristic arcade cabinet floating in a dark cyberpunk environment, projecting holographic badges and reward tokens, neon purple and cyan lighting, hyper-detailed"),
    @("awesome-hermes-agent-skills", "A futuristic glowing winged helmet made of dark liquid metal and neon orange lights, representing the Hermes AI model, resting on a pedestal in a dark tech vault"),
    @("awesome-hermes-agents", "A network of glowing golden winged messengers flying through a digital matrix, representing autonomous Hermes agents, cinematic dark lighting, highly abstract and beautiful"),
    @("awesome-investor-agent-skills", "A hyper-futuristic stock market dashboard floating in mid-air, showing glowing green and gold financial graphs, dark minimalist luxury office background, ray tracing"),
    @("awesome-manifestation-skills", "A glowing crystalline structure forming out of pure light in a dark void, representing manifestation and creation of reality, ethereal and magical, ultra-high resolution"),
    @("awesome-mind-agent-skills", "A hyper-realistic glowing digital brain made of fiber optic cables and neon nodes, floating in a dark void, representing neural intelligence, cinematic 8k"),
    @("awesome-motion-design-agent-skills", "Abstract flowing liquid metal waves frozen in time, illuminated by neon pink and cyan lights, representing motion design and fluid animation, sleek dark background"),
    @("awesome-music-agent-skills", "A futuristic mixing console with glowing holographic sound waves rising from it, dark studio environment, neon blue and purple lights, hyper-detailed"),
    @("awesome-suno-agent-skills", "A glowing sun made of soundwaves and digital frequencies, rising over a sleek dark ocean, representing audio generation, cinematic lighting, highly aesthetic"),
    @("awesome-sustainability-agent-skills", "A glowing green holographic earth surrounded by perfect geometric data rings, floating in a dark futuristic server room, representing sustainability, clean energy, 8k resolution"),
    @("awesome-wealth-agent-skills", "A floating golden geometric monolith radiating wealth and stability, surrounded by glowing data streams, sleek dark luxury environment, highly architectural")
)

foreach ($cmd in $commands) {
    $repo = $cmd[0]
    $prompt = $cmd[1]
    
    $fullPrompt = "## CONCEPT`n$prompt`n## MOOD`nPremium, cinematic, high-end, luxury, futuristic"
    $outPath = "C:\Users\frank\starlight\repos\$repo\hero.png"
    
    Write-Host "Generating for $repo..."
    node scripts/nb-generate.mjs --prompt "$fullPrompt" --out "$outPath" --model nb2 --aspect 16:9 --size 2K
}
Write-Host "All generations complete!"
