# How To Vote

Single-page Next.js allocator for the Ethereum Security round on Giveth. The app
pulls live project metadata from the public Google Sheet, applies an app-local
curation layer, and produces a recommended split that can be shared by URL.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Table
- GitHub Actions CI

## Local development

```bash
npm install
npm run generate:curation
npm run dev
```

## Curation workflow

The Google Sheet remains the source of live metadata.

Subjective scoring is stored in `data/curation.generated.ts`.

The generator now reviews each project against the public sheet plus its linked
website, then produces:

- one primary category
- up to one secondary theme
- five signal scores from `1` to `5`
- a confidence score from `0` to `1`

To refresh that local curation file:

```bash
npm run generate:curation
```

To confirm that every sheet project has a matching local curation entry:

```bash
npm run validate:curation
```

## LLM scoring workflow

Repo-local skill files live under `.codex/skills/project-scoring/`.

That skill expects this workflow:

1. Prepare per-project evidence bundles from the live sheet plus linked website:

```bash
npm run prepare:scoring
```

This writes JSON inputs to `tmp/project-scoring-inputs/`.

2. Use the `project-scoring` skill to review those inputs in waves of at most
   four subagents at a time, using the checked-in prompt and rubric references.

3. Merge the structured scoring results back into the app-local curation file:

```bash
npm run merge:scoring
```

This expects JSON outputs in `tmp/project-scoring-results/` and rewrites
`data/curation.generated.ts` with `source: "llm"` entries.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Or run the full local check bundle:

```bash
npm run check
```
