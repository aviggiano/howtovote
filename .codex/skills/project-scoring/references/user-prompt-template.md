Score the following project using the repository scoring rubric.

Inputs:

- Project payload: `{{PROJECT_JSON}}`
- Prepared source excerpts: `{{SOURCE_CONTEXT}}`

Return one JSON object only with this exact shape:

```json
{
  "projectUrl": "{{PROJECT_URL}}",
  "title": "{{PROJECT_TITLE}}",
  "reviewedAt": "{{REVIEWED_AT_ISO8601}}",
  "evidence": ["short factual evidence item"],
  "rationale": {
    "trackRecord": "one short sentence",
    "underfundedness": "one short sentence",
    "ecosystemLeverage": "one short sentence",
    "publicGoodsOpenness": "one short sentence",
    "executionClarity": "one short sentence"
  },
  "curation": {
    "primaryCategory": "{{PRIMARY_THEME_KEY}}",
    "themeBaskets": ["{{PRIMARY_THEME_KEY}}"],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.5,
    "notes": "brief overall note"
  }
}
```

Scoring constraints:

- All rubric scores must be integers from `1` to `5`.
- `themeBaskets` must contain one or two repo theme keys, with `primaryCategory` first.
- `confidenceScore` must be a number from `0` to `1`.
- `evidence` should list only the most decision-relevant facts.
- `notes` and all rationale fields should be brief and evidence-based.
- Do not add markdown fences or commentary outside the JSON object.

If evidence is mixed or sparse, score conservatively and explain that in `notes`.
