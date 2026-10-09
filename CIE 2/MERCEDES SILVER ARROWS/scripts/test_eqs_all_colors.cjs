const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to local EQS 450+ Sedan configurator...');
  await page.goto('http://localhost:5173/?build=eqs-sedan', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Find all paint option swatches on the page
  const paintButtons = await page.$$('.option-card, .swatch-card, button[title*="White"], button[title*="Black"], button[title*="Red"], button[title*="Silver"], button[title*="Blue"], button[title*="Grey"]');
  console.log(`Found ${paintButtons.length} paint buttons.`);

  // Let's click each paint option by evaluating document swatches
  const paintIds = [
    'polar-white',
    'obsidian-black',
    'cirrus-silver',
    'selenite-grey',
    'nautical-blue',
    'manufaktur-patagonia-red',
    'manufaktur-magno-matte'
  ];

  for (const pid of paintIds) {
    console.log(`Testing click on paint: ${pid}`);
    await page.evaluate((targetId) => {
      // Find button or swatch matching targetId
      const el = document.querySelector(`[data-id="${targetId}"], [id="${targetId}"]`) ||
        Array.from(document.querySelectorAll('.option-card, .paint-swatch-item, .swatch-button, div, button'))
          .find(e => e.textContent && e.textContent.toLowerCase().includes(targetId.replace('manufaktur-', '').replace('-', ' ')));
      if (el) el.click();
    }, pid);

    await new Promise(r => setTimeout(r, 1200));

    const imgSrc = await page.evaluate(() => {
      const img = document.querySelector('.stage-car-layer.layer-active, .stage-exterior-layer-stack img');
      return img ? img.src : null;
    });

    console.log(`  -> Current Stage Image Src: ${imgSrc}`);
    await page.screenshot({ path: `qa_eqs_${pid}.png` });
  }

  await browser.close();
  console.log('EQS color test completed!');
})();
