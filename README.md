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


## Result image sharing

After a completed round, the Share button generates a PNG result card containing the score and colored result grid. On mobile browsers that support file sharing, it opens the native share sheet with the PNG attached. On supported desktop browsers it copies the PNG to the clipboard; otherwise it downloads the PNG so it can be attached manually.


## Desktop sharing fix

This version avoids opening the native file-sharing dialog on desktop browsers, where support is inconsistent. On desktop it first attempts to copy the PNG image and automatically downloads it if image clipboard access fails or times out. Mobile devices continue to use the native share sheet.
