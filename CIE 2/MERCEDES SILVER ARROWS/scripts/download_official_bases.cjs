const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    url: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/c-class/all-vehicles/2024-C-SEDAN-AVP-DR.png',
    dest: 'public/cars/sedan/threequarter/base.png'
  },
  {
    url: 'https://www.mbusa.com/content/dam/mb-nafta/us/my27-content-request/2027-S500-SEDAN-AVP-DR.png',
    dest: 'public/cars/sedan/threequarter/s_class_base.png'
  },
  {
    url: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/glc-class/suv/all-vehicles/2024-GLC-300-SUV-AVP-DR.png',
    dest: 'public/cars/suv/threequarter/base.png'
  },
  {
    url: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/amg-gt-class/2-door/all-vehicles/2024-AMG-GT55-COUPE-AVP-DR.png',
    dest: 'public/cars/coupe/threequarter/base.png'
  },
  {
    url: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/s-sedan/byo-options/2027-S-Sedan-IH-1.jpg',
    dest: 'public/cars/sedan/cockpit/base.jpg'
  }
];

// Ensure directories exist
['public/cars/sedan/threequarter', 'public/cars/sedan/cockpit', 'public/cars/suv/threequarter', 'public/cars/coupe/threequarter'].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

async function downloadAll() {
  for (const item of downloads) {
    await new Promise((resolve) => {
      const file = fs.createWriteStream(item.dest);
      https.get(item.url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${item.dest} (${fs.statSync(item.dest).size} bytes)`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${item.url}:`, err.message);
        resolve();
      });
    });
  }
}

downloadAll();
