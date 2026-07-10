# Supabase setup — Pixel Recall v26

This build uses the same Supabase project for two independent features:

- **Daily:** the first Daily completion per anonymous browser and Daily number is official.
- **Run:** every finished Recall Run may be submitted to the single all-time leaderboard. The same player may appear many times. Only duplicate submission of the exact same generated run is blocked.

## Update the existing project

1. Open the Supabase project.
2. Open **SQL Editor** and create a new query.
3. Paste all of `supabase-schema.sql` and click **Run**.
4. Deploy the complete website folder.

The SQL is designed to be run over the earlier Daily schema. It keeps the Daily table/functions and adds:

- `run_scores`
- `submit_run_score(...)`
- `get_run_leaderboard(...)` (all-time only)

## Public key

`backend-config.js` contains the project URL and browser-safe Publishable key supplied for this project. Do not replace it with a secret or service-role key.

## Leaderboard privacy and safety

The public leaderboard function returns only name, message, patterns passed, timestamp, and rank. It does not return the internal anonymous browser ID or run seed.

Names and messages currently have no content or character restrictions, as requested. The frontend creates DOM text nodes and uses `textContent`; it does not interpret leaderboard content as HTML.

## Fairness limitation

The SQL validates basic values and prevents duplicate clicks for one `run_id`, but the game runs in the browser. A determined person could still modify client code and submit a fabricated result. Strong anti-cheat would require server-created run sessions and server-side verification of every round.
