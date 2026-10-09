const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const VEHICLE_CONFIGS = [
  { id: 'eqs-sedan', url: 'https://www.mbusa.com/en/vehicles/build/eqs/sedan/eqs450v', name: 'EQS Sedan' },
  { id: 'c-class-sedan', url: 'https://www.mbusa.com/en/vehicles/build/c-class/sedan/c300w', name: 'C-Class Sedan' },
  { id: 'e-class-sedan', url: 'https://www.mbusa.com/en/vehicles/build/e-class/sedan/e350w', name: 'E-Class Sedan' },
  { id: 's-class-sedan', url: 'https://www.mbusa.com/en/vehicles/build/s-class/sedan/s500v4', name: 'S-Class Sedan' },
  { id: 'gle-suv', url: 'https://www.mbusa.com/en/vehicles/build/gle/suv/gle350w4', name: 'GLE SUV' },
  { id: 'gls-suv', url: 'https://www.mbusa.com/en/vehicles/build/gls/suv/gls450w4', name: 'GLS SUV' },
  { id: 'glc-suv', url: 'https://www.mbusa.com/en/vehicles/build/glc/suv/glc300w', name: 'GLC SUV' },
  { id: 'g-class-suv', url: 'https://www.mbusa.com/en/vehicles/build/g-class/suv/g550w4', name: 'G-Class SUV' },
  { id: 'eqe-sedan', url: 'https://www.mbusa.com/en/vehicles/build/eqe/sedan/eqe350plus', name: 'EQE Sedan' },
  { id: 'eqe-suv', url: 'https://www.mbusa.com/en/vehicles/build/eqe/suv/eqe350x', name: 'EQE SUV' },
  { id: 'eqs-suv', url: 'https://www.mbusa.com/en/vehicles/build/eqs/suv/eqs450x4', name: 'EQS SUV' },
  { id: 'gla-suv', url: 'https://www.mbusa.com/en/vehicles/build/gla/suv/gla250w', name: 'GLA SUV' },
  { id: 'glb-suv', url: 'https://www.mbusa.com/en/vehicles/build/glb/suv/glb250w', name: 'GLB SUV' },
  { id: 'cle-coupe', url: 'https://www.mbusa.com/en/vehicles/build/cle/coupe/cle300c4', name: 'CLE Coupe' },
  { id: 'cle-cabriolet', url: 'https://www.mbusa.com/en/vehicles/build/cle/cabriolet/cle300a4', name: 'CLE Cabriolet' },
  { id: 'cla-sedan', url: 'https://www.mbusa.com/en/vehicles/build/cla/sedan/cla250c', name: 'CLA Sedan' },
  { id: 'e-class-wagon', url: 'https://www.mbusa.com/en/vehicles/build/e-class/all-terrain/e450s4', name: 'E-Class Wagon' },
  { id: 'amg-gt-coupe', url: 'https://www.mbusa.com/en/vehicles/build/amg-gt/coupe/amggt43', name: 'AMG GT Coupe' },
  { id: 'amg-gt-4door', url: 'https://www.mbusa.com/en/vehicles/build/amg-gt/4-door/gt43-4dr', name: 'AMG GT 4-Door' },
  { id: 'sl-roadster', url: 'https://www.mbusa.com/en/vehicles/build/sl/roadster/sl43', name: 'SL Roadster' },
  { id: 'maybach-s-class', url: 'https://www.mbusa.com/en/vehicles/build/maybach-s-class/sedan/maybach-s580z4', name: 'Maybach S-Class' },
  { id: 'maybach-gls-suv', url: 'https://www.mbusa.com/en/vehicles/build/maybach-gls/suv/gls600z4', name: 'Maybach GLS SUV' },
  { id: 'maybach-eqs-suv', url: 'https://www.mbusa.com/en/vehicles/build/maybach-eqs/suv/maybach-eqs680', name: 'Maybach EQS SUV' },
  { id: 'glc-electric-suv', url: 'https://www.mbusa.com/en/vehicles/build/glc/suv/glc300w', name: 'GLC Electric SUV' }
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

async function scrapeVehiclePaints(browser, vehicle) {
  const vehicleDir = path.join(__dirname, '..', 'public', 'cars', 'vehicles', vehicle.id);
  const paintsDir = path.join(vehicleDir, 'paints');
  if (!fs.existsSync(paintsDir)) {
    fs.mkdirSync(paintsDir, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  try {
    const resp = await page.goto(vehicle.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (!resp || resp.status() >= 400) {
      console.warn(`[${vehicle.id}] HTTP ${resp ? resp.status() : 'fail'}`);
      await page.close();
      return;
    }

    await new Promise(r => setTimeout(r, 3500));

    // Dismiss cookie banner
    await page.evaluate(() => {
      document.querySelectorAll('#usercentrics-root, .uc-banner-modal, #onetrust-banner-sdk').forEach(e => e.remove());
    });

    // Extract all swatch buttons
    const swatches = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.mbs-option-swatch__button'));
      return btns.map((b, idx) => ({
        idx,
        label: b.getAttribute('aria-label') || b.getAttribute('title') || b.innerText || '',
      })).filter(s => s.label.length > 0);
    });

    console.log(`[${vehicle.id}] Found ${swatches.length} swatches.`);

    const capturedPaints = {};

    for (const swatch of swatches) {
      const paintKey = matchPaintKey(swatch.label);
      if (!paintKey) continue;
      if (capturedPaints[paintKey]) continue;

      // Click the swatch
      await page.evaluate((index) => {
        const btns = document.querySelectorAll('.mbs-option-swatch__button');
        if (btns[index]) btns[index].click();
      }, swatch.idx);

      await new Promise(r => setTimeout(r, 1000));

      // Handle "Accept Changes" modal
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
  } catch (err) {
    console.error(`[${vehicle.id}] Error: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function runParallel() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const CONCURRENCY = 4;
  const queue = [...VEHICLE_CONFIGS];

  async function worker(workerId) {
    while (queue.length > 0) {
      const v = queue.shift();
      if (!v) break;
      await scrapeVehiclePaints(browser, v);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  await browser.close();
  console.log('\nAll 24 vehicles paint scraping complete!');
}

runParallel().catch(console.error);
