# Pixel Recall backend setup

This build is backend-ready with Supabase. Daily stats use first attempts only.

## 1. Create the database

1. Go to Supabase and create a new project.
2. Open **SQL Editor**.
3. Paste and run `backend/supabase-schema.sql`.

If you already ran the v19 SQL, run the v20 SQL too. It replaces the old RPC function with first-attempt-only behavior.

This creates:

- `daily_scores` table
- public read access for daily score distribution
- `submit_daily_score(...)` RPC function
- one official first attempt per anonymous browser/user per Daily puzzle

## 2. Add your frontend keys

Open `backend-config.js` and paste:

```js
window.PIXEL_RECALL_BACKEND = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_ANON_PUBLIC_KEY"
};
```

Find these values in Supabase:

- **Project Settings → API → Project URL**
- **Project Settings → API → Project API keys → anon public**

## 3. Deploy

Upload the whole folder contents to GitHub Pages, including:

- `index.html`
- `script.js`
- `style.css`
- `backend-config.js`
- the other existing static files

The game still works before the backend is connected. In that state, Daily streaks are local-only and community distribution shows a setup message.

## Privacy note

No login, email, or name is required. The frontend stores a random anonymous browser ID in `localStorage` and sends only Daily result stats. Replays after the first Daily completion are returned as practice attempts and do not overwrite the official result.
