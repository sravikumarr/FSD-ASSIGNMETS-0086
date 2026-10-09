const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/?build=eqs-sedan');
  await page.goto('http://localhost:5173/?build=eqs-sedan', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Get all paint swatch buttons
  const buttons = await page.$$('.paint-swatch-btn');
  console.log(`Found ${buttons.length} paint buttons.`);

  for (let i = 0; i < buttons.length; i++) {
    const btnInfo = await page.evaluate((idx) => {
      const btns = document.querySelectorAll('.paint-swatch-btn');
      const b = btns[idx];
      if (b) {
        b.click();
        return b.getAttribute('title') || b.innerText;
      }
      return null;
    }, i);

    console.log(`Clicked swatch ${i}: "${btnInfo}"`);
    await new Promise(r => setTimeout(r, 1200));

    const currentImg = await page.evaluate(() => {
      const img = document.querySelector('.stage-car-layer.layer-active');
      return img ? img.src : null;
    });

    console.log(`  -> Active Image URL: ${currentImg}`);
    await page.screenshot({ path: `test_eqs_swatch_${i}.png` });
  }

  await browser.close();
  console.log('All swatches tested for EQS!');
})();
