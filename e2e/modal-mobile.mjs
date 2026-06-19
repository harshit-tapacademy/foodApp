import puppeteer from 'puppeteer'
const BASE = process.env.BASE_URL || 'http://localhost:4280'
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 375, height: 812 })
await p.goto(BASE, { waitUntil: 'networkidle2' })
await p.waitForSelector('.resto')
await p.$eval('.resto', (e) => e.click())
await p.waitForSelector('.menu-row')
await new Promise((r) => setTimeout(r, 600))
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
console.log('modal horizontal overflow delta:', overflow)
await p.screenshot({ path: 'e2e/modal-mobile.png', fullPage: false })
await b.close()
