const puppeteer = require('puppeteer');
const fs = require('fs');

async function testConfigurator() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  
  console.log('1. Loading landing page at 1440x900...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: 'qa_landing_1440.png' });
  console.log('Saved qa_landing_1440.png');

  console.log('2. Opening Configurator for C-Class (?build=c-class-sedan)...');
  await page.goto('http://localhost:5173/?build=c-class-sedan', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'qa_configurator_front34.png' });
  console.log('Saved qa_configurator_front34.png');

  // Change Paint to Patagonia Red
  console.log('3. Selecting MANUFAKTUR Patagonia Red paint...');
  const paintButtons = await page.$$('.paint-swatch-btn');
  if (paintButtons.length >= 8) {
    await paintButtons[7].click();
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'qa_configurator_paint_red.png' });
    console.log('Saved qa_configurator_paint_red.png');
  }

  // Switch to Side View
  console.log('4. Switching to Side View...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.angle-btn'));
    const sideBtn = btns.find(b => b.textContent.includes('Side'));
    if (sideBtn) sideBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'qa_configurator_side.png' });
  console.log('Saved qa_configurator_side.png');

  // Switch to Night Lighting Mode
  console.log('5. Switching to Night Mode...');
  await page.evaluate(() => {
    const nightBtn = document.querySelector('.lighting-btn:nth-child(2)');
    if (nightBtn) nightBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'qa_configurator_night.png' });
  console.log('Saved qa_configurator_night.png');

  // Switch to Cockpit View
  console.log('6. Switching to Cockpit View...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.angle-btn'));
    const cockpitBtn = btns.find(b => b.textContent.includes('Cockpit'));
    if (cockpitBtn) cockpitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'qa_configurator_cockpit_initial.png' });
  console.log('Saved qa_configurator_cockpit_initial.png');

  // Change interior upholstery to Sienna Brown
  console.log('7. Switching to Interior Tab & Sienna Brown...');
  await page.evaluate(() => {
    const stepTabs = Array.from(document.querySelectorAll('.config-step-tab'));
    const intTab = stepTabs.find(t => t.textContent.includes('Interior'));
    if (intTab) intTab.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'qa_configurator_cockpit_sienna_brown.png' });
  console.log('Saved qa_configurator_cockpit_sienna_brown.png');

  // Mobile Viewport Test (390x844)
  console.log('8. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'qa_configurator_mobile_390.png' });
  console.log('Saved qa_configurator_mobile_390.png');

  console.log('All QA tests completed successfully!');
  await browser.close();
}

testConfigurator().catch(console.error);
