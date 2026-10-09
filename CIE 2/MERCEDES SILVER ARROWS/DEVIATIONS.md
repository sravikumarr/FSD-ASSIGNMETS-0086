# DEVIATIONS.md

## Architectural & Asset Notes

### 1. Photo-Layer & Official Studio Imagery Stage
- **Previous:** Procedural 3D slab car.
- **Current:** Replaced with high-fidelity official Mercedes-Benz studio photography and Iris photo layer system (`CarPhotoStage.jsx`).
- **Features:**
  - Live paint selection and dynamic metallic/gloss/matte finish preservation.
  - Multi-angle views: 3/4 Exterior (`front-34`), Side Profile (`side`), Rear 3/4 (`rear-34`), and panoramic Cockpit Interior (`cockpit`).
  - Studio Daylight vs. Night Ambient Lighting toggle.
  - Interactive Cockpit view with smooth horizontal pointer drag, inertia, boundary clamping, and live upholstery color changes.

### 2. Vehicle Body Type Mapping
- All 77 models across 24 vehicle classes map into canonical body architectures via `src/data/bodyMap.js`:
  - `sedan`, `wagon`, `sedan-coupe`, `all-terrain` -> **sedan**
  - `suv`, `suv-boxy`, `suv-coupe`, `electric-suv` -> **suv**
  - `coupe`, `sports-coupe`, `cabriolet`, `roadster` -> **coupe**

### 3. Wheel Specifications
- Visual wheel selections and rim styles update with sizing badges (18", 19", 20", 21", 22") and real-time MSRP calculations.
