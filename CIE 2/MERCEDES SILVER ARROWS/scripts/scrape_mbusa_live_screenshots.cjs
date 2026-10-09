const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, res => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
      } else {
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function scrapeVehiclePaints(vehicleId, byoUrl) {
  console.log(`\n========================================`);
  console.log(`Scraping MBUSA BYO for: ${vehicleId} (${byoUrl})`);
  console.log(`========================================`);

  const outDir = path.join(__dirname, '..', 'public', 'cars', 'vehicles', vehicleId, 'paints');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  try {
    await page.goto(byoUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await new Promise(r => setTimeout(r, 3000));

    // Dismiss Cookie Banner & Overlays
    await page.evaluate(() => {
      // Remove any usercentrics / consent modal
      const roots = document.querySelectorAll('#usercentrics-root, .uc-banner-modal, [id*="usercentrics"], [class*="cookie"], [class*="modal-backdrop"], .modal');
      roots.forEach(r => r.remove());
      // Re-enable scroll and click
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    });
    await new Promise(r => setTimeout(r, 1000));

    // Find all paint option buttons
    const targetPaints = [
      { id: 'polar-white', keywords: ['polar white', 'white'] },
      { id: 'obsidian-black', keywords: ['obsidian black', 'black metallic', 'black'] },
      { id: 'cirrus-silver', keywords: ['cirrus silver', 'silver metallic', 'high-tech silver'] },
      { id: 'selenite-grey', keywords: ['selenite grey', 'graphite grey', 'grey metallic'] },
      { id: 'nautical-blue', keywords: ['nautical blue', 'twilight blue', 'spectral blue', 'sodalite blue', 'starling blue'] },
      { id: 'emerald-green', keywords: ['emerald green', 'green metallic'] },
      { id: 'manufaktur-alpine-grey', keywords: ['alpine grey', 'manufaktur alpine', 'silicon grey', 'classic grey'] },
      { id: 'manufaktur-patagonia-red', keywords: ['patagonia red', 'cardinal red', 'hyacinth red', 'rubellite red', 'manufaktur red'] },
      { id: 'manufaktur-magno-matte', keywords: ['magno', 'matte', 'frosted', 'satin'] }
    ];

    for (const tp of targetPaints) {
      console.log(`\nSelecting ${tp.id}...`);

      const clicked = await page.evaluate((keywords) => {
        // Look specifically in paint / exterior option buttons
        const swatches = Array.from(document.querySelectorAll('.mbs-option-swatch, button[data-test-id*="paint"], button[aria-label*="paint" i], button[aria-label*="Select" i], button[aria-label*="metallic" i], button[aria-label*="white" i], button[aria-label*="black" i], button[aria-label*="red" i], button[aria-label*="grey" i], button[aria-label*="blue" i]'));
        for (const s of swatches) {
          const aria = (s.getAttribute('aria-label') || s.innerText || '').toLowerCase();
          // Exclude upholstery / interior / wheels
          if (aria.includes('leather') || aria.includes('mb-tex') || aria.includes('wheel') || aria.includes('inch') || aria.includes('night mode') || aria.includes('trim')) {
            continue;
          }
          for (const kw of keywords) {
            if (aria.includes(kw)) {
              s.click();
              return aria;
            }
          }
        }
        return null;
      }, tp.keywords);

      if (clicked) {
        console.log(`  -> Clicked: "${clicked}"`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        console.log(`  -> Swatch not found for ${tp.id}`);
      }

      // Extract Iris URL or Stage Image
      const carImgInfo = await page.evaluate(() => {
        // Find car image in visualizer
        const imgs = Array.from(document.querySelectorAll('img')).filter(img => {
          return img.src && (img.src.includes('iris.jpg') || (img.offsetWidth > 450 && !img.src.includes('global-nav') && !img.src.includes('logo')));
        });
        if (imgs.length > 0) {
          const img = imgs[0];
          const rect = img.getBoundingClientRect();
          return {
            src: img.src,
            isIris: img.src.includes('iris.jpg'),
            rect: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
          };
        }
        return null;
      });

      const destPath = path.join(outDir, `${tp.id}.jpg`);

      if (carImgInfo && carImgInfo.isIris) {
        try {
          await downloadFile(carImgInfo.src, destPath);
          console.log(`  -> Downloaded official Iris JPG: ${destPath}`);
          continue;
        } catch (e) {
          console.log(`  -> Error downloading Iris: ${e.message}`);
        }
      }

      // Fallback to high-precision stage screenshot
      if (carImgInfo && carImgInfo.rect && carImgInfo.rect.width > 200) {
        await page.screenshot({
          path: destPath,
          clip: {
            x: Math.max(0, carImgInfo.rect.x),
            y: Math.max(0, carImgInfo.rect.y),
            width: Math.min(1440, carImgInfo.rect.width),
            height: Math.min(900, carImgInfo.rect.height)
          }
        });
        console.log(`  -> Captured high-precision screenshot: ${destPath}`);
      } else {
        await page.screenshot({
          path: destPath,
          clip: { x: 30, y: 140, width: 850, height: 500 }
        });
        console.log(`  -> Captured viewport crop: ${destPath}`);
      }
    }

  } catch (err) {
    console.log(`Error in scrape: ${err.message}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  await scrapeVehiclePaints('eqs-sedan', 'https://www.mbusa.com/en/vehicles/build/eqs/sedan/eqs450v');
  console.log('\nEQS Sedan paint scrape complete!');
})();
