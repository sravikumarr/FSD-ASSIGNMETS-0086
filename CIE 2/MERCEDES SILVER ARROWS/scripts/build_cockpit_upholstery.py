import cv2
import numpy as np
from PIL import Image
import os

def hex_to_lab(hex_code):
    hex_code = hex_code.lstrip('#')
    r = int(hex_code[0:2], 16)
    g = int(hex_code[2:4], 16)
    b = int(hex_code[4:6], 16)
    rgb = np.uint8([[[r, g, b]]])
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB)[0][0]
    return lab

def generate_cockpit_variants(base_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    bgr = cv2.imread(base_path)
    if bgr is None:
        print(f"Could not read {base_path}")
        return

    h, w = bgr.shape[:2]
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    base_lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
    base_l = base_lab[:, :, 0]

    # Mask leather seat and door panels (exclude digital screens, windscreen, steering wheel controls)
    # Screens have strong blue/cyan or high brightness in center-upper regions
    # Seats are in lower half and sides
    y_coords, x_coords = np.mgrid[0:h, 0:w]
    seat_region = (y_coords > h * 0.35) & (gray > 30) & (gray < 220)
    
    # Exclude bright center infotainment screens
    screen_mask = (y_coords > h * 0.25) & (y_coords < h * 0.75) & (x_coords > w * 0.30) & (x_coords < w * 0.70) & (hsv[:,:,1] > 70)
    seat_mask = seat_region & (~screen_mask)

    seat_mask_f = cv2.GaussianBlur(seat_mask.astype(np.float32), (15, 15), 5.0)[:, :, np.newaxis]

    upholstery_colors = [
        {"id": "black", "hex": "#1f2022", "contrast": 1.0, "l_shift": 0},
        {"id": "sienna-brown", "hex": "#8a4f32", "contrast": 1.15, "l_shift": 15},
        {"id": "macchiato-beige", "hex": "#d8ccb6", "contrast": 0.9, "l_shift": 45},
        {"id": "neva-grey", "hex": "#9fa3a9", "contrast": 1.0, "l_shift": 20},
        {"id": "power-red", "hex": "#8f1d24", "contrast": 1.2, "l_shift": 10},
    ]

    for uph in upholstery_colors:
        uid = uph["id"]
        target_l, target_a, target_b = hex_to_lab(uph["hex"])
        
        out_lab = np.copy(base_lab)
        if uid == "black":
            # Native baseline
            final_bgr = bgr
        else:
            contrast = uph["contrast"]
            out_l = np.clip((base_l - 120) * contrast + target_l + uph["l_shift"], 0, 255)
            out_a = np.full_like(base_lab[:, :, 1], target_a)
            out_b = np.full_like(base_lab[:, :, 2], target_b)
            
            out_lab[:, :, 0] = out_l
            out_lab[:, :, 1] = out_a
            out_lab[:, :, 2] = out_b
            
            recolored_bgr = cv2.cvtColor(np.clip(out_lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
            final_bgr = (recolored_bgr * seat_mask_f * 0.85 + bgr * (1.0 - seat_mask_f * 0.85)).astype(np.uint8)

        out_path = os.path.join(output_dir, f"{uid}.webp")
        pil_img = Image.fromarray(cv2.cvtColor(final_bgr, cv2.COLOR_BGR2RGB))
        pil_img.save(out_path, "WEBP", quality=90)
        print(f"Generated Cockpit Upholstery: {out_path}")

if __name__ == "__main__":
    generate_cockpit_variants("public/cars/sedan/cockpit/base.jpg", "public/cars/sedan/cockpit")
