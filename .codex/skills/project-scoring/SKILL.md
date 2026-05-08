---
name: project-scoring
description: Score batches of projects from prepared repo inputs using the in-repo scoring prompts and rubric, with at most 4 scoring subagents at once, then write structured per-project and merged outputs.
---

# Project Scoring

Use this skill when the task is to review many projects against this repo's curation rubric and emit structured scoring artifacts.

## Read first

Open these references before scoring:

- [references/system-prompt.md](references/system-prompt.md)
- [references/user-prompt-template.md](references/user-prompt-template.md)
- [references/scoring-rubric.md](references/scoring-rubric.md)

Use repo artifacts, not invented inputs. Expect prepared inputs from `scripts/` and score outputs under `tmp/` or `data/`.

## Expected repo inputs and outputs

Prefer the repo's current workflow:

- Run `npm run prepare:scoring` when inputs have not been prepared yet.
- Read per-project inputs from `tmp/project-scoring-inputs/*.json`.
- Write one per-project result file to `tmp/project-scoring-results/*.json`.
- Run `npm run merge:scoring` after all projects are scored.

If the repo state differs, inspect `scripts/`, `tmp/`, and `data/` and adapt to the current file layout before scoring.

## Workflow

1. Prepare inputs if needed, then read `tmp/project-scoring-inputs/index.json` to get the full project/file list.
2. Read the three reference files in this skill.
3. Partition the unscored projects into disjoint batches and score them in limited parallelism: start at most 4 scoring subagents at a time. Wait for that wave to finish before starting more.
4. Each subagent owns a disjoint set of result files under `tmp/project-scoring-results/` and must not overwrite another subagent's files.
5. For each project, assign objective integer scores from `1` to `5` for every rubric dimension. Stay evidence-based and use middle scores when evidence is thin or mixed.
6. After all result files exist, run `npm run merge:scoring`.

## Required output shape

Each project result must be JSON and include exactly these top-level fields:

- `projectUrl`
- `title`
- `reviewedAt`
- `evidence`
- `rationale`
- `curation`

The `curation` object must contain:

- `primaryCategory`
- `themeBaskets`
- `trackRecord`
- `underfundedness`
- `ecosystemLeverage`
- `publicGoodsOpenness`
- `executionClarity`
- `confidenceScore`
- `notes`

Use repo theme keys exactly. Keep notes concise and deterministic enough for `npm run merge:scoring`.
