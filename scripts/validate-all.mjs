#!/usr/bin/env node
/**
 * Master validation script - runs all integrity checks
 *
 * This should be run before deployment to catch all issues
 */

import { spawn } from 'child_process'

const BOLD = '\x1b[1m'
const BLUE = '\x1b[34m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const RESET = '\x1b[0m'

const validators = [
  { name: 'TypeScript Check', command: 'npx', args: ['tsc', '--noEmit'] },
  { name: 'Site Integrity', command: 'node', args: ['scripts/validate-site-integrity.mjs'] },
  { name: 'Database Integrity', command: 'node', args: ['scripts/validate-database-integrity.mjs'] },
  { name: 'Image References', command: 'node', args: ['scripts/validate-images.mjs'] },
  { name: 'Affiliate Links', command: 'node', args: ['scripts/validate-affiliate-links.mjs'] },
  { name: 'Duplicate Link Check', command: 'node', args: ['scripts/validate-duplicate-links.mjs'] },
  { name: 'Review Content Quality', command: 'node', args: ['scripts/review-tools/batch-audit.js'], ignoreError: true },
  { name: 'SEO Metadata Quality', command: 'node', args: ['scripts/extract-all-metadata.mjs'], ignoreError: true },
]

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║     RUNNING ALL VALIDATION CHECKS         ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

let totalErrors = 0

async function runValidator(validator) {
  return new Promise((resolve) => {
    console.log(`${BOLD}Running ${validator.name}...${RESET}\n`)

    const proc = spawn(validator.command, validator.args, {
      stdio: 'inherit',
      shell: true
    })

    proc.on('close', (code) => {
      if (code !== 0) {
        if (validator.ignoreError) {
          console.log(`${GREEN}✓ ${validator.name} completed (informational only)${RESET}\n`)
        } else {
          totalErrors++
          console.log(`${RED}✗ ${validator.name} failed${RESET}\n`)
        }
      } else {
        console.log(`${GREEN}✓ ${validator.name} passed${RESET}\n`)
      }
      resolve(code)
    })
  })
}

// Run all validators sequentially
for (const validator of validators) {
  await runValidator(validator)
}

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║           VALIDATION COMPLETE              ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

if (totalErrors === 0) {
  console.log(`${BOLD}${GREEN}✓✓✓ ALL VALIDATION CHECKS PASSED!${RESET}`)
  console.log(`${GREEN}Site is safe to deploy.${RESET}\n`)
  process.exit(0)
} else {
  console.log(`${BOLD}${RED}✗ ${totalErrors} validation check(s) failed${RESET}`)
  console.log(`${RED}DO NOT DEPLOY - Fix errors first${RESET}\n`)
  process.exit(1)
}
