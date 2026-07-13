"""Prepare reviewed homepage imagery and the dark-chrome bee derivative.

The downloaded source images remain outside ``public`` so the deployed site only
ships the optimized WebP derivatives. The original owner-supplied bee stays
unchanged; this script removes only its edge-connected warm-white background.
"""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "asset-sources" / "homepage-2026-07-12"
OUTPUTS = ROOT / "public" / "visuals"

PHOTO_OUTPUTS = (
    ("research-notebook-source.jpg", "research-notebook.webp", 1600),
    ("industry-contractors-source.jpg", "industry-contractors.webp", 1000),
    ("industry-local-service-source.jpg", "industry-local-service.webp", 1000),
    ("industry-retail-source.jpg", "industry-retail.webp", 1000),
    ("industry-ecommerce-source.jpg", "industry-ecommerce.webp", 1000),
    ("industry-b2b-source.jpg", "industry-b2b.webp", 1000),
    ("met-water-textile-source.jpg", "met-water-textile.webp", 1600),
)


def prepare_photos() -> None:
    OUTPUTS.mkdir(parents=True, exist_ok=True)
    for source_name, output_name, max_width in PHOTO_OUTPUTS:
        source = SOURCES / source_name
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            if image.width > max_width:
                height = round(image.height * max_width / image.width)
                image = image.resize((max_width, height), Image.Resampling.LANCZOS)
            image.save(
                OUTPUTS / output_name,
                "WEBP",
                quality=82,
                method=6,
            )


def prepare_bee() -> None:
    source = ROOT / "public" / "brand" / "boho-bee-logo-v2-256.png"
    output = ROOT / "public" / "brand" / "boho-bee-logo-v2-transparent.png"

    with Image.open(source) as opened:
        image = opened.convert("RGBA")

    pixels = image.load()
    width, height = image.size
    background = pixels[0, 0][:3]
    visited: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()

    def is_background(x: int, y: int) -> bool:
        red, green, blue, _ = pixels[x, y]
        distance = sum((channel - base) ** 2 for channel, base in zip((red, green, blue), background))
        return min(red, green, blue) >= 222 and distance <= 38**2

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited or not is_background(x, y):
            continue
        visited.add((x, y))
        if x > 0:
            queue.append((x - 1, y))
        if x + 1 < width:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y + 1 < height:
            queue.append((x, y + 1))

    for x, y in visited:
        red, green, blue, _ = pixels[x, y]
        pixels[x, y] = (red, green, blue, 0)

    image.save(output, "PNG", optimize=True)


if __name__ == "__main__":
    prepare_photos()
    prepare_bee()
