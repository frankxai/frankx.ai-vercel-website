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

  const savedPath = verifyGeneratedArtifact(result, outputDir, outputPath);
  console.log(`Saved: ${savedPath}`);
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

module.exports = {
  main,
  requireGeminiKey,
  resolveOutputDir,
  runCli,
  verifyGeneratedArtifact
};
