# Pixel Recall v18 — reliable custom challenge sharing

This build starts from the v11 custom-grid-size version and leaves Daily, Journey, result sharing, analytics, and custom challenge encoding unchanged.

## Custom challenge sharing

- Native challenge sharing is shown only on phones and tablets that support the Web Share API over HTTPS.
- Desktop browsers use controlled options instead: Copy challenge link, WhatsApp, X, Email, and Open challenge.
- Native sharing sends the challenge URL only in the `url` field. The message text does not contain the URL, preventing apps from displaying it twice.
- WhatsApp and Email receive a single combined message containing the URL once.
- X receives separate text and URL parameters, also avoiding duplication.
- The selected custom grid size is included in the share message.

## Deployment

Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, `icon.svg`, `og-image.png`, `CNAME`, `robots.txt`, and `sitemap.xml` at the root level.

After deployment, test custom sharing on one phone and one desktop browser. Native sharing requires HTTPS.
