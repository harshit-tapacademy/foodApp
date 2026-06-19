import puppeteer from 'puppeteer'

const BASE = process.env.BASE_URL || 'http://localhost:4280'
const consoleErrors = []
const failedRequests = []
let failures = 0

const assert = (cond, msg) => {
  if (cond) {
    console.log('  PASS:', msg)
  } else {
    console.log('  FAIL:', msg)
    failures++
  }
}

const run = async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page = await browser.newPage()

  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text())
  })
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`)
  })
  page.on('response', (res) => {
    const u = res.url()
    if (u.includes('images.unsplash.com') && res.status() >= 400) {
      failedRequests.push(`IMG ${res.status()} ${u}`)
    }
  })

  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })

  // ---- Restaurant card -> modal ----
  await page.waitForSelector('.resto', { timeout: 15000 })
  await page.click('.resto')
  await page.waitForSelector('.modal', { timeout: 8000 })
  const menuItems = await page.$$('.menu-row')
  assert(menuItems.length > 0, `modal opens and renders ${menuItems.length} menu items`)

  // ---- ADD + in modal -> stepper + cart count ----
  await page.waitForSelector('.menu-row__add', { timeout: 5000 })
  await page.click('.menu-row .menu-row__add') // first ADD + button
  await page.waitForSelector('.menu-row .stepper', { timeout: 5000 })
  assert(true, 'ADD + turns into a stepper')
  const cartLabel = await page.$eval('.nav__cta button[aria-label="Open cart"]', (b) => b.textContent)
  assert(/·\s*1/.test(cartLabel), `nav cart count increments (got "${cartLabel.trim()}")`)

  // close modal via Escape
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => !document.querySelector('.modal'), { timeout: 5000 })
  assert(true, 'Escape closes the modal')

  // ---- Cart drawer + bill ----
  await page.$eval('.nav__cta button[aria-label="Open cart"]', (b) => b.click())
  await page.waitForSelector('.drawer__bill', { timeout: 5000 })
  const billText = await page.$eval('.drawer__bill', (el) => el.textContent)
  assert(billText.includes('Item total') && billText.includes('₹'), 'bill renders item total with ₹')
  assert(billText.includes('Delivery fee') && billText.includes('GST'), 'bill renders delivery fee + GST')
  const toPay = await page.$eval('.bill-row--total', (el) => el.textContent)
  assert(/₹/.test(toPay), `to-pay row renders (${toPay.trim()})`)

  // ---- Place order -> success ----
  await page.$eval('.drawer__checkout', (b) => { b.scrollIntoView(); b.click() })
  await page.waitForFunction(
    () => document.querySelector('.drawer__empty h4')?.textContent?.includes('Order placed'),
    { timeout: 5000 }
  )
  assert(true, 'Place order shows success state')

  // close drawer (Done button) — evaluate-click to avoid animation race
  await page.$eval('.drawer__empty .btn', (b) => b.click())
  await page.waitForFunction(() => !document.querySelector('.drawer'), { timeout: 8000 })
  assert(true, 'cart drawer closes after order')

  // ---- Responsiveness: 3 viewports, no horizontal overflow ----
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ]
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height })
    await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
    await new Promise((r) => setTimeout(r, 400))
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    assert(overflow <= 2, `[${vp.name} ${vp.width}px] no horizontal overflow (delta=${overflow}px)`)
    const navVisible = await page.evaluate(() => {
      const n = document.querySelector('.nav')
      if (!n) return false
      const r = n.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    })
    assert(navVisible, `[${vp.name}] nav is visible`)
    await page.screenshot({ path: `e2e/${vp.name}.png`, fullPage: false })
  }

  await browser.close()

  console.log('\n--- console errors ---')
  console.log(consoleErrors.length ? consoleErrors.join('\n') : '(none)')
  console.log('--- failed/4xx requests ---')
  console.log(failedRequests.length ? failedRequests.join('\n') : '(none)')

  const ok = failures === 0 && consoleErrors.length === 0 && failedRequests.length === 0
  console.log(`\nRESULT: ${ok ? 'ALL GREEN' : 'ISSUES FOUND'} (assertion failures=${failures}, consoleErrors=${consoleErrors.length}, failedReq=${failedRequests.length})`)
  process.exit(ok ? 0 : 1)
}

run().catch((e) => { console.error('E2E crashed:', e); process.exit(2) })
