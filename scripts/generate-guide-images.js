const fs = require("fs");
const path = require("path");

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

function requireGeminiKey(env) {
  if (!env.GEMINI_API_KEY?.trim()) {
    throw new Error(
      "GEMINI_API_KEY is required. Set it in the environment before generating guide images."
    );
  }
}

function resolveOutputDir(env) {
  return env.GUIDE_IMAGE_OUTPUT_DIR
    ? path.resolve(env.GUIDE_IMAGE_OUTPUT_DIR)
    : path.join(__dirname, "..", "public", "images", "guides");
}

async function defaultGenerateImage(options) {
  const { generateImage } = await import("./lib/nb-image.mjs");
  return generateImage(options);
}

function verifyGeneratedArtifact(result, outputDir, expectedOutputPath) {
  if (!result || typeof result.path !== "string" || !result.path.trim()) {
    throw new Error("Gemini image client returned no generated artifact path.");
  }

  const generatedPath = path.resolve(result.path);
  const relativePath = path.relative(path.resolve(outputDir), generatedPath);
  if (
    !relativePath ||
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Gemini image client returned a path outside the configured output directory.");
  }
  if (path.parse(generatedPath).name !== path.parse(expectedOutputPath).name) {
    throw new Error("Gemini image client returned an artifact with an unexpected filename.");
  }
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(path.extname(generatedPath).toLowerCase())) {
    throw new Error("Gemini image client returned an unsupported image extension.");
  }

  let stats;
  try {
    stats = fs.statSync(generatedPath);
  } catch {
    throw new Error("Gemini image client did not write the declared artifact.");
  }
  if (!stats.isFile() || stats.size === 0) {
    throw new Error("Gemini image client wrote an empty or non-file artifact.");
  }

  return generatedPath;
}

function defaultDelay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main({
  env = process.env,
  generateImageImpl = defaultGenerateImage,
  delayImpl = defaultDelay,
  delayMilliseconds = 2000
} = {}) {
  requireGeminiKey(env);

  const outputDir = resolveOutputDir(env);
  fs.mkdirSync(outputDir, { recursive: true });
  console.log("Starting image generation with the canonical FrankX Gemini image client");
  console.log(`Output directory: ${outputDir}`);

  const failures = [];

  for (const [index, { filename, prompt }] of imagePrompts.entries()) {
    console.log(`\nGenerating: ${filename}`);
    console.log(`Prompt: ${prompt.substring(0, 80)}...`);

    try {
      const outputPath = path.join(outputDir, filename);
      const result = await generateImageImpl({
        prompt,
        outputPath,
        model: "nbpro",
        aspectRatio: "16:9",
        imageSize: "2K",
        enforceDesignThinking: false,
        fallback: true,
        backupExisting: false,
        verbose: true
      });
      const savedPath = verifyGeneratedArtifact(result, outputDir, outputPath);
      console.log(`Saved: ${savedPath}`);
    } catch (error) {
      failures.push({ filename, message: error.message });
      console.error(`Error generating ${filename}: ${error.message}`);
    }

    if (index < imagePrompts.length - 1 && delayMilliseconds > 0) {
      await delayImpl(delayMilliseconds);
    }
  }

  const successCount = imagePrompts.length - failures.length;
  console.log(`\n${"=".repeat(50)}`);
  console.log(`Generation complete: ${successCount}/${imagePrompts.length} images created`);
  console.log(`Images saved to: ${outputDir}`);

  if (failures.length > 0) {
    throw new Error(
      `${failures.length} guide image generation request(s) failed: ${failures.map(item => item.filename).join(", ")}`
    );
  }

  return { successCount, outputDir };
}

async function runCli(mainImpl = main) {
  try {
    await mainImpl();
    return true;
  } catch (error) {
    console.error(`Guide image batch failed: ${error.message}`);
    process.exitCode = 1;
    return false;
  }
}

if (require.main === module) {
  void runCli();
}

module.exports = {
  imagePrompts,
  main,
  requireGeminiKey,
  resolveOutputDir,
  runCli,
  verifyGeneratedArtifact
};
