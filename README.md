# Pixel Recall — 365 daily 8×8 objects

This version keeps the existing grid size, controls, Journey mode, and custom share panel, while updating Daily mode to use **365 unique 8×8 object patterns**. Every Daily puzzle uses a **2.3-second** preview.

The puzzle header is now more compact: the object title and `Daily #… · 8×8 · 2.3s` metadata sit on the same wrapping line.

The custom share menu avoids unreliable desktop native Web Share calls.

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


## Daily heading and zoom

- Daily mode now shows only the daily number before and after play.
- The object name appears only during the memory preview and is hidden when drawing begins.
- Grid size and preview duration are no longer shown in the Daily heading.
- Browser zoom is explicitly enabled from 50% to 500%, and two-finger pinch zoom is allowed over the grid without changing the default layout size.


## Version 3 interface changes

- The object name appears during the memory preview and returns on the result screen.
- The intro is more compact, with the icon and title on one line.
- The new interface-size control can shrink the complete game to 65%, or enlarge it to 120%, without changing the default 100% layout. The selected size is remembered.


## Header layout

The interface-size control is pinned to the top-right column of the puzzle card, aligned with the Daily/Level label. The object name appears below the round label when visible, and the result score sits below the size control.


## Version 6 zoom placement

The interface-size control now sits outside the game card in a fixed position at the top-left of the viewport, slightly above the “Daily visual memory puzzle” eyebrow. The card header contains only the round label/object name and score...
