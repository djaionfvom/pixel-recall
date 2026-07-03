# Pixel Recall

A small visual-memory game where players briefly see a pixel-art pattern and then redraw it from memory.

## Modes

- **Daily:** everyone gets the same UTC date-based 8×8 puzzle. Results can be shared without revealing the pattern.
- **Journey:** a long high-score run with 100 progressively harder patterns, growing from simple 5×5 shapes to dense 13×13 images. A score of 80% or more advances to the next level. Failing a level ends the run and returns the player to Level 1, while the highest level reached is saved as their best score.

The game always opens in Daily mode. Journey uses checkpoints every 10 levels, and the current run, best level, and Daily best scores are stored locally in the browser.

## Run locally

Open `index.html` in a browser.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, `icon.svg`, and `README.md`.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and root folder.

Once deployed, the Share button includes the live page URL in shared results.
