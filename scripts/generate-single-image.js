const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error("Missing GEMINI_API_KEY env var"); process.exit(1); }
const OUTPUT_DIR = "C:\\Users\\Frank\\FrankX\\.worktrees\\vercel-ui-ux\\public\\images\\guides";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const filename = "image-generation-mastery.png";
const prompt = "Premium dark creative tech header image. Deep black with purple to pink gradient mesh aurora. Abstract generative art explosion, flowing brush strokes made of light, pixel particles coalescing into form. Vibrant purple and pink accents on void black base. No text. Premium artistic quality.";

async function generateImage() {
  console.log(`Generating: ${filename}`);
  console.log(`Prompt: ${prompt}`);

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

generateImage();
