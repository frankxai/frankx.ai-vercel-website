const fs = require("fs");
const path = require("path");

const filename = "image-generation-mastery.png";
const prompt = "Premium dark creative tech header image. Deep black with purple to pink gradient mesh aurora. Abstract generative art explosion, flowing brush strokes made of light, pixel particles coalescing into form. Vibrant purple and pink accents on void black base. No text. Premium artistic quality.";

function requireGeminiKey(env) {
  if (!env.GEMINI_API_KEY?.trim()) {
    throw new Error(
      "GEMINI_API_KEY is required. Set it in the environment before generating a guide image."
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

async function main({
  env = process.env,
  generateImageImpl = defaultGenerateImage
} = {}) {
  requireGeminiKey(env);

  const outputDir = resolveOutputDir(env);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, filename);

  console.log(`Generating: ${filename}`);
  console.log(`Prompt: ${prompt}`);

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

  console.log(`Saved: ${result.path || outputPath}`);
  return result;
}

async function runCli(mainImpl = main) {
  try {
    await mainImpl();
    return true;
  } catch (error) {
    console.error(`Guide image generation failed: ${error.message}`);
    process.exitCode = 1;
    return false;
  }
}

if (require.main === module) {
  void runCli();
}

module.exports = { main, requireGeminiKey, resolveOutputDir, runCli };
