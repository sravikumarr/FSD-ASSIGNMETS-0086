const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'public', 'cars', 'vehicles');

const TRIM_MAP = {
  'amggt43': 'amg-gt-coupe',
  'c300w': 'c-class-sedan',
  'cla220c': 'cla-sedan',
  'cle300a4': 'cle-cabriolet',
  'cle300c4': 'cle-coupe',
  'e350w': 'e-class-sedan',
  'e450s4': 'e-class-wagon',
  'eqe320x': 'eqe-suv',
  'eqe350plus': 'eqe-sedan',
  'eqs400x4': 'eqs-suv',
  'eqs450v': 'eqs-sedan',
  'g550w4': 'g-class-suv',
  'gla250w': 'gla-suv',
  'glb250w': 'glb-suv',
  'glc300w': 'glc-suv',
  'glc400e4': 'glc-electric-suv',
  'gle350w4': 'gle-suv',
  'gls450w4': 'gls-suv',
  'gls600z4': 'maybach-gls-suv',
  'gt43-4dr': 'amg-gt-4door',
  'maybach-eqs680': 'maybach-eqs-suv',
  'maybach-s580z4': 'maybach-s-class',
  's500v4': 's-class-sedan',
};

for (const [trimId, targetClassId] of Object.entries(TRIM_MAP)) {
  const trimDir = path.join(root, trimId);
  const targetDir = path.join(root, targetClassId);
  const trimPaintsDir = path.join(trimDir, 'paints');
  const targetPaintsDir = path.join(targetDir, 'paints');

  if (fs.existsSync(targetPaintsDir)) {
    if (!fs.existsSync(trimPaintsDir)) {
      fs.mkdirSync(trimPaintsDir, { recursive: true });
    }
    const files = fs.readdirSync(targetPaintsDir);
    for (const f of files) {
      const src = path.join(targetPaintsDir, f);
      const dst = path.join(trimPaintsDir, f);
      if (!fs.existsSync(dst)) {
        fs.copyFileSync(src, dst);
      }
    }
    console.log(`Synced paints for trim: ${trimId} -> ${targetClassId}`);
  }
}
