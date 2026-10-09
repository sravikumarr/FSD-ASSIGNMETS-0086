/**
 * modelMap.js
 * Describes which node/material names inside each GLB correspond to
 * paintable, wheeled, glass, and trim parts.
 *
 * When a GLB is loaded, CarStage3D logs every node and material, then
 * uses these lists to bind the correct MeshPhysicalMaterial params.
 *
 * ── DEVIATIONS ─────────────────────────────────────────────────────────────
 * No GLB files are present in /public/models/. The app falls back to a
 * fully procedural car built from BufferGeometry primitives so it never
 * breaks. The GLB-based paths will activate automatically when the files
 * are dropped in.
 *
 * Cockpit view: the procedural model has no interior mesh. The "Cockpit 360°"
 * button is hidden when running in procedural mode (logged to DEVIATIONS.md).
 * ──────────────────────────────────────────────────────────────────────────
 */

export const MODEL_MAP = {
  // --- sedan (e.g. S-Class, E-Class, CLA) ---
  sedan: {
    /** GLB path (relative to /public) */
    path: '/models/sedan.glb',
    /** Material names that should receive the paint colour */
    bodyMaterials: ['Body_Paint', 'Exterior_Base', 'Panel_Main', 'paint'],
    /** Mesh node names for each wheel position */
    wheelNodes: ['Wheel_FL', 'Wheel_FR', 'Wheel_RL', 'Wheel_RR', 'Rim_FL', 'Rim_FR', 'Rim_RL', 'Rim_RR'],
    /** Material names that get glass treatment */
    glassMaterials: ['Glass', 'Windshield', 'Window_Glass', 'glass'],
    /** Material/node names for chrome/metal trim */
    trimNodes: ['Chrome_Trim', 'Grille', 'Door_Handles', 'trim'],
    /** Whether an interior cabin mesh is present */
    hasInterior: false,
  },

  // --- suv (e.g. GLC, GLE, G-Class) ---
  suv: {
    path: '/models/suv.glb',
    bodyMaterials: ['Body_Paint', 'SUV_Body', 'Exterior_Base', 'paint'],
    wheelNodes: ['Wheel_FL', 'Wheel_FR', 'Wheel_RL', 'Wheel_RR'],
    glassMaterials: ['Glass', 'Window_Glass', 'glass'],
    trimNodes: ['Chrome_Trim', 'Roof_Rails', 'Grille', 'trim'],
    hasInterior: false,
  },

  // --- coupe (e.g. AMG GT, CLE Coupe) ---
  coupe: {
    path: '/models/coupe.glb',
    bodyMaterials: ['Body_Paint', 'Coupe_Body', 'Exterior_Base', 'paint'],
    wheelNodes: ['Wheel_FL', 'Wheel_FR', 'Wheel_RL', 'Wheel_RR'],
    glassMaterials: ['Glass', 'glass'],
    trimNodes: ['Chrome_Trim', 'Diffuser', 'Grille', 'trim'],
    hasInterior: false,
  },
};

/** Returns which model key to use for a given vehicle category */
export function getModelKey(category) {
  if (category === 'coupes' || category === 'convertibles') return 'coupe';
  if (category === 'suvs') return 'suv';
  return 'sedan'; // default for sedans, evs, etc.
}

/** Paint type constants */
export const PAINT_TYPES = {
  STANDARD: 'standard',
  METALLIC: 'metallic',
  MATTE: 'matte',
  MANUFAKTUR: 'manufaktur',
};

/** Material params per paint finish for MeshPhysicalMaterial */
export const PAINT_MATERIAL_PARAMS = {
  [PAINT_TYPES.STANDARD]: { metalness: 0, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.05 },
  [PAINT_TYPES.METALLIC]: { metalness: 0.8, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05 },
  [PAINT_TYPES.MATTE]: { metalness: 0.1, roughness: 0.8, clearcoat: 0, clearcoatRoughness: 0 },
  [PAINT_TYPES.MANUFAKTUR]: { metalness: 0.6, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.05 },
};
