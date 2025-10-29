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
  { name: 'Site Integrity', script: 'scripts/validate-site-integrity.mjs' },
  { name: 'Database Integrity', script: 'scripts/validate-database-integrity.mjs' },
  { name: 'Image References', script: 'scripts/validate-images.mjs' },
  { name: 'Affiliate Links', script: 'scripts/validate-affiliate-links.mjs' },
]

console.log(`${BOLD}${BLUE}╔════════════════════════════════════════════╗${RESET}`)
console.log(`${BOLD}${BLUE}║     RUNNING ALL VALIDATION CHECKS         ║${RESET}`)
console.log(`${BOLD}${BLUE}╚════════════════════════════════════════════╝${RESET}\n`)

let totalErrors = 0

async function runValidator(validator) {
  return new Promise((resolve) => {
    console.log(`${BOLD}Running ${validator.name}...${RESET}\n`)

    const proc = spawn('node', [validator.script], {
      stdio: 'inherit',
      shell: true
    })

    proc.on('close', (code) => {
      if (code !== 0) {
        totalErrors++
        console.log(`${RED}✗ ${validator.name} failed${RESET}\n`)
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
