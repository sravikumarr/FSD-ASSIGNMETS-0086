const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeBYO() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to MBUSA C-Class BYO...');
  await page.goto('https://www.mbusa.com/en/vehicles/build/c-class/sedan/c300w', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await new Promise(r => setTimeout(r, 6000));

  // Accept cookies if present
  try {
    await page.click('#onetrust-accept-btn-handler', { timeout: 2000 });
  } catch (e) {}

  const results = {
    paints: {},
    wheels: {},
    interiors: {},
    views: {}
  };

  // Find all swatch buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.mbs-option-swatch__button')).map((b, idx) => ({
      idx,
      aria: b.getAttribute('aria-label') || '',
      title: b.getAttribute('title') || ''
    }));
  });

  console.log(`Found ${buttons.length} swatch buttons.`);

  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    try {
      await page.evaluate((index) => {
        const btns = document.querySelectorAll('.mbs-option-swatch__button');
        if (btns[index]) btns[index].click();
      }, item.idx);

      await new Promise(r => setTimeout(r, 1000));

      const carImg = await page.evaluate(() => {
        const img = document.querySelector('img[src*="iris.jpg"], .byo-stage img, .viewer img');
        return img ? img.src : null;
      });

      console.log(`[${i + 1}/${buttons.length}] ${item.aria} -> ${carImg ? carImg.substring(0, 100) + '...' : 'null'}`);
      if (item.aria.toLowerCase().includes('paint') || item.aria.toLowerCase().includes('black') || item.aria.toLowerCase().includes('white') || item.aria.toLowerCase().includes('grey') || item.aria.toLowerCase().includes('silver') || item.aria.toLowerCase().includes('red') || item.aria.toLowerCase().includes('blue')) {
        results.paints[item.aria] = carImg;
      } else if (item.aria.toLowerCase().includes('wheel') || item.aria.toLowerCase().includes('spoke')) {
        results.wheels[item.aria] = carImg;
      } else if (item.aria.toLowerCase().includes('leather') || item.aria.toLowerCase().includes('mb-tex')) {
        results.interiors[item.aria] = carImg;
      }
    } catch (err) {
      console.error(`Error on button ${i}:`, err.message);
    }
  }

  fs.writeFileSync('public/cars/c300_byo_assets.json', JSON.stringify(results, null, 2));
  console.log('Saved to public/cars/c300_byo_assets.json');
  await browser.close();
}

scrapeBYO().catch(console.error);
