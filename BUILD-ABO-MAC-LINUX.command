#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo "Pixel Recall - build disjoint Amazon Berkeley Objects libraries"
echo "Up to 30,000 photos -> global ranking -> 1,095 Daily-only + 1,095 Run-only."
python3 -m venv .venv-abo
source .venv-abo/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements-real-objects.txt
python tools/abo_pattern_pipeline.py build --target-count 2190 --max-downloads 30000 --max-listings-per-label 500 --output-dir abo-output --asset-dir assets/abo --js-output real-object-patterns.generated.js
echo "SUCCESS: disjoint Daily and Run libraries plus local animation previews are active."
echo "Review abo-output/daily-contact-sheet.png, abo-output/run-contact-sheet.png, and abo-output/selected-sources.csv before deploying."
