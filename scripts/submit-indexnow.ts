// Script to manually submit all URLs to IndexNow
import { submitAllUrls } from '../lib/indexnow'

async function main() {
  console.log('🚀 Starting IndexNow submission...\n')

  const result = await submitAllUrls()

  if (result.success) {
    console.log('\n✅ SUCCESS! All URLs submitted to IndexNow')
    console.log(`HTTP Status: ${result.status}`)
  } else {
    console.log('\n❌ FAILED to submit URLs')
    console.error('Error:', result.error || `HTTP ${result.status}`)
  }
}

main()
