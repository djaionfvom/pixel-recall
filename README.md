# Pixel Recall — v11 custom grid sizes

This build keeps Daily mode, Journey mode, analytics, the iOS grid-scrolling fix, and the share-result popup. It adds a backend-free Custom mode for friend challenges.

## Custom mode

1. Open **Custom**.
2. Choose a grid size from **5×5 through 12×12**, then draw any non-empty pattern.
3. Press **Create challenge link**.
4. Copy or share the generated link.
5. A friend opens the link, memorizes the pattern for 2.3 seconds, redraws it, and receives a normal Pixel Recall score.

The selected grid size and pattern are encoded into the URL using `size` and `challenge` parameters. No account, database, or backend is required. Custom patterns are not published in a public gallery.

## Included analytics

- `game_started`
- `game_completed`
- `custom_pattern_created`
- `custom_challenge_opened`

Custom events include the number of selected pattern cells and the chosen grid size. Standard completion events continue to include mode, accuracy, correct/missed/extra counts, puzzle information, and Journey pass state.

## Other included improvements

- Share result opens in a modal popup.
- The custom-link creator also opens in an accessible modal.
- Modals close with the close button, Escape, or a click/tap outside.
- iOS page scrolling works outside the active drawing phase.
- Search metadata, Open Graph metadata, social preview image, sitemap, robots file, CNAME, and Google verification file remain included.

## Deploy to GitHub Pages

Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, `icon.svg`, `og-image.png`, `CNAME`, `robots.txt`, and `sitemap.xml` at the root level.

After deployment, create Custom patterns in more than one grid size and open the generated link in a private browser window to confirm the full friend-challenge flow.
