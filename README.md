# Pixel Recall v21 — first-attempt Daily stats + distribution bar fix

This build starts from the streak + community distribution version and adds first-attempt enforcement for Daily stats:

- Local Daily streak after completing the Daily puzzle
- Only the first completed Daily attempt per anonymous browser/user counts in stats
- Daily replays are treated as practice only
- Best streak saved in `localStorage`
- Daily community score distribution across users
- Percentile-style message: “You beat X% of today’s players”
- Backend-ready Supabase setup with first-attempt-only official scores
- Share text can include streak/percentile when available
- Custom/friend challenge sharing behavior from v18 is preserved

## Backend

The backend is prepared but not deployed from this ZIP. To connect it:

1. Create a Supabase project.
2. Run `backend/supabase-schema.sql` in Supabase SQL Editor.
3. Open `backend-config.js` and paste your Supabase Project URL and anon public key.
4. Deploy the whole folder to GitHub Pages.

If you already ran the v19 SQL, run the v20 SQL as well. It replaces the submit function so future replays no longer overwrite the first official attempt.

Without backend keys, the game still works. Streaks are local-only and community stats show a setup message.

## Files

- `index.html` — app markup and new Daily progress panel
- `script.js` — game logic, local streaks, Supabase calls, distribution rendering
- `style.css` — existing design plus Daily progress panel styles
- `backend-config.js` — frontend backend keys placeholder
- `backend/supabase-schema.sql` — database table + RPC setup
- `backend/README.md` — setup instructions

## Notes

The score table stores one official first attempt per anonymous browser ID per Daily puzzle. Replays are practice only and do not update the community distribution. There is no login, email, or account system.


## v21 fix

- Fixed score distribution bar fills by making the track and fill spans block-level elements.
- Updated cache-busting query strings in `index.html` so browsers load the fixed CSS...
