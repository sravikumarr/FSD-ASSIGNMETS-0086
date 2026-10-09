const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Maybach EQS SUV - Exterior
  console.log('1. Loading Maybach EQS SUV...');
  await page.goto('http://localhost:5173/?build=maybach-eqs-suv', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'qa_maybach_eqs_suv_exterior.png' });
  console.log('Saved qa_maybach_eqs_suv_exterior.png');

  // 2. Maybach EQS SUV - Cockpit
  console.log('2. Switching to Cockpit...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.angle-btn'));
    const cockpitBtn = btns.find(b => b.textContent.includes('Cockpit'));
    if (cockpitBtn) cockpitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'qa_maybach_eqs_suv_cockpit.png' });
  console.log('Saved qa_maybach_eqs_suv_cockpit.png');

  // 3. GLE SUV
  console.log('3. Loading GLE SUV...');
  await page.goto('http://localhost:5173/?build=gle-suv', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'qa_gle_suv.png' });
  console.log('Saved qa_gle_suv.png');

  // 4. G-Class SUV
  console.log('4. Loading G-Class SUV...');
  await page.goto('http://localhost:5173/?build=g-class-suv', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'qa_g_class.png' });
  console.log('Saved qa_g_class.png');

  // 5. C-Class Patagonia Red
  console.log('5. Loading C-Class and selecting Patagonia Red...');
  await page.goto('http://localhost:5173/?build=c-class-sedan', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const paintButtons = await page.$$('.paint-swatch-btn');
  if (paintButtons.length >= 8) {
    await paintButtons[7].click();
    await new Promise(r => setTimeout(r, 1500));
  }
  await page.screenshot({ path: 'qa_c_class_patagonia_red.png' });
  console.log('Saved qa_c_class_patagonia_red.png');

  await browser.close();
  console.log('All user flow tests completed!');
})();
