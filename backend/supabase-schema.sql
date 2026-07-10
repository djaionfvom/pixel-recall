-- Pixel Recall v24 backend
-- Run this once in Supabase → SQL Editor.
-- It creates a public daily_scores table and an RPC function used by the frontend.
-- Rule: only the FIRST completed Daily attempt per anonymous browser/user per Daily puzzle is official.
-- Replays are practice only and never update the community distribution.

create extension if not exists pgcrypto;

create table if not exists public.daily_scores (
  id uuid primary key default gen_random_uuid(),
  daily_number integer not null check (daily_number > 0),
  puzzle_name text not null default '',
  accuracy integer not null check (accuracy >= 0 and accuracy <= 100),
  correct_cells integer not null default 0 check (correct_cells >= 0),
  missed_cells integer not null default 0 check (missed_cells >= 0),
  extra_cells integer not null default 0 check (extra_cells >= 0),
  grid_size integer not null default 8 check (grid_size >= 1 and grid_size <= 20),
  anonymous_user_id text not null,
  device_type text not null default 'unknown',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (daily_number, anonymous_user_id)
);

create index if not exists daily_scores_daily_number_idx
  on public.daily_scores (daily_number);

alter table public.daily_scores enable row level security;

-- Everyone may read daily scores so the game can render today's distribution.
drop policy if exists "Public can read daily scores" on public.daily_scores;
create policy "Public can read daily scores"
  on public.daily_scores
  for select
  to anon, authenticated
  using (true);

-- Keep direct writes closed. Writes happen through the validated RPC below.
revoke insert, update, delete on public.daily_scores from anon, authenticated;
grant select on public.daily_scores to anon, authenticated;

-- Replace old v19 RPC if it exists.
drop function if exists public.submit_daily_score(integer, text, integer, integer, integer, integer, integer, text, text);

create or replace function public.submit_daily_score(
  p_daily_number integer,
  p_puzzle_name text,
  p_accuracy integer,
  p_correct_cells integer,
  p_missed_cells integer,
  p_extra_cells integer,
  p_grid_size integer,
  p_anonymous_user_id text,
  p_device_type text default 'unknown'
)
returns table (
  accepted boolean,
  already_submitted boolean,
  official_accuracy integer,
  official_created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_row public.daily_scores%rowtype;
  official_row public.daily_scores%rowtype;
begin
  if p_daily_number is null or p_daily_number < 1 then
    raise exception 'Invalid daily number';
  end if;

  if p_accuracy is null or p_accuracy < 0 or p_accuracy > 100 then
    raise exception 'Invalid accuracy';
  end if;

  if p_grid_size is null or p_grid_size < 1 or p_grid_size > 20 then
    raise exception 'Invalid grid size';
  end if;

  if p_anonymous_user_id is null or length(p_anonymous_user_id) < 8 or length(p_anonymous_user_id) > 120 then
    raise exception 'Invalid anonymous user id';
  end if;

  insert into public.daily_scores (
    daily_number,
    puzzle_name,
    accuracy,
    correct_cells,
    missed_cells,
    extra_cells,
    grid_size,
    anonymous_user_id,
    device_type
  ) values (
    p_daily_number,
    left(coalesce(p_puzzle_name, ''), 120),
    p_accuracy,
    greatest(coalesce(p_correct_cells, 0), 0),
    greatest(coalesce(p_missed_cells, 0), 0),
    greatest(coalesce(p_extra_cells, 0), 0),
    p_grid_size,
    p_anonymous_user_id,
    left(coalesce(p_device_type, 'unknown'), 24)
  )
  on conflict (daily_number, anonymous_user_id)
  do nothing
  returning * into inserted_row;

  if inserted_row.id is not null then
    accepted := true;
    already_submitted := false;
    official_accuracy := inserted_row.accuracy;
    official_created_at := inserted_row.created_at;
    return next;
    return;
  end if;

  select * into official_row
  from public.daily_scores
  where daily_number = p_daily_number
    and anonymous_user_id = p_anonymous_user_id
  limit 1;

  accepted := false;
  already_submitted := true;
  official_accuracy := official_row.accuracy;
  official_created_at := official_row.created_at;
  return next;
end;
$$;

grant execute on function public.submit_daily_score(
  integer, text, integer, integer, integer, integer, integer, text, text
) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Pixel Recall v24: randomized Recall Run leaderboard
-- Every finished run may be submitted. The same anonymous player may appear
-- any number of times. Only the same run_id is protected from duplicate clicks.
-- Names and messages are stored as plain text without content/length limits.
-- The frontend renders both with textContent so HTML/JavaScript is not executed.
-- ---------------------------------------------------------------------------

create table if not exists public.run_scores (
  id uuid primary key default gen_random_uuid(),
  run_id text not null unique,
  anonymous_user_id text not null,
  display_name text not null default 'Anonymous',
  message text not null default '',
  patterns_passed integer not null check (patterns_passed >= 0),
  patterns_attempted integer not null check (patterns_attempted >= 1),
  run_seed text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists run_scores_ranking_idx
  on public.run_scores (patterns_passed desc, created_at asc);

create index if not exists run_scores_created_at_idx
  on public.run_scores (created_at desc);

alter table public.run_scores enable row level security;

-- Do not expose the internal anonymous browser identifier through direct reads.
drop policy if exists "Public can read run scores" on public.run_scores;
revoke select, insert, update, delete on public.run_scores from anon, authenticated;

-- One submission for one generated run ID. A player may submit unlimited
-- different runs and therefore may appear multiple times on the leaderboard.
drop function if exists public.submit_run_score(text, text, text, text, integer, integer, text);
create or replace function public.submit_run_score(
  p_run_id text,
  p_anonymous_user_id text,
  p_display_name text,
  p_message text,
  p_patterns_passed integer,
  p_patterns_attempted integer,
  p_run_seed text default ''
)
returns table (
  accepted boolean,
  score_id uuid,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_row public.run_scores%rowtype;
  existing_row public.run_scores%rowtype;
begin
  if p_run_id is null or length(p_run_id) < 8 then
    raise exception 'Invalid run id';
  end if;

  if p_anonymous_user_id is null or length(p_anonymous_user_id) < 8 then
    raise exception 'Invalid anonymous user id';
  end if;

  if p_patterns_passed is null or p_patterns_passed < 0 then
    raise exception 'Invalid patterns passed';
  end if;

  if p_patterns_attempted is null or p_patterns_attempted < 1 then
    raise exception 'Invalid patterns attempted';
  end if;

  if p_patterns_attempted < p_patterns_passed then
    raise exception 'Attempt count cannot be lower than passed count';
  end if;

  insert into public.run_scores (
    run_id,
    anonymous_user_id,
    display_name,
    message,
    patterns_passed,
    patterns_attempted,
    run_seed
  ) values (
    p_run_id,
    p_anonymous_user_id,
    coalesce(nullif(p_display_name, ''), 'Anonymous'),
    coalesce(p_message, ''),
    p_patterns_passed,
    p_patterns_attempted,
    coalesce(p_run_seed, '')
  )
  on conflict (run_id) do nothing
  returning * into inserted_row;

  if inserted_row.id is not null then
    accepted := true;
    score_id := inserted_row.id;
    submitted_at := inserted_row.created_at;
    return next;
    return;
  end if;

  select * into existing_row
  from public.run_scores
  where run_id = p_run_id
  limit 1;

  accepted := false;
  score_id := existing_row.id;
  submitted_at := existing_row.created_at;
  return next;
end;
$$;

-- Public all-time leaderboard reader. It returns only public-facing fields and never the
-- anonymous_user_id or run_seed.
drop function if exists public.get_run_leaderboard(text, integer);
create or replace function public.get_run_leaderboard(
  p_period text default 'all',
  p_limit integer default 50
)
returns table (
  rank_position bigint,
  display_name text,
  message text,
  patterns_passed integer,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    row_number() over (order by rs.patterns_passed desc, rs.created_at asc) as rank_position,
    rs.display_name,
    rs.message,
    rs.patterns_passed,
    rs.created_at
  from public.run_scores rs
  order by rs.patterns_passed desc, rs.created_at asc
  limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;

grant execute on function public.submit_run_score(
  text, text, text, text, integer, integer, text
) to anon, authenticated;

grant execute on function public.get_run_leaderboard(text, integer)
  to anon, authenticated;
