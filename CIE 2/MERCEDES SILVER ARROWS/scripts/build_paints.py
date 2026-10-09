import os
import cv2
import numpy as np
from PIL import Image

# Target paint definitions
PAINTS = [
  { "id": "polar-white", "name": "Polar White", "hex": "#f8f9fa", "finish": "solid", "target_lab": (245, 0, 0), "contrast": 0.9 },
  { "id": "obsidian-black", "name": "Obsidian Black Metallic", "hex": "#1a1a1c", "finish": "metallic", "target_lab": (30, 0, 0), "contrast": 1.2 },
  { "id": "cirrus-silver", "name": "Cirrus Silver Metallic", "hex": "#c8ccd0", "finish": "metallic", "target_lab": (205, 0, 0), "contrast": 1.0 },
  { "id": "selenite-grey", "name": "Selenite Grey Metallic", "hex": "#565c64", "finish": "metallic", "target_lab": (100, 0, 0), "contrast": 1.05 },
  { "id": "nautical-blue", "name": "Nautical Blue Metallic", "hex": "#1a2c4e", "finish": "metallic", "target_lab": (60, 15, -45), "contrast": 1.15 },
  { "id": "emerald-green", "name": "Emerald Green Metallic", "hex": "#12382c", "finish": "metallic", "target_lab": (55, -35, 15), "contrast": 1.15 },
  { "id": "manufaktur-alpine-grey", "name": "MANUFAKTUR Alpine Grey", "hex": "#8c9096", "finish": "solid", "target_lab": (150, 0, 0), "contrast": 0.85 },
  { "id": "manufaktur-patagonia-red", "name": "MANUFAKTUR Patagonia Red Metallic", "hex": "#9e1b27", "finish": "metallic", "target_lab": (70, 58, 38), "contrast": 1.25 },
  { "id": "manufaktur-magno-matte", "name": "MANUFAKTUR Selenite Grey Magno (Matte)", "hex": "#4a4e54", "finish": "matte", "target_lab": (85, 0, 0), "contrast": 0.8 },
]

def hex_to_lab(hex_code):
  hex_code = hex_code.lstrip('#')
  r = int(hex_code[0:2], 16)
  g = int(hex_code[2:4], 16)
  b = int(hex_code[4:6], 16)
  rgb = np.uint8([[[r, g, b]]])
  lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB)[0][0]
  return lab

def create_body_mask(bgr_img, alpha_channel):
  """
  Creates a precise mask of paintable body panels, excluding tyres, glass, chrome and background.
  """
  h, w = bgr_img.shape[:2]
  hsv = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2HSV)
  gray = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2GRAY)

  # Start with non-transparent car pixels
  car_mask = alpha_channel > 30

  # Detect wheels / tyres (very dark / bottom regions)
  wheel_tyre_mask = (gray < 42) & (alpha_channel > 50)
  
  # Detect glass / windshield (dark blue-grey with high specularity)
  glass_mask = (gray < 55) & (hsv[:, :, 1] < 60)

  # Paintable body is car pixels minus wheels, glass, dark trim
  body_mask = car_mask.astype(np.uint8) * 255
  body_mask[wheel_tyre_mask] = 0
  body_mask[glass_mask] = 0

  # Clean up and smooth edges
  kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
  body_mask = cv2.morphologyEx(body_mask, cv2.MORPH_CLOSE, kernel)
  body_mask = cv2.GaussianBlur(body_mask, (3, 3), 1.0)
  
  return body_mask

def recolor_car(base_path, output_dir):
  os.makedirs(output_dir, exist_ok=True)
  
  # Load base image with alpha
  img = cv2.imread(base_path, cv2.IMREAD_UNCHANGED)
  if img is None:
    print(f"Error loading {base_path}")
    return
  
  h, w = img.shape[:2]
  if img.shape[2] == 4:
    bgr = img[:, :, :3]
    alpha = img[:, :, 3]
  else:
    bgr = img
    alpha = np.ones((h, w), dtype=np.uint8) * 255

  # Build body mask
  body_mask = create_body_mask(bgr, alpha)
  mask_norm = (body_mask.astype(np.float32) / 255.0)[:, :, np.newaxis]

  # Convert base image to LAB
  base_lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
  base_l = base_lab[:, :, 0]

  # Generate each paint version
  for paint in PAINTS:
    paint_id = paint["id"]
    hex_code = paint["hex"]
    finish = paint["finish"]
    
    # Calculate target LAB
    target_l, target_a, target_b = hex_to_lab(hex_code)
    
    # Build modified LAB channels
    out_lab = np.copy(base_lab)
    
    # Lightness transform curve
    if paint_id == "polar-white":
      # Lift midtones and highlights
      out_l = np.clip(base_l * 0.4 + 160, 0, 255)
      out_a = np.full_like(base_lab[:, :, 1], 128)
      out_b = np.full_like(base_lab[:, :, 2], 128)
    elif paint_id == "obsidian-black":
      # Deep black curve with specular highlight retention
      out_l = np.clip((base_l ** 1.35) * 0.08 + 18, 0, 255)
      out_a = np.full_like(base_lab[:, :, 1], 128)
      out_b = np.full_like(base_lab[:, :, 2], 128)
    elif finish == "matte":
      # Compress contrast for matte satin look
      out_l = np.clip((base_l - 128) * 0.6 + target_l, 0, 255)
      out_a = np.full_like(base_lab[:, :, 1], target_a)
      out_b = np.full_like(base_lab[:, :, 2], target_b)
    elif finish == "solid":
      # Solid non-metallic tone
      out_l = np.clip((base_l - 128) * 0.85 + target_l, 0, 255)
      out_a = np.full_like(base_lab[:, :, 1], target_a)
      out_b = np.full_like(base_lab[:, :, 2], target_b)
    else:
      # Metallic with rich luster
      contrast = paint.get("contrast", 1.1)
      out_l = np.clip((base_l - 128) * contrast + target_l, 0, 255)
      out_a = np.full_like(base_lab[:, :, 1], target_a)
      out_b = np.full_like(base_lab[:, :, 2], target_b)

    out_lab[:, :, 0] = out_l
    out_lab[:, :, 1] = out_a
    out_lab[:, :, 2] = out_b

    # Convert recolored car back to BGR
    recolored_bgr = cv2.cvtColor(np.clip(out_lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)

    # Blend using feathered body mask (only body panels change, wheels & glass stay unchanged)
    final_bgr = (recolored_bgr * mask_norm + bgr * (1.0 - mask_norm)).astype(np.uint8)
    
    # Reassemble BGRA
    if img.shape[2] == 4:
      final_bgra = np.dstack((final_bgr, alpha))
    else:
      final_bgra = final_bgr

    # Save as WebP
    out_path = os.path.join(output_dir, f"{paint_id}.webp")
    pil_img = Image.fromarray(cv2.cvtColor(final_bgra, cv2.COLOR_BGRA2RGBA if img.shape[2] == 4 else cv2.COLOR_BGR2RGB))
    pil_img.save(out_path, "WEBP", quality=88)
    print(f"Generated: {out_path}")

if __name__ == "__main__":
  # Build sedan paints
  recolor_car("public/cars/sedan/threequarter/base.png", "public/cars/sedan/threequarter/paints")
  recolor_car("public/cars/suv/threequarter/base.png", "public/cars/suv/threequarter/paints")
  recolor_car("public/cars/coupe/threequarter/base.png", "public/cars/coupe/threequarter/paints")
  print("All vehicle paints built successfully!")
