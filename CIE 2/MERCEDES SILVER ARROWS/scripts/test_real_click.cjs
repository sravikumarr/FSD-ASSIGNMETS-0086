const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://www.mbusa.com/en/vehicles/build/eqs/sedan/eqs450v', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));

  // Dismiss cookie banner
  await page.evaluate(() => {
    document.querySelectorAll('#usercentrics-root, .uc-banner-modal').forEach(e => e.remove());
  });

  // Click Patagonia Red
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.mbs-option-swatch__button'))
      .find(b => (b.getAttribute('aria-label') || '').includes('Patagonia Red'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Click "Accept Changes" if modal appears
  await page.evaluate(() => {
    const acceptBtn = Array.from(document.querySelectorAll('button'))
      .find(b => b.textContent.includes('Accept Changes') || b.textContent.includes('Confirm'));
    if (acceptBtn) acceptBtn.click();
  });

  await new Promise(r => setTimeout(r, 4000));

  const imgInfo = await page.evaluate(() => {
    const img = Array.from(document.querySelectorAll('img')).find(i => i.src && i.src.includes('iris.jpg'));
    return img ? img.src : null;
  });
  console.log('Iris URL after Accept Changes:', imgInfo);

  await page.screenshot({ path: 'test_eqs_patagonia_red_final.png' });
  console.log('Saved test_eqs_patagonia_red_final.png');

  await browser.close();
})();
