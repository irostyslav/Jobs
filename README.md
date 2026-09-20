# Salesforce Hiring Signal Dashboard

Static GitHub Pages dashboard for **Salesforce US corporate openings** as a priority / effort-allocation signal.

**Live:** https://irostyslav.github.io/Jobs/

**Repo:** https://github.com/irostyslav/Jobs

## Purpose

1. See relationships between Salesforce corporate US openings (themes, clusters).
2. Treat hiring volume as a signal of priorities / where effort is allocated.
3. Compare Salesforce public narrative vs where openings concentrate.
4. Surface PM roles (Senior PM → Director) worth applying to.

## Snapshot

| Field | Value |
|-------|-------|
| Date | **2026-09-20 PT** |
| Source | Workday External Career Site US (`salesforce.wd12.myworkdayjobs.com`) |
| N jobs | **498** unique requisitions |
| Method | Paginated CXS list API; title keyword multi-label themes |

Raw artifacts live in [`data/`](./data/).

## Pages / sections

| Section | What it shows |
|---------|----------------|
| **Overview** | N=498, snapshot date, evidence bullets from the signal report |
| **Themes** | Theme volume chart + Workday Job Category facet chart |
| **Relationships** | Force graph + co-occurrence matrix (Agentforce, Partner, PubSec, GTM, Slack, Data Cloud, …) |
| **Narrative vs allocation** | Cited public claims vs hiring counts (with postings ≠ headcount caveat) |
| **PM apply board** | Senior→Director shortlist cards with Workday links |
| **Job explorer** | Search/filter over all 498 US jobs |

## How to use

1. Open the [live Pages site](https://irostyslav.github.io/Jobs/).
2. Browse sections via the top nav.
3. On **PM Board**, open roles in Workday (this site does not apply for you).
4. On **Explorer**, search by title / location / req or filter by theme / freshness.

## Local preview

```bash
# from repo root
python3 -m http.server 8080
# open http://localhost:8080/
```

GitHub Pages serves from the `main` branch **root** (static HTML/CSS/JS + `data/`).

## Data files

- `data/salesforce-hiring-signal-20260920.json` / `.md` — machine + human signal report
- `data/sf_us_jobs_normalized.json` — 498 US jobs
- `data/sf_facets_us.json` — Workday facets
- `data/salesforce-pm-jobs-20260920.json` / `.md` — PM shortlist
- `data/theme_relationships.json` — derived title co-occurrence for the relationship view

## Caveats

- External postings ≠ approved headcount (backfills, evergreen reqs).
- Themes are multi-label; percentages can sum &gt;100%.
- Partner theme excludes AE “Account Partner” and HR “Business Partner” where noted in the report.
- No invented jobs or metrics — charts and cards read from the JSON snapshots above.

## License / credit

Personal research dashboard for Rostyslav Ivanitsa. Job data © Salesforce / Workday public career site. Public narrative quotes cited to Salesforce press/blog pages.
