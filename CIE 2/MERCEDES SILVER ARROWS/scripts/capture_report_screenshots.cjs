const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'report_screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching browser for report screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  
  // 1. Landing Hero
  console.log('Capturing 01_hero_landing.png...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_hero_landing.png') });

  // 2. Vehicle Grid
  console.log('Capturing 02_vehicle_grid_catalog.png...');
  await page.evaluate(() => {
    window.scrollTo({ top: 480, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_vehicle_grid_catalog.png') });

  // 3. EV Category Filter
  console.log('Capturing 03_ev_category_filter.png...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cat-tab-btn'));
    const evTab = tabs.find(t => t.textContent.includes('Electric') || t.textContent.includes('EV'));
    if (evTab) evTab.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_ev_category_filter.png') });

  // 4. Configurator Exterior Studio (C-Class)
  console.log('Capturing 04_configurator_exterior_studio.png...');
  await page.goto('http://localhost:5173/?build=c-class-sedan', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_configurator_exterior_studio.png') });

  // 5. Paint Customization (MANUFAKTUR Patagonia Red)
  console.log('Capturing 05_paint_customization_red.png...');
  const paintButtons = await page.$$('.paint-swatch-btn');
  if (paintButtons.length >= 8) {
    await paintButtons[7].click();
    await new Promise(r => setTimeout(r, 1800));
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_paint_customization_red.png') });

  // 6. Side Profile & Wheels
  console.log('Capturing 06_side_profile_wheels.png...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.angle-btn'));
    const sideBtn = btns.find(b => b.textContent.includes('Side'));
    if (sideBtn) sideBtn.click();
    const stepTabs = Array.from(document.querySelectorAll('.config-step-tab'));
    const wheelsTab = stepTabs.find(t => t.textContent.includes('Wheels'));
    if (wheelsTab) wheelsTab.click();
  });
  await new Promise(r => setTimeout(r, 1800));
  // Click second wheel option if available
  const wheelCards = await page.$$('.wheel-card');
  if (wheelCards.length > 1) {
    await wheelCards[1].click();
    await new Promise(r => setTimeout(r, 1200));
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_side_profile_wheels.png') });

  // 7. Night Ambient Lighting
  console.log('Capturing 07_night_ambient_lighting.png...');
  await page.evaluate(() => {
    const nightBtn = document.querySelector('.lighting-btn:nth-child(2)');
    if (nightBtn) nightBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_night_ambient_lighting.png') });

  // 8. Interior Cockpit View & Sienna Brown
  console.log('Capturing 08_interior_cockpit_view.png...');
  await page.evaluate(() => {
    // Switch back to day lighting
    const dayBtn = document.querySelector('.lighting-btn:nth-child(1)');
    if (dayBtn) dayBtn.click();

    // Select Cockpit view
    const btns = Array.from(document.querySelectorAll('.angle-btn'));
    const cockpitBtn = btns.find(b => b.textContent.includes('Cockpit'));
    if (cockpitBtn) cockpitBtn.click();

    // Select Interior tab
    const stepTabs = Array.from(document.querySelectorAll('.config-step-tab'));
    const intTab = stepTabs.find(t => t.textContent.includes('Interior'));
    if (intTab) intTab.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  // Click an upholstery swatch
  const upholSwatches = await page.$$('.upholstery-swatch-btn, .color-swatch-btn, .interior-swatch');
  if (upholSwatches.length > 1) {
    await upholSwatches[1].click();
    await new Promise(r => setTimeout(r, 1200));
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_interior_cockpit_view.png') });

  // 9. Maybach Luxury Config
  console.log('Capturing 09_maybach_luxury_config.png...');
  await page.goto('http://localhost:5173/?build=maybach-eqs-suv', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_maybach_luxury_config.png') });

  // 10. G-Class Iconic SUV
  console.log('Capturing 10_gclass_iconic_suv.png...');
  await page.goto('http://localhost:5173/?build=g-class-suv', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10_gclass_iconic_suv.png') });

  // 11. Build Summary Modal
  console.log('Capturing 11_build_summary_modal.png...');
  await page.evaluate(() => {
    const summaryBtn = document.querySelector('.view-summary-btn, .summary-btn, .bottom-bar-action-btn');
    if (summaryBtn) {
      summaryBtn.click();
    } else {
      // Find button by text
      const allBtns = Array.from(document.querySelectorAll('button'));
      const found = allBtns.find(b => b.textContent.includes('Summary') || b.textContent.includes('Review'));
      if (found) found.click();
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11_build_summary_modal.png') });

  // 12. Save Build & Open Saved Builds Drawer
  console.log('Capturing 12_saved_builds_drawer.png...');
  // Close summary modal if open, then click Save Build
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.modal-close-btn, .modal-backdrop');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Save'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Open drawer via Header button
  await page.evaluate(() => {
    const savedBtn = document.querySelector('.saved-builds-trigger, .header-saved-btn');
    if (savedBtn) {
      savedBtn.click();
    } else {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const found = allBtns.find(b => b.textContent.includes('Saved'));
      if (found) found.click();
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '12_saved_builds_drawer.png') });

  // 13. Mobile Responsive View (iPhone 14: 390x844)
  console.log('Capturing 13_mobile_responsive_view.png...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173/?build=sl-roadster', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '13_mobile_responsive_view.png') });

  console.log('All 13 high-resolution screenshots captured successfully!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
