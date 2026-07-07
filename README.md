# Pixel Recall — v8 clean and analytics update

This build adds the first retention and measurement improvements based on player feedback.

## Changes

- Fixes iOS page scrolling from the grid before and after the drawing phase.
- Keeps touch drawing locked to the grid while a puzzle is actively being redrawn.
- Sends `game_started` and `game_completed` events to GA4.
- Includes mode, accuracy, pixel counts, puzzle name, daily number, Journey level, and pass state in analytics.
- Displays the Daily personal best after a result.
- Adds a local Daily streak stored in the browser.
- Adds search metadata, canonical URL, Open Graph tags, and X/Twitter card tags.
- Adds an `og-image.png` social preview image.
- Updates asset cache versions to `v8-retention`.

## Deploy to GitHub Pages

Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, `icon.svg`, `og-image.png`, `CNAME`, `robots.txt`, and `sitemap.xml` at the root level.

After deployment, test analytics in GA4 Realtime by pressing **Start**, finishing a puzzle, and pressing **Check**. Look for `game_started` and `game_completed`.

## Share-result popup

The Share result controls now open in a centered modal window instead of appearing below the game. The modal locks background scrolling, remains scrollable on small screens, and closes with the close button, Escape key, or a click/tap outside the window.

