const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to localhost:5173...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Top position
  await page.screenshot({ path: 'qa_scroll_0.png' });

  // Scroll 400px down (past hero)
  await page.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'qa_scroll_400.png' });

  // Scroll 800px down (into vehicle catalog)
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'qa_scroll_800.png' });

  await browser.close();
  console.log('Scroll screenshots saved successfully!');
})();
