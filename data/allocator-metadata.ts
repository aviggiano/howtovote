export const OFFICIAL_PROJECT_SHEET_TITLE =
  "Ethereum Security Projects in TheDAO's QF Round (May 5th)";

export const PROJECT_SPREADSHEET_LABEL = `${OFFICIAL_PROJECT_SHEET_TITLE} spreadsheet`;

export const OFFICIAL_PROJECT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1o3UYyn6aqiFnoK5NvnnMXIHM4Op4Rup7HNGxGM1lL2U/edit?gid=1388538582#gid=1388538582";

export const OFFICIAL_PROJECT_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1o3UYyn6aqiFnoK5NvnnMXIHM4Op4Rup7HNGxGM1lL2U/export?format=csv&gid=1388538582";

export const GIVETH_QF_DOCS_URL = "https://docs.giveth.io/quadraticfunding";
export const GIVETH_COCM_ANNOUNCEMENT_URL =
  "https://forum.giveth.io/t/cluster-match-qf-announcement/1419";
export const GIVETH_GRAPHQL_URL = "https://core.v6.giveth.io/graphql";

export function getGivethRoundUrl(roundSlug: string) {
  return `https://qf.giveth.io/qf/${roundSlug}`;
}
