const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const testCases = [
    { vId: 'eqs-sedan', name: 'EQS 450+ Sedan', paints: ['polar-white', 'nautical-blue', 'manufaktur-patagonia-red'] },
    { vId: 'g-class-suv', name: 'G 550 SUV', paints: ['polar-white', 'obsidian-black', 'manufaktur-patagonia-red', 'emerald-green'] },
    { vId: 's-class-sedan', name: 'S 500 4MATIC Sedan', paints: ['cirrus-silver', 'emerald-green', 'manufaktur-patagonia-red'] },
    { vId: 'maybach-s-class', name: 'Mercedes-Maybach S 580', paints: ['obsidian-black', 'cirrus-silver', 'manufaktur-patagonia-red'] },
    { vId: 'sl-roadster', name: 'AMG SL Roadster', paints: ['polar-white', 'nautical-blue', 'manufaktur-patagonia-red'] },
  ];

  for (const tc of testCases) {
    console.log(`\n========================================`);
    console.log(`Testing Vehicle: ${tc.name} (${tc.vId})`);
    console.log(`========================================`);

    await page.goto(`http://localhost:5173/?build=${tc.vId}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    for (const paintId of tc.paints) {
      console.log(`  -> Selecting paint: ${paintId}`);
      await page.evaluate((pid) => {
        const btns = Array.from(document.querySelectorAll('.paint-swatch-btn'));
        const btn = btns.find(b => {
          const title = (b.getAttribute('title') || '').toLowerCase();
          return title.includes(pid.replace('manufaktur-', '').replace('-', ' ')) ||
                 title.includes(pid.replace('-', ' '));
        });
        if (btn) btn.click();
      }, paintId);

      await new Promise(r => setTimeout(r, 1200));

      const activeImg = await page.evaluate(() => {
        const img = document.querySelector('.stage-car-layer.layer-active');
        return img ? img.src : null;
      });

      console.log(`     Active Image: ${activeImg}`);
      await page.screenshot({ path: `qa_final_${tc.vId}_${paintId}.png` });
    }
  }

  await browser.close();
  console.log('\nAll vehicles QA completed successfully!');
})();
