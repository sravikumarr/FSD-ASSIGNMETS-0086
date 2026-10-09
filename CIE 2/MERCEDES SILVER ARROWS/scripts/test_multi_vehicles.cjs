const puppeteer = require('puppeteer');

async function testAllClasses() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  const testVehicles = [
    { id: 'glc-electric-suv', name: 'GLC Electric SUV' },
    { id: 's-class-sedan', name: 'S-Class Sedan' },
    { id: 'amg-gt-coupe', name: 'AMG GT Coupe' },
    { id: 'sl-roadster', name: 'SL Roadster' }
  ];

  for (const v of testVehicles) {
    console.log(`Testing vehicle: ${v.name} (${v.id})...`);
    await page.goto(`http://localhost:5173/?build=${v.id}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `qa_${v.id}.png` });
    console.log(`Saved qa_${v.id}.png`);
  }

  await browser.close();
  console.log('Multi-vehicle verification finished successfully!');
}

testAllClasses().catch(console.error);
