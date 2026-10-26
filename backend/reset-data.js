// Restores data/tasks.json to the original eight tasks.
// Run it with: npm run reset-data
const fs = require("fs");
const path = require("path");

const original = path.join(__dirname, "data", "tasks.default.json");
const current = path.join(__dirname, "data", "tasks.json");

fs.copyFileSync(original, current);
console.log("Task data has been reset to the original 8 tasks.");
