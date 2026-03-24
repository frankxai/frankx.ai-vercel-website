const { GoogleGenAI } = require("@google/genai");

const API_KEY = "AIzaSyClPlfKNsasEZ56dTSr-7zwJimthqus-UI";
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function listModels() {
  try {
    const models = await ai.models.list();
    console.log("Available models:\n");
    for await (const model of models) {
      if (model.name.includes("imagen") || model.name.includes("image") || model.supportedActions?.includes("generateImages")) {
        console.log(`Name: ${model.name}`);
        console.log(`Display: ${model.displayName || "N/A"}`);
        console.log(`Actions: ${JSON.stringify(model.supportedActions || [])}`);
        console.log("---");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
