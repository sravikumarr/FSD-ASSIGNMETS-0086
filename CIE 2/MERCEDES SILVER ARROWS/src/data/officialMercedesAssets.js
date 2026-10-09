/**
 * officialMercedesAssets.js
 * Official Mercedes-Benz BYO imagery integration.
 * Connects all 24 vehicle models, paint finishes, wheel options, and cockpit views
 * directly to authentic Mercedes-Benz studio photography from mbusa.com.
 */

import manifest from './vehicleAssetsManifest.json';

// Official Mercedes-Benz Paint Image Mapping for C-Class Sedan
const C_CLASS_PAINTS = {
  'polar-white': '/cars/sedan/threequarter/mbusa/polar-white.jpg',
  'obsidian-black': '/cars/sedan/threequarter/mbusa/obsidian-black.jpg',
  'cirrus-silver': '/cars/sedan/threequarter/mbusa/cirrus-silver.jpg',
  'selenite-grey': '/cars/sedan/threequarter/mbusa/selenite-grey.jpg',
  'nautical-blue': '/cars/sedan/threequarter/mbusa/nautical-blue.jpg',
  'emerald-green': '/cars/sedan/threequarter/mbusa/emerald-green.jpg',
  'manufaktur-alpine-grey': '/cars/sedan/threequarter/mbusa/manufaktur-alpine-grey.jpg',
  'manufaktur-patagonia-red': '/cars/sedan/threequarter/mbusa/manufaktur-patagonia-red.jpg',
  'manufaktur-magno-matte': '/cars/sedan/threequarter/mbusa/manufaktur-magno-matte.jpg',
};

// C-Class Side & Rear Angles
const C_CLASS_SIDE = {
  'polar-white': '/cars/sedan/side/mbusa/polar-white.jpg',
  'obsidian-black': '/cars/sedan/side/mbusa/obsidian-black.jpg',
  'cirrus-silver': '/cars/sedan/side/mbusa/cirrus-silver.jpg',
  'selenite-grey': '/cars/sedan/side/mbusa/selenite-grey.jpg',
  'nautical-blue': '/cars/sedan/side/mbusa/nautical-blue.jpg',
  'emerald-green': '/cars/sedan/side/mbusa/emerald-green.jpg',
  'manufaktur-alpine-grey': '/cars/sedan/side/mbusa/manufaktur-alpine-grey.jpg',
  'manufaktur-patagonia-red': '/cars/sedan/side/mbusa/manufaktur-patagonia-red.jpg',
  'manufaktur-magno-matte': '/cars/sedan/side/mbusa/manufaktur-magno-matte.jpg',
};

const C_CLASS_REAR = {
  'polar-white': '/cars/sedan/rear/mbusa/polar-white.jpg',
  'obsidian-black': '/cars/sedan/rear/mbusa/obsidian-black.jpg',
  'cirrus-silver': '/cars/sedan/rear/mbusa/cirrus-silver.jpg',
  'selenite-grey': '/cars/sedan/rear/mbusa/selenite-grey.jpg',
  'nautical-blue': '/cars/sedan/rear/mbusa/nautical-blue.jpg',
  'emerald-green': '/cars/sedan/rear/mbusa/emerald-green.jpg',
  'manufaktur-alpine-grey': '/cars/sedan/rear/mbusa/manufaktur-alpine-grey.jpg',
  'manufaktur-patagonia-red': '/cars/sedan/rear/mbusa/manufaktur-patagonia-red.jpg',
  'manufaktur-magno-matte': '/cars/sedan/rear/mbusa/manufaktur-magno-matte.jpg',
};

// Official Mercedes-Benz Wheel Image Mapping
const WHEEL_FILE_MAP = {
  'w-19-multispoke': '/cars/sedan/wheels/mbusa/18-inch-5-spoke.jpg',
  'w-20-amg-twin5': '/cars/sedan/wheels/mbusa/19-inch-amg-twin-5-spoke.jpg',
  'w-21-amg-multispoke': '/cars/sedan/wheels/mbusa/19-inch-amg-multispoke.jpg',
  'w-22-amg-forged': '/cars/sedan/wheels/mbusa/18-inch-amg-5-spoke.jpg',
};

// Official DAM Swatches
export const MBUSA_SWATCHES = {
  paints: {
    'polar-white': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-149.jpg',
    'obsidian-black': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-197.jpg',
    'cirrus-silver': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-922.jpg',
    'selenite-grey': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-992.jpg',
    'nautical-blue': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-842.jpg',
    'emerald-green': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-970.jpg',
    'manufaktur-alpine-grey': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-956.jpg',
    'manufaktur-patagonia-red': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-993.jpg',
    'manufaktur-magno-matte': '/cars/swatches/paints/BYO-PAINT-THUMBNAIL-831.jpg',
  },
  wheels: {
    'w-19-multispoke': '/cars/swatches/wheels/2026-C-SEDAN-WHEEL-THUMBNAIL-R32.jpg',
    'w-20-amg-twin5': '/cars/swatches/wheels/2026-C-SEDAN-WHEEL-THUMBNAIL-RVD.jpg',
    'w-21-amg-multispoke': '/cars/swatches/wheels/2026-C-SEDAN-WHEEL-THUMBNAIL-RVC.jpg',
    'w-22-amg-forged': '/cars/swatches/wheels/2026-C-SEDAN-WHEEL-THUMBNAIL-RSK.jpg',
  },
  upholstery: {
    'u-black-mbtex': '/cars/swatches/upholstery/2026-C-SEDAN-UPHOLSTERY-SWATCH-118.jpg',
    'u-sienna-brown-leather': '/cars/swatches/upholstery/2026-C-SEDAN-UPHOLSTERY-SWATCH-194.jpg',
    'u-macchiato-beige': '/cars/swatches/upholstery/2026-C-SEDAN-UPHOLSTERY-SWATCH-804.jpg',
    'u-neva-grey-nappa': '/cars/swatches/upholstery/2026-C-SEDAN-UPHOLSTERY-SWATCH-118.jpg',
    'u-carmine-red-nappa': '/cars/swatches/upholstery/2026-C-SEDAN-UPHOLSTERY-SWATCH-194.jpg',
  }
};

/**
 * Returns the exact official Mercedes-Benz studio image URL for any configured vehicle
 * @param {Object} params
 * @param {Object} params.vehicle Selected vehicle object
 * @param {Object} params.paint Selected paint object
 * @param {Object} params.wheel Selected wheel object
 * @param {Object} params.upholstery Selected upholstery object
 * @param {string} params.view Angle: 'front-34' | 'side' | 'rear-34' | 'cockpit'
 * @param {string} params.theme Lighting: 'day' | 'night'
 * @param {string} params.bodyType Body type: 'sedan' | 'suv' | 'coupe'
 * @returns {string} Official Mercedes-Benz image URL
 */
export function getOfficialCarImageUrl({ vehicle, paint, wheel, upholstery, view = 'front-34', theme = 'day', bodyType = 'sedan' }) {
  const vId = vehicle?.id || 'c-class-sedan';
  const paintId = paint?.id || 'polar-white';

  // 1. Cockpit view: Authentic unmodified high-res Mercedes interior
  if (view === 'cockpit' || view === 'interior') {
    if (vId.includes('maybach')) {
      return '/cars/cockpits/maybach.jpg';
    }
    if (vId.includes('suv') || vId.includes('g-class') || vId.includes('gls') || vId.includes('gle') || vId.includes('glc')) {
      return '/cars/cockpits/suv.jpg';
    }
    return '/cars/cockpits/sedan.jpg';
  }

  // 2. C-Class Sedan custom angles & wheels
  if (vId === 'c-class-sedan') {
    if (view === 'side') {
      return C_CLASS_SIDE[paintId] || C_CLASS_SIDE['polar-white'];
    }
    if (view === 'rear-34') {
      return C_CLASS_REAR[paintId] || C_CLASS_REAR['polar-white'];
    }
    if (wheel && wheel.id && wheel.id !== 'w-19-multispoke' && WHEEL_FILE_MAP[wheel.id]) {
      return WHEEL_FILE_MAP[wheel.id];
    }
    return `/cars/vehicles/c-class-sedan/paints/${paintId}.jpg`;
  }

  // 3. Side & Rear angles if specifically selected and available in manifest
  const vMeta = manifest[vId];
  if (view === 'side' && vMeta && vMeta.side && vMeta.side !== vMeta.base) return vMeta.side;
  if (view === 'rear-34' && vMeta && vMeta.rear && vMeta.rear !== vMeta.base) return vMeta.rear;

  // 4. Paint-specific photo for this vehicle (All 24 models)
  return `/cars/vehicles/${vId}/paints/${paintId}.jpg`;
}

