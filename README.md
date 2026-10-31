# Pixel Recall v45 — Current UI + ABO-only Daily/Run

This build keeps the compact v25 design and changes only the requested gameplay/leaderboard behavior.

> **Current behavior:** the historical sections below document earlier versions. v45 supersedes their built-in pattern libraries: Daily and Run now use only the generated ABO libraries described in the v45 section. The existing UI, results popups, streaks, sharing, leaderboard and Custom Challenge features are preserved.

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


## v34 mobile Run result-grid restoration

- Fixes the failed Run result grid changing columns after the submission/leaderboard popup on phones.
- The visible result is now always sized from the stored failed pattern size, not the inactive Run placeholder.
- Applies to every grid size, including 5×5 through 13×13.
- Rebuilds the locked result cells if a popup/UI flow altered the grid contents.
- Handles normal window resizes and mobile visual-viewport/keyboard resizes.
- No gameplay, patterns, scoring, leaderboard, Daily, Challenge, or backend changes.


## v35 Daily trio + countdown

- Daily #301 (2026-10-28) remains the existing single-pattern Daily so an in-day deployment does not invalidate existing scores.
- Daily #302 onward uses 3 deterministic patterns per day. Change `DAILY_PATTERN_COUNT` from `3` to `5` in `script.js` if five patterns are preferred later.
- Each Daily pattern gets an animated 3 → 2 → 1 countdown before the memorization preview begins.
- The first historical Daily puzzle remains the first puzzle in each new set; additional puzzles are deterministic and distinct.
- The three pattern results are combined into one overall Daily accuracy and submitted once to the existing backend, so no Supabase schema migration is required.
- Daily streaks and community score distributions are updated only after all Daily patterns are completed.


## v37 Daily 1,095-pattern year pool

- Daily #301 (2026-10-28) remains the existing single-pattern Daily, so deploying this build today does not invalidate scores already submitted today.
- Daily #302 onward uses exactly 3 patterns per day.
- The Daily library now contains exactly 1,095 distinct binary pixel grids: 365 legacy patterns, 365 newly selected Font Awesome-derived silhouettes, and 365 clean positional/mirrored variants of the selected silhouettes.
- Across each 365-day cycle, every grid in all three 365-pattern banks is used exactly once; there are no exact pixel-grid repeats inside that cycle.
- The legacy first-pattern schedule remains locked to the original 365-pattern cycle. Adding the new banks therefore does not reshuffle the historical first puzzle.
- The third bank is offset by 137 days, so a selected silhouette and its visual variant never appear together in the same Daily.
- Each of the three patterns gets the animated 3 → 2 → 1 countdown before memorization.
- The overall Daily score is the rounded arithmetic mean of the three individual 0–100 scores. Example: 80%, 100%, 70% → 83%.
- Only one final Daily result is submitted to the existing Supabase endpoint, so no backend/schema migration is required.
- Daily streak/community statistics are updated only after all three patterns are completed.

## v45 — ABO-only Daily + Run, built from the current game

This package keeps the current Pixel Recall UI/gameplay code and replaces the built-in Daily and Run pattern libraries with Amazon Berkeley Objects (ABO)-derived content only.

- Generator inspects up to 30,000 curated ABO catalog-image candidates and scores every strict survivor before selection.
- The best 2,190 unique normalized 8×8 silhouettes are retained.
- Quality ranks 1–1,095 are Daily-only; ranks 1,096–2,190 are Run-only. There is no Daily/Run silhouette overlap.
- Daily is split into three ranked bins of 365. Each 365-day cycle uses a deterministic shuffled permutation for each bin, so each day draws one item from each bin without repeats inside that cycle.
- Run uses the separate 1,095-object pool and preserves the current seeded Run/leaderboard/scoring system. Since ABO puzzles are 8×8, Run difficulty comes from object-shape difficulty plus progressively tighter memorization time rather than old handcrafted grid sizes.
- For Daily and Run, the selected source photo is stored locally as a small WebP. Before memorization begins, it smoothly pixelates, desaturates and resolves into the final 8×8 binary pattern. The memorization timer starts only after the animation completes.
- Custom challenges remain user-created and do not use a built-in pattern library.

### Build on GitHub instead of locally

Set GitHub Pages to **GitHub Actions**, then run **Actions → Generate ABO library and deploy Pixel Recall → Run workflow**. The currently deployed site remains live while the GitHub-hosted runner builds the new library. Deployment occurs only after all 2,190 objects and WebP assets pass validation.

The normal Pages workflow is lightweight and reuses the committed generated library for later HTML/CSS/JS changes; it does not rerun the 30,000-image analysis.
