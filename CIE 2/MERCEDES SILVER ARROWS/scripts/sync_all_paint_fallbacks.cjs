const fs = require('fs');
const path = require('path');

const VEHICLE_IDS = [
  'glc-electric-suv',
  'cla-sedan',
  'eqe-sedan',
  'eqe-suv',
  'eqs-suv',
  'eqs-sedan',
  'maybach-eqs-suv',
  'gla-suv',
  'glb-suv',
  'glc-suv',
  'gle-suv',
  'gls-suv',
  'g-class-suv',
  'maybach-gls-suv',
  'c-class-sedan',
  'e-class-sedan',
  'e-class-wagon',
  's-class-sedan',
  'maybach-s-class',
  'cle-coupe',
  'amg-gt-coupe',
  'amg-gt-4door',
  'cle-cabriolet',
  'sl-roadster'
];

const ALL_PAINTS = [
  'polar-white',
  'obsidian-black',
  'cirrus-silver',
  'selenite-grey',
  'nautical-blue',
  'emerald-green',
  'manufaktur-alpine-grey',
  'manufaktur-patagonia-red',
  'manufaktur-magno-matte'
];

const vehiclesRoot = path.join(__dirname, '..', 'public', 'cars', 'vehicles');

function ensureAllPaints() {
  let totalEnsured = 0;

  for (const vId of VEHICLE_IDS) {
    const vDir = path.join(vehiclesRoot, vId);
    const pDir = path.join(vDir, 'paints');
    if (!fs.existsSync(pDir)) {
      fs.mkdirSync(pDir, { recursive: true });
    }

    // Check what paints exist
    const existingPaints = fs.readdirSync(pDir).filter(f => f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png'));

    // Base fallback if nothing exists
    const baseCandidates = [
      path.join(vDir, 'front-34.jpg'),
      path.join(vDir, 'base.png'),
      path.join(vDir, 'side.jpg')
    ];
    let defaultBase = baseCandidates.find(f => fs.existsSync(f));

    for (const paintId of ALL_PAINTS) {
      const targetJpg = path.join(pDir, `${paintId}.jpg`);
      if (!fs.existsSync(targetJpg) || fs.statSync(targetJpg).size === 0) {
        // Find best substitute in the same vehicle folder
        let substitute = null;
        if (paintId === 'manufaktur-alpine-grey') {
          substitute = [path.join(pDir, 'selenite-grey.jpg'), path.join(pDir, 'cirrus-silver.jpg'), path.join(pDir, 'polar-white.jpg')].find(f => fs.existsSync(f));
        } else if (paintId === 'manufaktur-magno-matte') {
          substitute = [path.join(pDir, 'selenite-grey.jpg'), path.join(pDir, 'obsidian-black.jpg')].find(f => fs.existsSync(f));
        } else if (paintId === 'emerald-green') {
          substitute = [path.join(pDir, 'nautical-blue.jpg'), path.join(pDir, 'obsidian-black.jpg')].find(f => fs.existsSync(f));
        } else if (paintId === 'manufaktur-patagonia-red') {
          substitute = [path.join(pDir, 'obsidian-black.jpg'), path.join(pDir, 'polar-white.jpg')].find(f => fs.existsSync(f));
        }

        if (!substitute && existingPaints.length > 0) {
          substitute = path.join(pDir, existingPaints[0]);
        }
        if (!substitute && defaultBase) {
          substitute = defaultBase;
        }

        if (substitute && fs.existsSync(substitute)) {
          fs.copyFileSync(substitute, targetJpg);
          totalEnsured++;
        }
      }
    }
  }

  console.log(`Ensured paint coverage across all 24 vehicles. Total filled: ${totalEnsured}`);
}

ensureAllPaints();
