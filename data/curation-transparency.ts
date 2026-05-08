export const curationTransparencyNote =
  "No live LLM call happens while a user browses this page. The app reads a checked-in curation file plus the live Giveth sheet, and that curation file can be produced offline from the repo's prompt-and-rubric scoring workflow before being merged into the site.";

export const reusableCurationPrompt = `Review one Ethereum Security round project using only:
- the public Giveth spreadsheet row
- the project's linked website or GitHub page

Return:
- one primary theme
- up to one secondary theme
- 1-5 scores for Track Record, Underfundedness, Ecosystem Leverage, Public Goods Openness, and Execution Clarity
- a confidence score from 0 to 1
- brief notes explaining the call

Objective rubric:
- Track Record: 1 if under 2 months old or still prototype-grade; 2 if 2-12 months old; 3 if 1-2 years old or only moderate continuity is evidenced; 4 if 2-4 years old with repeated maintenance; 5 if over 4 years old, still maintained, and clearly used in the real world
- Underfundedness: 1 if clearly well-capitalized or commercial; 2 if there is some institutional or commercial support; 3 if mixed; 4 if small public-goods, research, or nonprofit funding would clearly extend the work; 5 if donations directly buy continued operation in measurable units
- Ecosystem Leverage: 1 if local or narrow; 2 if niche external use; 3 if reusable by multiple teams or one meaningful segment; 4 if broadly reusable across many protocols, developers, researchers, or operators; 5 if foundational or standard-setting
- Public Goods Openness: 1 if closed or mostly private; 2 if only partly public; 3 if usable public outputs exist but openness is mixed; 4 if clearly open-source or public-facing with reusable artifacts; 5 if strongly reusable public-good artifacts are maintained transparently
- Execution Clarity: 1 if vague; 2 if the project is clear but next steps or funding use are not; 3 if some future work or funding use is described; 4 if deliverables or funding use are concrete; 5 if outputs, timelines, or budget math are explicit

Treat missing evidence as missing and score conservatively.`;
