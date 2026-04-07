#!/usr/bin/env node
/**
 * AuraDKit Skill Installer
 * npx @smorky85/auradkit-skill → .claude/skills/auradkit/ 에 스킬 설치
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(process.cwd(), '.claude', 'skills', 'auradkit');
const REF_DIR = path.join(SKILL_DIR, 'references');
const SRC_DIR = path.join(__dirname, '..', 'skill');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  \x1b[32m✓\x1b[0m ${path.relative(SKILL_DIR, destPath)}`);
    }
  }
}

console.log();
console.log('  \x1b[36m[AuraDKit]\x1b[0m Installing Design Intelligence Skill v5.3...');
console.log();

try {
  copyDir(SRC_DIR, SKILL_DIR);

  console.log();
  console.log('  \x1b[36m[AuraDKit]\x1b[0m ══════════════════════════════════════');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m   AuraDKit Skill v5.3 installed!');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m   Usage:');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m     /auradkit 유저 대시보드 만들어줘');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m     /auradkit --format=tsx 로그인 페이지');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m   455 sites · 7 axes · avg 9.1/10');
  console.log('  \x1b[36m[AuraDKit]\x1b[0m ══════════════════════════════════════');
  console.log();
} catch (err) {
  console.error(`  \x1b[31m✗\x1b[0m Installation failed: ${err.message}`);
  process.exit(1);
}
