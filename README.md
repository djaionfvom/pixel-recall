# Pixel Recall v13 — Friend challenge exit

This build adds a clear **Back to normal Pixel Recall** button while playing an accepted friend challenge. It opens the clean homepage without the custom challenge parameters. Switching directly to Daily or Journey also clears the challenge URL, so refreshing does not reopen the friend challenge.

This build keeps Daily, Journey, variable-size Custom challenges, analytics, the iOS grid-scrolling fix, and the modal fallbacks. It unifies the native sharing behavior.

## Sharing rules

- **Daily and Journey results:** the primary **Share result** action opens the native share sheet only when the generated PNG screenshot can be attached. The screenshot is mandatory.
- **Custom challenge creation:** the native share payload always includes the exact challenge URL in both the `url` field and the visible message text.
- **Custom challenge results:** the native share payload includes the generated result screenshot and the original challenge URL. The URL is included in both the text and `url` fields.
- When native screenshot sharing is unavailable, the existing modal opens with image preview, copy-image, download-image, copy-link, and destination options.

## Default custom challenge message

`I made you a 7×7 Pixel Recall memory challenge. Memorize the pattern, redraw it, and send me your score!`

The actual selected grid size and challenge URL are inserted automatically.

## Included analytics

Existing events remain, and successful native sharing adds:

- `result_shared`
- `custom_challenge_shared`

The result event records whether a screenshot and custom challenge link were included.

## Deployment

Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, `icon.svg`, `og-image.png`, `CNAME`, `robots.txt`, and `sitemap.xml` at the root level.

The Web Share API requires HTTPS. After deployment, test Daily, Journey, Custom challenge creation, and a completed Custom challenge on a phone that supports file sharing.