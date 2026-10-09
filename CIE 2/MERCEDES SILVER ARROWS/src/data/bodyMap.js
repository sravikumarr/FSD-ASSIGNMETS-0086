/**
 * bodyMap.js
 * Maps vehicle body styles, model categories, and names to primary body types:
 * 'sedan', 'suv', 'coupe'.
 */

export const BODY_MAP = {
  // Sedans & Wagons
  'sedan': 'sedan',
  'wagon': 'sedan',
  'all-terrain': 'sedan',

  // SUVs
  'suv': 'suv',
  'electric-suv': 'suv',

  // Coupes & Convertibles
  'coupe': 'coupe',
  'cabriolet': 'coupe',
  'roadster': 'coupe',
};

/**
 * Resolves a vehicle object to its canonical body style
 * @param {Object} vehicle 
 * @returns {'sedan' | 'suv' | 'coupe'}
 */
export function resolveVehicleBodyType(vehicle) {
  if (!vehicle) return 'sedan';
  const str = `${vehicle.id || ''} ${vehicle.title || ''} ${vehicle.bodyStyle || ''} ${vehicle.categoryLabel || ''} ${vehicle.category || ''}`.toLowerCase();
  
  if (str.includes('suv') || str.includes('g-class') || str.includes('gls') || str.includes('gle') || str.includes('glc') || str.includes('gla') || str.includes('glb')) {
    return 'suv';
  }
  if (str.includes('coupe') || str.includes('convertible') || str.includes('cabriolet') || str.includes('roadster') || str.includes('amg-gt') || str.includes('sl-')) {
    return 'coupe';
  }
  return 'sedan';
}
