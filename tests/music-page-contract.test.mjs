import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const musicPage = read("app/music/page.tsx");
const musicShell = read("components/music/MusicShell.tsx");
const musicLayout = read("app/music/layout.tsx");

test("/music removes raw image-generation prompts and links to real studio routes", () => {
  for (const source of [musicPage, musicShell]) {
    for (const retiredPrompt of [
      "infoGeniusPromptQueue",
      "InfoGeniusQueueSection",
      "Ready-to-Generate Visual Assets",
      "Create a 16:9 Dark Premium 3D infographic",
      "Create a technical systems map of one track being atomized",
      "Create a cyberpunk HUD architecture diagram",
      "Create a cinematic poster of a digital music universe",
      "Using existing image (replace with InfoGenius output when ready)",
    ]) {
      assert.ok(
        !source.includes(retiredPrompt),
        `Expected ${retiredPrompt} to be removed from /music source`,
      );
    }

    for (const liveRoute of [
      "/music/templates",
      "/music-lab",
      "/music/learn",
      "/music/brainstorm",
    ]) {
      assert.match(source, new RegExp(`href:\\s*['"]${liveRoute}['"]`));
    }
  }
});

test("/music enforces sentence case labels and removes all-caps uppercase classes", () => {
  for (const source of [musicPage, musicShell, musicLayout]) {
    assert.doesNotMatch(source, /\buppercase\b/);
    assert.doesNotMatch(source, /ultra-premium/i);
  }
  assert.match(musicPage, /Explore the music studio routes/);
  assert.match(musicPage, /Practice, templates, and studio tools/);
});
