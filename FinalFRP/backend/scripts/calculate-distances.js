#!/usr/bin/env node

const openaiService = require('../services/openaiService');

if (!openaiService || !openaiService.isAvailable) {
  console.error('OpenAI service not available.');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log('Usage: node calculate-distances.js <origin> <destination> <mode1> <mode2>');
  process.exit(1);
}

const [origin, destination, mode1, mode2] = args;

async function run() {
  try {
    const result1 = await openaiService.calculateDistanceWithModeAdjustment(origin, destination, mode1);
    const result2 = await openaiService.calculateDistanceWithModeAdjustment(origin, destination, mode2);
    console.log(JSON.stringify({ origin, destination, [mode1]: result1, [mode2]: result2 }, null, 2));
  } catch (err) {
    console.error('Distance calculation failed:', err.message);
    process.exit(1);
  }
}

run();
