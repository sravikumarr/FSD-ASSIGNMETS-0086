const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const REMAINING_VEHICLES = [
  { id: 'maybach-s-class', urls: ['https://www.mbusa.com/en/vehicles/build/maybach-s-class/sedan/maybach-s580z4', 'https://www.mbusa.com/en/vehicles/build/maybach-s-class/sedan/maybach-s680z4'] },
  { id: 'maybach-gls-suv', urls: ['https://www.mbusa.com/en/vehicles/build/maybach-gls/suv/gls600z4'] },
  { id: 'maybach-eqs-suv', urls: ['https://www.mbusa.com/en/vehicles/build/maybach-eqs/suv/maybach-eqs680'] },
  { id: 'amg-gt-coupe', urls: ['https://www.mbusa.com/en/vehicles/build/amg-gt/coupe/amggt55c4', 'https://www.mbusa.com/en/vehicles/build/amg-gt/coupe/amggt63c4', 'https://www.mbusa.com/en/vehicles/build/amg-gt/coupe/amggt43'] },
  { id: 'amg-gt-4door', urls: ['https://www.mbusa.com/en/vehicles/build/amg-gt/4-door/gt43-4dr', 'https://www.mbusa.com/en/vehicles/build/amg-gt/4-door/gt53-4dr'] },
  { id: 'sl-roadster', urls: ['https://www.mbusa.com/en/vehicles/build/sl/roadster/sl55', 'https://www.mbusa.com/en/vehicles/build/sl/roadster/sl63', 'https://www.mbusa.com/en/vehicles/build/sl/roadster/sl43'] },
  { id: 'e-class-wagon', urls: ['https://www.mbusa.com/en/vehicles/build/e-class/all-terrain/e450s4'] },
  { id: 'cla-sedan', urls: ['https://www.mbusa.com/en/vehicles/build/cla/coupe/cla250c', 'https://www.mbusa.com/en/vehicles/build/cla/coupe/cla250c4'] },
  { id: 'eqe-sedan', urls: ['https://www.mbusa.com/en/vehicles/build/eqe/sedan/eqe3504m', 'https://www.mbusa.com/en/vehicles/build/eqe/sedan/eqe5004m'] },
  { id: 'eqe-suv', urls: ['https://www.mbusa.com/en/vehicles/build/eqe/suv/eqe3504m', 'https://www.mbusa.com/en/vehicles/build/eqe/suv/eqe5004m'] },
  { id: 'eqs-suv', urls: ['https://www.mbusa.com/en/vehicles/build/eqs/suv/eqs4504m', 'https://www.mbusa.com/en/vehicles/build/eqs/suv/eqs5804m'] },
  { id: 'glc-electric-suv', urls: ['https://www.mbusa.com/en/vehicles/build/glc/suv/glc300w'] }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const PAINT_KEYWORDS_PRIORITY = [
  { key: 'manufaktur-magno-matte', keywords: ['magno', 'matte', 'frosted'] },
  { key: 'manufaktur-patagonia-red', keywords: ['patagonia red', 'cardinal red', 'hyacinth red', 'jupiter red', 'rubellite red', 'manufaktur red', 'red'] },
  { key: 'manufaktur-alpine-grey', keywords: ['alpine grey', 'arabian grey', 'china blue', 'chalk', 'solid grey', 'non-metallic grey'] },
  { key: 'emerald-green', keywords: ['emerald green', 'green', 'olive metallic', 'deep green', 'forest green'] },
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
      if (l.includes(kw)) {
        return item.key;
      }
    }
  }
  return null;
}

async function scrapeVehicle(browser, vehicle) {
  const vehicleDir = path.join(__dirname, '..', 'public', 'cars', 'vehicles', vehicle.id);
  const paintsDir = path.join(vehicleDir, 'paints');
  if (!fs.existsSync(paintsDir)) {
    fs.mkdirSync(paintsDir, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  for (const url of vehicle.urls) {
    try {
      console.log(`[${vehicle.id}] Trying ${url}...`);
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      if (!resp || resp.status() >= 400) continue;

      await new Promise(r => setTimeout(r, 3500));

      // Dismiss cookie banner
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

      console.log(`[${vehicle.id}] Found ${swatches.length} swatches.`);
      if (swatches.length === 0) continue;

      const capturedPaints = {};

      for (const swatch of swatches) {
        const paintKey = matchPaintKey(swatch.label);
        if (!paintKey) continue;
        if (capturedPaints[paintKey]) continue;

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
            capturedPaints[paintKey] = true;
            console.log(`[${vehicle.id}] Saved ${paintKey}.jpg`);
          } catch (dlErr) {}
        }
      }

      if (Object.keys(capturedPaints).length > 0) {
        break; // Successfully captured
      }
    } catch (e) {
      console.error(`[${vehicle.id}] Error on ${url}:`, e.message);
    }
  }

  await page.close();
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const CONCURRENCY = 3;
  const queue = [...REMAINING_VEHICLES];

  async function worker() {
    while (queue.length > 0) {
      const v = queue.shift();
      if (!v) break;
      await scrapeVehicle(browser, v);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  await browser.close();
  console.log('\nRemaining vehicles scraping completed!');
}

run().catch(console.error);
