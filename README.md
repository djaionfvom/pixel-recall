# Pixel Recall v26 — progressive Run + longer previews

This build keeps the compact v25 design and changes only the requested gameplay/leaderboard behavior.

## Daily

- Same Daily mode and first-attempt community statistics
- Local current/best streak
- Daily preview increased from 2.3 seconds to 2.8 seconds

## Run

- Separate main Run mode
- Score remains the number of patterns passed at the existing 80% threshold
- Every run receives a fresh randomized pattern sequence
- Early Run rounds use small grids first: 5×5, then 6×6, 7×7, and upward
- Preview time stays at 3.2 seconds while grid size grows to 13×13
- After the grid reaches 13×13, preview time gradually shortens by 0.2 seconds every three rounds
- Preview time never falls below 2.0 seconds
- Added more 5×5, 6×6, and 7×7 patterns so early runs vary more
- Only one All-time leaderboard is shown
- The same player may submit and appear multiple times
- Names/messages remain unrestricted and are rendered safely as plain text

## Challenge

- Preserved as the smaller secondary `Challenge` action above the Daily/Run switch
- Custom preview increased from 2.3 seconds to 2.8 seconds

## Backend

This version uses the same Run leaderboard table/functions as v24/v25. If that schema is already installed in Supabase, no SQL rerun is required. New installations can run `backend/supabase-schema.sql`.
