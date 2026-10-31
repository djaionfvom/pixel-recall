#!/usr/bin/env python3
"""Build disjoint Daily and Run pattern libraries from Amazon Berkeley Objects (ABO).

The production path intentionally uses catalog images that already look like isolated
objects on a plain/light background. Difficult lifestyle images, sets, tiny objects,
fragmented silhouettes, and low-fidelity 8x8 reductions are rejected.

Typical use:
    python tools/abo_pattern_pipeline.py build \
        --js-output real-object-patterns.generated.js \
        --output-dir abo-output

What the build downloads:
  * abo-listings.tar (~83 MB) from the official ABO S3 bucket.
  * up to 30,000 256 px catalog images, scored before final selection.

The final website contains derived 8x8 grids plus small optimized WebP previews of the selected
objects. Those local previews power the photo-to-pixel intro animation; the game never hotlinks
Amazon images during play.
"""
from __future__ import annotations

import argparse
import csv
import gzip
import hashlib
import io
import json
import math
import os
import re
import shutil
import sys
import tarfile
import time
from collections import defaultdict, deque
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, Iterator, Optional
from urllib.parse import quote

import cv2
import numpy as np
from PIL import Image, ImageDraw
import requests

GRID = 8
ABO_HOME = "https://amazon-berkeley-objects.s3.amazonaws.com/index.html"
ABO_LISTINGS_ARCHIVE = "https://amazon-berkeley-objects.s3.amazonaws.com/archives/abo-listings.tar"
ABO_LICENSE = "CC BY 4.0"
ABO_CDN_TEMPLATE = "https://m.media-amazon.com/images/I/{image_id}._AC_US256_.jpg"
ABO_CDN_FALLBACK = "https://m.media-amazon.com/images/I/{image_id}.jpg"
DEFAULT_USER_AGENT = "PixelRecall-ABO-PatternBuilder/1.0 (+https://pixelrecall.net/)"
DAILY_TARGET = 1095
RUN_TARGET = 1095
TOTAL_TARGET = DAILY_TARGET + RUN_TARGET
DAILY_BANK_COUNT = 3
DAILY_BANK_SIZE = 365


# Deliberately concrete everyday objects. The title/product type has to match one of
# these; this prevents the bank from filling with duvet covers, phone cases, posters,
# clothing swatches, etc. More than one listing may be used per label, but the final
# 8x8 silhouette still has to be unique.
OBJECT_RULES: list[tuple[str, str]] = [
    (r"\balarm clocks?\b|\bdesk clocks?\b|\bwall clocks?\b", "Clock"),
    (r"\bwatches?\b", "Watch"),
    (r"\bmugs?\b|\bcoffee cups?\b|\btea cups?\b", "Mug"),
    (r"\btumblers?\b", "Tumbler"),
    (r"\bwater bottles?\b|\bsports bottles?\b", "Bottle"),
    (r"\bthermos\b|\bvacuum flasks?\b", "Thermos"),
    (r"\bkettles?\b", "Kettle"),
    (r"\bteapots?\b", "Teapot"),
    (r"\bcoffee pots?\b", "Coffee Pot"),
    (r"\bbowls?\b", "Bowl"),
    (r"\bplates?\b", "Plate"),
    (r"\bsaucers?\b", "Saucer"),
    (r"\bjars?\b", "Jar"),
    (r"\bfood containers?\b|\bstorage containers?\b", "Container"),
    (r"\blunch boxes?\b|\blunchboxes?\b", "Lunch Box"),
    (r"\bcutting boards?\b", "Cutting Board"),
    (r"\brolling pins?\b", "Rolling Pin"),
    (r"\bwhisks?\b", "Whisk"),
    (r"\bspatulas?\b", "Spatula"),
    (r"\bladles?\b", "Ladle"),
    (r"\bcolanders?\b|\bstrainers?\b", "Colander"),
    (r"\bfrying pans?\b|\bskillets?\b", "Frying Pan"),
    (r"\bsaucepans?\b", "Saucepan"),
    (r"\bcooking pots?\b|\bstock pots?\b", "Pot"),
    (r"\btoasters?\b", "Toaster"),
    (r"\bblenders?\b", "Blender"),
    (r"\bhand mixers?\b|\bstand mixers?\b", "Mixer"),
    (r"\bfood processors?\b", "Food Processor"),
    (r"\bcan openers?\b", "Can Opener"),
    (r"\bpepper mills?\b|\bpepper grinders?\b", "Pepper Mill"),
    (r"\bsalt shakers?\b", "Salt Shaker"),
    (r"\bpaper towel holders?\b", "Paper Towel Holder"),
    (r"\bsoap dispensers?\b", "Soap Dispenser"),
    (r"\btoothbrush holders?\b", "Toothbrush Holder"),
    (r"\btoothbrushes?\b", "Toothbrush"),
    (r"\bhair dryers?\b|\bblow dryers?\b", "Hair Dryer"),
    (r"\bhair brushes?\b", "Hair Brush"),
    (r"\bcombs?\b", "Comb"),
    (r"\brazors?\b", "Razor"),
    (r"\bmirrors?\b", "Mirror"),
    (r"\bvases?\b", "Vase"),
    (r"\bcandlesticks?\b|\bcandle holders?\b", "Candle Holder"),
    (r"\blamps?\b", "Lamp"),
    (r"\blanterns?\b", "Lantern"),
    (r"\bflashlights?\b|\btorches?\b", "Flashlight"),
    (r"\bfans?\b", "Fan"),
    (r"\bumbrellas?\b", "Umbrella"),
    (r"\bbaskets?\b", "Basket"),
    (r"\bbuckets?\b|\bpails?\b", "Bucket"),
    (r"\bwatering cans?\b", "Watering Can"),
    (r"\btrash cans?\b|\bwastebaskets?\b|\bdustbins?\b", "Trash Can"),
    (r"\bstorage bins?\b", "Storage Bin"),
    (r"\bbackpacks?\b|\brucksacks?\b", "Backpack"),
    (r"\bhandbags?\b|\bpurses?\b", "Handbag"),
    (r"\bbriefcases?\b", "Briefcase"),
    (r"\bsuitcases?\b|\bluggage\b", "Suitcase"),
    (r"\bwallets?\b", "Wallet"),
    (r"\bboots?\b", "Boot"),
    (r"\bsneakers?\b|\btrainers?\b", "Sneaker"),
    (r"\bshoes?\b", "Shoe"),
    (r"\bslippers?\b", "Slipper"),
    (r"\bhelmets?\b", "Helmet"),
    (r"\bhats?\b|\bcaps?\b", "Hat"),
    (r"\bsunglasses?\b|\beyeglasses?\b|\bglasses?\b", "Glasses"),
    (r"\bheadphones?\b", "Headphones"),
    (r"\bearbuds?\b|\bearphones?\b", "Earbuds"),
    (r"\bspeakers?\b", "Speaker"),
    (r"\bmicrophones?\b", "Microphone"),
    (r"\bcameras?\b", "Camera"),
    (r"\bbinoculars?\b", "Binoculars"),
    (r"\btripods?\b", "Tripod"),
    (r"\bkeyboards?\b", "Keyboard"),
    (r"\bcomputer mice?\b|\bwireless mice?\b|\bmouse\b", "Computer Mouse"),
    (r"\bremote controls?\b|\bremotes?\b", "Remote Control"),
    (r"\bcalculators?\b", "Calculator"),
    (r"\bstaplers?\b", "Stapler"),
    (r"\btape dispensers?\b", "Tape Dispenser"),
    (r"\bscissors?\b", "Scissors"),
    (r"\bhammers?\b", "Hammer"),
    (r"\bmallets?\b", "Mallet"),
    (r"\bscrewdrivers?\b", "Screwdriver"),
    (r"\bwrenches?\b|\bspanners?\b", "Wrench"),
    (r"\bpliers?\b", "Pliers"),
    (r"\bdrills?\b", "Drill"),
    (r"\bsaws?\b", "Saw"),
    (r"\btape measures?\b|\bmeasuring tapes?\b", "Tape Measure"),
    (r"\blevels?\b", "Level"),
    (r"\bpadlocks?\b", "Padlock"),
    (r"\bdoor locks?\b", "Lock"),
    (r"\bchairs?\b", "Chair"),
    (r"\bstools?\b", "Stool"),
    (r"\bbenches?\b", "Bench"),
    (r"\bside tables?\b|\bend tables?\b", "Side Table"),
    (r"\bdesks?\b", "Desk"),
    (r"\bshelves?\b|\bshelving units?\b", "Shelf"),
    (r"\bcoat racks?\b", "Coat Rack"),
    (r"\bclothes hangers?\b|\bhangers?\b", "Hanger"),
    (r"\bdumbbells?\b", "Dumbbell"),
    (r"\bkettlebells?\b", "Kettlebell"),
    (r"\bbasketballs?\b", "Basketball"),
    (r"\bsoccer balls?\b|\bfootballs?\b", "Football"),
    (r"\btennis rackets?\b|\btennis racquets?\b", "Tennis Racket"),
    (r"\bbaseball bats?\b", "Baseball Bat"),
    (r"\bskateboards?\b", "Skateboard"),
    (r"\bguitars?\b", "Guitar"),
    (r"\bukuleles?\b", "Ukulele"),
    (r"\bviolins?\b", "Violin"),
    (r"\bdrums?\b", "Drum"),
    (r"\bmetronomes?\b", "Metronome"),
    (r"\bclocks?\b", "Clock"),
    (r"\bglobes?\b", "Globe"),
    (r"\bpencil holders?\b|\bpen holders?\b", "Pen Holder"),
    (r"\bpencil sharpeners?\b", "Pencil Sharpener"),
    (r"\bdesk organizers?\b", "Desk Organizer"),
    (r"\bspray bottles?\b", "Spray Bottle"),
    (r"\bplant pots?\b|\bflower pots?\b|\bplanters?\b", "Plant Pot"),
    (r"\bwatering wands?\b", "Watering Wand"),
]
COMPILED_RULES = [(re.compile(p, re.I), label) for p, label in OBJECT_RULES]

# Reject obvious multi-object/flat-graphic listings before using bandwidth.
TITLE_BLACKLIST = re.compile(
    r"\b(set of|pack of|[2-9]\s*pack|bundle|replacement|refill|cover only|case for|skin for|sticker|poster|wall art|"
    r"sheet set|duvet|curtain|rug|mat only|costume|shirt|dress|pants|underwear|fabric|decal|screen protector)\b",
    re.I,
)

@dataclass
class Listing:
    item_id: str
    image_id: str
    label: str
    title: str
    product_type: str

@dataclass
class Candidate:
    item_id: str
    image_id: str
    label: str
    title: str
    product_type: str
    image_url: str
    source_file: str
    rows: list[str]
    filled: int
    iou: float
    dice: float
    ncc: float
    threshold: float
    components: int
    border_white_fraction: float
    foreground_fraction: float
    accepted: bool
    reason: str


def sha_key(value: str) -> str:
    return hashlib.sha256(value.encode("utf8")).hexdigest()


def english_value(values) -> str:
    if not isinstance(values, list):
        return ""
    for item in values:
        if isinstance(item, dict) and item.get("language_tag") == "en_US" and item.get("value"):
            return str(item["value"])
    for item in values:
        if isinstance(item, dict) and item.get("value"):
            return str(item["value"])
    return ""


def first_product_type(values) -> str:
    if not isinstance(values, list):
        return ""
    for item in values:
        if isinstance(item, dict) and item.get("value"):
            return str(item["value"])
    return ""


def canonical_label(title: str, product_type: str) -> Optional[str]:
    text = f"{title} {product_type.replace('_', ' ')}"
    if TITLE_BLACKLIST.search(text):
        return None
    for pattern, label in COMPILED_RULES:
        if pattern.search(text):
            return label
    return None


def iter_listing_objects_from_tar(path: Path) -> Iterator[dict]:
    with tarfile.open(path, "r:*") as tar:
        members = [m for m in tar.getmembers() if m.isfile() and re.search(r"listings_\d+\.json\.gz$", m.name)]
        members.sort(key=lambda m: m.name)
        if not members:
            raise RuntimeError("No listings_<i>.json.gz files found inside ABO listings archive.")
        for member in members:
            raw = tar.extractfile(member)
            if raw is None:
                continue
            with gzip.GzipFile(fileobj=raw) as gz, io.TextIOWrapper(gz, encoding="utf8") as text:
                for line in text:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        yield json.loads(line)
                    except json.JSONDecodeError:
                        continue


def collect_listings(path: Path, max_per_label: int) -> dict[str, list[Listing]]:
    buckets: dict[str, list[Listing]] = defaultdict(list)
    seen_item: set[str] = set()
    scanned = 0
    eligible = 0
    for obj in iter_listing_objects_from_tar(path):
        scanned += 1
        item_id = str(obj.get("item_id") or "")
        image_id = str(obj.get("main_image_id") or "")
        if not item_id or not image_id or item_id in seen_item:
            continue
        if obj.get("domain_name") not in (None, "", "amazon.com"):
            continue
        title = english_value(obj.get("item_name"))
        product_type = first_product_type(obj.get("product_type"))
        if not title:
            continue
        label = canonical_label(title, product_type)
        if not label:
            continue
        seen_item.add(item_id)
        eligible += 1
        buckets[label].append(Listing(item_id, image_id, label, title, product_type))
    # Deterministic pseudo-random sample per category, independent of archive order.
    for label in list(buckets):
        buckets[label].sort(key=lambda x: sha_key(x.item_id))
        buckets[label] = buckets[label][:max_per_label]
        if not buckets[label]:
            del buckets[label]
    print(f"Scanned {scanned:,} ABO listings; {eligible:,} matched curated everyday-object rules across {len(buckets)} labels.")
    return buckets


def round_robin_records(buckets: dict[str, list[Listing]]) -> list[Listing]:
    queues = {k: deque(v) for k, v in buckets.items() if v}
    labels = sorted(queues, key=lambda x: sha_key(x))
    result: list[Listing] = []
    while labels:
        next_labels = []
        for label in labels:
            q = queues[label]
            if q:
                result.append(q.popleft())
            if q:
                next_labels.append(label)
        labels = next_labels
    return result


def download_file(url: str, dest: Path, session: requests.Session, description: str) -> None:
    if dest.exists() and dest.stat().st_size > 1000:
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    part = dest.with_suffix(dest.suffix + ".part")
    with session.get(url, stream=True, timeout=(15, 120)) as r:
        r.raise_for_status()
        total = int(r.headers.get("content-length") or 0)
        done = 0
        with part.open("wb") as f:
            for chunk in r.iter_content(1024 * 1024):
                if not chunk:
                    continue
                f.write(chunk)
                done += len(chunk)
                if total:
                    print(f"\r{description}: {done/1024/1024:.1f}/{total/1024/1024:.1f} MB", end="", flush=True)
        if total:
            print()
    part.replace(dest)


def image_urls(image_id: str) -> list[str]:
    encoded = quote(image_id, safe="-_.~")
    return [ABO_CDN_TEMPLATE.format(image_id=encoded), ABO_CDN_FALLBACK.format(image_id=encoded)]


def fetch_image(listing: Listing, cache: Path, session: requests.Session) -> tuple[Optional[Path], str]:
    cache.mkdir(parents=True, exist_ok=True)
    safe = hashlib.sha1(listing.image_id.encode("utf8")).hexdigest()[:18]
    out = cache / f"{safe}.jpg"
    if out.exists() and out.stat().st_size > 1000:
        return out, image_urls(listing.image_id)[0]
    for url in image_urls(listing.image_id):
        try:
            r = session.get(url, timeout=(10, 30))
            if r.status_code != 200 or len(r.content) < 1000:
                continue
            ctype = r.headers.get("content-type", "")
            if "image" not in ctype and not r.content.startswith((b"\xff\xd8", b"\x89PNG")):
                continue
            out.write_bytes(r.content)
            # Ensure PIL can decode it; invalid files are removed.
            with Image.open(out) as im:
                im.verify()
            return out, url
        except Exception:
            out.unlink(missing_ok=True)
            continue
    return None, image_urls(listing.image_id)[0]


def clean_mask(mask: np.ndarray) -> np.ndarray:
    mask = mask.astype(np.uint8)
    kernel = np.ones((3, 3), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    if count <= 1:
        return mask.astype(bool)
    components = sorted([(stats[i, cv2.CC_STAT_AREA], i) for i in range(1, count)], reverse=True)
    # Keep a second component only when it is substantial (handles mug handle + body gaps etc.).
    keep = [components[0][1]]
    if len(components) > 1 and components[1][0] >= 0.13 * components[0][0]:
        keep.append(components[1][1])
    return np.isin(labels, keep)


def white_background_mask(rgb: np.ndarray, min_border_white: float) -> tuple[Optional[np.ndarray], dict, str]:
    h, w, _ = rgb.shape
    if min(h, w) < 64:
        return None, {}, "image too small"
    band = max(4, min(h, w) // 18)
    border = np.concatenate([
        rgb[:band].reshape(-1, 3), rgb[-band:].reshape(-1, 3),
        rgb[:, :band].reshape(-1, 3), rgb[:, -band:].reshape(-1, 3),
    ], axis=0).astype(np.float32)
    bg = np.median(border, axis=0)
    white_fraction = float(np.mean(np.min(border, axis=1) >= 225))
    border_spread = float(np.percentile(np.linalg.norm(border - bg[None, :], axis=1), 95))
    bg_brightness = float(np.mean(bg))
    metrics = {
        "border_white_fraction": white_fraction,
        "border_spread": border_spread,
        "background_brightness": bg_brightness,
    }
    if bg_brightness < 218 or white_fraction < min_border_white or border_spread > 32:
        return None, metrics, f"background not plain/white enough (white={white_fraction:.2f}, bg={bg_brightness:.0f}, spread={border_spread:.0f})"

    arr = rgb.astype(np.float32)
    dist = np.linalg.norm(arr - bg[None, None, :], axis=2)
    border_dist = np.linalg.norm(border - bg[None, :], axis=1)
    threshold = float(np.clip(np.percentile(border_dist, 99.5) + 13.0, 20.0, 62.0))
    mask = dist > threshold

    # Remove the outermost frame and keep components biased toward image centre.
    margin = max(2, min(h, w) // 120)
    mask[:margin] = False; mask[-margin:] = False; mask[:, :margin] = False; mask[:, -margin:] = False
    mask = clean_mask(mask)
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    if count <= 1:
        return None, metrics, "no foreground object found"
    cx, cy = w / 2.0, h / 2.0
    scored = []
    for i in range(1, count):
        area = float(stats[i, cv2.CC_STAT_AREA])
        x, y = centroids[i]
        center_penalty = math.hypot((x - cx) / w, (y - cy) / h)
        scored.append((area * max(0.35, 1.0 - center_penalty), i))
    scored.sort(reverse=True)
    mask = labels == scored[0][1]

    ys, xs = np.where(mask)
    if not len(xs):
        return None, metrics, "empty foreground"
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    area_frac = float(mask.mean())
    bbox_frac = float(((x1 - x0) * (y1 - y0)) / (w * h))
    center_x, center_y = (x0+x1)/(2*w), (y0+y1)/(2*h)
    center_offset = math.hypot(center_x - 0.5, center_y - 0.5)
    metrics.update({"foreground_fraction": area_frac, "bbox_fraction": bbox_frac, "center_offset": center_offset})
    if area_frac < 0.025:
        return None, metrics, f"object too small ({area_frac:.3f} foreground)"
    if area_frac > 0.70:
        return None, metrics, f"foreground too large ({area_frac:.3f})"
    if bbox_frac < 0.07:
        return None, metrics, "bounding box too small"
    if center_offset > 0.30:
        return None, metrics, f"object too off-centre ({center_offset:.2f})"
    if x0 <= margin or y0 <= margin or x1 >= w-margin or y1 >= h-margin:
        return None, metrics, "object touches image border"
    return mask.astype(bool), metrics, "ok"


def square_crop(mask: np.ndarray, padding: float = 0.10) -> Optional[np.ndarray]:
    ys, xs = np.where(mask)
    if not len(xs):
        return None
    y0, y1 = ys.min(), ys.max() + 1
    x0, x1 = xs.min(), xs.max() + 1
    obj_h, obj_w = y1-y0, x1-x0
    if obj_h < 4 or obj_w < 4:
        return None
    side = max(16, int(math.ceil(max(obj_h, obj_w) * (1 + 2*padding))))
    cy, cx = (y0+y1)/2, (x0+x1)/2
    canvas = np.zeros((side, side), dtype=np.uint8)
    sy0, sx0 = int(round(cy-side/2)), int(round(cx-side/2))
    sy1, sx1 = sy0+side, sx0+side
    iy0, ix0 = max(0, sy0), max(0, sx0)
    iy1, ix1 = min(mask.shape[0], sy1), min(mask.shape[1], sx1)
    oy0, ox0 = iy0-sy0, ix0-sx0
    canvas[oy0:oy0+iy1-iy0, ox0:ox0+ix1-ix0] = mask[iy0:iy1, ix0:ix1]
    return canvas.astype(bool)


def similarity(a: np.ndarray, b: np.ndarray) -> tuple[float, float, float]:
    a = a.astype(bool); b = b.astype(bool)
    inter = np.logical_and(a, b).sum(); union = np.logical_or(a, b).sum()
    iou = float(inter/union) if union else 0.0
    dice = float(2*inter/(a.sum()+b.sum())) if (a.sum()+b.sum()) else 0.0
    af = a.astype(np.float32).ravel(); bf = b.astype(np.float32).ravel()
    af -= af.mean(); bf -= bf.mean()
    denom = float(np.linalg.norm(af) * np.linalg.norm(bf))
    ncc = float(np.dot(af, bf)/denom) if denom > 1e-8 else 0.0
    return iou, dice, ncc


def components(grid: np.ndarray) -> int:
    count, _, _, _ = cv2.connectedComponentsWithStats(grid.astype(np.uint8), 8)
    return max(0, count-1)


def normalized_shape_signature(rows: list[str]) -> str:
    g = np.array([[c == "#" for c in row] for row in rows], dtype=np.uint8)
    signatures: list[str] = []
    for k in range(4):
        r = np.rot90(g, k)
        for v in (r, np.fliplr(r)):
            ys, xs = np.where(v)
            if not len(xs):
                signatures.append("empty")
                continue
            crop = v[ys.min():ys.max()+1, xs.min():xs.max()+1]
            signatures.append(f"{crop.shape[0]}x{crop.shape[1]}:" + "".join("#" if x else "." for x in crop.ravel()))
    return min(signatures)


def quantize(mask: np.ndarray, args) -> tuple[list[str], dict]:
    square = square_crop(mask, args.padding)
    if square is None:
        return [], {"accepted": False, "reason": "empty/tiny mask"}
    occupancy = cv2.resize(square.astype(np.float32), (GRID, GRID), interpolation=cv2.INTER_AREA)
    best = None
    for threshold in np.arange(0.15, 0.71, 0.025):
        grid = occupancy >= threshold
        recon = cv2.resize(grid.astype(np.uint8), (square.shape[1], square.shape[0]), interpolation=cv2.INTER_NEAREST).astype(bool)
        iou, dice, ncc = similarity(square, recon)
        filled = int(grid.sum()); comps = components(grid)
        objective = 0.64*iou + 0.36*max(0.0, ncc) - 0.025*max(0, comps-1)
        item = (objective, float(threshold), grid, iou, dice, ncc, filled, comps)
        if best is None or item[0] > best[0]:
            best = item
    _, threshold, grid, iou, dice, ncc, filled, comps = best
    rows = ["".join("#" if v else "." for v in row) for row in grid]
    reasons = []
    if filled < args.min_filled: reasons.append(f"too sparse ({filled})")
    if filled > args.max_filled: reasons.append(f"too full ({filled})")
    if iou < args.min_iou: reasons.append(f"IoU {iou:.3f} < {args.min_iou:.3f}")
    if ncc < args.min_ncc: reasons.append(f"NCC {ncc:.3f} < {args.min_ncc:.3f}")
    if comps > args.max_components: reasons.append(f"{comps} components")
    nonempty_rows = sum("#" in row for row in rows)
    nonempty_cols = sum(any(rows[r][c] == "#" for r in range(GRID)) for c in range(GRID))
    if nonempty_rows < 3 or nonempty_cols < 3: reasons.append("shape collapses to <3 rows/columns")
    return rows, {
        "accepted": not reasons, "reason": "; ".join(reasons) if reasons else "accepted",
        "threshold": threshold, "iou": iou, "dice": dice, "ncc": ncc,
        "filled": filled, "components": comps, "grid": grid, "square_mask": square,
    }


def process_listing(listing: Listing, image_path: Path, image_url: str, args) -> tuple[Candidate, Optional[np.ndarray], Optional[np.ndarray]]:
    rgb = np.asarray(Image.open(image_path).convert("RGB"))
    mask, bg, bg_reason = white_background_mask(rgb, args.min_border_white)
    if mask is None:
        c = Candidate(listing.item_id, listing.image_id, listing.label, listing.title, listing.product_type,
                      image_url, str(image_path), ["........"]*8, 0, 0.0, 0.0, 0.0, 0.0, 0,
                      float(bg.get("border_white_fraction", 0.0)), float(bg.get("foreground_fraction", 0.0)),
                      False, bg_reason)
        return c, rgb, None
    rows, q = quantize(mask, args)
    c = Candidate(listing.item_id, listing.image_id, listing.label, listing.title, listing.product_type,
                  image_url, str(image_path), rows or ["........"]*8, int(q.get("filled",0)),
                  float(q.get("iou",0)), float(q.get("dice",0)), float(q.get("ncc",0)),
                  float(q.get("threshold",0)), int(q.get("components",0)),
                  float(bg.get("border_white_fraction",0)), float(bg.get("foreground_fraction",0)),
                  bool(q.get("accepted",False)), str(q.get("reason","failed")))
    return c, rgb, mask


def load_reserved_signatures(path: Optional[Path]) -> set[str]:
    if not path or not path.exists():
        return set()
    return {line.strip() for line in path.read_text(encoding="utf8").splitlines() if line.strip() and not line.startswith("#")}


def score(c: Candidate) -> float:
    return 0.62*c.iou + 0.30*c.ncc + 0.08*c.dice


def memory_difficulty(c: Candidate) -> float:
    """Estimate 8x8 memory difficulty from the binary pattern itself.

    More boundary changes, less symmetry, moderate occupancy, and a second component
    make a silhouette harder to memorize. The score is only used to order the
    already quality-selected Run-only pool.
    """
    g = np.array([[ch == "#" for ch in row] for row in c.rows], dtype=np.uint8)
    density = float(g.mean())
    horizontal = int(np.sum(g[:, 1:] != g[:, :-1]))
    vertical = int(np.sum(g[1:, :] != g[:-1, :]))
    boundary = (horizontal + vertical) / max(1, 2 * GRID * (GRID - 1))
    sym_h = float(np.mean(g == np.fliplr(g)))
    sym_v = float(np.mean(g == np.flipud(g)))
    symmetry = max(sym_h, sym_v)
    occupancy_complexity = max(0.0, 1.0 - abs(density - 0.38) / 0.38)
    comp_bonus = 0.10 if c.components > 1 else 0.0
    raw = 0.52 * boundary + 0.26 * (1.0 - symmetry) + 0.22 * occupancy_complexity + comp_bonus
    return float(np.clip(raw * 100.0, 0.0, 100.0))


def choose_best_candidates(candidates: list[Candidate], target: int, reserved: set[str]) -> list[Candidate]:
    """Choose the globally best unique candidates after processing the full pool.

    The selection logic intentionally follows the product requirement:
      1. run through the full candidate budget,
      2. score every accepted candidate,
      3. sort globally by quality,
      4. keep the best 2,190 unique silhouettes,
      5. assign ranks 1-1,095 to Daily and ranks 1,096-2,190 to Run, with zero overlap.
    """
    accepted = [c for c in candidates if c.accepted]
    accepted.sort(key=lambda c: (score(c), c.iou, c.ncc, c.dice, -c.components, -abs(c.filled-24), sha_key(c.item_id)), reverse=True)

    chosen: list[Candidate] = []
    signatures = set(reserved)
    ordinals = defaultdict(int)
    for c in accepted:
        sig = normalized_shape_signature(c.rows)
        if sig in signatures:
            continue
        signatures.add(sig)
        ordinals[c.label] += 1
        suffix = f" {ordinals[c.label]}" if ordinals[c.label] > 1 else ""
        c.label = c.label + suffix
        chosen.append(c)
        if len(chosen) >= target:
            break
    return chosen


def split_into_banks(chosen: list[Candidate], bank_count: int = 3) -> list[list[Candidate]]:
    if bank_count <= 0:
        return []
    bank_size = len(chosen) // bank_count
    banks = []
    for bank_index in range(bank_count):
        start = bank_index * bank_size
        end = start + bank_size
        banks.append(chosen[start:end])
    return banks


def pool_assignment(rank_index: int) -> tuple[str, int, int, int]:
    """Return pool, pool position, Daily bank and bank position for a zero-based quality rank."""
    if rank_index < DAILY_TARGET:
        bank = rank_index // DAILY_BANK_SIZE + 1
        bank_position = rank_index % DAILY_BANK_SIZE + 1
        return "daily", rank_index + 1, bank, bank_position
    return "run", rank_index - DAILY_TARGET + 1, 0, 0


def write_reports(all_candidates: list[Candidate], chosen: list[Candidate], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    fields = list(asdict(all_candidates[0]).keys()) if all_candidates else ["item_id"]
    candidate_fields = [x for x in fields if x != "rows"] + ["quality_score", "memory_difficulty"]
    with (out_dir / "all-candidates.csv").open("w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=candidate_fields)
        w.writeheader()
        for c in all_candidates:
            row = asdict(c)
            row.pop("rows", None)
            row["quality_score"] = f"{score(c):.6f}"
            row["memory_difficulty"] = f"{memory_difficulty(c):.3f}"
            w.writerow(row)

    selected_fields = [
        "quality_rank", "mode_pool", "pool_position", "daily_bank", "bank_position", "run_difficulty_rank",
        "pattern_name", "item_id", "image_id", "title", "product_type", "image_url",
        "quality_score", "memory_difficulty", "iou", "dice", "ncc", "filled",
        "components", "asset", "rows"
    ]
    selected_rows = []
    run_slice = chosen[DAILY_TARGET:DAILY_TARGET + RUN_TARGET]
    run_difficulty_rank = {id(c): rank for rank, c in enumerate(sorted(run_slice, key=lambda c: (memory_difficulty(c), score(c), sha_key(c.item_id))), 1)}
    for rank_index, c in enumerate(chosen):
        pool, pool_position, daily_bank, bank_position = pool_assignment(rank_index)
        selected_rows.append({
            "quality_rank": rank_index + 1,
            "mode_pool": pool,
            "pool_position": pool_position,
            "daily_bank": daily_bank or "",
            "bank_position": bank_position or "",
            "run_difficulty_rank": run_difficulty_rank.get(id(c), ""),
            "pattern_name": "The " + c.label,
            "item_id": c.item_id,
            "image_id": c.image_id,
            "title": c.title,
            "product_type": c.product_type,
            "image_url": c.image_url,
            "quality_score": f"{score(c):.6f}",
            "memory_difficulty": f"{memory_difficulty(c):.3f}",
            "iou": f"{c.iou:.4f}",
            "dice": f"{c.dice:.4f}",
            "ncc": f"{c.ncc:.4f}",
            "filled": c.filled,
            "components": c.components,
            "asset": f"assets/abo/abo-{rank_index + 1:04d}.webp",
            "rows": "/".join(c.rows),
        })

    with (out_dir / "selected-sources.csv").open("w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=selected_fields)
        w.writeheader()
        w.writerows(selected_rows)
    (out_dir / "selected-sources.json").write_text(json.dumps(selected_rows, indent=2), encoding="utf8")


def make_square_photo_asset(source_file: str, out: Path, size: int = 256) -> None:
    rgb = np.asarray(Image.open(source_file).convert("RGB"))
    mask, _metrics, _reason = white_background_mask(rgb, 0.0)
    if mask is not None and mask.any():
        ys, xs = np.where(mask)
        y0, y1 = ys.min(), ys.max() + 1
        x0, x1 = xs.min(), xs.max() + 1
        obj_h, obj_w = y1 - y0, x1 - x0
        pad = int(round(max(obj_h, obj_w) * 0.14))
        y0 = max(0, y0 - pad); y1 = min(rgb.shape[0], y1 + pad)
        x0 = max(0, x0 - pad); x1 = min(rgb.shape[1], x1 + pad)
        crop = Image.fromarray(rgb[y0:y1, x0:x1])
    else:
        crop = Image.fromarray(rgb)
    crop.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (size, size), "white")
    canvas.paste(crop, ((size - crop.width) // 2, (size - crop.height) // 2))
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, "WEBP", quality=84, method=6)


def write_selected_assets(chosen: list[Candidate], asset_dir: Path) -> None:
    staging = asset_dir.with_name(asset_dir.name + ".tmp")
    shutil.rmtree(staging, ignore_errors=True)
    staging.mkdir(parents=True, exist_ok=True)
    for rank_index, c in enumerate(chosen, 1):
        make_square_photo_asset(c.source_file, staging / f"abo-{rank_index:04d}.webp")
    if asset_dir.exists():
        shutil.rmtree(asset_dir)
    staging.replace(asset_dir)


def fit_preview(rgb: np.ndarray, size=(220, 170)) -> Image.Image:
    im = Image.fromarray(rgb)
    im.thumbnail(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, "white")
    canvas.paste(im, ((size[0] - im.width) // 2, (size[1] - im.height) // 2))
    return canvas


def render_mask(mask: Optional[np.ndarray], size=(220, 170)) -> Image.Image:
    if mask is None:
        return Image.new("RGB", size, (235, 235, 235))
    im = Image.fromarray(mask.astype(np.uint8) * 255).convert("RGB")
    im.thumbnail(size, Image.Resampling.NEAREST)
    canvas = Image.new("RGB", size, "white")
    canvas.paste(im, ((size[0] - im.width) // 2, (size[1] - im.height) // 2))
    return canvas


def render_grid(rows: list[str], cell=20) -> Image.Image:
    im = Image.new("RGB", (GRID * cell, GRID * cell), "white")
    d = ImageDraw.Draw(im)
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            d.rectangle(
                (c * cell, r * cell, (c + 1) * cell - 1, (r + 1) * cell - 1),
                fill=(20, 20, 20) if ch == "#" else (245, 245, 245),
                outline=(205, 205, 205),
            )
    return im


def make_contact_sheet(selected: list[Candidate], out: Path, limit: int, title: str) -> None:
    items = selected[:limit]
    width = 960
    row_h = 205
    header = 64
    sheet = Image.new("RGB", (width, header + row_h * len(items)), "white")
    d = ImageDraw.Draw(sheet)
    d.text((18, 14), title, fill="black")
    d.text((18, 36), "catalog photo -> extracted foreground -> final 8x8 memory grid", fill=(70, 70, 70))
    for i, c in enumerate(items):
        y = header + i * row_h
        try:
            rgb = np.asarray(Image.open(c.source_file).convert("RGB"))
            mask, _m, _r = white_background_mask(rgb, 0.0)
        except Exception:
            rgb = np.zeros((64, 64, 3), dtype=np.uint8) + 255
            mask = None
        sheet.paste(fit_preview(rgb), (10, y + 10))
        sheet.paste(render_mask(mask), (240, y + 10))
        sheet.paste(render_grid(c.rows, 20), (475, y + 14))
        lines = [
            f"The {c.label}",
            f"quality {score(c):.3f}  IoU {c.iou:.3f}  NCC {c.ncc:.3f}",
            f"difficulty {memory_difficulty(c):.1f}  filled {c.filled}/64",
            c.item_id,
        ]
        yy = y + 25
        for line in lines:
            d.text((665, yy), line[:45], fill=(0, 0, 0))
            yy += 25
        d.line((0, y + row_h - 1, width, y + row_h - 1), fill=(220, 220, 220))
    sheet.save(out)


def write_js(chosen: list[Candidate], path: Path) -> None:
    daily = chosen[:DAILY_TARGET]
    run = chosen[DAILY_TARGET:DAILY_TARGET + RUN_TARGET]
    daily_banks = split_into_banks(daily, DAILY_BANK_COUNT)

    def payload_entry(c: Candidate, rank_index: int) -> list:
        return ["The " + c.label, c.rows, f"assets/abo/abo-{rank_index + 1:04d}.webp"]

    daily_payload = []
    for bank_index, bank in enumerate(daily_banks):
        base_rank = bank_index * DAILY_BANK_SIZE
        daily_payload.append([payload_entry(c, base_rank + i) for i, c in enumerate(bank)])
    run_payload = [
        {
            "name": "The " + c.label,
            "rows": c.rows,
            "image": f"assets/abo/abo-{DAILY_TARGET + i + 1:04d}.webp",
            "difficulty": round(memory_difficulty(c), 3),
            "quality": round(score(c), 6),
        }
        for i, c in enumerate(run)
    ]

    meta = {
        "source": "Amazon Berkeley Objects (ABO) catalog images",
        "datasetUrl": ABO_HOME,
        "license": ABO_LICENSE,
        "count": len(chosen),
        "dailyCount": len(daily),
        "dailyBankCount": DAILY_BANK_COUNT,
        "dailyBankSize": DAILY_BANK_SIZE,
        "runCount": len(run),
        "poolsOverlap": False,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "selection": "global quality rank after full candidate budget; ranks 1-1095 Daily-only, 1096-2190 Run-only",
        "previewAssets": "local 256x256 WebP crops used for the photo-to-pixel intro animation",
    }
    content = (
        "// Auto-generated from Amazon Berkeley Objects by tools/abo_pattern_pipeline.py\n"
        "// Daily and Run pools are completely disjoint. See CREDITS.md and abo-output/selected-sources.csv.\n"
        "window.PIXEL_RECALL_REAL_OBJECT_BANKS = " + json.dumps(daily_payload, indent=2) + ";\n"
        "window.PIXEL_RECALL_RUN_OBJECTS = " + json.dumps(run_payload, indent=2) + ";\n"
        "window.PIXEL_RECALL_REAL_OBJECT_META = " + json.dumps(meta, indent=2) + ";\n"
    )
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(content, encoding="utf8")
    tmp.replace(path)


def build(args) -> int:
    work = Path(args.work_dir)
    out = Path(args.output_dir)
    cache = work / "images"
    work.mkdir(parents=True, exist_ok=True)
    out.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": DEFAULT_USER_AGENT, "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"})
    listings_tar = Path(args.listings_tar) if args.listings_tar else work / "abo-listings.tar"
    if not listings_tar.exists():
        if args.offline:
            raise SystemExit(f"Offline mode: missing {listings_tar}")
        print("Downloading official ABO listing metadata (~83 MB)...")
        download_file(ABO_LISTINGS_ARCHIVE, listings_tar, session, "ABO metadata")

    buckets = collect_listings(listings_tar, args.max_listings_per_label)
    records = round_robin_records(buckets)
    print(f"Candidate download queue: {len(records):,} listings. Processing up to {args.max_downloads:,}; no early stop.")

    if args.target_count != TOTAL_TARGET:
        raise SystemExit(f"--target-count must be {TOTAL_TARGET} for the disjoint Daily + Run build")

    all_candidates: list[Candidate] = []
    accepted_unique: set[str] = set()
    accepted_count = 0
    download_count = 0
    for idx, listing in enumerate(records, 1):
        if download_count >= args.max_downloads:
            break
        image_path, url = fetch_image(listing, cache, session)
        download_count += 1
        if image_path is None:
            continue
        try:
            c, _rgb, _mask = process_listing(listing, image_path, url, args)
        except Exception as e:
            print(f"skip {listing.item_id}: {e}", file=sys.stderr)
            continue
        all_candidates.append(c)
        if c.accepted:
            sig = normalized_shape_signature(c.rows)
            if sig not in accepted_unique:
                accepted_unique.add(sig)
                accepted_count += 1
        if idx % 50 == 0 or c.accepted:
            print(f"[{download_count:5d}] {'PASS' if c.accepted else '----'} {listing.label:18s} IoU={c.iou:.3f} NCC={c.ncc:.3f} unique-pass={accepted_count}")

    chosen = choose_best_candidates(all_candidates, TOTAL_TARGET, set())
    daily = chosen[:DAILY_TARGET]
    run = chosen[DAILY_TARGET:DAILY_TARGET + RUN_TARGET]
    write_reports(all_candidates, chosen, out)
    if daily:
        make_contact_sheet(daily, out / "daily-contact-sheet.png", args.sheet_limit, "Pixel Recall Daily-only ABO pool")
    if run:
        make_contact_sheet(sorted(run, key=lambda c: (memory_difficulty(c), score(c), sha_key(c.item_id))), out / "run-contact-sheet.png", args.sheet_limit, "Pixel Recall Run-only ABO pool (easy -> hard)")

    summary = {
        "processed": len(all_candidates),
        "downloadAttempts": download_count,
        "strictPasses": sum(c.accepted for c in all_candidates),
        "uniqueSelected": len(chosen),
        "targetTotal": TOTAL_TARGET,
        "dailySelected": len(daily),
        "runSelected": len(run),
        "dailyBankCount": DAILY_BANK_COUNT,
        "dailyBankSize": DAILY_BANK_SIZE,
        "runPoolSize": RUN_TARGET,
        "dailyRunOverlap": 0,
        "dataset": ABO_HOME,
        "license": ABO_LICENSE,
    }
    (out / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf8")
    print("\n" + json.dumps(summary, indent=2))

    if len(chosen) != TOTAL_TARGET:
        print(f"\nNot enough high-quality unique patterns ({len(chosen)}/{TOTAL_TARGET}).")
        print("Deployed JS and preview assets were NOT replaced.")
        print("Increase --max-downloads / --max-listings-per-label before weakening quality thresholds.")
        return 2

    write_selected_assets(chosen, Path(args.asset_dir))
    write_js(chosen, Path(args.js_output))
    print(f"\nREADY: {DAILY_TARGET} Daily-only + {RUN_TARGET} Run-only ABO objects; overlap=0.")
    print(f"Preview assets: {args.asset_dir} ({TOTAL_TARGET} WebP files)")
    print(f"Source manifest: {out / 'selected-sources.csv'}")
    return 0


def add_quality_args(p):
    p.add_argument("--target-count", type=int, default=TOTAL_TARGET)
    p.add_argument("--min-iou", type=float, default=0.68)
    p.add_argument("--min-ncc", type=float, default=0.74)
    p.add_argument("--min-filled", type=int, default=8)
    p.add_argument("--max-filled", type=int, default=43)
    p.add_argument("--max-components", type=int, default=2)
    p.add_argument("--min-border-white", type=float, default=0.68)
    p.add_argument("--padding", type=float, default=0.10)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest="mode", required=True)
    p = sub.add_parser("build", help="scan ABO candidates, rank all survivors, and build disjoint Daily/Run libraries")
    p.add_argument("--work-dir", default=".abo-cache")
    p.add_argument("--output-dir", default="abo-output")
    p.add_argument("--js-output", default="real-object-patterns.generated.js")
    p.add_argument("--asset-dir", default="assets/abo", help="deployed local WebP preview directory")
    p.add_argument("--listings-tar", default="", help="optional existing abo-listings.tar")
    p.add_argument("--offline", action="store_true", help="do not download metadata; cached candidate images are still reused when present")
    p.add_argument("--max-listings-per-label", type=int, default=500)
    p.add_argument("--max-downloads", type=int, default=30000)
    p.add_argument("--sheet-limit", type=int, default=50)
    add_quality_args(p)
    args = ap.parse_args()
    if args.mode == "build":
        return build(args)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
