const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const VEHICLES = [
  { id: 'glc-electric-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/glc/suv/glc300w', modelCode: '254146', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/glc/suv/byo-options/2027-GLC-SUV-BEV-AVP-DR.png' },
  { id: 'cla-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/cla/coupe/cla250c', modelCode: '118384', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my26/cla-sedan/all-vehicles/2026-CLA-SEDAN-AVP-DR.png' },
  { id: 'eqe-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/eqe/sedan/eqe350v', modelCode: '295121', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/eqe-class/sedan/all-vehicles/2024-EQE350-4M-SEDAN-AVP-DR.png' },
  { id: 'eqe-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/eqe/suv/eqe350v', modelCode: '294121', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/eqe-suv/all-vehicles/2023-EQE350-SUV-AVP-DR.png' },
  { id: 'eqs-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/eqs/suv/eqs450v', modelCode: '296623', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/eqs-class/suv/all-vehicles/2024-EQS450-4M-SUV-AVP-DR.png' },
  { id: 'eqs-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/eqs/sedan/eqs450v', modelCode: '297123', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/eqs-class/eqs-sedan/all-vehicles/2025-EQS450-SEDAN-AVP-DR.png' },
  { id: 'maybach-eqs-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/class/eqs/maybach-suv', modelCode: '296684', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/eqs-class/maybach-suv/all-vehicles/2024-EQS-SUV-MAYBACH-AVP-DR.png' },
  { id: 'gla-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/gla/suv/gla250w', modelCode: '247746', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/gla-class/all-vehicles/2024-GLA-SUV-AVP-DR.png' },
  { id: 'glb-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/glb/suv/glb250w', modelCode: '247646', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/glb-class/all-vehicles/2024-GLB250-SUV-AVP-DR.png' },
  { id: 'glc-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/glc/suv/glc300w', modelCode: '254146', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/glc-class/suv/all-vehicles/2024-GLC-300-SUV-AVP-DR.png' },
  { id: 'gle-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/gle/suv/gle350w4', modelCode: '167159', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-GLE350-SUV-AVP-DR.png' },
  { id: 'gls-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/gls/suv/gls450w4', modelCode: '167959', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-GLS450-SUV-AVP-DR.png' },
  { id: 'g-class-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/build/g-class/suv/g550w4', modelCode: '465210', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/g-class/byo-exterior/all-vehicles/2025-G550-4M-SUV-AVP-DR.png' },
  { id: 'maybach-gls-suv', byoUrl: 'https://www.mbusa.com/en/vehicles/class/gls/maybach-suv', modelCode: '167987', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/gls-class/maybach-suv/all-vehicles/2024-GLS-MAYBACH-SUV-AVP-DR.png' },
  { id: 'c-class-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/c-class/sedan/c300w', modelCode: '206046', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/c-class/all-vehicles/2024-C-SEDAN-AVP-DR.png' },
  { id: 'e-class-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/e-class/sedan/e350w4', modelCode: '214046', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/e-class/e-sedan/all-vehicles/2025-E350-4M-SEDAN-AVP-DR.png' },
  { id: 'e-class-wagon', byoUrl: 'https://www.mbusa.com/en/vehicles/build/e-class/wagon/e450s4', modelCode: '214259', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/e-class/wagon/all-vehicles/2024-E-WAGON-AVP-DR.png' },
  { id: 's-class-sedan', byoUrl: 'https://www.mbusa.com/en/vehicles/build/s-class/sedan/s500v4', modelCode: '223063', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-S500-SEDAN-AVP-DR.png' },
  { id: 'maybach-s-class', byoUrl: 'https://www.mbusa.com/en/vehicles/build/s-class/maybach-sedan/s580z4', modelCode: '223176', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-S580-MAYBACH-SEDAN-AVP-DR.png' },
  { id: 'cle-coupe', byoUrl: 'https://www.mbusa.com/en/vehicles/build/cle/coupe/cle300c4', modelCode: '236347', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/cle-class/coupe/all-vehicles/2024-CLE300-4M-COUPE-AVP-DR.png' },
  { id: 'amg-gt-coupe', byoUrl: 'https://www.mbusa.com/en/vehicles/build/amg-gt/coupe/gt55c4', modelCode: '192377', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/amg-gt-class/2-door/all-vehicles/2024-AMG-GT55-COUPE-AVP-DR.png' },
  { id: 'amg-gt-4door', byoUrl: 'https://www.mbusa.com/en/vehicles/build/amg-gt/4-door/gt43c4', modelCode: '290659', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-AMG-GT55-4DR-COUPE-AVP-DR.png' },
  { id: 'cle-cabriolet', byoUrl: 'https://www.mbusa.com/en/vehicles/build/cle/cabriolet/cle300c4', modelCode: '236447', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/cle-class/cle-cab/all-vehicles/2025-CLE300-4M-CAB-AVP-DR.png' },
  { id: 'sl-roadster', byoUrl: 'https://www.mbusa.com/en/vehicles/build/sl/roadster/sl55r4', modelCode: '232459', fallbackImg: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/sl-class/all-vehicles/2024-AMG-SL55-ROADSTER-AVP-DR.png' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      return resolve(dest);
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, res => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(dest));
        });
      } else {
        reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
    });
    req.on('error', reject);
    req.setTimeout(12000, () => {
      req.abort();
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

async function scrapeAllVehicles() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const assetRegistry = {};

  for (let i = 0; i < VEHICLES.length; i++) {
    const v = VEHICLES[i];
    console.log(`\n[${i + 1}/${VEHICLES.length}] Processing ${v.id}...`);

    const vDir = path.join(__dirname, '..', 'public', 'cars', 'vehicles', v.id);
    fs.mkdirSync(vDir, { recursive: true });

    let primaryIrisUrl = null;

    try {
      console.log(`  Visiting BYO: ${v.byoUrl}`);
      await page.goto(v.byoUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await new Promise(r => setTimeout(r, 4000));

      const scraped = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
        const iris = imgs.find(src => src.includes('iris.jpg'));
        return { iris, imgs };
      });

      if (scraped.iris) {
        primaryIrisUrl = scraped.iris;
        console.log(`  Found Iris URL for ${v.id}`);
      }
    } catch (err) {
      console.log(`  BYO navigation notice for ${v.id}: ${err.message}`);
    }

    // Save Default / Fallback Cutout
    const fallbackPath = path.join(vDir, 'base.png');
    try {
      await downloadFile(v.fallbackImg, fallbackPath);
      console.log(`  Saved base cutout -> ${fallbackPath}`);
    } catch (e) {
      console.log(`  Error downloading fallback for ${v.id}: ${e.message}`);
    }

    // If we have an Iris URL, download 3/4, side, rear
    if (primaryIrisUrl) {
      try {
        const u34 = primaryIrisUrl;
        const uSide = primaryIrisUrl.replace('POV=be040%2Cpzm', 'POV=be090%2Cpzm');
        const uRear = primaryIrisUrl.replace('POV=be040%2Cpzm', 'POV=be140%2Cpzm');

        await downloadFile(u34, path.join(vDir, 'front-34.jpg')).catch(() => {});
        await downloadFile(uSide, path.join(vDir, 'side.jpg')).catch(() => {});
        await downloadFile(uRear, path.join(vDir, 'rear.jpg')).catch(() => {});
        console.log(`  Saved Iris angles (3/4, side, rear) for ${v.id}`);
      } catch (e) {
        console.log(`  Error downloading iris angles for ${v.id}: ${e.message}`);
      }
    }

    assetRegistry[v.id] = {
      base: `/cars/vehicles/${v.id}/base.png`,
      hasIris: !!primaryIrisUrl,
      front34: primaryIrisUrl ? `/cars/vehicles/${v.id}/front-34.jpg` : `/cars/vehicles/${v.id}/base.png`,
      side: primaryIrisUrl ? `/cars/vehicles/${v.id}/side.jpg` : `/cars/vehicles/${v.id}/base.png`,
      rear: primaryIrisUrl ? `/cars/vehicles/${v.id}/rear.jpg` : `/cars/vehicles/${v.id}/base.png`,
    };
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'vehicleAssetsManifest.json'),
    JSON.stringify(assetRegistry, null, 2)
  );
  console.log('\nSaved src/data/vehicleAssetsManifest.json with all 24 vehicle assets!');
}

scrapeAllVehicles().catch(console.error);
