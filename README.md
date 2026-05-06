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

Subjective scoring is stored in `data/curation.generated.ts`, which is currently
generated from heuristics using the public sheet.

To refresh that local curation file:

```bash
npm run generate:curation
```

To confirm that every sheet project has a matching local curation entry:

```bash
npm run validate:curation
```

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
