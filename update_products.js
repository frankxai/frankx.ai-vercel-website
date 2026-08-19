const fs = require('fs');
const path = require('path');
const productsFile = path.resolve('data/products.json');
let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

if (!products.find(p => p.id === 'visual-creation-loop')) {
  products.unshift({
    "id": "visual-creation-loop",
    "slug": "visual-creation-loop",
    "name": "Visual Creation Loop",
    "category": "Creative Intelligence",
    "badge": "NEW",
    "headline": "Tier 2 Agentic System for Visuals",
    "subheadline": "The exact scripts and skills we use to generate high-quality, brand-aligned visual assets consistently.",
    "promise": "Ship stunning, consistent visuals across all channels without breaking your brand or your budget.",
    "summary": "A fully packaged system containing our visual-creation, nb-image skills, and all supporting scripts. Just plug it into your workspace and start generating.",
    "transformation": [
      "Generate high-quality visuals directly from your workspace",
      "Maintain strict brand alignment with our curated prompts",
      "Automate the visual creation loop with AI agents",
      "Save hours per week on visual asset creation"
    ],
    "socialProof": {
      "stats": [
        {
          "number": "Tier 2",
          "label": "Agentic Product"
        }
      ],
      "quotes": []
    },
    "offer": {
      "primaryPrice": 147,
      "originalPrice": 297,
      "currency": "USD",
      "ctaPrimary": "Get Instant Access",
      "ctaPrimaryHref": "https://frankx.gumroad.com/l/visual-creation-loop",
      "ctaPrimaryTracking": "visual-creation-loop-primary",
      "ctaSecondary": "Read the Walkthrough",
      "ctaSecondaryHref": "/products/visual-creation-loop/walkthrough",
      "guarantee": {
        "label": "System Integration Promise",
        "description": "If this system doesn't improve your visual output within 14 days, you get a full refund."
      }
    },
    "modules": [
      {
        "title": "visual-creation Skill",
        "description": "The core skill that orchestrates the visual generation process and quality gates."
      },
      {
        "title": "nb-image Skill",
        "description": "The specific integration for Nano Banana and other high-end image models."
      },
      {
        "title": "Supporting Scripts",
        "description": "Utility scripts (e.g., nb-generate.mjs) that handle the actual API calls."
      },
      {
        "title": "Setup Guide & Video Walkthrough",
        "description": "Comprehensive instructions to get the loop running in your own environment."
      }
    ],
    "bonuses": [
      {
        "title": "Prompt Architecture Guide",
        "value": "",
        "description": "Our internal guide to structuring prompts for visual models."
      }
    ],
    "faq": [
      {
        "question": "What models does this support?",
        "answer": "It's built primarily around the nb-image integration, but the pattern works for any visual generation model you want to plug in."
      },
      {
        "question": "Do I need coding experience?",
        "answer": "Basic familiarity with terminals and API keys is recommended, as this is an agentic workspace integration."
      }
    ],
    "analyticsId": "visual-creation-loop"
  });
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  console.log('Added visual-creation-loop to products.json');
} else {
  console.log('visual-creation-loop already in products.json');
}
