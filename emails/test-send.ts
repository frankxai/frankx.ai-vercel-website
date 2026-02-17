#!/usr/bin/env node
/**
 * Email Template Test Script
 *
 * Usage:
 *   npx tsx emails/test-send.ts --variant classic-white --to friemerx@gmail.com
 *   npx tsx emails/test-send.ts --all --to friemerx@gmail.com
 *   npx tsx emails/test-send.ts --render-html --variant modern-light
 */

import { render } from '@react-email/components';
import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { Resend } from 'resend';

import ClassicWhite from './variants/ClassicWhite';
import ModernLight from './variants/ModernLight';
import MinimalGradient from './variants/MinimalGradient';
import DarkPremium from './variants/DarkPremium';
import CardBased from './variants/CardBased';
import { EMAIL_VARIANTS, EmailVariant } from './index';

const TEMPLATES = {
  'classic-white': ClassicWhite,
  'modern-light': ModernLight,
  'minimal-gradient': MinimalGradient,
  'dark-premium': DarkPremium,
  'card-based': CardBased,
} as const;

interface TestEmailProps {
  variant: EmailVariant;
  to?: string;
  renderHtml?: boolean;
}

async function renderTemplate(variant: EmailVariant): Promise<string> {
  const Template = TEMPLATES[variant];
  const element = React.createElement(Template, {
    firstName: 'Alex',
    sourceContext: 'after reading one of my articles',
    downloadLink: 'https://frankx.ai/download/ai-architecture-guide',
    unsubscribeUrl: 'https://frankx.ai/unsubscribe',
  });

  return await render(element);
}

async function saveHtml(variant: EmailVariant, html: string): Promise<string> {
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filename = path.join(outputDir, `${variant}.html`);
  fs.writeFileSync(filename, html, 'utf-8');
  return filename;
}

async function sendTestEmail({ variant, to }: TestEmailProps): Promise<void> {
  if (!to) {
    throw new Error('Recipient email required. Use --to flag.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable not set');
  }

  const html = await renderTemplate(variant);
  const resend = new Resend(apiKey);

  const variantName = EMAIL_VARIANTS[variant].name;

  console.log(`\nSending ${variantName} to ${to}...`);

  const result = await resend.emails.send({
    from: 'Frank <frank@frankx.ai>',
    to,
    subject: `[TEST] Your free AI tool is ready (+ what's next) - ${variantName}`,
    html,
  });

  if (result.error) {
    console.error('❌ Send failed:', result.error);
    throw new Error(result.error.message);
  }

  console.log(`✅ Sent successfully! Email ID: ${result.data?.id}`);
}

async function renderHtmlOnly(variant: EmailVariant): Promise<void> {
  console.log(`\nRendering ${variant} to HTML...`);
  const html = await renderTemplate(variant);
  const filename = await saveHtml(variant, html);
  console.log(`✅ Saved to: ${filename}`);
  console.log(`\nOpen in browser: file://${filename}`);
}

async function main() {
  const args = process.argv.slice(2);

  // Parse flags
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const nextArg = args[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        flags[key] = nextArg;
        i++;
      } else {
        flags[key] = true;
      }
    }
  }

  const variant = flags.variant as EmailVariant;
  const to = flags.to as string | undefined;
  const renderHtmlFlag = flags['render-html'] as boolean;
  const all = flags.all as boolean;

  console.log('\n📧 Email Template Test Script\n');

  // Render HTML only
  if (renderHtmlFlag && variant) {
    await renderHtmlOnly(variant);
    return;
  }

  // Render all variants to HTML
  if (renderHtmlFlag && all) {
    for (const variantKey of Object.keys(TEMPLATES)) {
      await renderHtmlOnly(variantKey as EmailVariant);
    }
    console.log('\n✅ All variants rendered to emails/output/');
    return;
  }

  // Send test email(s)
  if (!to) {
    console.error('❌ Error: --to flag required for sending emails');
    console.log('\nUsage:');
    console.log('  npx tsx emails/test-send.ts --variant classic-white --to user@example.com');
    console.log('  npx tsx emails/test-send.ts --all --to user@example.com');
    console.log('  npx tsx emails/test-send.ts --render-html --variant modern-light');
    console.log('  npx tsx emails/test-send.ts --render-html --all');
    process.exit(1);
  }

  if (all) {
    // Send all variants
    for (const variantKey of Object.keys(TEMPLATES)) {
      await sendTestEmail({ variant: variantKey as EmailVariant, to });
      // Wait 1 second between sends to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\n✅ All variants sent!');
  } else if (variant) {
    // Send single variant
    if (!TEMPLATES[variant]) {
      console.error(`❌ Invalid variant: ${variant}`);
      console.log('\nAvailable variants:');
      Object.keys(TEMPLATES).forEach(v => console.log(`  - ${v}`));
      process.exit(1);
    }
    await sendTestEmail({ variant, to });
  } else {
    console.error('❌ Error: --variant or --all flag required');
    console.log('\nUsage:');
    console.log('  npx tsx emails/test-send.ts --variant classic-white --to user@example.com');
    console.log('  npx tsx emails/test-send.ts --all --to user@example.com');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
