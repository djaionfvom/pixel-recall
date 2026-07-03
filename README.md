# Pixel Recall — Custom share menu

This build avoids unreliable desktop native Web Share calls.

After a result, **Share result** opens a custom panel with:

- WhatsApp
- Facebook
- X
- Email
- Copy link
- Copy image
- Download image
- Share image on supported phones

When opened locally, social buttons share the public GitHub Pages URL. When deployed, they share the current website URL. The actual result PNG is always available to copy or download.

## GitHub Pages

Upload `index.html`, `style.css`, `script.js`, `icon.svg`, and `README.md` to the repository root.


## Toggle-drag drawing

Drawing now behaves the same with touch and mouse. Each cell touched during a drag toggles once: empty cells become filled and filled cells become empty. A cell is changed only once per gesture, which prevents pointer jitter from undoing the action.
