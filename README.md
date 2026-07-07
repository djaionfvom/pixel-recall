# Pixel Recall v15 — Streamlined result sharing

This build uses different sharing entry points for result images and custom challenge links, based on what browsers handle most reliably.

## Result sharing

Daily, Journey, and completed friend-challenge results now always open the Pixel Recall share popup first.

The popup includes:

- Result screenshot preview
- **Share screenshot** through the native device menu when PNG file sharing is supported
- Copy image when the browser allows image clipboard access
- Download image
- WhatsApp, Facebook, X, and email links for result text and the relevant game/challenge link

The social destination links cannot automatically attach a browser-generated PNG. The popup states this clearly so users can copy or download the screenshot and attach it manually. Completed custom challenges retain the original custom challenge URL in the share text and link.

## Custom-pattern creation

After creating a custom pattern, Pixel Recall tries the native link-sharing menu first. The exact challenge URL is included in both the visible message and the URL field.

When native link sharing is unavailable or fails, the controlled challenge popup opens with:

- Copy challenge link
- Share challenge
- Open challenge

Cancelling the native menu leaves the pattern intact so the creator can press **Create challenge link** again.

## Other retained features

- Daily, Journey, and Custom modes
- Custom grid sizes from 5×5 through 12×12
- Back to normal Pixel Recall from accepted friend challenges
- Result-image generation
- GA4 game and sharing events
- iOS grid/page scrolling behavior
- Modal keyboard controls and mobile layout

## Deployment

Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, `icon.svg`, `og-image.png`, `CNAME`, `robots.txt`, and `sitemap.xml` at the root level.

Native Web Share features require HTTPS and vary by operating system and browser. Test the screenshot action on at least one iPhone/Android device and the fallback options on a laptop after deployment.

## Version 15 change

The result-share popup no longer includes **Copy text + link** or **Copy link**. Custom challenge creation still keeps its dedicated challenge-link controls.
