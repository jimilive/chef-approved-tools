// IndexNow API integration for instant search engine notification
// https://www.indexnow.org/

const INDEXNOW_KEY = '89d02782a35f44c0ad4295a681b1e8ef'
const HOST = 'www.chefapprovedtools.com'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

export async function submitToIndexNow(urls: string | string[]) {
  const urlList = Array.isArray(urls) ? urls : [urls]

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
      })
    })

    if (response.ok) {
      console.log(`✅ IndexNow: Successfully submitted ${urlList.length} URL(s)`)
      return { success: true, status: response.status }
    } else {
      console.error(`❌ IndexNow error: ${response.status}`, await response.text())
      return { success: false, status: response.status }
    }
  } catch (error) {
    console.error('❌ IndexNow submission failed:', error)
    return { success: false, error }
  }
}

// Submit all URLs from sitemap
export async function submitAllUrls() {
  try {
    // Fetch the sitemap dynamically
    const sitemapResponse = await fetch(`https://${HOST}/sitemap.xml`)
    const sitemapXml = await sitemapResponse.text()

    // Extract all URLs from <loc> tags
    const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g)
    if (!urlMatches) {
      console.error('❌ No URLs found in sitemap')
      return { success: false, error: 'No URLs in sitemap' }
    }

    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''))
    console.log(`📋 Found ${urls.length} URLs in sitemap`)

    return submitToIndexNow(urls)
  } catch (error) {
    console.error('❌ Failed to fetch sitemap:', error)
    return { success: false, error }
  }
}
