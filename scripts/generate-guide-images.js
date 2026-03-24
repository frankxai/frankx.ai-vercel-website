const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyClPlfKNsasEZ56dTSr-7zwJimthqus-UI";
const OUTPUT_DIR = "C:\\Users\\Frank\\FrankX\\.worktrees\\vercel-ui-ux\\public\\images\\guides";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const imagePrompts = [
  {
    filename: "midjourney-guide.png",
    prompt: "Premium dark tech header image. Deep purple to cyan gradient mesh background on void black. Abstract AI eye lens motif in center with radiating emerald green neural pathways glowing. Holographic floating interface panels. Futuristic HUD elements. No text. Cinematic lighting, ultra high quality."
  },
  {
    filename: "claude-anthropic-guide.png",
    prompt: "Premium dark sophisticated header image. Deep space black background with emerald green and amber gradient aurora. Abstract conversational AI visualization with flowing data streams and interconnected glowing nodes. Holographic chat interface elements. No text. Cinematic depth, premium quality."
  },
  {
    filename: "founder-ai-stack-2026.png",
    prompt: "Premium dark executive tech header image. Void black background with blue to cyan gradient mesh. Abstract 3D interconnected AI tools, floating isometric cubes, glowing data pipelines, dashboard HUD elements. Subtle rocket growth motif. Emerald green highlights. No text. Professional quality."
  },
  {
    filename: "image-generation-mastery.png",
    prompt: "Premium dark creative tech header image. Deep black with purple to pink gradient mesh aurora. Abstract generative art explosion, flowing brush strokes made of light, pixel particles coalescing into form. Vibrant purple and pink accents on void black base. No text. Premium artistic quality."
  },
  {
    filename: "suno-prompt-playbook.png",
    prompt: "Premium dark audio tech header image. Deep black background with orange to amber gradient mesh aurora. Abstract AI music visualization, glowing sound waves, equalizer bars as light towers, frequency rings. Warm amber orange glow with emerald tech highlights. No text. Cinematic premium quality."
  }
];

async function generateImage(prompt, filename) {
  console.log(`\nGenerating: ${filename}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  try {
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "16:9",
        outputMimeType: "image/png"
      }
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const imageData = response.generatedImages[0].image.imageBytes;
      const outputPath = path.join(OUTPUT_DIR, filename);

      // Convert base64 to buffer and save
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync(outputPath, buffer);

      console.log(`Saved: ${outputPath}`);
      return true;
    } else {
      console.error(`No image generated for ${filename}`);
      return false;
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("Starting image generation with Gemini Imagen 4 API");
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log("Created output directory");
  }

  let successCount = 0;

  for (const { filename, prompt } of imagePrompts) {
    const success = await generateImage(prompt, filename);
    if (success) successCount++;

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Generation complete: ${successCount}/${imagePrompts.length} images created`);
  console.log(`Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
