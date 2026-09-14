import os
from PIL import Image, ImageFilter, ImageOps
import numpy as np
from scipy.ndimage import label, binary_dilation, binary_erosion

img_path = r"C:\Users\mhrat\.gemini\antigravity-ide\brain\ab39b529-90c2-4298-868b-1e6d9c34de78\fries_black_carton_crisp_1789419716587.jpg"
out_png = r"e:\Project\Resturant wweb\public\images\categories\fries.png"

img = Image.open(img_path).convert("RGBA")
arr = np.array(img, dtype=np.float32)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Compute color distance from pure white (255, 255, 255)
# In pure white areas, r, g, b are all >= 248
# Let's compute Euclidean distance to white
dist_to_white = np.sqrt((255 - r)**2 + (255 - g)**2 + (255 - b)**2)

# High confidence background: dist_to_white < 22 (meaning almost pure white)
bg_seed = dist_to_white < 24

# Connected component from image borders
h, w = bg_seed.shape
border_mask = np.zeros((h, w), dtype=bool)
border_mask[0:3, :] = True
border_mask[-3:, :] = True
border_mask[:, 0:3] = True
border_mask[:, -3:] = True

labeled, num_features = label(bg_seed)
border_labels = set(np.unique(labeled[border_mask]))
if 0 in border_labels:
    border_labels.remove(0)

# True connected background
connected_bg = np.isin(labeled, list(border_labels))

# Create smooth alpha channel
# In connected background, if dist_to_white < 12 -> alpha = 0
# If dist_to_white is between 12 and 45 -> smooth transition
alpha = np.ones((h, w), dtype=np.float32)

# Where connected to outer bg
transition_zone = connected_bg & (dist_to_white < 50)
alpha[connected_bg] = np.clip((dist_to_white[connected_bg] - 14) / 36.0, 0.0, 1.0)

# Decontaminate white fringes from semi-transparent edges:
# Calculate unmultiplied RGB for edge pixels
alpha_expanded = alpha[:, :, np.newaxis]
rgb = arr[:, :, :3]
# Defringe: where alpha < 0.95 and alpha > 0.05, adjust color away from white (255)
edge_pixels = (alpha > 0.05) & (alpha < 0.95)
for c in range(3):
    rgb[:, :, c] = np.where(
        edge_pixels,
        np.clip((rgb[:, :, c] - 255 * (1 - alpha)) / np.maximum(alpha, 0.01), 0, 255),
        rgb[:, :, c]
    )

final_arr = np.dstack((rgb, alpha * 255)).astype(np.uint8)
final_img = Image.fromarray(final_arr, mode='RGBA')

# Crop bounding box with padding
bbox = final_img.getbbox()
if bbox:
    pad = 12
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(final_img.width, bbox[2] + pad),
        min(final_img.height, bbox[3] + pad)
    )
    final_img = final_img.crop(crop_box)

final_img.save(out_png, format="PNG")
print(f"Successfully created clean transparent fries cutout at {out_png}, size={final_img.size}")
