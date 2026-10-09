const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const EXACT_MODELS = [
  { id: 'maybach-s-class', url: 'https://www.mbusa.com/en/vehicles/build/s-class/maybach/s580z4' },
  { id: 'maybach-gls-suv', url: 'https://www.mbusa.com/en/vehicles/build/gls/maybach/gls600z4' },
  { id: 'amg-gt-coupe', url: 'https://www.mbusa.com/en/vehicles/build/gt/coupe/amggt43' },
  { id: 'sl-roadster', url: 'https://www.mbusa.com/en/vehicles/build/sl/roadster/sl55r4' },
  { id: 'e-class-wagon', url: 'https://www.mbusa.com/en/vehicles/build/e-class/wagon/e450s4' },
  { id: 'cla-sedan', url: 'https://www.mbusa.com/en/vehicles/build/cla/sedan/cla220c' },
  { id: 'eqe-suv', url: 'https://www.mbusa.com/en/vehicles/build/eqe/suv/eqe320x' },
  { id: 'eqs-suv', url: 'https://www.mbusa.com/en/vehicles/build/eqs/suv/eqs400x4' },
  { id: 'glc-electric-suv', url: 'https://www.mbusa.com/en/vehicles/build/glc/suv/glc400e4' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

const PAINT_KEYWORDS_PRIORITY = [
  { key: 'manufaktur-magno-matte', keywords: ['magno', 'matte', 'frosted'] },
  { key: 'manufaktur-patagonia-red', keywords: ['patagonia red', 'cardinal red', 'hyacinth red', 'jupiter red', 'rubellite red', 'manufaktur red', 'red'] },
  { key: 'manufaktur-alpine-grey', keywords: ['alpine grey', 'arabian grey', 'china blue', 'chalk', 'solid grey', 'non-metallic grey', 'moonlight white'] },
  { key: 'emerald-green', keywords: ['emerald green', 'green', 'olive metallic', 'deep green', 'forest green', 'ireland'] },
  { key: 'nautical-blue', keywords: ['nautical blue', 'sodalite blue', 'twilight blue', 'spectral blue', 'denim blue', 'vintage blue', 'blue'] },
  { key: 'cirrus-silver', keywords: ['cirrus silver', 'high-tech silver', 'iridium silver', 'mojave silver', 'verde silver', 'silver'] },
  { key: 'selenite-grey', keywords: ['selenite grey', 'graphite grey', 'mountain grey', 'silicon grey', 'grey', 'gray'] },
  { key: 'obsidian-black', keywords: ['obsidian black', 'night black', 'cosmos black', 'onyx black', 'black'] },
  { key: 'polar-white', keywords: ['polar white', 'opalite white', 'digital white', 'moonlight white', 'diamond white', 'white'] },
];

function matchPaintKey(label) {
  const l = (label || '').toLowerCase();
  for (const item of PAINT_KEYWORDS_PRIORITY) {
    for (const kw of item.keywords) {
      if (l.includes(kw)) return item.key;
    }
  }
  return null;
}

async function scrapeExact(browser, item) {
  const paintsDir = path.join(__dirname, '..', 'public', 'cars', 'vehicles', item.id, 'paints');
  if (!fs.existsSync(paintsDir)) {
    fs.mkdirSync(paintsDir, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  try {
    console.log(`[${item.id}] Loading ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await new Promise(r => setTimeout(r, 4000));

    await page.evaluate(() => {
      document.querySelectorAll('#usercentrics-root, .uc-banner-modal, #onetrust-banner-sdk').forEach(e => e.remove());
    });

    const swatches = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.mbs-option-swatch__button'));
      return btns.map((b, idx) => ({
        idx,
        label: b.getAttribute('aria-label') || b.getAttribute('title') || b.innerText || '',
      })).filter(s => s.label.length > 0);
    });

    console.log(`[${item.id}] Found ${swatches.length} swatches.`);
    const captured = {};

    for (const swatch of swatches) {
      const paintKey = matchPaintKey(swatch.label);
      if (!paintKey || captured[paintKey]) continue;

      await page.evaluate((index) => {
        const btns = document.querySelectorAll('.mbs-option-swatch__button');
        if (btns[index]) btns[index].click();
      }, swatch.idx);

      await new Promise(r => setTimeout(r, 1000));

      await page.evaluate(() => {
        const acceptBtn = Array.from(document.querySelectorAll('button'))
          .find(b => b.textContent.includes('Accept Changes') || b.textContent.includes('Confirm') || b.textContent.includes('Continue'));
        if (acceptBtn) acceptBtn.click();
      });

      await new Promise(r => setTimeout(r, 2200));

      const irisUrl = await page.evaluate(() => {
        const img = Array.from(document.querySelectorAll('img')).find(i => i.src && i.src.includes('iris.jpg'));
        return img ? img.src : null;
      });

      if (irisUrl) {
        const targetPath = path.join(paintsDir, `${paintKey}.jpg`);
        try {
          await downloadFile(irisUrl, targetPath);
          captured[paintKey] = true;
          console.log(`[${item.id}] Saved ${paintKey}.jpg`);
        } catch (e) {}
      }
    }
  } catch (err) {
    console.error(`[${item.id}] Error:`, err.message);
  } finally {
    await page.close();
  }
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const queue = [...EXACT_MODELS];
  const CONCURRENCY = 3;

  async function worker() {
    while (queue.length > 0) {
      const m = queue.shift();
      if (!m) break;
      await scrapeExact(browser, m);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  await browser.close();
  console.log('All exact models completed!');
}

run().catch(console.error);
