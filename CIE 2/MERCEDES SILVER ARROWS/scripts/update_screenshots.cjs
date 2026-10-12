const puppeteer = require('puppeteer');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'report_screenshots');

async function updateSpecificScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. All vehicles grid
  console.log('Updating 02_vehicle_grid_catalog.png...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollTo({ top: 380, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_vehicle_grid_catalog.png') });

  // 2. Expand Models accordion on first vehicle card
  console.log('Capturing 03_models_expanded_disclosure.png...');
  await page.evaluate(() => {
    const accordions = Array.from(document.querySelectorAll('.choose-models-toggle, .disclosure-toggle, button'));
    const btn = accordions.find(b => b.textContent.includes('Choose Models'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_models_expanded_disclosure.png') });

  // 3. Saved Builds Drawer with populated builds
  console.log('Updating 12_saved_builds_drawer.png...');
  await page.evaluate(() => {
    const mockBuilds = [
      {
        id: 'build_1',
        savedAt: 'Oct 12, 2026',
        totalPrice: 54500,
        vehicle: {
          id: 'c-class-sedan',
          title: 'C-Class Sedan',
          imgSrc: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/c-class/sedan/all-vehicles/2024-C-SEDAN-AVP-DR.png'
        },
        trim: {
          id: 'c300w',
          name: 'C 300 Sedan'
        },
        paint: {
          name: 'MANUFAKTUR Patagonia Red Metallic',
          colorHex: '#991122'
        },
        wheel: {
          size: '20" AMG Twin 5-Spoke'
        },
        upholstery: {
          name: 'Sienna Brown / Black Leather'
        }
      },
      {
        id: 'build_2',
        savedAt: 'Oct 12, 2026',
        totalPrice: 183100,
        vehicle: {
          id: 'maybach-eqs-suv',
          title: 'Mercedes-Maybach EQS SUV',
          imgSrc: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/maybach/eqs-suv/all-vehicles/2024-MAYBACH-EQS-SUV-AVP-DR.png'
        },
        trim: {
          id: 'maybach-eqs-680',
          name: 'Mercedes-Maybach EQS 680 SUV'
        },
        paint: {
          name: 'Obsidian Black Metallic',
          colorHex: '#111111'
        },
        wheel: {
          size: '21" Maybach Multi-Spoke'
        },
        upholstery: {
          name: 'Exclusive Nappa Leather'
        }
      }
    ];
    localStorage.setItem('mb_saved_builds', JSON.stringify(mockBuilds));
  });

  // Reload page to pick up localStorage and open drawer
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const savedBtn = document.querySelector('.header-saved-btn, .saved-builds-trigger') ||
      Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Saved'));
    if (savedBtn) savedBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '12_saved_builds_drawer.png') });

  await browser.close();
  console.log('Updated screenshots successfully!');
}

updateSpecificScreenshots().catch(console.error);
