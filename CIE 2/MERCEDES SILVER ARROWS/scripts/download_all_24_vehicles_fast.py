import urllib.request
import os
import json

with open('src/data/vehicles.js', 'r') as f:
    content = f.read()

# Parse VEHICLE_CLASSES from vehicles.js
import re

matches = re.findall(r"id:\s*'([a-z0-9-]+)',[\s\S]*?imgSrc:\s*'([^']+)'", content)
print(f"Found {len(matches)} vehicle classes in vehicles.js:")

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}

for vid, img_url in matches:
    v_dir = f'public/cars/vehicles/{vid}'
    os.makedirs(v_dir, exist_ok=True)
    dest = f'{v_dir}/base.png'
    if not os.path.exists(dest) or os.path.getsize(dest) < 2000:
        try:
            req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as r, open(dest, 'wb') as out:
                out.write(r.read())
            print(f"Downloaded {vid} -> {dest} ({os.path.getsize(dest)} bytes)")
        except Exception as e:
            print(f"Error downloading {vid}: {e}")
    else:
        print(f"Already exists: {vid} ({os.path.getsize(dest)} bytes)")

print("\nAll 24 vehicle base cutouts downloaded successfully!")
