import urllib.request
import json
import os
import shutil

paints_map = {
    'polar-white': 1,
    'obsidian-black': 2,
    'cirrus-silver': 5,
    'selenite-grey': 7,
    'nautical-blue': 4,
    'emerald-green': 6,
    'manufaktur-alpine-grey': 11,
    'manufaktur-patagonia-red': 8,
    'manufaktur-magno-matte': 10
}

vehicle_models = {
    'sedan': '206046',
    'suv': '254146',
    'coupe': '236347'
}

with open('public/cars/scraped_mbusa_c300.json') as f:
    data = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for body_type, model_code in vehicle_models.items():
    print(f"\n--- Downloading for {body_type.upper()} ({model_code}) ---")
    for angle_folder, pov_param in [('threequarter', 'be040%2Cpzm'), ('side', 'be090%2Cpzm'), ('rear', 'be140%2Cpzm')]:
        target_dir = f'public/cars/{body_type}/{angle_folder}/mbusa'
        os.makedirs(target_dir, exist_ok=True)
        
        for pid, idx in paints_map.items():
            iris_imgs = [img['src'] for img in data[idx]['imgs'] if 'iris.jpg' in img.get('src', '')]
            if not iris_imgs:
                continue
            
            raw_url = iris_imgs[0]
            # Swap model code if needed
            model_url = raw_url.replace('/206046/', f'/{model_code}/')
            # Swap angle
            angle_url = model_url.replace('POV=be040%2Cpzm', f'POV={pov_param}')
            
            dest = f'{target_dir}/{pid}.jpg'
            if os.path.exists(dest) and os.path.getsize(dest) > 5000:
                print(f"Already exists: {dest}")
                continue
                
            try:
                req = urllib.request.Request(angle_url, headers=headers)
                with urllib.request.urlopen(req, timeout=12) as r, open(dest, 'wb') as f_out:
                    f_out.write(r.read())
                print(f"Downloaded {body_type} {pid} ({angle_folder}) -> {dest} ({os.path.getsize(dest)} bytes)")
            except Exception as e:
                print(f"Error {body_type} {pid} ({angle_folder}): {e}")

# Copy cockpit assets to suv and coupe
for body in ['suv', 'coupe']:
    os.makedirs(f'public/cars/{body}/cockpit', exist_ok=True)
    for uph in ['black', 'sienna-brown', 'macchiato-beige', 'neva-grey', 'power-red']:
        src = f'public/cars/sedan/cockpit/{uph}.webp'
        dst = f'public/cars/{body}/cockpit/{uph}.webp'
        if os.path.exists(src):
            shutil.copyfile(src, dst)
            print(f"Copied cockpit {uph} -> {dst}")

print("\nAll vehicle assets downloaded and synchronized!")
