import fs from "fs/promises";
import path from "path";
import readline from "readline";
import crypto from "crypto";
import { getAdapter } from "../../agentic-creator-os/mcp-servers/social/build/adapters/index.js";
import { logPostToLedger } from "../../agentic-creator-os/scripts/sheets-logger.mjs";
import dotenv from "dotenv";

// Load FrankX env
dotenv.config({ path: path.resolve("./.env.local") });
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function parseCopyFile(content) {
  const sections = {};
  let currentPlatform = "";
  let currentContent = [];

  const lines = content.split("\n");
  for (const line of lines) {
    if (line.startsWith("## X / Twitter")) {
      if (currentPlatform) sections[currentPlatform] = currentContent.join("\n").trim();
      currentPlatform = "x";
      currentContent = [];
    } else if (line.startsWith("## LinkedIn")) {
      if (currentPlatform) sections[currentPlatform] = currentContent.join("\n").trim();
      currentPlatform = "linkedin";
      currentContent = [];
    } else if (line.startsWith("## Threads")) {
      if (currentPlatform) sections[currentPlatform] = currentContent.join("\n").trim();
      currentPlatform = "threads";
      currentContent = [];
    } else if (line.startsWith("## Instagram caption")) {
      if (currentPlatform) sections[currentPlatform] = currentContent.join("\n").trim();
      currentPlatform = "instagram";
      currentContent = [];
    } else if (line.startsWith("---") && currentPlatform) {
      // End section
      sections[currentPlatform] = currentContent.join("\n").trim();
      currentPlatform = "";
      currentContent = [];
    } else if (currentPlatform) {
      currentContent.push(line);
    }
  }
  if (currentPlatform) {
    sections[currentPlatform] = currentContent.join("\n").trim();
  }

  return sections;
}

async function triggerN8N(text, platform, mediaPath) {
  const n8nUrl = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/social-post";
  console.log(`Sending post payload to n8n Webhook: ${n8nUrl}...`);
  
  const response = await fetch(n8nUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, platform, mediaPath, timestamp: new Date().toISOString() })
  });

  if (!response.ok) {
    throw new Error(`n8n returned status ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

async function main() {
  console.log("\n========================================================");
  console.log("  🛰  STARLIGHT SOVEREIGN SOCIAL DISTRIBUTION CENTER");
  console.log("========================================================\n");

  const stagingDir = path.resolve("./content/staging/social");
  
  // 1. List staged folders
  let folders = [];
  try {
    const entries = await fs.readdir(stagingDir, { withFileTypes: true });
    folders = entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch (err) {
    console.error("❌ Staging directory not found or empty at content/staging/social");
    process.exit(1);
  }

  if (folders.length === 0) {
    console.log("📭 Staging queue is currently empty.");
    process.exit(0);
  }

  console.log("📁 Staged Social Kits Available:");
  folders.forEach((f, idx) => console.log(`  [${idx + 1}] ${f}`));
  console.log("");

  const folderIdxStr = await question("Select social kit (number): ");
  const folderIdx = parseInt(folderIdxStr) - 1;
  if (isNaN(folderIdx) || folderIdx < 0 || folderIdx >= folders.length) {
    console.log("❌ Invalid selection. Exiting.");
    rl.close();
    process.exit(1);
  }

  const selectedFolder = folders[folderIdx];
  const copyFilePath = path.join(stagingDir, selectedFolder, "copy.md");

  // Read staged copy
  let copyContent = "";
  try {
    copyContent = await fs.readFile(copyFilePath, "utf8");
  } catch {
    console.error(`❌ Could not read copy.md inside ${selectedFolder}`);
    rl.close();
    process.exit(1);
  }

  const platformCopy = parseCopyFile(copyContent);
  const platforms = Object.keys(platformCopy);

  console.log(`\n📄 Social copy parsed successfully for [${selectedFolder}]:`);
  platforms.forEach(p => {
    console.log(`  - ${p.toUpperCase()} (${platformCopy[p].length} chars)`);
  });
  console.log("");

  // Select Platform
  console.log("Select Platform to Publish:");
  platforms.forEach((p, idx) => console.log(`  [${idx + 1}] ${p.toUpperCase()}`));
  console.log("");
  
  const platIdxStr = await question("Select platform (number): ");
  const platIdx = parseInt(platIdxStr) - 1;
  if (isNaN(platIdx) || platIdx < 0 || platIdx >= platforms.length) {
    console.log("❌ Invalid platform selection.");
    rl.close();
    process.exit(1);
  }

  const selectedPlatform = platforms[platIdx];
  const postText = platformCopy[selectedPlatform];

  console.log(`\n📝 SELECTED TEXT FOR ${selectedPlatform.toUpperCase()}:`);
  console.log("--------------------------------------------------------");
  console.log(postText);
  console.log("--------------------------------------------------------\n");

  // Select Engine
  console.log("Select Publishing Engine (Option):");
  console.log("  [1] Blotato API (SaaS Bridge)");
  console.log("  [2] Postiz API (OSS Bridge)");
  console.log("  [3] Playwright Headless Browser (Sovereign Escape Hatch)");
  console.log("  [4] n8n Webhook Workflow (Automated Pipeline)");
  console.log("  [5] Local Staging (Dry-run)");
  console.log("");

  const engineIdxStr = await question("Select engine (number): ");
  const engineIdx = parseInt(engineIdxStr);

  let publisherType = "local";
  let skipAdapter = false;

  switch (engineIdx) {
    case 1:
      publisherType = "blotato";
      break;
    case 2:
      publisherType = "postiz";
      break;
    case 3:
      publisherType = "playwright";
      break;
    case 4:
      skipAdapter = true;
      break;
    case 5:
    default:
      publisherType = "local";
  }

  const mediaPathPrompt = await question("Optional Media File Path (Enter to skip): ");
  const mediaPath = mediaPathPrompt.trim() || undefined;

  console.log(`\n🚀 Dispatched publishing event...`);
  
  try {
    if (skipAdapter) {
      // Trigger n8n webhook directly
      const response = await triggerN8N(postText, selectedPlatform, mediaPath);
      console.log(`\n✅ n8n Webhook triggered successfully! Response:\n${response}`);
    } else {
      // Setup dynamic environment overrides
      process.env.SOCIAL_PUBLISHER_TYPE = publisherType;
      
      const adapter = getAdapter(publisherType);
      
      // Determine target channels
      let channelId = "";
      if (publisherType === "local") {
        channelId = `local-${selectedPlatform}`;
      } else if (publisherType === "playwright") {
        channelId = `browser-${selectedPlatform}`;
      } else {
        // For Blotato/Postiz, fetch live integrations and map to platform name
        console.log(`Fetching channels from ${publisherType.toUpperCase()} integrations...`);
        const channels = await adapter.getChannels();
        const matchingChannel = channels.find(c => c.platform.toLowerCase() === selectedPlatform);
        if (!matchingChannel) {
          console.log(`⚠️ No active connected channel found for platform: ${selectedPlatform}`);
          const chooseAnywayStr = await question(`Provide raw Channel ID manually, or enter to abort: `);
          channelId = chooseAnywayStr.trim();
          if (!channelId) {
            console.log("❌ Aborted.");
            rl.close();
            process.exit(0);
          }
        } else {
          channelId = matchingChannel.id;
        }
      }

      console.log(`Publishing via ${publisherType.toUpperCase()} to channel ID: ${channelId}...`);
      const results = await adapter.publish(postText, [channelId], mediaPath);
      
      console.log("\n📊 Execution results:");
      console.log(JSON.stringify(results, null, 2));

      // Append log entry to Sheets Ledger
      for (const res of results) {
        if (res.success) {
          try {
            await logPostToLedger({
              postId: res.postId || "RPA-PUBLISH",
              platform: res.platform || selectedPlatform,
              signature: "sip:sig:0x" + crypto.randomBytes(8).toString("hex"),
              deliveryLink: mediaPath || "none",
              status: "published"
            });
          } catch (sheetsErr) {
            console.warn("⚠️ Google Sheets ledger sync skipped or failed:", sheetsErr.message);
          }
        }
      }
    }
  } catch (error) {
    console.error(`\n❌ Publishing failed:`, error.message || error);
  }

  console.log("\n========================================================");
  rl.close();
}

main();
