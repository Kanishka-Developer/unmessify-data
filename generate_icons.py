# Simple icon generation using base64 encoded placeholder
# This creates basic PNG files for PWA requirements

import base64
import os

# Create a simple 1x1 blue pixel PNG as placeholder
blue_pixel_png = base64.b64decode(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA'
    + 'kQOqkwAAAABJRU5ErkJggg=='
)

# Icon sizes needed for PWA
sizes = [32, 72, 96, 128, 144, 152, 192, 384, 512]

assets_dir = 'assets'
os.makedirs(assets_dir, exist_ok=True)

for size in sizes:
    filename = f'{assets_dir}/icon-{size}.png'
    with open(filename, 'wb') as f:
        f.write(blue_pixel_png)
    print(f'Created {filename}')

print('Basic icon files created. Replace with actual icons for production.')
