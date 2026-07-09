// Pixel Recall backend configuration
// 1) Create a Supabase project.
// 2) Run backend/supabase-schema.sql in Supabase SQL Editor.
// 3) Paste your Project URL and anon public key below.
// The game works without these values; streaks stay local and community stats stay hidden. Daily stats count only the first official attempt after Supabase is connected.
window.PIXEL_RECALL_BACKEND = {
  SUPABASE_URL: "https://ztcdqkipxfhtaksxmsee.supabase.co", // example: "https://YOUR-PROJECT.supabase.co"
  SUPABASE_ANON_KEY: "sb_publishable_7x9z83xrb7mIsnfJNDkQ3Q_-qjFuACc" // Settings → API → Project API keys → anon public
};
