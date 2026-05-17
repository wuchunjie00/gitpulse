#!/usr/bin/env node
"use strict";

const { execSync } = require("child_process");
const { EOL } = require("os");

function run(cmd) {
  try { return execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim(); }
  catch { return ""; }
}

function bar(value, max, width = 20) {
  const filled = Math.round((value / max) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
}

function main() {
  const dir = process.argv[2] || ".";
  
  const isRepo = run(`cd "${dir}" && git rev-parse --git-dir 2>/dev/null`);
  if (!isRepo) {
    console.log("\n  ❌  Not a git repository.\n");
    process.exit(1);
  }

  console.log("\n  📊  GITPULSE\n");

  // Commits by author
  const log = run(`cd "${dir}" && git log --format="%an|%ad|%s" --date=short --all`);
  const lines = log ? log.split("\n").filter(Boolean) : [];
  const authorCommits = {};
  const fileCounts = {};
  const dailyMap = {};
  
  for (const line of lines) {
    const [author, date] = line.split("|");
    authorCommits[author] = (authorCommits[author] || 0) + 1;
    dailyMap[date] = (dailyMap[date] || 0) + 1;
  }

  // Files changed
  const fileLog = run(`cd "${dir}" && git log --format="" --name-only --all`);
  for (const f of (fileLog || "").split("\n")) {
    if (f) {
      const ext = f.includes(".") ? f.split(".").pop() : "other";
      fileCounts[ext] = (fileCounts[ext] || 0) + 1;
    }
  }

  const totalCommits = lines.length;

  console.log(`  📝  Total commits: ${totalCommits}`);
  console.log(`  👤  Contributors:  ${Object.keys(authorCommits).length}`);
  console.log(`  📅  Active days:   ${Object.keys(dailyMap).length}`);
  console.log(`  📂  Files touched:  ${Object.values(fileCounts).reduce((a,b)=>a+b,0)}`);
  console.log("");

  // Top contributors
  console.log("  👥  Top Contributors");
  const sorted = Object.entries(authorCommits).sort((a,b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;
  for (const [author, count] of sorted.slice(0, 8)) {
    console.log(`    ${author.padEnd(25)} ${bar(count, max, 15)} ${count}`);
  }
  console.log("");

  // Language breakdown
  if (Object.keys(fileCounts).length > 0) {
    console.log("  📂  File Type Breakdown");
    const fileSorted = Object.entries(fileCounts).sort((a,b) => b[1] - a[1]);
    const fmax = fileSorted[0]?.[1] || 1;
    for (const [ext, count] of fileSorted.slice(0, 10)) {
      console.log(`    .${ext.padEnd(10)} ${bar(count, fmax, 15)} ${count}`);
    }
    console.log("");
  }

  // Recent activity heatmap
  const days = Object.entries(dailyMap).sort();
  if (days.length > 0) {
    console.log("  🔥  Recent Activity");
    const last7 = days.slice(-7);
    const dmax = Math.max(...last7.map(d => d[1]));
    for (const [date, count] of last7) {
      console.log(`    ${date}  ${"█".repeat(Math.round(count/dmax*30))} ${count}`);
    }
  }

  console.log("");
}

main();
