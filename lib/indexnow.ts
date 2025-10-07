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
  const urls = [
    `https://${HOST}`,
    `https://${HOST}/about`,
    `https://${HOST}/contact`,
    `https://${HOST}/knives`,
    `https://${HOST}/cookware`,
    `https://${HOST}/appliances`,
    `https://${HOST}/methodology`,
    `https://${HOST}/glossary`,
    `https://${HOST}/newsletter`,
    `https://${HOST}/disclosure`,
    `https://${HOST}/privacy-policy`,
    `https://${HOST}/terms`,
    `https://${HOST}/cookie-policy`,
    `https://${HOST}/best-budget-chef-knife`,
    `https://${HOST}/best-knife-for-cutting-meat`,
    `https://${HOST}/kitchen-bundle`,
    `https://${HOST}/reviews`,
    `https://${HOST}/reviews/victorinox-fibrox-10-inch-chefs-knife`,
    `https://${HOST}/reviews/victorinox-fibrox-8-inch-chefs-knife`,
    `https://${HOST}/reviews/victorinox-4-inch-paring-knife`,
    `https://${HOST}/reviews/victorinox-granton-edge-boning-knife`,
    `https://${HOST}/reviews/victorinox-offset-bread-knife`,
    `https://${HOST}/reviews/oxo-good-grips-swivel-peeler`,
    `https://${HOST}/reviews/oxo-good-grips-bench-scraper`,
    `https://${HOST}/reviews/winco-heavy-duty-tongs`,
    `https://${HOST}/reviews/benriner-large-mandoline`,
    `https://${HOST}/reviews/gold-textiles-bar-mops`,
    `https://${HOST}/reviews/epicurean-kitchen-cutting-board`,
    `https://${HOST}/reviews/kitchenaid-ksm8990wh`,
    `https://${HOST}/reviews/robot-coupe-r2-dice`,
    `https://${HOST}/reviews/vitamix-5200`,
    `https://${HOST}/reviews/wusthof-classic-ikon-16-piece`,
    `https://${HOST}/reviews/le-creuset-signature-7-25-qt-dutch-oven`,
    `https://${HOST}/reviews/john-boos-platinum-commercial-cutting-board`,
    `https://${HOST}/reviews/lodge-seasoned-cast-iron-3-skillet-bundle`,
    `https://${HOST}/blog`,
    `https://${HOST}/blog/how-to-sear-steaks-like-restaurant-chef`,
    `https://${HOST}/guides`,
    `https://${HOST}/guides/best-chef-knives`,
    `https://${HOST}/guides/best-cookware`,
    `https://${HOST}/guides/kitchen-appliances`,
    `https://${HOST}/guides/cookware-materials`,
    `https://${HOST}/guides/knife-care`
  ]

  return submitToIndexNow(urls)
}
