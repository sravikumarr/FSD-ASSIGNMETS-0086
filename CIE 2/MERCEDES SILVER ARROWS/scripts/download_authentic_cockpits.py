import urllib.request
import os

os.makedirs('public/cars/cockpits', exist_ok=True)

# Authentic official high-res interior URLs from MBUSA
COCKPITS = {
    'default': 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/s-sedan/byo-options/2027-S-Sedan-IH-1.jpg',
    'maybach': 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/s-sedan/byo-options/2027-S-Sedan-IH-1.jpg',
    'suv': 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/g-class/byo-options/2025-G-CLASS-IH-1.jpg',
    'sedan': 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/s-sedan/byo-options/2027-S-Sedan-IH-1.jpg',
    'coupe': 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my27/s-sedan/byo-options/2027-S-Sedan-IH-1.jpg'
}

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}

for name, url in COCKPITS.items():
    dest = f'public/cars/cockpits/{name}.jpg'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(dest, 'wb') as f:
            f.write(r.read())
        print(f"Downloaded cockpit: {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
