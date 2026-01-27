#!/usr/bin/env node

/**
 * Humanizer Tool - Em Dash Removal with Verification
 *
 * Usage: node scripts/humanize-emdash.js <file-path>
 *
 * Features:
 * - Shows each em dash with surrounding context
 * - Proposes contextual replacement
 * - Requires explicit approval for each change
 * - Verifies zero em dashes remain after completion
 */

const fs = require('fs');
const readline = require('readline');

const EM_DASH = '—';

// Simple heuristics for replacement suggestions
function suggestReplacement(before, after) {
  const beforeTrimmed = before.trim();
  const afterTrimmed = after.trim();

  // Attribution pattern: ends quote, starts name
  if (beforeTrimmed.endsWith('"') || beforeTrimmed.endsWith("'")) {
    return ' — '; // Keep for attributions
  }

  // After "and", "or", "but" - likely parenthetical, use comma
  if (/\b(and|or|but)$/i.test(beforeTrimmed)) {
    return ', ';
  }

  // Before "and", "or", "but", "not" - contrast, use comma
  if (/^(and|or|but|not)\b/i.test(afterTrimmed)) {
    return ', ';
  }

  // Before a list or explanation - use colon
  if (/^(the|a|an|this|that|these|those|it|they|we|you|I)\b/i.test(afterTrimmed)) {
    return '. ';
  }

  // Default: comma (most common replacement)
  return ', ';
}

async function prompt(rl, question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Find all em dashes
  const occurrences = [];
  lines.forEach((line, lineIndex) => {
    let charIndex = 0;
    while ((charIndex = line.indexOf(EM_DASH, charIndex)) !== -1) {
      occurrences.push({
        lineNum: lineIndex + 1,
        charIndex,
        line,
        before: line.slice(Math.max(0, charIndex - 30), charIndex),
        after: line.slice(charIndex + 1, charIndex + 31)
      });
      charIndex++;
    }
  });

  if (occurrences.length === 0) {
    console.log(`\n✓ No em dashes found in ${filePath}`);
    return;
  }

  console.log(`\nFound ${occurrences.length} em dash(es) in ${filePath}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const changes = [];

  for (let i = 0; i < occurrences.length; i++) {
    const occ = occurrences[i];
    const suggestion = suggestReplacement(occ.before, occ.after);

    console.log(`\n[${i + 1}/${occurrences.length}] Line ${occ.lineNum}:`);
    console.log(`  Context: ...${occ.before}${EM_DASH}${occ.after}...`);
    console.log(`  Current: "${EM_DASH}"`);
    console.log(`  Suggest: "${suggestion.trim() || '(delete)'}"`);

    const answer = await prompt(rl, '\n  [a]pprove / [e]dit / [s]kip / [k]eep (attribution) / [q]uit: ');

    switch (answer.toLowerCase()) {
      case 'a':
        changes.push({ ...occ, replacement: suggestion });
        console.log('  → Approved');
        break;
      case 'e':
        const custom = await prompt(rl, '  Enter replacement: ');
        changes.push({ ...occ, replacement: custom });
        console.log(`  → Will replace with "${custom}"`);
        break;
      case 'k':
        console.log('  → Keeping (attribution)');
        break;
      case 's':
        console.log('  → Skipped');
        break;
      case 'q':
        console.log('\nQuitting without saving changes.');
        rl.close();
        process.exit(0);
      default:
        console.log('  → Skipped (unrecognized input)');
    }
  }

  rl.close();

  if (changes.length === 0) {
    console.log('\nNo changes to apply.');
    return;
  }

  // Apply changes (in reverse order to preserve line positions)
  changes.sort((a, b) => {
    if (a.lineNum !== b.lineNum) return b.lineNum - a.lineNum;
    return b.charIndex - a.charIndex;
  });

  const newLines = [...lines];
  for (const change of changes) {
    const lineIdx = change.lineNum - 1;
    const line = newLines[lineIdx];

    let afterText = line.slice(change.charIndex + 1);

    // If replacement ends with period or colon, capitalize the next letter
    if (change.replacement.trim().match(/[.:]$/)) {
      afterText = afterText.replace(/^(\s*)([a-z])/, (match, space, letter) => {
        return (space || '') + letter.toUpperCase();
      });
    }

    newLines[lineIdx] =
      line.slice(0, change.charIndex) +
      change.replacement +
      afterText;
  }

  // Write changes
  const newContent = newLines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`\n✓ Applied ${changes.length} change(s)`);

  // Verify
  const verification = fs.readFileSync(filePath, 'utf8');
  const remaining = (verification.match(/—/g) || []).length;

  if (remaining === 0) {
    console.log(`✓ VERIFIED: Zero em dashes remain in ${filePath}`);
  } else {
    console.log(`⚠ WARNING: ${remaining} em dash(es) still remain (skipped or kept)`);
  }
}

// Main
const filePath = process.argv[2];
if (!filePath) {
  console.log('Usage: node scripts/humanize-emdash.js <file-path>');
  console.log('Example: node scripts/humanize-emdash.js app/blog/best-scrambled-eggs/page.tsx');
  process.exit(1);
}

processFile(filePath);
