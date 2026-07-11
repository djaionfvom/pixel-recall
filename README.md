# Pixel Recall v27 — Popup Results and Leaderboard

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


## v27 interface changes

- Daily streak, community distribution, percentile text and Share result are now in a Daily Results popup.
- The Daily Results popup opens automatically after checking the Daily and can be reopened with the compact Daily results button.
- The all-time Run leaderboard is now a popup opened with the Leaderboard button.
- Run name/message submission is now a separate popup shown when a run ends; it can also be reopened with Submit run.
- Long Daily and Run sections were removed from below the game grid, reducing page scrolling.
- Daily scoring, first-attempt backend rules, Run progression, randomized sequences and Supabase schema are unchanged.


## v28 label fix
- Renamed the Run pattern display label from `The Mini U` to `the mini U`.


## v29 fix

- Run mode no longer selects or displays a pattern name before the player presses **Start Run**.
- A neutral empty 5×5 grid is used before the run begins.
- The first randomized pattern is generated only when the run actually starts.


## v30 personal Run high score

- Added the locally stored personal Run high score to the existing compact Run status line.
- It appears before a run, during a run, and after a run.
- No gameplay, leaderboard, backend, styling, or Daily behavior changed.


## v31 top 20 + celebration

- The all-time Run leaderboard now requests and displays only the top 20 entries.
- A confetti burst and achievement toast appear when a run sets a new local personal best.
- A second celebration appears after submission when the run qualifies for the all-time top 20.
- Reduced-motion preferences are respected.
- No backend schema changes are required.

## v33 Run result flow fix

- A failed Run now leaves the colored result visible for 1.8 seconds before opening the leaderboard-submission popup.
- The submission popup no longer auto-focuses the name field, preventing mobile keyboard/viewport distortion.
- Closing either Run popup explicitly restores the completed pattern, accuracy, result colors, message, and Start New Run button.
- Modal transitions no longer briefly focus a hidden control.
- Added stable scrollbar spacing to prevent horizontal layout jumps when popups open or close.
- No gameplay, scoring, leaderboard, Daily, Challenge, or Supabase schema changes.
