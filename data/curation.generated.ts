import type { ProjectCuration } from "@/lib/types";

export const generatedProjectCurations: Record<string, ProjectCuration> = {
  "https://qf.giveth.io/project/act": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.89,
    "notes": "Strong open formal-verification infrastructure; funding need and roadmap specificity are only moderate.\nEvidence: The description says act originated in Ethereum Foundation formal verification work and now lives at Argot. | Public GitHub and docs links are included in the prepared input. | The docs describe HEVM and Rocq backends for proving EVM bytecode against specifications.\nRationale / Track Record: There is clear evidence of a shipped tool with public docs, but the prepared input gives limited dated maintenance history.\nRationale / Underfundedness: The project is framed as independent public-good infrastructure, yet the input does not quantify runway or budget need.\nRationale / Ecosystem Leverage: A smart-contract specification and verification framework can improve security across many Ethereum teams.\nRationale / Public Goods Openness: Public docs and a GitHub repository make the work reusable beyond the core team.\nRationale / Execution Clarity: The tool's purpose is clear, but the grant request does not map donations to specific milestones.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/agnopraxlab": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.59,
    "notes": "Sparse evidence because the linked site did not fetch; scores stay conservative.\nEvidence: The description frames the work as making Ethereum's communication layer safer and more trustworthy. | A public GitHub organization is linked, but the website fetch failed in the prepared input. | The prepared metadata shows only two updates and limited additional public context.\nRationale / Track Record: The input shows a research effort with some public presence, but little dated shipping evidence.\nRationale / Underfundedness: It appears independent research, but the prepared materials do not clearly show financial urgency.\nRationale / Ecosystem Leverage: Work on Ethereum's communication layer could affect many nodes and applications if delivered.\nRationale / Public Goods Openness: A public GitHub org is listed, but the failed site fetch leaves openness evidence incomplete.\nRationale / Execution Clarity: The problem statement is understandable, though concrete deliverables are not well specified in the prepared input.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/anticapture-by-blockful": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Clear governance-security product with visible artifacts; funding need is mixed because service offerings are present.\nEvidence: The project cites a March 2024 ENS treasury governance vulnerability disclosure worth about $150M. | The website describes a public dashboard for governance security metrics, alerts, and stage-based risk assessment. | A public GitHub repo is linked alongside case studies for ENS, Compound, and Arbitrum.\nRationale / Track Record: There is evidence of shipped governance-security work and named case studies, but the prepared input does not show a long release history.\nRationale / Underfundedness: The work has public-good value, but the site also advertises consulting and audit services, so funding need is mixed.\nRationale / Ecosystem Leverage: Reusable governance monitoring and attack-surface analysis can help many DAOs, not just one protocol.\nRationale / Public Goods Openness: The dashboard and linked repository are public, though the overall offering is not purely open infrastructure.\nRationale / Execution Clarity: The project names concrete features, case studies, and intended outcomes with good specificity.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/aragon": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "wallet-app-user-safety"
    ],
    "trackRecord": 5,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.63,
    "notes": "Long-running and high-leverage, but the prepared input reads as a mature business more than an underfunded public good.\nEvidence: The description says Aragon was founded in 2017 and still provides onchain governance products and services. | The project links a public GitHub org, docs/resources, and an open app. | Website copy emphasizes platform solutions, governance, tokenomics, and launch tooling.\nRationale / Track Record: A 2017 founding date and continued product surface indicate a long-running shipped project.\nRationale / Underfundedness: The prepared input reads like a mature product and services business rather than donation-dependent public-good maintenance.\nRationale / Ecosystem Leverage: Governance tooling can influence a broad set of onchain organizations and treasury workflows.\nRationale / Public Goods Openness: There are public repos and docs, but the core offering is still a product suite rather than fully open infrastructure.\nRationale / Execution Clarity: The product area is clear, though the prepared grant materials do not tie funding to a specific public-good roadmap.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/assertionseth-on-chain-transaction-guards-for-ethereum": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.94,
    "notes": "Good public transaction-safety primitive with concrete deployment evidence; funding need is plausible but not quantified.\nEvidence: Assertions is described as a public-good smart contract for test-driven onchain transaction safety. | The description includes an Ethereum mainnet deployment address and says the functions are view-only and composable. | A public GitHub repo and project site are linked.\nRationale / Track Record: A mainnet deployment shows real delivery, but the prepared input does not provide much age or maintenance history.\nRationale / Underfundedness: The public-good framing is strong, but the input does not quantify financial need.\nRationale / Ecosystem Leverage: Composable assertion functions could be reused across many governance and transaction-review flows.\nRationale / Public Goods Openness: The project exposes a public repo, public site, and an onchain deployment.\nRationale / Execution Clarity: The security gap and proposed mechanism are described concretely enough to understand the work.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/bitfinding": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.86,
    "notes": "Strong real-world incident record and explicit funding need, but openness is mixed with service-style delivery.\nEvidence: The team says it has worked on exploit interception since 2024 with no recurring funding. | The website claims $1.3M+ in intercepted hacks, including about $975k saved in the Balancer exploit. | The site also describes public-facing transaction-understanding tools such as the Unblind Safe Dashboard.\nRationale / Track Record: The input shows more than two years of operation plus concrete real-world intervention claims, which supports a strong track record score.\nRationale / Underfundedness: A small team explicitly saying it lacks recurring funding makes marginal support look meaningful.\nRationale / Ecosystem Leverage: Real-time exploit interception and signing-clarity tools can improve security for many DeFi users and teams.\nRationale / Public Goods Openness: There is public web presence and some linked GitHub activity, but much of the delivery reads like services and productized tooling.\nRationale / Execution Clarity: The pitch names concrete incidents, product surfaces, and the security problem being solved.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/blobscan": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.71,
    "notes": "High-upstream infrastructure with public artifacts; the prepared input is lighter on maintenance history and funding detail.\nEvidence: The description positions Blobscan as transparency infrastructure for Ethereum's blob layer and rollup data publishing. | A public GitHub repo, Farcaster account, and website are linked. | The pitch argues blobs secure billions in value while remaining hard to inspect today.\nRationale / Track Record: There is clear shipped infrastructure and public presence, but the prepared input provides limited dated continuity evidence.\nRationale / Underfundedness: The work looks like public infrastructure, though the materials do not show a concrete funding gap.\nRationale / Ecosystem Leverage: Blob-layer visibility is upstream infrastructure that can benefit many rollups, researchers, and users.\nRationale / Public Goods Openness: A public repository and openly accessible service support reuse and external visibility.\nRationale / Execution Clarity: The problem statement is strong, but the input gives fewer specifics on roadmap or funding use.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/blockchain-security-incentives:-research-os-poc-dev": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.84,
    "notes": "Research-led public-good work with credible domain background; openness and roadmap beyond the PoC are only partly evidenced.\nEvidence: The project is led by Dr Kelsie Nabben, whose site describes published work on blockchain security and governance. | The grant combines research with an open-source proof of concept on security incentives. | The linked public site is an academic research library rather than a commercial product landing page.\nRationale / Track Record: The researcher has visible domain background, but the specific grant work appears earlier-stage than a long-running product.\nRationale / Underfundedness: This reads like public-interest research where additional funding could extend the work, even without explicit runway math.\nRationale / Ecosystem Leverage: Security-incentive research could inform many Ethereum governance and security efforts if the outputs land well.\nRationale / Public Goods Openness: There is a public research site, but the prepared input gives only partial evidence of reusable open artifacts beyond the planned PoC.\nRationale / Execution Clarity: The proposal clearly explains the topic, lead researcher, and intended research-plus-build shape.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/blockscout-open-source-block-explorer": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "core-protocol-client-security"
    ],
    "trackRecord": 5,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.92,
    "notes": "Established open infrastructure with very broad reuse; financial urgency is less explicit than the public-good case.\nEvidence: The project describes open-source block explorers as a vital public good for tooling diversity. | The project has 7 updates and links a public GitHub org, website, Discord, and social channels. | The pitch ties explorer redundancy to Ethereum resilience if one explorer goes down.\nRationale / Track Record: Multiple updates and a widely recognized explorer footprint indicate sustained shipped work over time.\nRationale / Underfundedness: The project is public-good infrastructure, but the prepared input does not show acute financial fragility.\nRationale / Ecosystem Leverage: Explorer infrastructure is broadly reused by developers, researchers, protocols, and users across many chains.\nRationale / Public Goods Openness: The open-source posture and public community channels are clearly evidenced in the prepared materials.\nRationale / Execution Clarity: The public-good case is clear, though the funding request itself is not broken into detailed milestones.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/blockthreat": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.83,
    "notes": "Solid public security-intel work with a clear donation use case; openness is meaningful but less reusable than open-source software.\nEvidence: The pitch calls BlockThreat the longest-running independent blockchain security newsletter. | It states donations sponsor free subscriptions for students, projects, and new researchers. | The site describes weekly analysis of incidents, vulnerabilities, research, and tools.\nRationale / Track Record: The claim of being longest-running independent coverage suggests continuity beyond a new project.\nRationale / Underfundedness: The project directly connects donations to free access for public-interest audiences, which supports a stronger underfundedness score.\nRationale / Ecosystem Leverage: Security intelligence and incident analysis can improve awareness across a broad slice of Ethereum participants.\nRationale / Public Goods Openness: The output is public-facing and educational, but it is a media product rather than fully reusable open infrastructure.\nRationale / Execution Clarity: The project explains its format, audience, and use of funds clearly enough for a high-but-not-perfect score.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/bluechip": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.74,
    "notes": "Useful public analysis, but the input reads more like a ratings business than underfunded open infrastructure.\nEvidence: Bluechip describes itself as the first independent stablecoin rating agency. | The project frames its mission around making stablecoin safety legible after Terra. | The prepared input shows a public website and media channels, but no open repository.\nRationale / Track Record: There is evidence of a real public product, but the prepared materials provide limited dated history.\nRationale / Underfundedness: The rating-agency framing reads closer to a business or service than to donation-dependent public infrastructure.\nRationale / Ecosystem Leverage: Stablecoin risk analysis can inform many DeFi users and teams, even if it is not deeply upstream infrastructure.\nRationale / Public Goods Openness: The output is public-facing, but the input does not evidence strongly reusable open artifacts.\nRationale / Execution Clarity: The mission is clear, though the prepared grant context is light on concrete funding milestones.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/boring-security": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.87,
    "notes": "Clear public-good education work with several years of continuity; the main missing piece is a more detailed funded roadmap.\nEvidence: Boring Security says it is a public good founded in 2022 focused on vendor-neutral Web3 security education. | The project emphasizes free interactive classes, gamified learning, and accessible security education. | A public GitHub org, website, Discord, and social channels are linked.\nRationale / Track Record: A 2022 founding date indicates sustained operation beyond an initial demo phase.\nRationale / Underfundedness: Free education with public-good framing suggests donations likely extend delivery, even though the input lacks detailed runway math.\nRationale / Ecosystem Leverage: Security education can improve behavior and baseline safety across a wide user set.\nRationale / Public Goods Openness: The project is openly accessible and publicly distributed, with visible community and repository links.\nRationale / Execution Clarity: The educational model is clear, but the prepared input gives limited milestone-level funding detail.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/buidlguidl": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.89,
    "notes": "Open builder education plus reusable tooling is a strong public-good combination; funding specifics are still moderate rather than exhaustive.\nEvidence: BuidlGuidl says it ships open-source tools, curriculum, and infrastructure for Ethereum builders. | The project explicitly frames part of its stack as security and safety work. | A public GitHub org, website, social channels, and educational presence are linked.\nRationale / Track Record: The prepared input shows a mature builder community with shipped open artifacts, though it does not give a precise founding date here.\nRationale / Underfundedness: This looks like public-good ecosystem work where marginal funding can plausibly extend maintenance and education.\nRationale / Ecosystem Leverage: Training builders and publishing reusable tooling can compound across many Ethereum teams.\nRationale / Public Goods Openness: Open-source tools and public curriculum strongly support a high openness score.\nRationale / Execution Clarity: The work areas are concrete and the security angle is clearly articulated.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/canon-guard": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Well-scoped multisig safety work with public docs and code; underfundedness is limited by established team backing.\nEvidence: The project addresses Safe proposal payload changes between review and execution for multisig treasuries. | Public docs say Canon Guard moves critical proposal data onchain as a final line of defense. | A public GitHub repo and docs site are linked.\nRationale / Track Record: There is a shipped public artifact and documentation, but the prepared input provides limited long-term maintenance evidence.\nRationale / Underfundedness: The work is useful, yet it is backed by an established security team rather than clearly donation-dependent maintainers.\nRationale / Ecosystem Leverage: Safe-oriented treasury protection can be reused by many DAOs and multisig operators.\nRationale / Public Goods Openness: The linked docs and repository make the security approach inspectable and reusable.\nRationale / Execution Clarity: The attack surface and proposed mitigation are described clearly and concretely.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/clarahacks:-scaling-ai-powered-blockchain-security": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.82,
    "notes": "Visible exploit-intel output and a clear product, but the prepared input points to a mixed commercial/open model.\nEvidence: ClaraHacks describes AI-driven systems for analyzing and responding to DeFi attacks. | The site shows a live exploit-intelligence dashboard with incident counts, root-cause notes, and PoC-style evidence. | The website includes pricing and sign-in flows alongside public research output.\nRationale / Track Record: The prepared input shows a real public product surface and visible incident corpus, but not a long dated history.\nRationale / Underfundedness: The pricing page and product framing suggest a commercial path, so donation urgency looks limited.\nRationale / Ecosystem Leverage: Exploit intelligence and reproducible attack analysis can help many researchers and protocols.\nRationale / Public Goods Openness: Some analysis is public, but the offering is clearly mixed with gated product access.\nRationale / Execution Clarity: The project explains what it delivers and shows concrete incident outputs.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/claudit-0": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "core-protocol-client-security"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.72,
    "notes": "Interesting security workflow tool, but it still reads like an early integration layer with mixed openness.\nEvidence: Claudit is described as an MCP server exposing 20,000+ Solodit audit findings to AI coding agents. | The only linked artifact in the prepared input is a public GitHub repository. | The project depends on the Solodit findings corpus rather than publishing a standalone open dataset.\nRationale / Track Record: The input shows a shipped repository, but it still reads like an early integration layer rather than a long-running tool.\nRationale / Underfundedness: The project could benefit from support, but the prepared materials do not demonstrate a strong financial gap either way.\nRationale / Ecosystem Leverage: Connecting audit findings into coding agents could improve many smart-contract workflows if adoption materializes.\nRationale / Public Goods Openness: The repo is public, but the core value depends on a corpus that is not clearly open in full.\nRationale / Execution Clarity: The tool's purpose and target users are described clearly in the pitch.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/coalition-to-change-crypto-freezes-and-recovery": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.68,
    "notes": "Potentially useful incident-response coordination, but public artifacts and independent funding need are thin.\nEvidence: The coalition aims to improve industry response to stolen-fund freezes and recovery without relying only on law enforcement. | The prepared link points to a ZeroShadow blog post rather than a standalone public project hub or repository. | The pitch centers coordination across DeFi teams, VASPs, lawyers, and regulators.\nRationale / Track Record: The concept is clear, but the prepared input shows limited evidence of a long-running shipped program.\nRationale / Underfundedness: The effort appears tied to an established company context rather than clearly unfunded independent infrastructure.\nRationale / Ecosystem Leverage: If successful, coordinated freezes and recovery practices could help many incident-response stakeholders.\nRationale / Public Goods Openness: Public artifacts are thin in the prepared input, with no repository or obvious reusable deliverable.\nRationale / Execution Clarity: The problem and stakeholder set are explained clearly, even if deliverables are less concrete.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/colibri:-first-trustless-stateless-client": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.95,
    "notes": "High-upstream client-security work with strong public artifacts and a clear public-funding ask.\nEvidence: Colibri is described as a trustless, stateless Ethereum client for local proof-based verification. | The site links a whitepaper, specification, and public repository, and describes mobile, web, and IoT use cases. | The project explicitly asks for broad small-donor support to continue building verifiable client infrastructure.\nRationale / Track Record: There is a real public technical surface, but the prepared input does not yet show the long maintenance history of a mature client.\nRationale / Underfundedness: The donation ask is explicit and framed around continuing open client infrastructure work.\nRationale / Ecosystem Leverage: Trustless local verification is deep infrastructure with broad downstream security benefits across many app types.\nRationale / Public Goods Openness: The linked whitepaper, spec, and repository show a strong open-technical posture.\nRationale / Execution Clarity: The trust model, target environments, and planned components are all described concretely.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/core3-the-open-risk-layer-for-web3": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.8,
    "notes": "Credible prior delivery and public code links support the case; funding urgency is less explicit than the openness and utility claims.\nEvidence: CORE3 calls itself an open-source risk layer for Web3 and says its outputs are free for everyone. | The team cites prior delivery of CER.live security ratings used by CoinGecko and links multiple GitHub repos. | The website and project copy focus on transparency, accountability, and security analytics.\nRationale / Track Record: Prior cited work and multiple public repos indicate substantial delivery beyond a brand-new concept.\nRationale / Underfundedness: The work has public-good framing, but the prepared input does not show strong evidence of acute funding scarcity.\nRationale / Ecosystem Leverage: Open risk analytics can inform many users, wallets, and protocol teams across Web3.\nRationale / Public Goods Openness: The project makes public open-source claims and links reusable code, even if the broader platform model may remain mixed.\nRationale / Execution Clarity: The platform purpose and security value proposition are described clearly in the pitch.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/crossbar-open-source-security-hardware-wallet": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 1,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.78,
    "notes": "Strong hardware pedigree, but the prepared input points to a well-capitalized company and gives limited evidence that the wallet itself is a mature open public good.\nEvidence: The input says CrossBar Inc. was founded 16 years ago and holds more than 200 security hardware patents. | The company site describes advanced secure silicon and ReRAM products. | Only one open GitHub SDK is linked from the project input.\nRationale / Track Record: The company is mature, but the prepared input gives only limited evidence that this specific wallet project is already a mature shipped product.\nRationale / Underfundedness: A long-established company with patents and executives does not read as donation-dependent public-good infrastructure.\nRationale / Ecosystem Leverage: Open hardware wallet work could benefit users, but the prepared input shows a narrower downstream surface than foundational protocol tooling.\nRationale / Public Goods Openness: There is at least one public SDK, but the overall project posture looks mixed between open components and proprietary company assets.\nRationale / Execution Clarity: The hardware-security orientation is understandable, though the prepared input is light on concrete public milestones.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/cuevm:-accelerate-evm-execution-on-gpus": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.83,
    "notes": "Promising upstream execution tooling with public research signals; the main uncertainty is funding specificity rather than technical purpose.\nEvidence: CuEVM is described as a CUDA implementation of the EVM targeting millions of TPS. | The input says preliminary results were presented at Devcon SEA and that the project has progressed to CuEVM v2. | The maintainer site lists CuEVM as an open-source tool used in fuzzing, simulation, and related work.\nRationale / Track Record: The project shows multiple iterations since 2023 and public presentation of results, supporting a stronger track score.\nRationale / Underfundedness: This looks like an individual research effort, but the prepared input does not provide explicit runway or budget math.\nRationale / Ecosystem Leverage: Faster EVM execution can compound across simulation, fuzzing, and other upstream security tooling.\nRationale / Public Goods Openness: The maintainer explicitly lists it as an open-source tool with public web presence.\nRationale / Execution Clarity: The technical direction is clear, though the funding ask is less specific than the engineering description.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/cyfrin-updraft": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.81,
    "notes": "High-reach education with clear utility, but firm backing reduces the underfundedness case.\nEvidence: Updraft is presented as free Web3 education built by Cyfrin, a leading blockchain security firm. | The description claims graduates have gone to major ecosystem employers. | The input shows a public course website but no open repository or donation-specific budget detail.\nRationale / Track Record: There is evidence of a real educational platform, but the prepared input does not show the longer dated continuity of older public institutions.\nRationale / Underfundedness: Because the project is backed by a leading security firm, donation urgency appears limited.\nRationale / Ecosystem Leverage: Developer and security education can improve the quality of work across many teams.\nRationale / Public Goods Openness: The content is free to access, but the prepared input does not evidence strongly reusable open-source artifacts.\nRationale / Execution Clarity: The audience and value proposition are clear, but the funding use is not broken into concrete milestones.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/cyfrinsolodit-tooling-and-security-research": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.84,
    "notes": "Useful public security tooling and research, but mature firm backing weakens the underfundedness case.\nEvidence: Cyfrin says it maintains free, open-source Web3 security tools and Solodit with 20,000+ verified findings. | The project is backed by a leading security team rather than a standalone nonprofit effort. | A public GitHub org and public website are linked.\nRationale / Track Record: The prepared input shows meaningful shipped assets, though it does not provide a long dated history for this specific grant bundle.\nRationale / Underfundedness: The work is public-facing, but backing from a mature security firm lowers the urgency score.\nRationale / Ecosystem Leverage: Open research corpora and security tooling can materially help a broad set of smart-contract builders.\nRationale / Public Goods Openness: Public code links and free research claims support a strong openness score, even if not every output is clearly open in full.\nRationale / Execution Clarity: The grant bundle explains what tools exist and why they matter, but funding allocation remains fairly high level.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/cyphertalk-podcast:-security-education-for-ethereum": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Clear independent education effort with broad topical coverage; openness is meaningful but media-shaped rather than code-shaped.\nEvidence: CypherTalk is a freely accessible, independently produced cybersecurity podcast with twice-monthly episodes. | Episodes cover smart contract audits, zero-knowledge proofs, threat intelligence, operational security, and privacy. | The project links a website, YouTube channel, and major podcast distribution.\nRationale / Track Record: There is a real recurring output cadence, but the prepared input does not provide a long dated history.\nRationale / Underfundedness: Independent free media often benefits materially from donations, even though the input does not show explicit budget math.\nRationale / Ecosystem Leverage: Security education and expert interviews can raise awareness across a broad Ethereum audience.\nRationale / Public Goods Openness: The content is freely accessible, but it is media rather than highly reusable open-source infrastructure.\nRationale / Execution Clarity: The format, audience, and subject matter are all clearly specified.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/dappnode": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "wallet-app-user-safety"
    ],
    "trackRecord": 5,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.88,
    "notes": "Established open node infrastructure with very broad ecosystem benefit; the public-good case is stronger than the funding-urgency case.\nEvidence: Dappnode is described as a free and open-source platform for running nodes, validators, and dapps. | The project has 6 updates and a public GitHub org. | The pitch explicitly ties donations to better UX and stronger network decentralization.\nRationale / Track Record: The combination of multiple updates, public code, and obvious ecosystem presence indicates a mature maintained project.\nRationale / Underfundedness: The work is public-good infrastructure, though the prepared input does not make a very urgent runway case.\nRationale / Ecosystem Leverage: Lowering the barrier to run nodes and validators improves resilience and decentralization across Ethereum.\nRationale / Public Goods Openness: Free and open-source positioning plus a public GitHub org support a top openness score.\nRationale / Execution Clarity: The product purpose is clear, but the funding use is described more generally than as a milestone plan.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/dedaub-decompiler:-from-bytecode-to-solidity-like-code": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 1,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.79,
    "notes": "Potentially high-leverage research tooling, but the input shows company backing and limited evidence of open reusable artifacts.\nEvidence: The project pitches free EVM bytecode decompilation infrastructure for Ethereum security research. | The problem statement cites about 83 million undeclared smart contracts deployed in the last 12 months. | The prepared input links Dedaub's company site and media channels, but no public code repository for the decompiler itself.\nRationale / Track Record: There is a concrete public tool concept, but the prepared input gives limited dated evidence of long maintenance for this specific decompiler.\nRationale / Underfundedness: The work is associated with an established security company, which weakens the case that marginal donations are necessary for survival.\nRationale / Ecosystem Leverage: Free decompilation for undeclared contracts is high-upside infrastructure for many researchers and auditors.\nRationale / Public Goods Openness: The output is publicly described as free, but the prepared materials do not show clearly reusable open-source artifacts for the tool itself.\nRationale / Execution Clarity: The problem, user need, and proposed deliverable are all stated with good specificity.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/defihacklabs": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.89,
    "notes": "Strong community-scale security education with visible continuity; open artifact reuse is less pronounced than the training impact.\nEvidence: DeFiHackLabs says it is a global Web3 security community with 4,000+ members and 292+ active white hats. | The site calls this its 3rd anniversary and lists training, incident exploration, and partnerships. | Public community channels, video content, and a website are linked.\nRationale / Track Record: A three-year operating history plus visible membership scale indicate continuity beyond an early-stage group.\nRationale / Underfundedness: This looks like community-run public-good security capacity building where additional support could extend work.\nRationale / Ecosystem Leverage: Bringing more defenders into Web3 security can benefit many protocols and users indirectly.\nRationale / Public Goods Openness: The community surface is public and educational, though the prepared input shows fewer reusable open-code artifacts than a pure software project.\nRationale / Execution Clarity: The mission and operating model are clear, but the funding plan remains fairly high level.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/defimon-real-time-defi-security": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.91,
    "notes": "Useful monitoring service with concrete operating metrics, but the commercial split limits both underfundedness and openness scores.\nEvidence: Defimon is built by the Decurity team for instant exploit alerts and automated incident response. | The site advertises 8-network monitoring, 99.9% uptime, 3,500+ subscribers, and a premium signals channel. | Public and premium tiers are both central to the offering.\nRationale / Track Record: There is a real public service with usage and uptime claims, but the prepared input does not show a long dated history.\nRationale / Underfundedness: The premium tier and company-team backing make this look less like donation-dependent public-good infrastructure.\nRationale / Ecosystem Leverage: Fast exploit and incident alerts can benefit many DeFi operators and researchers.\nRationale / Public Goods Openness: Some output is public, but the value proposition is explicitly split between public and paid access.\nRationale / Execution Clarity: The service, metrics, and alerting outcomes are all clearly specified.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/defiscan": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.73,
    "notes": "Public research tooling with relevant goals, but the prepared capture gives limited evidence of live depth or funding urgency.\nEvidence: DeFiScan describes a research framework and analytics dashboard for decentralization stages and single points of failure in DeFi. | A public GitHub repo and website are linked. | The captured site excerpt shows the dashboard shell but little populated data in the prepared input.\nRationale / Track Record: There is evidence of a public artifact, but the prepared capture gives only moderate evidence of live operational depth.\nRationale / Underfundedness: This reads like public-interest research tooling, though the input does not make an urgent funding case.\nRationale / Ecosystem Leverage: Decentralization-risk visibility can help many DeFi users and governance participants.\nRationale / Public Goods Openness: The project exposes a public repository and dashboard, which supports a strong openness score.\nRationale / Execution Clarity: The framing is understandable, but the prepared snapshot gives limited roadmap or budget detail.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/digibastion:-dns-opsec-supply-chain-security": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.88,
    "notes": "Broad-scope defensive security work with strong public-good posture; the main gap is milestone-level funding specificity.\nEvidence: DigiBastion is described as an open-source Web3 security project for DNS, operational security, and supply-chain defense. | The founder is presented as a web3sec.news founder, Ethereum Foundation grantee, SEAL contributor, and MITRE AADAPT researcher. | A public GitHub repo and public website are linked.\nRationale / Track Record: The founder's background is strong and the project has public artifacts, but the prepared input does not show long dated maintenance history.\nRationale / Underfundedness: This looks like small-team public-good security work where donations could materially extend delivery.\nRationale / Ecosystem Leverage: DNS, opsec, and supply-chain defense can protect a wide range of Ethereum teams beyond smart-contract code.\nRationale / Public Goods Openness: The project explicitly claims open-source posture and links public code.\nRationale / Execution Clarity: The security domains are clearly named, though the funding roadmap remains somewhat high level.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/drew-security": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.83,
    "notes": "Clear public-good education and bot work; evidence of impact is decent, but the long-term maintenance record is only moderately documented here.\nEvidence: Drew Security calls itself a public good providing free Ethereum and EVM security education, guidelines, bots, and frameworks. | The pitch highlights the Guard Bot and Announcement Bot as free offerings. | Public GitHub, Discord, Telegram, and website links are present.\nRationale / Track Record: The project shows real public outputs, but the prepared input does not provide extensive dated continuity evidence.\nRationale / Underfundedness: Free education and bots suggest a real public-good maintenance burden that outside funding could help carry.\nRationale / Ecosystem Leverage: Security bots and guidance can improve awareness and response across many community members.\nRationale / Public Goods Openness: The project exposes public repos and openly accessible community surfaces.\nRationale / Execution Clarity: The offering is understandable, though the funding plan is described only at a high level.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/ech-institute-ethcatherders": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "core-protocol-client-security"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.93,
    "notes": "High-value protocol coordination in a nonprofit wrapper with strong public-good posture and broad ecosystem reach.\nEvidence: ECH Institute is a U.S. 501(c)(3) nonprofit and the institutional home of Ethereum's community-led protocol support group. | The site emphasizes protocol governance, coordination, education, and open accountability. | Public GitHub, Discord, Farcaster, YouTube, and website links are present.\nRationale / Track Record: The nonprofit is newer, but the underlying protocol-support activity shows enough continuity to score above the midpoint.\nRationale / Underfundedness: A nonprofit coordinating public Ethereum governance work is a strong fit for marginal public-good funding.\nRationale / Ecosystem Leverage: Protocol coordination and governance support affect a very broad slice of Ethereum stakeholders.\nRationale / Public Goods Openness: The public, nonprofit, and openly accountable posture is strongly evidenced in the prepared materials.\nRationale / Execution Clarity: The mission and organizational role are described with solid specificity.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/echidna:-a-fast-smart-contract-fuzzer": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 5,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.96,
    "notes": "Mature, high-leverage public security tooling with unusually strong longevity evidence in the prepared input.\nEvidence: The description says Echidna was created 8 years ago and is already used in the industry. | The project is a grammar-based smart-contract fuzzer for falsifying Solidity assertions and predicates. | A public GitHub repo and extensive public documentation are linked.\nRationale / Track Record: Eight years of existence plus industry usage is strong evidence of a mature maintained security tool.\nRationale / Underfundedness: It is open security infrastructure with clear public value, though the prepared input does not include detailed budget math.\nRationale / Ecosystem Leverage: A widely used smart-contract fuzzer is foundational tooling with broad compounding security impact.\nRationale / Public Goods Openness: The repository and documentation are public and reusable, though the input does not explicitly detail all maintenance governance.\nRationale / Execution Clarity: The tool, technique, and security purpose are described very clearly.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/eipsinsight": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Clear public-governance infrastructure with visible product features; the main uncertainty is long-term continuity rather than purpose.\nEvidence: EIPsInsight is positioned as public-goods infrastructure for tracking EIPs, ERCs, and RIPs. | The site shows proposal lifecycle views, governance activity, filters, editing board snapshots, and CSV export. | Public GitHub and community links are included in the project input.\nRationale / Track Record: The prepared input shows a real public product surface, but not a long dated history yet.\nRationale / Underfundedness: This looks like small-team public governance infrastructure where donations could matter at the margin.\nRationale / Ecosystem Leverage: Better visibility into standards and upgrade process can help many builders, reviewers, and coordinators.\nRationale / Public Goods Openness: Public site features, GitHub links, and export-oriented workflow support a strong openness score.\nRationale / Execution Clarity: The product features and coordination problem are described with good specificity.\nReviewed at: 2026-05-08T02:32:31.390Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/encrypt-the-mempool-stopping-toxic-mev-censorship": {
    "primaryCategory": "cryptography-zk-security",
    "themeBaskets": [
      "cryptography-zk-security",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.68,
    "notes": "Broad security relevance and public artifacts are visible; age and funding need remain thinly evidenced.\nEvidence: Project summary says Shutter is building an Encrypt the Mempool effort against toxic MEV and real-time censorship. | The fetched site describes Shutter as a threshold encryption protocol for MEV prevention, censorship resistance, voting integrity, and gaming fairness. | Prepared materials show a public GitHub org, community channels, and 2 project updates.\nRationale / Track Record: Live products like Shielded Trading and multiple updates show shipped work, but the prepared evidence does not establish long-term age.\nRationale / Underfundedness: It has public-goods framing, but the materials do not show funding urgency or rule out other backing.\nRationale / Ecosystem Leverage: Threshold encryption for trading, voting, and censorship resistance can benefit multiple Ethereum segments.\nRationale / Public Goods Openness: The project links a public GitHub org and public-facing docs and community channels.\nRationale / Execution Clarity: The mission and product areas are clear, but donation use is not tied to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/enscribe": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.74,
    "notes": "Strong clarity and plausible team adoption, but commercial and early-access signals lower underfundedness and track-record scores.\nEvidence: Project summary frames Enscribe as ENS-based identity infrastructure for contracts, wallets, and agents. | The site says teams can name and manage contracts, wallets, and agents under ENS or DNS. | Prepared site text shows pricing, team plans, and early-access and waitlist calls alongside public GitHub links and testimonials.\nRationale / Track Record: There is a live product surface and external testimonials, but early-access messaging keeps this closer to an initial rollout.\nRationale / Underfundedness: Pricing and team plans point to a commercial product rather than donation-dependent public infrastructure.\nRationale / Ecosystem Leverage: Human-readable identity for contracts, wallets, and agents is reusable across many onchain teams.\nRationale / Public Goods Openness: There is a public GitHub link, but the main product appears to be a hosted commercial service.\nRationale / Execution Clarity: The product workflow and user value are clearly explained, but funding use is not specified.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/ercx:-property-testing-for-erc-token-standards": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.7,
    "notes": "Good public-tooling fit, scored conservatively on age and funding need because the evidence is mostly high-level.\nEvidence: Project summary describes ERCx as a free, open-source library of handcrafted Foundry property tests for ERC token standards. | The project links the Runtime Verification GitHub org and Runtime Verification website. | Prepared materials show only 1 project update and do not establish the librarys standalone age.\nRationale / Track Record: A shipped artifact is clear, but the prepared evidence is closer to an initial public library than a long maintenance record.\nRationale / Underfundedness: Runtime Verification is a formal-methods consulting company, so this does not read as donation-critical.\nRationale / Ecosystem Leverage: Reusable ERC conformance and security tests can help many token developers and auditors.\nRationale / Public Goods Openness: The project explicitly claims to be free and open source and links a public GitHub org.\nRationale / Execution Clarity: The librarys purpose is clear, but the prepared materials do not connect donations to a roadmap or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/ethlimo": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.69,
    "notes": "Clearly useful public infrastructure; conservative on track record because age and adoption metrics are not explicit in the prepared input.\nEvidence: Project summary describes ETH.LIMO as a free and public ENS gateway for Ethereum-native dApps and content. | Prepared materials show 8 project updates and a public GitHub org. | The site description focuses on making ENS content accessible and improving performance and reliability.\nRationale / Track Record: The public service and eight updates show continuity, though the prepared evidence does not pin down age.\nRationale / Underfundedness: It looks like free public infrastructure, but the materials do not quantify funding urgency.\nRationale / Ecosystem Leverage: A public ENS gateway improves access for many users, apps, and Ethereum content publishers.\nRationale / Public Goods Openness: The project links a public GitHub org and presents itself as a free public service.\nRationale / Execution Clarity: The service and maintenance goals are clear, but donation use is not broken into deliverables.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/etherform": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.64,
    "notes": "Useful public tooling with clear scope; age and funding need remain only moderately evidenced.\nEvidence: Project summary calls Etherform an open-source DevSecOps toolkit of reusable GitHub Actions workflows for Foundry smart contract CI and CD. | Prepared materials link the BreadchainCoop/etherform GitHub repository. | Only 1 project update is shown, and the prepared site content is mostly repository chrome.\nRationale / Track Record: A concrete repo exists, but the prepared evidence points to a relatively new toolkit rather than a long operating history.\nRationale / Underfundedness: It looks like a cooperative-led open-source effort, but funding urgency is not explicit.\nRationale / Ecosystem Leverage: Reusable CI and CD security workflows can be adopted by many smart-contract teams.\nRationale / Public Goods Openness: The work is described as open source and is published in a public GitHub repository.\nRationale / Execution Clarity: The scope is well defined, but the materials do not tie funding to milestones.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/evm-chronicle": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.57,
    "notes": "Clear tool concept, but openness and continuity evidence are thinner than for more obviously public repos.\nEvidence: Project summary describes EVM Chronicle as an Ethereum contract-state research tool for storage, mappings, historical changes, and execution flow. | The site description advertises storage exploration, execution traces, state changes, and slot history. | Prepared materials show only 1 update and no public repository link.\nRationale / Track Record: There is a visible product concept, but continuity evidence is limited to a single update and a live site.\nRationale / Underfundedness: It appears to be an independent research tool, but the prepared materials do not show financial need.\nRationale / Ecosystem Leverage: State inspection and trace tooling can help researchers, auditors, and developers across Ethereum.\nRationale / Public Goods Openness: The tool is publicly accessible, but reusable open artifacts are not clearly evidenced.\nRationale / Execution Clarity: The core functions are spelled out clearly, but the materials do not map donations to deliverables.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/evmcrispr-0": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.77,
    "notes": "Strong continuity signal for public tooling; conservative only on funding urgency and roadmap specificity.\nEvidence: Project summary describes EVMcrispr as an open-source toolkit for composing, simulating, and executing complex blockchain transactions safely. | Prepared materials show a public GitHub repository, a public website, and 20 project updates. | The tool emphasizes human-readable scripts, fork simulation, and assertions before real execution.\nRationale / Track Record: Twenty updates and a public repo show ongoing maintenance, even though the prepared evidence does not state exact age.\nRationale / Underfundedness: It looks like a small open-source tool with no obvious commercial monetization, but funding urgency is not quantified.\nRationale / Ecosystem Leverage: Safer transaction scripting and simulation can be reused by many protocols and operators.\nRationale / Public Goods Openness: The project explicitly presents itself as open source and links public code.\nRationale / Execution Clarity: The workflow is clear, but the prepared materials do not attach funding to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/evmdecompiler:-see-what-smart-contracts-really-do": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.63,
    "notes": "Technically relevant and clearly positioned, but openness and funding need are not strongly evidenced.\nEvidence: Project summary says the team works on AI-powered smart-contract analysis and focuses on making smart contracts understandable. | The site description offers Ethereum bytecode to readable Solidity decompilation for audits and code analysis. | Prepared materials show only a website link and 1 project update.\nRationale / Track Record: The tool appears usable and claims real-world workflow relevance, but the prepared evidence does not establish a long maintenance history.\nRationale / Underfundedness: The presentation reads like a professional product rather than a donation-dependent public-good effort.\nRationale / Ecosystem Leverage: Readable decompilation is broadly useful for audits, reverse engineering, and smart-contract research.\nRationale / Public Goods Openness: The tool is public-facing, but reusable open artifacts are not evidenced in the prepared materials.\nRationale / Execution Clarity: The product purpose is clear, but donation use and roadmap details are not provided.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/evvm": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 2,
    "confidenceScore": 0.46,
    "notes": "Interesting upstream concept, but the current evidence is early and the prepared site quality lowers confidence.\nEvidence: Project summary pitches EVVM as a substrate where many virtual blockchains run as smart contracts on the EVM. | The site description says it enables deployment of virtual blockchains on any chain. | Prepared materials show 1 update, a public GitHub link, and a docs site with a visible Docusaurus baseUrl error.\nRationale / Track Record: There is at least an initial public artifact, but the materials still read like an early-stage concept or prototype.\nRationale / Underfundedness: It looks like a small research-style effort, but the prepared evidence does not show urgent financial need.\nRationale / Ecosystem Leverage: If delivered, EVM virtualization could matter upstream, but current evidence of downstream reuse is limited.\nRationale / Public Goods Openness: There is a public GitHub link, but the prepared materials do not show mature reusable artifacts.\nRationale / Execution Clarity: The vision is ambitious, but the next concrete outputs and funding use are not well specified.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/fight-human-trafficking-and-crypto-fraud-with-dobs": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 2,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.43,
    "notes": "Strong mission fit on fraud awareness, but sparse prepared evidence keeps the score conservative.\nEvidence: Project summary ties crypto fraud investigation to human-trafficking compounds behind romance and investment scams. | Prepared materials show only 1 update and no fetched website evidence. | The work is framed as public-interest investigation rather than a product or tool.\nRationale / Track Record: The prepared evidence shows an initial public project, but not a long or repeated delivery history.\nRationale / Underfundedness: The public-interest framing suggests donations could matter, though the materials do not quantify need.\nRationale / Ecosystem Leverage: The work is relevant to scam response and awareness, but the direct reusable benefit to Ethereum security tooling is limited.\nRationale / Public Goods Openness: Public-facing investigative output is implied, but prepared reusable artifacts are sparse.\nRationale / Execution Clarity: The problem statement is clear, but the materials do not show a concrete production plan or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/firefly-open-source-hardware-wallet": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.7,
    "notes": "Very strong openness signal for a wallet device; scored cautiously on track record because the prepared input shows an early rollout.\nEvidence: Project summary says Firefly is an Ethereum-focused device founded by the creator of EthersJS. | The project emphasizes human-readable transaction verification and open-source hardware all the way to the chip. | Prepared site text shows a public website, GitHub call-to-action, and a Devconnect 2025 shipping signal.\nRationale / Track Record: There is a concrete device and public site, but the prepared evidence still looks like an early product stage.\nRationale / Underfundedness: Hardware and device distribution suggest a product business rather than a donation-dependent public good.\nRationale / Ecosystem Leverage: Human-readable on-device transaction verification can improve safety for many Ethereum wallet users.\nRationale / Public Goods Openness: The project makes an unusually strong open-hardware and open-source claim, with public code visibility.\nRationale / Execution Clarity: The device goals are clear, but the prepared materials do not tie donations to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/forge-proposal-simulator-fps": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.67,
    "notes": "Clear governance-security tooling with decent public artifact evidence, but limited track-record and funding detail.\nEvidence: Project summary describes FPS as an open-source Foundry-based framework for simulating governance proposals before they touch chain. | The summary lists deployment scripts, calldata generation, proposal simulation, and result verification. | Prepared materials show 1 update and a public site and repository surface.\nRationale / Track Record: A real framework exists, but the prepared evidence suggests an early public release rather than long continuity.\nRationale / Underfundedness: It looks like open-source tooling, but the materials do not show quantified funding need.\nRationale / Ecosystem Leverage: Standardized proposal simulation is reusable across many DAO and protocol governance workflows.\nRationale / Public Goods Openness: The project explicitly presents itself as open source and exposes public artifacts.\nRationale / Execution Clarity: The workflow is concrete, though the prepared materials do not map donations to milestones.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/fuzzing-for-zk-systems-privacy-is-normal-but-not-safe": {
    "primaryCategory": "cryptography-zk-security",
    "themeBaskets": [
      "cryptography-zk-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.54,
    "notes": "Strong problem relevance, but evidence of shipped public artifacts is still limited.\nEvidence: Project summary says the team is developing novel methods to secure ZK systems against soundness and completeness bugs. | The pitch frames privacy and ZK systems as future-critical Ethereum infrastructure. | Prepared materials show 1 update and no fetched website evidence.\nRationale / Track Record: The project is clearly defined, but the prepared evidence is closer to an early research effort than a long-running program.\nRationale / Underfundedness: This reads like a small public-interest research effort where marginal funding could extend the work.\nRationale / Ecosystem Leverage: Security methods for ZK systems could benefit many future Ethereum privacy and proving systems.\nRationale / Public Goods Openness: The public-good framing is clear, but reusable public artifacts are not well evidenced in the prepared input.\nRationale / Execution Clarity: The research direction is understandable, but the materials do not show concrete milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/grego-ai": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.61,
    "notes": "Impact claims are strong, but openness and long-term continuity are only partially evidenced.\nEvidence: Project summary says Grego AI found a critical bug that saved 28 million dollars in user funds and identified two live vulnerabilities. | The site description presents it as an AI-powered smart-contract vulnerability detector. | Prepared materials show 1 update, a public GitHub link, and an explicit fundraising appeal to keep building.\nRationale / Track Record: Real-world findings suggest non-trivial shipped value, but the prepared evidence does not show a long maintenance history.\nRationale / Underfundedness: The team is explicitly fundraising to keep building, though broader financing and runway are not disclosed.\nRationale / Ecosystem Leverage: Automated vulnerability detection can help many protocols and security teams.\nRationale / Public Goods Openness: There is a public GitHub link, but the core product appears more tool and service-like than fully open infrastructure.\nRationale / Execution Clarity: The value proposition is clear, but the materials do not translate donations into milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/guild-academy": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.71,
    "notes": "Recurring security training is a strong leverage signal; openness is moderate because the prepared input does not show fully open curriculum artifacts.\nEvidence: Project summary says Guild Academy is a public-goods web3 security training program. | The program is described as a 16-week intensive bootcamp that runs twice a year. | Prepared materials show a public GitHub link plus community channels, but only 1 listed project update.\nRationale / Track Record: A recurring twice-yearly bootcamp shows repeat delivery, even though the prepared evidence does not establish a multi-year timeline.\nRationale / Underfundedness: A public-goods education program looks more donation-relevant than commercially financed, though funding urgency is not quantified.\nRationale / Ecosystem Leverage: Training more smart-contract security researchers has broad downstream effects across Ethereum.\nRationale / Public Goods Openness: There are public artifacts and community channels, but the training program itself may not be fully open.\nRationale / Execution Clarity: The program structure is concrete, but the prepared materials do not attach donations to a budget or milestones.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/hevm": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.82,
    "notes": "Foundational public tooling with strong continuity and leverage; execution clarity stays at 3 because funding use is not detailed.\nEvidence: Project summary calls hevm a specialized symbolic execution engine and testing framework that serves as a cornerstone tool for Ethereum smart-contract security. | The summary says it was originally developed under the Ethereum Foundation and is now maintained by Argot, an independent non-profit. | Prepared materials show public documentation and a visible public project surface.\nRationale / Track Record: The Ethereum Foundation origin and current non-profit maintenance show sustained continuity beyond an initial release.\nRationale / Underfundedness: Independent non-profit stewardship suggests donations can materially support continued maintenance of this public tool.\nRationale / Ecosystem Leverage: A cornerstone symbolic execution and testing engine benefits a large share of Ethereum security work upstream.\nRationale / Public Goods Openness: The tool has public documentation and is presented as a long-running public security artifact.\nRationale / Execution Clarity: The role of the project is clear, but the prepared materials do not spell out funding milestones or budget math.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/humantech": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.52,
    "notes": "Relevant user-safety angle, but commercial signals and limited prepared evidence keep the scores conservative.\nEvidence: Project summary frames human.tech around protected self custody for wallets and AI agents. | The site description says the company is building private, decentralized identity and capital-distribution infrastructure. | Prepared materials show a public GitHub link but only 1 project update and little funding detail.\nRationale / Track Record: There is a clear product direction, but the prepared evidence does not show a mature delivery record.\nRationale / Underfundedness: The company framing suggests a startup or commercially financed effort rather than donation-critical public infrastructure.\nRationale / Ecosystem Leverage: Safer self-custody and agent authorization could matter to a meaningful wallet segment if adopted.\nRationale / Public Goods Openness: A public GitHub link exists, but the main offering appears product-oriented rather than fully open public goods.\nRationale / Execution Clarity: The problem framing is understandable, but specific outputs and donation use are not detailed.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/k-stack:-the-formal-verification-layer-for-ethereum": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.77,
    "notes": "Very high upstream leverage, with lower underfundedness due to strong commercial backing signals.\nEvidence: Project summary says K is the engine behind Ethereums most rigorous security tooling and can derive analysis tools from formal language definitions. | The project is described as built and maintained by Runtime Verification. | Prepared materials link a public GitHub org, but the site points to Runtime Verifications commercial assurance business.\nRationale / Track Record: The project sits on top of a mature formal-methods stack with clear continuity, though the prepared input does not give precise age.\nRationale / Underfundedness: Runtime Verifications consulting business lowers the case that this specific effort is donation-dependent.\nRationale / Ecosystem Leverage: A formal verification layer that generates analysis tools is highly upstream and broadly reusable across Ethereum security.\nRationale / Public Goods Openness: The work has public tooling artifacts, but it is also clearly tied to a commercial organization.\nRationale / Execution Clarity: The technical scope is clear, but the prepared materials do not tie funding to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/kaisign-decentralized-clear-signing-registry": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.65,
    "notes": "Strong user-safety relevance and public artifact signals, but limited age and funding evidence.\nEvidence: Project summary focuses on replacing unreadable transaction data with clear signing information for users. | Prepared materials show a public GitHub link plus Discord, Telegram, website, and X channels. | The project is framed as a decentralized clear-signing registry rather than a closed wallet product.\nRationale / Track Record: There is a visible public project, but the prepared evidence still looks like an early-stage rollout.\nRationale / Underfundedness: It appears to be an independent infrastructure effort, though the materials do not quantify financial need.\nRationale / Ecosystem Leverage: Clear signing infrastructure can help many wallets and users understand risky transactions.\nRationale / Public Goods Openness: Public code and the decentralized registry framing support a fairly open public-goods posture.\nRationale / Execution Clarity: The user problem is sharply explained, but the prepared materials do not map donations to milestones.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/l2beat": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.8,
    "notes": "Very strong leverage and openness signal; track record remains conservative because explicit age evidence is absent from the prepared input.\nEvidence: Project summary calls L2BEAT a public goods company dedicated to on-chain transparency. | The site description says it provides in-depth comparison of major protocols live on Ethereum. | Prepared materials show a public GitHub link and a live research and analytics website.\nRationale / Track Record: There is a substantial shipped public surface, but the prepared input does not explicitly establish the multi-year age required for a higher score.\nRationale / Underfundedness: The public-goods company framing suggests donations matter, though other funding sources are not ruled out.\nRationale / Ecosystem Leverage: Security and transparency research for major L2s compounds across a large portion of Ethereum.\nRationale / Public Goods Openness: The project is explicitly public-goods oriented and exposes public research artifacts and code.\nRationale / Execution Clarity: The work is clear, but the prepared materials do not connect donations to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/leak-detect:-protecting-ethereum-from-hidden-leakages": {
    "primaryCategory": "cryptography-zk-security",
    "themeBaskets": [
      "cryptography-zk-security",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.58,
    "notes": "Interesting security research target with public artifact signals, but continuity and specificity are thin.\nEvidence: Project summary argues Ethereum systems can leak sensitive information through hidden side channels even when they behave correctly. | Prepared materials show public GitHub and social links alongside a live site. | Only 1 project update is listed, and the site description is generic rather than project-specific.\nRationale / Track Record: The project appears to have an initial public artifact, but the prepared evidence does not show long continuity.\nRationale / Underfundedness: It looks like a research-oriented public effort, though the materials do not quantify funding need or rule out other backing.\nRationale / Ecosystem Leverage: Leakage analysis for Ethereum systems could improve security well beyond a single application.\nRationale / Public Goods Openness: Public GitHub and public-facing materials are visible, even if the prepared site content is sparse.\nRationale / Execution Clarity: The problem area is understandable, but the prepared materials do not give a detailed delivery plan or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/lif:-legitimate-intervention-framework": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.64,
    "notes": "Good public-goods fit for protocol incident response, with lower confidence because the prepared website context is missing.\nEvidence: Project summary describes LIF as an open-source Ethereum security research and tooling project for incident response design. | The summary says it helps protocols design credible intervention plans before a crisis. | Prepared materials show GitHub links but no fetched website content.\nRationale / Track Record: The project is more than a pure idea, but the prepared evidence does not yet show a long operating history.\nRationale / Underfundedness: Open-source incident-response research looks donation-relevant, though the materials do not quantify urgency.\nRationale / Ecosystem Leverage: Credible incident-response frameworks can be reused across many protocols facing exploit and governance crises.\nRationale / Public Goods Openness: Open-source framing and linked public code support a strong openness score despite the missing site fetch.\nRationale / Execution Clarity: The problem and use case are clear, but milestone-level delivery or funding use is not shown.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/lights-in-dark-rooms": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 2,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.36,
    "notes": "Worth parent review because the prepared website evidence appears mismatched to the documentary description.\nEvidence: Project summary frames the work as an investigative documentary about scam compounds and trafficking behind crypto fraud. | Prepared materials show 3 project updates. | The fetched site description points to an unrelated AI-powered brand-protection message, creating evidence mismatch.\nRationale / Track Record: There is some continuity via multiple updates, but the prepared evidence does not clearly show a mature release history.\nRationale / Underfundedness: A documentary-style public-interest effort could benefit from donations, though financial need is not quantified.\nRationale / Ecosystem Leverage: The work may improve awareness around fraud operations, but direct reusable Ethereum-security outputs are limited.\nRationale / Public Goods Openness: Public release is implied, but the prepared artifacts are mismatched and not clearly reusable.\nRationale / Execution Clarity: The documentary concept is clear, but the prepared evidence does not show concrete production milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/llzk-maintenance-verification-infrastructure-grant": {
    "primaryCategory": "cryptography-zk-security",
    "themeBaskets": [
      "cryptography-zk-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.73,
    "notes": "Strong technical clarity and public artifact fit, with underfundedness reduced by commercial affiliation.\nEvidence: Project summary describes LLZK as an open-source compiler framework for analysis, optimization, and formal verification of ZK circuits. | The title explicitly frames the request as a maintenance and verification infrastructure grant. | Prepared materials show a public GitHub link, while the linked site belongs to Veridises commercial security business.\nRationale / Track Record: A real open-source framework exists, but the prepared evidence does not establish a long standalone history.\nRationale / Underfundedness: The maintenance-grant framing raises funding relevance, but commercial backing from Veridise keeps this out of the highest band.\nRationale / Ecosystem Leverage: Shared ZK compiler and verification infrastructure can benefit multiple proving stacks and security teams.\nRationale / Public Goods Openness: The project explicitly claims to be open source and exposes public code.\nRationale / Execution Clarity: The technical scope and maintenance framing are concrete, though no milestone budget is provided.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/mabxyz-transaction-guards": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.47,
    "notes": "Potentially high-impact user-safety tooling, but sparse public artifact evidence should be reviewed conservatively.\nEvidence: Project summary says the project is being developed by mab.xyz, a web3 security company rooted in KTH research. | The intended users are wallet teams, transaction-simulation providers, smart-contract wallet builders, and end users. | Prepared materials show no fetched website or public repository evidence.\nRationale / Track Record: The prepared evidence supports an initial project, but not a long or repeated delivery history.\nRationale / Underfundedness: Company-backed development lowers the case that this is donation-critical public infrastructure.\nRationale / Ecosystem Leverage: Transaction guards can be reused across multiple wallets and simulation surfaces if delivered.\nRationale / Public Goods Openness: With no public repo or prepared site evidence, openness remains only weakly evidenced.\nRationale / Execution Clarity: The target users and problem are clear, but the prepared materials do not show milestones, artifacts, or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/militereum": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.7,
    "notes": "Clear user-safety product with decent continuity evidence, but low openness and unclear funding need.\nEvidence: Project summary presents Militereum as a wallet firewall that simulates transactions and blocks suspicious ones before they leave the desktop. | Prepared materials show 9 project updates and a live product website. | The site text demonstrates transaction warnings and block and allow controls, but there is no public GitHub link.\nRationale / Track Record: A live product surface and repeated updates show meaningful continuity, even though exact age is not established.\nRationale / Underfundedness: This reads more like a product offering than a donation-dependent public good.\nRationale / Ecosystem Leverage: Wallet-level transaction simulation and blocking can improve safety for a broad set of end users.\nRationale / Public Goods Openness: The product is publicly accessible, but reusable open artifacts are not evidenced in the prepared materials.\nRationale / Execution Clarity: The user flow is clear, but the prepared materials do not tie donations to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/nick-baxeth": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 5,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.78,
    "notes": "Exceptionally strong personal track record; openness stays moderate because the prepared input emphasizes research output more than reusable artifacts.\nEvidence: Project summary says Nick has been doing cryptocurrency security research for about 9 years. | The work is described as applying complex on-chain analysis to disrupt robbers, pig butchers, DeFi exploiters, and North Korean operators. | Prepared materials show a public GitHub profile with multiple repositories.\nRationale / Track Record: A nine-year research record is explicit and ongoing, which is strong evidence of continuity.\nRationale / Underfundedness: This looks like an independent public-interest researcher rather than a well-capitalized organization.\nRationale / Ecosystem Leverage: Advanced on-chain analysis methods can inform investigations and defense across many Ethereum actors.\nRationale / Public Goods Openness: There are public repositories and visible public-facing outputs, but the prepared materials do not fully show reusable datasets or tools.\nRationale / Execution Clarity: The work area is clear, but the prepared materials do not give milestone-level plans or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/nihilium": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "cryptography-zk-security"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.73,
    "notes": "High clarity for an early-stage protocol; track record remains conservative because age and adoption are not yet evident.\nEvidence: Project summary and site describe Nihilium as a protocol for universal, uncensorable secret recovery. | Prepared site text includes a detailed problem statement, four-actor architecture, modular proof conditions, and multiple application examples. | The project links a public GitHub org and a live demo.\nRationale / Track Record: There is a detailed public prototype and demo, but the prepared evidence still looks like an early-stage project rather than a long maintenance record.\nRationale / Underfundedness: The work looks like independent protocol research and development, but the materials do not quantify funding urgency.\nRationale / Ecosystem Leverage: A cross-application recovery primitive could benefit wallets, identity systems, and other self-custody tools.\nRationale / Public Goods Openness: Public architecture, demo, and GitHub links support a reasonably open public-artifact posture.\nRationale / Execution Clarity: The design and intended outputs are unusually concrete, even though budget math is not provided.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/northscan-by-heiner": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.84,
    "notes": "Strong public-output signal with clear continuity; underfundedness is still inferred from independence rather than explicit runway math.\nEvidence: Project summary says the initiative has focused since 2024 on crypto-fraud infrastructure and North Korean IT-worker operations. | The site shows public threat reports and an announced 2026 presentation of exclusive findings. | Prepared materials describe the work as an independent OSINT and HUMINT threat-intelligence effort.\nRationale / Track Record: There is explicit recent continuity from 2024 into 2026 with repeated public outputs, but not enough evidence for a very long track record.\nRationale / Underfundedness: Independent threat-intelligence research looks donation-relevant, and no alternate funding depth is shown.\nRationale / Ecosystem Leverage: Fraud and DPRK infiltration intelligence can help many protocols, employers, and ecosystem defenders.\nRationale / Public Goods Openness: The project publishes public research and links public-facing channels and code.\nRationale / Execution Clarity: The research scope and output style are clear, though funding use is not broken into milestones.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/open-source-ai-security-triage-by-hackenproof": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.57,
    "notes": "Broadly useful idea with clear problem framing, but commercial backing and missing website evidence lower confidence.\nEvidence: Project summary quantifies the cost gap between dedicated security engineers and the need for systematic review of open-source protocols. | The project is explicitly branded as Open-Source AI Security Triage by HackenProof. | Prepared materials show a GitHub link but no fetched website context.\nRationale / Track Record: The initiative is clearly more than an idea, but the prepared evidence does not show a long operating history.\nRationale / Underfundedness: HackenProof is an established security company, which weakens the case that this effort is donation-critical.\nRationale / Ecosystem Leverage: Low-cost security triage for open-source protocols could help a wide range of under-resourced teams.\nRationale / Public Goods Openness: Open-source intent and a public GitHub link are visible, but the prepared materials do not show mature reusable artifacts.\nRationale / Execution Clarity: The problem statement and value proposition are concrete, but milestone-level delivery and funding use are not provided.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/open-source-smart-contract-firewall": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.8,
    "notes": "Strong clarity and openness for an early-stage protocol-defense tool; track record is kept low because long-term adoption is not yet evidenced.\nEvidence: Project summary and site describe Moat as an open-source pre-execution firewall for smart contracts. | Prepared site text explains a concrete submission-validation-enforcement flow, timelock exit, and staged move from self-hosted validation to an AVS. | The project links a public GitHub repository and positions itself as an open alternative to closed enterprise firewalls.\nRationale / Track Record: There is a concrete public system design, but the prepared evidence still looks like an early project rather than a long-running service.\nRationale / Underfundedness: It reads like a lean open-source infrastructure effort, but the materials do not quantify runway or staffing.\nRationale / Ecosystem Leverage: A reusable protocol firewall could improve security for many DeFi teams and downstream users.\nRationale / Public Goods Openness: Open-source positioning, public docs, and public code create a strong public-goods signal.\nRationale / Execution Clarity: The architecture and next implementation stages are clearly described, even without budget math.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/opensense-open-web3-security": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.66,
    "notes": "Solid public-education fit with multi-year continuity signal; confidence is limited by missing website evidence and sparse funding detail.\nEvidence: Project summary describes OpenSense as a free web3 security education project. | The summary says the team has been publishing technical content for the past few years for auditors, researchers, developers, and builders. | Prepared materials show public YouTube and community channels, but no fetched website context.\nRationale / Track Record: The past few years claim supports continuity, though the prepared materials do not show a detailed delivery history.\nRationale / Underfundedness: A free educational project looks meaningfully donation-relevant, and no commercial model is evidenced.\nRationale / Ecosystem Leverage: Security education for auditors and builders can improve practices across the ecosystem.\nRationale / Public Goods Openness: The content is explicitly free and publicly distributed, though reusable code artifacts are not shown.\nRationale / Execution Clarity: The audience and content direction are clear, but the prepared materials do not show milestone-level plans or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/opsec-hub": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.61,
    "notes": "Independent opsec research is relevant, but the prepared evidence is lighter on concrete artifacts than on personal expertise.\nEvidence: Project summary says Vladimir Officer CIA brings ten years of cybersecurity experience and now focuses on blockchain security investigations, OSINT, and DeFi. | Prepared materials show public channels including GitHub, Paragraph, Farcaster, Telegram, and X. | Only 1 project update is listed, and the fetched site content is empty.\nRationale / Track Record: The operator background is strong, but the prepared project evidence itself shows only an early public funding profile.\nRationale / Underfundedness: This looks like an independent research and education effort rather than a well-capitalized company.\nRationale / Ecosystem Leverage: OSINT and operational-security guidance can help a meaningful slice of the security community, but it is not highly upstream infrastructure.\nRationale / Public Goods Openness: There are public distribution channels and a GitHub profile, though reusable public artifacts are only lightly evidenced.\nRationale / Execution Clarity: The focus areas are understandable, but the prepared materials do not map donations to deliverables or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/oss-security-hardening-for-macos-linux-windows": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.68,
    "notes": "Useful reusable opsec artifact with strong public-repo evidence; underfundedness is limited by obvious service revenue signals.\nEvidence: Project summary frames OSs Security as an open-source device-hardening project for Linux, macOS, and Windows. | The summary says Opsek is a web3 operational-security firm that also audits contracts, trains founders, investigates compromises, and protects treasuries. | Prepared materials point to a public GitHub repository for the hardening guide.\nRationale / Track Record: There is a shipped public repository and real incident-response context, but the prepared evidence does not show a long standalone project history.\nRationale / Underfundedness: Commercial consulting and training services reduce the case that this effort is donation-critical.\nRationale / Ecosystem Leverage: Reusable endpoint-hardening guidance can improve security for many operators and treasury managers.\nRationale / Public Goods Openness: The hardening work is published in a public GitHub repository as open-source guidance.\nRationale / Execution Clarity: The deliverable is concrete, but the prepared materials do not connect donations to milestones or budget.\nReviewed at: 2026-05-08T02:30:40.563Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/owasp-smart-contract-security-framework-by-credshields": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 2,
    "confidenceScore": 0.68,
    "notes": "Broadly relevant security framework, but the sponsoring organization appears commercially well funded and the specific artifact looks new.\nEvidence: The project description calls OWASP SCS Framework an open-source risk-prioritization framework built from 2025 Ethereum and EVM exploits. | The CredShields site promotes OWASP Smart Contract Top 10 2026 as a baseline for smart contract security. | The same site markets enterprise audits and says CredShields is trusted by 200-plus institutions and protocols.\nRationale / Track Record: The visible artifact is framed as a 2026 release, so the project evidence still looks relatively new.\nRationale / Underfundedness: CredShields presents this work alongside a substantial enterprise security business, which lowers donation urgency.\nRationale / Ecosystem Leverage: A public smart-contract security baseline can influence many Ethereum teams and toolchains.\nRationale / Public Goods Openness: The framework is described as open source, but it sits inside a broader commercial offering.\nRationale / Execution Clarity: The problem statement is clear, but the input gives little concrete detail on planned deliverables or use of funds.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/pharos-watch:-transparent-stablecoins-analytics": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.69,
    "notes": "Useful monitoring surface with public access, but funding need and long-term track record are only moderately evidenced.\nEvidence: The site says Pharos tracks 255 stablecoins with depeg alerts, liquidity scores, and dependency risk summaries. | The project description frames stablecoin failures as systemic Ethereum risk across DeFi, multiple chains, and L2s. | The project links a public dashboard and a public GitHub repository.\nRationale / Track Record: There is a shipped public dashboard with broad coverage, but the prepared input does not establish a long maintenance history.\nRationale / Underfundedness: The project looks independent and public facing, but the input does not show explicit funding need or runway pressure.\nRationale / Ecosystem Leverage: Stablecoin monitoring and depeg alerts can help many Ethereum users, protocols, and risk teams.\nRationale / Public Goods Openness: Public artifacts exist, including a live dashboard and linked GitHub repo, but openness details remain limited.\nRationale / Execution Clarity: The product surface and risk model are clear, though the use of additional funds is not spelled out.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/phylax-systems": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 4,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.82,
    "notes": "Strong deployment evidence and real users, but the public-goods case is weakened by the clearly commercial company posture.\nEvidence: The site says Phylax is live on Linea and protects more than 16 million dollars in TVL. | The project description names deployed support for protocols including Euler, Malda, Lagoon, Kyber Swap, and 0x. | The site positions Phylax as runtime risk infrastructure and sequencer-level exploit prevention.\nRationale / Track Record: Live deployment, named protocol users, and customer case-study language show meaningful shipped traction.\nRationale / Underfundedness: Phylax is explicitly presented as a company selling risk infrastructure, which points away from urgent donation dependence.\nRationale / Ecosystem Leverage: Runtime exploit prevention at the network and protocol layer can improve security for many downstream users.\nRationale / Public Goods Openness: The prepared material emphasizes product deployment more than open reusable public artifacts.\nRationale / Execution Clarity: The current product and next product direction are concrete and easy to understand.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/plamen-ai-security-researcher": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.66,
    "notes": "Promising open tooling for smaller teams, but adoption and maturity evidence are still thin.\nEvidence: The project description argues that public-good teams cannot afford deep security review and positions Plamen as a lower-cost alternative. | The linked site profile is a public GitHub repository for an autonomous Web3 security audit agent. | The project links a public GitHub repo and the prepared signals include an MIT license mention.\nRationale / Track Record: There is evidence of an initial public artifact, but not of long-running maintenance or widespread adoption.\nRationale / Underfundedness: This looks like an individual open-source effort aimed at underserved public-good teams.\nRationale / Ecosystem Leverage: A reusable audit agent could help multiple projects, but the current evidence does not show broad downstream use yet.\nRationale / Public Goods Openness: The work appears openly published on GitHub with permissive licensing signals.\nRationale / Execution Clarity: The goal is understandable, though the path from funding to concrete outputs is only moderately detailed.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/plankevm": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "core-protocol-client-security"
    ],
    "trackRecord": 1,
    "underfundedness": 3,
    "ecosystemLeverage": 2,
    "publicGoodsOpenness": 3,
    "executionClarity": 2,
    "confidenceScore": 0.52,
    "notes": "Sparse prepared evidence forces a conservative score despite an interesting security-oriented language thesis.\nEvidence: The project describes Plank as a new smart-contract language for the EVM. | Its stated goal is to improve security through the type system and reduce the need for inline assembly. | The prepared site profile is sparse and only shows a minimal home page for the language.\nRationale / Track Record: The available evidence looks early and does not show sustained releases, integrations, or adoption.\nRationale / Underfundedness: There is no strong sign of commercial backing, but there is also little explicit evidence of acute funding need.\nRationale / Ecosystem Leverage: A safer EVM language could matter broadly, but current reuse evidence is still limited.\nRationale / Public Goods Openness: Public websites and repositories are linked, but the openness story is not richly documented in the prepared material.\nRationale / Execution Clarity: The high-level thesis is clear, while the specific roadmap and use of funds remain vague.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/protocol-guild": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "core-protocol-client-security"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.85,
    "notes": "Very strong upstream relevance; the main scoring restraint is limited prepared detail on specific future funding allocations.\nEvidence: The project description says Protocol Guild is an independent funding organization for about 190 Ethereum core protocol contributors. | The contributor list in the description spans major clients including Geth, Nethermind, Lighthouse, Prysm, Teku, Besu, and more. | The site tagline is Securing the future of Ethereum core development.\nRationale / Track Record: Supporting a large set of named core contributors indicates meaningful continuity, even though the prepared input does not state the start date.\nRationale / Underfundedness: This is explicitly a funding organization for public Ethereum core work, so marginal donations are plausibly useful.\nRationale / Ecosystem Leverage: Funding client and protocol contributors is highly upstream and affects Ethereum security at the base layer.\nRationale / Public Goods Openness: The effort is clearly public-good oriented, though the prepared material focuses more on mission than reusable public artifacts.\nRationale / Execution Clarity: The role of the organization is clear, but the input is lighter on concrete next-step deliverables.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/prspec-automated-eip-compliance-checker-for-ethereum": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.71,
    "notes": "High-upside upstream tooling, but still early with limited direct evidence of adoption.\nEvidence: The description says PRSpec checks Ethereum client implementations against EIP specifications using LLM-based semantic analysis. | It is explicitly described as an open-source tool. | The linked site profile is a GitHub profile rather than a dedicated project site, which limits maturity evidence.\nRationale / Track Record: There is evidence of an initial shipped tool, but little prepared evidence of age, integrations, or repeated maintenance.\nRationale / Underfundedness: The project appears to be an individual open-source effort without clear signs of deep existing financing.\nRationale / Ecosystem Leverage: A reusable compliance checker for Ethereum clients can improve security and correctness across multiple implementations.\nRationale / Public Goods Openness: Open-source framing and GitHub presence support a strong but not fully documented openness score.\nRationale / Execution Clarity: The problem and method are understandable, though concrete funding outputs remain lightly specified.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/quick-intel": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 2,
    "confidenceScore": 0.71,
    "notes": "Useful end-user safety product with real breadth, but the public-goods and underfundedness evidence is limited.\nEvidence: The project describes Quick Intel as a free token security scanner protecting traders across more than 60 chains. | The scanner is framed as protection against rug pulls, honeypots, and malicious contracts before users trade. | A broad branded web presence exists, but the prepared input does not document open-source deliverables.\nRationale / Track Record: Cross-chain coverage suggests a shipped product, but the prepared evidence does not establish long-term continuity.\nRationale / Underfundedness: The product is free to users, yet the organizational and financing picture is not clearly donation dependent.\nRationale / Ecosystem Leverage: A security scanner for everyday traders can improve safety for a large retail user segment.\nRationale / Public Goods Openness: The tool is publicly accessible, but the input does not show strong open-source or reusable artifact evidence.\nRationale / Execution Clarity: The user problem and solution are easy to understand, while the funding case is comparatively thin.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/recon-invariant-testing-extension-framework": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.82,
    "notes": "Strong traction and obvious technical usefulness, moderated by commercial alignment and limited explicit funding-need detail.\nEvidence: The description cites more than 1300 downloads and calls Recon the most used stateful fuzzing smart-contract testing framework. | The site says Recon-powered work has protected more than 3 billion dollars in DeFi TVL and logged more than 12.5 thousand cloud runs. | The project links an open-source GitHub organization.\nRationale / Track Record: Downloads, cloud-run volume, and named production users show repeated shipped use rather than a prototype.\nRationale / Underfundedness: The project is tied to a commercial audit business, so donations are less obviously decisive than for independent public goods.\nRationale / Ecosystem Leverage: Reusable invariant-testing tooling can help many protocols catch bugs before audit or deployment.\nRationale / Public Goods Openness: Open-source framework evidence is strong even though the broader organization also sells services.\nRationale / Execution Clarity: The tool purpose is concrete, but the prepared input gives limited detail on what new funding would specifically buy.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/rekt-news-ethereums-security-intelligence-layer": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 5,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.87,
    "notes": "Long-running public-interest security journalism with strong public-goods posture; only funding-plan specificity is limited.\nEvidence: The description says Rekt News has operated since 2020. | It also says the publication has no paywall, no token, and no VC funding. | The site actively publishes investigative coverage of recent Ethereum and DeFi security incidents.\nRationale / Track Record: A since-2020 operating history and active publication cadence indicate a mature, sustained project.\nRationale / Underfundedness: The project explicitly rejects paywalls, tokens, and venture funding, making public support more relevant.\nRationale / Ecosystem Leverage: Independent incident reporting and analysis can improve awareness and defensive posture across the ecosystem.\nRationale / Public Goods Openness: The reporting is freely accessible and intentionally operated as a public good.\nRationale / Execution Clarity: The mission is clear, though the input is less specific about milestone-style funding outputs.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/remix-project": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.9,
    "notes": "Extremely important public tooling with clear ecosystem reach; underfundedness stays moderate because explicit financial need is not shown.\nEvidence: The site calls Remix an open-source Web3 IDE for building, testing, deploying, debugging, and verifying contracts in the browser. | The site says Remix has been used to deploy more than 12 million contracts and educate thousands of developers. | The project description frames Remix as an essential public good for development, education, and advocacy.\nRationale / Track Record: Very high public usage and broad feature coverage show a mature, repeatedly maintained project.\nRationale / Underfundedness: The public-good framing is strong, but the prepared input does not clearly show acute funding urgency or lean finances.\nRationale / Ecosystem Leverage: Remix is foundational developer tooling that affects a large share of Ethereum builders and learners.\nRationale / Public Goods Openness: Open-source positioning, public docs, and obvious ecosystem-wide access support a very strong openness score.\nRationale / Execution Clarity: The project value and product surface are very clear, while specific funded milestones are less explicit.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/rescue-lifeboat": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 1,
    "underfundedness": 4,
    "ecosystemLeverage": 2,
    "publicGoodsOpenness": 4,
    "executionClarity": 2,
    "confidenceScore": 0.74,
    "notes": "Clear public-good intent, but still early and relatively niche based on the prepared evidence.\nEvidence: The description says the tool was created after the maintainer dealt with a compromised MetaMask wallet in February 2026. | It is described as a free and open-source NFT rescue tool for compromised wallets. | The prepared input links a public GitHub repository.\nRationale / Track Record: The origin story places the project in 2026, so it currently looks new and lightly proven.\nRationale / Underfundedness: This appears to be a small individual open-source effort rather than a well-capitalized company product.\nRationale / Ecosystem Leverage: Compromised-wallet rescue tooling helps a real user-safety niche, but the reuse scope is narrower than foundational infra.\nRationale / Public Goods Openness: Open-source framing and a public repo support a strong openness score.\nRationale / Execution Clarity: The problem and tool are understandable, but the prepared materials do not give a detailed roadmap.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/revokecash": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.88,
    "notes": "Widely useful wallet-safety tooling with strong public access; underfundedness remains moderate because explicit runway evidence is absent.\nEvidence: The site says Revoke.cash lets users revoke token approvals on more than 100 networks. | The project description says the team builds free and open-source tools for wallet safety. | The site documents concrete safety workflows such as periodic approval review and post-scam cleanup.\nRationale / Track Record: Multi-network support and polished user guidance indicate a mature, actively maintained tool.\nRationale / Underfundedness: The service is clearly public facing and free, but the prepared input does not show extreme funding precarity.\nRationale / Ecosystem Leverage: Approval hygiene is a widespread user-safety need across Ethereum and adjacent networks.\nRationale / Public Goods Openness: The project is explicitly framed as free and open source, with broad public access.\nRationale / Execution Clarity: The user problem, workflow, and benefit are all described concretely, though funding outputs are not quantified.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/rotki": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 4,
    "executionClarity": 2,
    "confidenceScore": 0.68,
    "notes": "Strong user-control and openness signals, but its security leverage is more indirect than specialized Ethereum security infrastructure.\nEvidence: The description says rotki is fully open source under AGPL and local first. | It emphasizes that user data stays local and is not monetized or locked into a hosted service. | The project profile shows repeated updates and a public GitHub repository.\nRationale / Track Record: Multiple project updates and an established public repo indicate ongoing maintenance, even if the prepared input does not state age directly.\nRationale / Underfundedness: The project has a named organization behind it, but it is still presented as user-first open-source software rather than a heavily financed platform.\nRationale / Ecosystem Leverage: The benefits are meaningful for self-custody users, though less upstream than core security infrastructure.\nRationale / Public Goods Openness: AGPL licensing and local-first design show a strong openness and user-control posture.\nRationale / Execution Clarity: The product philosophy is clear, but the funding-specific plan is not detailed in the prepared material.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/roundabout:-static-analysis-for-solidity": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.79,
    "notes": "Good open-tooling potential, but the project looks early and the parent company does not appear underfunded.\nEvidence: The description says Certora is building an open-source static analysis tool for Solidity based on syntax-tree analysis and abstract interpretation. | The first stated goal is detecting common security vulnerabilities in Solidity smart contracts. | The linked site is Certora, which also markets formal verification tools and audits and cites more than 100 billion dollars in TVL protected.\nRationale / Track Record: The project appears to have an initial artifact, but the prepared evidence still reads as an in-progress build rather than a long-lived tool.\nRationale / Underfundedness: This work sits inside a clearly commercial security company with other established revenue-bearing offerings.\nRationale / Ecosystem Leverage: A reusable Solidity static-analysis engine could benefit many protocols and developer teams.\nRationale / Public Goods Openness: Open-source framing is strong even though the sponsoring organization is commercial.\nRationale / Execution Clarity: The technical direction is concrete, but the funding plan itself is only lightly described.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/safe-multisig-payload-report-action": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 1,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.73,
    "notes": "Credible operational tooling, but the sponsoring entity is commercial and public-artifact evidence is only moderate.\nEvidence: The description says MAXYZ developed and battle-tested the review workflow while working for Balancer DAO. | The project focuses on reviewing Safe multisig payload JSONs and reducing operational signing risk. | MAXYZ presents itself as a DAO service provider specializing in onchain operations.\nRationale / Track Record: Battle-tested production use with Balancer DAO supports more than a prototype score, though broader ecosystem traction is not richly documented.\nRationale / Underfundedness: The submitting organization is explicitly a paid service provider, which weakens the underfundedness case.\nRationale / Ecosystem Leverage: Safe payload review tooling can help multiple DAO and treasury operators avoid multisig mistakes.\nRationale / Public Goods Openness: There is likely a public artifact, but the prepared material does not strongly document licensing or broad reuse.\nRationale / Execution Clarity: The operational problem and proposed solution are described clearly.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/safe-multisig-transaction-hashes": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.86,
    "notes": "Strong public utility with direct user-safety value; the main uncertainty is the absence of detailed future funding plans.\nEvidence: The description says the script is used across the Ethereum ecosystem from small teams to blue-chip projects. | It is described as a local-first Bash CLI for verifying and simulating Safe transactions before signing. | The linked GitHub page describes an MIT-licensed utility for calculating Safe transaction hashes.\nRationale / Track Record: Ecosystem-wide use claims and a polished public utility indicate a mature artifact rather than a one-off demo.\nRationale / Underfundedness: This looks like a small open-source utility maintained as a public artifact rather than a heavily financed company product.\nRationale / Ecosystem Leverage: Safer Safe signing workflows have broad relevance across Ethereum treasuries and protocol operators.\nRationale / Public Goods Openness: A single-file MIT-licensed GitHub utility is highly open and easy for others to reuse.\nRationale / Execution Clarity: The use case and operational benefit are described directly, even if future milestones are not deeply detailed.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/safe-opensig:-eliminating-blind-signing": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.83,
    "notes": "Strong security UX story and concrete safeguards; underfundedness stays moderate because financing evidence is mixed.\nEvidence: The description anchors the problem in the February 2025 Bybit signing incident. | The site calls Safe OpenSig free and open source and says it is trusted by professional treasury managers and foundations. | The site describes local EVM simulation and a Ledger-mirroring verification flow to prevent blind signing.\nRationale / Track Record: The product appears shipped and already recommended by ecosystem actors, but it still looks relatively young.\nRationale / Underfundedness: Public-good and grant-like signals exist, yet the surrounding organizational financing picture is not fully clear in the prepared input.\nRationale / Ecosystem Leverage: Blind-signing protection for Safe users addresses a recurring, high-impact treasury security problem.\nRationale / Public Goods Openness: The app is explicitly framed as free and open source with a public download path.\nRationale / Execution Clarity: The problem, threat model, and verification approach are all concrete and well explained.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/scam-alert": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 1,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 1,
    "executionClarity": 2,
    "confidenceScore": 0.76,
    "notes": "The commercial posture is very strong, and the prepared input does not make a compelling open-public-goods case.\nEvidence: The project is described as a crypto-focused intelligence and reporting platform for fraud, phishing, impersonation schemes, and rug pulls. | The linked site profile is Crystal Intelligence, which markets blockchain intelligence to governments, crypto businesses, and financial institutions. | The site metadata highlights a 10-year company anniversary and compliance-oriented positioning.\nRationale / Track Record: The underlying organization looks established, but the prepared input does not isolate the specific project history cleanly.\nRationale / Underfundedness: The linked organization is clearly commercial and enterprise facing, so donation urgency appears low.\nRationale / Ecosystem Leverage: Fraud intelligence and reporting can help a meaningful slice of the ecosystem, but the work is less upstream than shared core tooling.\nRationale / Public Goods Openness: The prepared material points more to a proprietary intelligence platform than to open reusable public artifacts.\nRationale / Execution Clarity: The problem area is clear, but the prepared evidence gives little concrete detail on public deliverables or funding use.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/scar:-ai-retrieval-for-smart-contract-security": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.86,
    "notes": "Strong open research artifact with clear metrics; the main limit is early-stage track record evidence.\nEvidence: The description says SCAR is an open-source AI retrieval system for smart-contract security. | It reports 114 millisecond retrieval latency and R at 10 of 0.901 across 232000 real Ethereum contracts. | The project is framed as independent research under Apache 2.0 and links a public dataset page.\nRationale / Track Record: The prepared input shows a strong initial research artifact, but not a long-running maintenance history.\nRationale / Underfundedness: Independent open research is more plausibly donation sensitive than a mature commercial product.\nRationale / Ecosystem Leverage: Better vulnerability-precedent retrieval can improve both human audits and AI-assisted security workflows.\nRationale / Public Goods Openness: Apache licensing, public datasets, and explicit open-source framing make the openness case very strong.\nRationale / Execution Clarity: The project states concrete technical goals and metrics, though funding-to-output detail is still moderate.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/scfuzzbench:-smart-contract-fuzzer-benchmark-suite": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.74,
    "notes": "Good shared research infrastructure, but still early based on the prepared evidence.\nEvidence: The description calls scfuzzbench a benchmark suite for evaluating smart-contract fuzzers. | It is led by security researchers, protocol engineers, and open-source contributors. | The linked site profile is public documentation for the benchmark suite.\nRationale / Track Record: There is a public benchmark artifact, but the prepared input does not show long-term release history or wide adoption yet.\nRationale / Underfundedness: The project is positioned as an open research and engineering effort rather than a commercial product.\nRationale / Ecosystem Leverage: Shared benchmark infrastructure can improve multiple fuzzers and raise the quality bar across the tooling ecosystem.\nRationale / Public Goods Openness: Public docs and explicit open-source positioning support a strong openness score.\nRationale / Execution Clarity: The objective of benchmarking fuzzers is clear, although funded milestones are not highly detailed.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/seal-911": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.86,
    "notes": "High-leverage nonprofit security operations; score is held below maximum on underfundedness because no explicit runway math is provided.\nEvidence: The description says SEAL 911 is a nonprofit dedicated to safeguarding the blockchain and crypto ecosystem. | The site metadata describes Security Alliance as a nonprofit offering 24-7 incident response, threat intelligence, and security coordination. | The project says additional support will let it secure more wallets, projects, and users.\nRationale / Track Record: A 24-7 nonprofit response organization implies meaningful operational maturity, even if the specific founding date is not shown here.\nRationale / Underfundedness: Nonprofit status and a direct support appeal make additional funding plausibly useful for expanding coverage.\nRationale / Ecosystem Leverage: Incident response and emergency coordination are highly leveraged services during active threats and exploits.\nRationale / Public Goods Openness: The organization has public-facing artifacts and nonprofit posture, though some operational work is inherently service oriented.\nRationale / Execution Clarity: The function of the service and why support matters are both clear in the prepared materials.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/seal-certifications": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.79,
    "notes": "Compelling operational-security scope, but the beta status keeps track-record scoring conservative.\nEvidence: The site says SEAL Certifications is in beta. | It is described as a modular certification program covering incident response, multisig operations, treasury security, workspace security, and DNS management. | Assessments are performed by accredited auditors and recorded as on-chain attestations.\nRationale / Track Record: The beta label suggests an early project stage despite being hosted by an established nonprofit.\nRationale / Underfundedness: This is a nonprofit initiative tackling operational security gaps, so marginal donations are plausibly useful.\nRationale / Ecosystem Leverage: Shared security certifications can raise baseline practices across many crypto organizations.\nRationale / Public Goods Openness: Public documentation exists, but the core certification process is not as openly reusable as a typical open-source tool.\nRationale / Execution Clarity: The domains covered by the certification program are concrete and easy to evaluate.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/seal-frameworks": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.68,
    "notes": "Good public-good thesis for standardizing security knowledge, but project-specific traction evidence is limited.\nEvidence: The description says the project is trying to consolidate scattered crypto security knowledge into shared frameworks. | It frames the current problem as tribal knowledge spread across blog posts, social media, and chat rooms. | The project is housed within the Security Alliance nonprofit ecosystem.\nRationale / Track Record: The prepared input does not show much continuity evidence beyond the host organization, so the project itself scores as early.\nRationale / Underfundedness: This looks like nonprofit public-good documentation and coordination work rather than a commercial product.\nRationale / Ecosystem Leverage: Shared frameworks can improve baselines for auditors, teams, and newcomers across the ecosystem.\nRationale / Public Goods Openness: The intended outputs appear public and reusable, though the prepared artifact evidence is not as strong as for a public code repo.\nRationale / Execution Clarity: The problem statement is clear, but concrete milestones are only moderately detailed in the prepared input.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/seal-intel": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.82,
    "notes": "High-value shared monitoring effort; openness is somewhat mixed because threat-intel programs are not fully public by nature.\nEvidence: The site says SEAL Intel gathers, analyzes, and shares actionable threat intelligence across the crypto ecosystem. | Members receive real-time alerts on phishing campaigns, wallet drainers, and state-sponsored attackers. | The page links a public Intel SDK and an open SEAL-ISAC initiative.\nRationale / Track Record: There is evidence of an operating initiative with resources and member workflows, but not of very long-lived history in the prepared input.\nRationale / Underfundedness: As a nonprofit threat-intelligence initiative, the project appears more donation sensitive than a commercial product.\nRationale / Ecosystem Leverage: Shared threat intelligence can improve defense across a wide range of protocols, teams, and users.\nRationale / Public Goods Openness: The project has public resources, but intelligence sharing is partly membership oriented, which makes openness mixed.\nRationale / Execution Clarity: The service offering is clear, though the prepared materials do not map funding to detailed milestones.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/seal-safe-harbor": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.88,
    "notes": "Very clear nonprofit coordination design for exploit response; track record remains moderate because age and adoption depth are not fully evidenced.\nEvidence: The description says SEAL Safe Harbor is a 501(c)(3) nonprofit initiative within Security Alliance. | The site says Safe Harbor is an on-chain agreement that pre-authorizes whitehat interventions during active exploits. | The site also states rescued funds must be returned within 72 hours and whitehat bounties are capped at 1 million dollars, with legal-defense backing available.\nRationale / Track Record: The project has public repo, docs, and dashboard links, but the prepared input does not yet show a long operating history.\nRationale / Underfundedness: This is plainly nonprofit legal and coordination infrastructure for whitehat rescue work.\nRationale / Ecosystem Leverage: Safe Harbor can reduce hesitation during major exploits and help more protocols coordinate safe rescues.\nRationale / Public Goods Openness: Public repository and documentation links support strong openness for a coordination-heavy initiative.\nRationale / Execution Clarity: The intervention rules, bounty cap, and legal-support model are unusually concrete.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/securing-ai-agents-on-ethereum:-security-education": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.58,
    "notes": "Worthwhile education angle, but prepared evidence is relatively sparse beyond the project description.\nEvidence: The description says the maintainer has tutorials on decoding calldata and simulating transactions featured on ethereum.org. | The project is positioned as security education and research for AI agents on Ethereum. | The prepared site profile is empty, so most evidence comes from the project description itself.\nRationale / Track Record: Featured tutorials show shipped educational work, but the prepared input does not show a long broader track record for this project line.\nRationale / Underfundedness: This looks like an individual education effort without obvious deep institutional backing.\nRationale / Ecosystem Leverage: Educational resources on AI-agent security can help an emerging but still relatively narrow segment of builders.\nRationale / Public Goods Openness: Public tutorials are implied, but open-source artifact evidence is limited in the prepared materials.\nRationale / Execution Clarity: The subject matter is clear, though the exact funded outputs are not highly specific.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/self-custodial-agent-authorization-for-ethereum": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "core-protocol-client-security"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.77,
    "notes": "Clear architecture and strong future relevance, but still early on demonstrated traction.\nEvidence: The description says the project is building one signer registry anchored to Ethereum with programmable permissions, global revocation, and native account recovery. | It claims the design works across every L2 without bridges or per-chain redeployments. | The project explicitly says it is GPL-3 and open source, and the site frames it as AI-agent spending-limit and authorization infrastructure.\nRationale / Track Record: The prepared evidence describes a concrete product direction, but not a long history of maintenance or widespread adoption.\nRationale / Underfundedness: The work is open source, but it is also presented through a branded product company rather than as a purely volunteer effort.\nRationale / Ecosystem Leverage: Portable authorization for agentic onchain spending could become broadly relevant as autonomous workflows expand.\nRationale / Public Goods Openness: GPL licensing and a public repo support strong openness and reusability.\nRationale / Execution Clarity: The architecture and intended capabilities are described with good specificity.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/simbolik:-security-toolkit-for-solidity": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.78,
    "notes": "Useful developer tooling, but the commercial parent weakens the underfundedness and pure-public-goods case.\nEvidence: The description says Simbolik is a VS Code and Cursor extension for smart-contract security and quality assurance. | Listed features include a test explorer and workflow support inside the IDE. | The project comes from Runtime Verification, whose site positions the company around advanced smart-contract analysis and compliance tooling.\nRationale / Track Record: There is a concrete shipped extension with multiple features, but the prepared input does not show very long project-specific maintenance history.\nRationale / Underfundedness: The work is backed by a well-known commercial verification firm, which lowers the urgency of donation-based support.\nRationale / Ecosystem Leverage: IDE-native security and QA tooling can improve day-to-day engineering practice across many Solidity teams.\nRationale / Public Goods Openness: An open-source extension exists, but the broader product posture is mixed because it comes from a commercial firm.\nRationale / Execution Clarity: The project explains concrete user-facing capabilities rather than only a general vision.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/snekmate": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 3,
    "confidenceScore": 0.77,
    "notes": "Strong reusable open-source artifact for Vyper, with moderate rather than exceptional track-record evidence in the prepared input.\nEvidence: The project describes snekmate as secure, optimized Vyper smart-contract building blocks. | The linked GitHub page presents snekmate as a public reusable library. | The prepared signals include MIT licensing.\nRationale / Track Record: There is a real public library, but the prepared materials do not show a long explicit release history or very broad quantified adoption.\nRationale / Underfundedness: This appears to be an individual open-source library effort rather than a well-capitalized company product.\nRationale / Ecosystem Leverage: Reusable secure Vyper components can benefit many builders working outside the more crowded Solidity ecosystem.\nRationale / Public Goods Openness: MIT licensing and a public GitHub library make the openness case very strong.\nRationale / Execution Clarity: The library purpose is clear, though milestone-level funding detail is limited.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/soldb-open-source-solidity-debugger": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.87,
    "notes": "Technically important upstream tooling, but the sponsoring team appears stronger funded than most independent public goods.\nEvidence: The description says soldb is an open-source CLI Solidity debugger designed as a foundation other tools can plug into. | The site says Walnut leads ETHDebug implementation in solc together with the Ethereum Foundation and Argot Collective. | The site also highlights debugger and simulation work used by multiple blockchain teams.\nRationale / Track Record: The debugger sits within an active engineering organization with notable partnerships, but the specific soldb artifact still looks relatively early.\nRationale / Underfundedness: Walnut has meaningful institutional backing and partnership evidence, so marginal donation need looks limited.\nRationale / Ecosystem Leverage: Open debugger infrastructure can benefit many downstream tools, frameworks, and explorers.\nRationale / Public Goods Openness: The project is explicitly open source and aimed at being embedded by other tools.\nRationale / Execution Clarity: The role of the debugger and its intended integration points are clearly explained.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/soldeer": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 3,
    "confidenceScore": 0.74,
    "notes": "Useful ecosystem tooling with a solid public-good shape; stronger adoption evidence would justify a higher track-record score.\nEvidence: The description says Soldeer is a lightweight package manager for Solidity built to improve dependency management. | It frames current alternatives as brittle mixes of git submodules, manual imports, and npm-based setups. | The project links a public GitHub repository and a dedicated website.\nRationale / Track Record: There is a concrete shipped tool, but the prepared evidence does not establish a long history or large production adoption.\nRationale / Underfundedness: The project appears independent and open, with no strong signs of deep commercial financing in the prepared input.\nRationale / Ecosystem Leverage: Dependency management is a common pain point, so better package tooling can help many Solidity teams.\nRationale / Public Goods Openness: Public website and repository links support a strong openness score even though licensing details are not prominent in the prepared summary.\nRationale / Execution Clarity: The user problem and proposed product are easy to understand, but detailed use-of-funds language is limited.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/solidity-language-server": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Strong public-good developer infrastructure with good maintenance evidence from the release trail.\nEvidence: The description says Solidity Language Server is an open-source public-good LSP with support for more than 20 methods across many editors. | The docs site lists releases from v0.1.14 through v0.1.32, indicating repeated maintenance. | The site emphasizes low-latency support for large Solidity and Foundry projects.\nRationale / Track Record: Repeated releases and broad editor support show sustained maintenance rather than a one-off experiment.\nRationale / Underfundedness: The project is framed as open-source public-good infrastructure and does not show signs of deep commercial backing in the prepared input.\nRationale / Ecosystem Leverage: Language-server infrastructure improves daily development ergonomics across many editors and teams.\nRationale / Public Goods Openness: Open-source public-good framing, public docs, and changelog visibility make the openness case very strong.\nRationale / Execution Clarity: The goals, benchmarks, and supported workflows are described concretely.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/solidity-wake:-vs-code-extension": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.78,
    "notes": "Clear and useful developer tooling; scoring stays moderate on maturity because the prepared input gives limited adoption history.\nEvidence: The description says the Wake extension supports compile, deploy, local-node interaction, mainnet and L2 forking, and protocol development inside VS Code. | It is explicitly tied to Solidity security and testing workflows through the Wake framework. | The project links a public GitHub repository and community channels.\nRationale / Track Record: There is clear evidence of a shipped extension, but the prepared input does not show extensive age or adoption metrics.\nRationale / Underfundedness: The project looks independent and open, though the prepared evidence does not show strong funding urgency either way.\nRationale / Ecosystem Leverage: Editor-native development, testing, and security tooling can help many Solidity builders.\nRationale / Public Goods Openness: A public GitHub project with community access indicates a strong openness posture.\nRationale / Execution Clarity: The extension feature set is concrete and detailed rather than aspirational.\nReviewed at: 2026-05-08T02:22:47Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/somaxbt": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.58,
    "notes": "Relevant independent investigation work, but the visible evidence is mostly self-described and light on reusable artifacts.\nEvidence: The grant description says SomaXBT has conducted on-chain investigations since 2023. | The project says it is fully supported by community donations and grants. | Public links are limited to a Paragraph page and X account, and the fetched site profile contains no additional text.\nRationale / Track Record: The work has a stated multi-year history, but the input provides only moderate continuity evidence beyond the self-description.\nRationale / Underfundedness: An independent investigator funded by donations and grants is a case where marginal funding likely matters.\nRationale / Ecosystem Leverage: Public incident investigations can help the ecosystem, but the input does not show broad downstream tooling or infrastructure reuse.\nRationale / Public Goods Openness: The work is publicly described, yet the input does not show open repositories, datasets, or detailed reusable artifacts.\nRationale / Execution Clarity: The role and problem area are clear, but the proposal does not tie funding to concrete outputs or milestones.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/sourcify": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 5,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.88,
    "notes": "Strong upstream public-good infrastructure with excellent openness; funding need looks real but not maximally urgent from the visible evidence.\nEvidence: The description calls Sourcify an open-source, public-good smart contract verification service with open data and open standards. | The linked GitHub repo was created in 2019, was pushed on 2026-05-07, has 925 stars, and uses the MIT license. | The project says it was originally part of the Ethereum Foundation and is now stewarded by Argot.\nRationale / Track Record: This is a long-running maintained service with strong usage and continuity evidence across multiple years.\nRationale / Underfundedness: The work is clearly public-good oriented, but prior Ethereum Foundation support and Argot stewardship suggest some institutional backing.\nRationale / Ecosystem Leverage: Open contract verification is upstream infrastructure that benefits many developers, tools, and users across Ethereum.\nRationale / Public Goods Openness: The project presents strong public-goods posture through an open repo, open data framing, and open standards language.\nRationale / Execution Clarity: The mission and scope are clear, though the funding request does not include quantified milestones or budget math.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/spamreports": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.46,
    "notes": "Mission fit is plausible, but the prepared evidence is sparse and does not show many reusable public artifacts.\nEvidence: The description says this is a one-person anti-scam effort focused on blocking scams, disrupting C2 infrastructure, and integrating with service providers. | The project links a GitHub profile, website, and X account, but the website fetch failed and the input provides no repository-level evidence. | The proposal positions the work as ecosystem defense rather than a commercial product.\nRationale / Track Record: The input shows active work and some public presence, but age, adoption, and continuity evidence are limited.\nRationale / Underfundedness: A one-person public-interest security effort is a case where incremental funding likely helps.\nRationale / Ecosystem Leverage: Anti-scam and abuse-response work can benefit many users, but the input does not show large downstream reuse or standard-setting impact.\nRationale / Public Goods Openness: Some public artifacts exist, yet the visible evidence for reusable open outputs is thin.\nRationale / Execution Clarity: The project explains what it works on, but it does not map donations to concrete deliverables.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/specter-on-chain-security-research-and-investigator": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 5,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.56,
    "notes": "Funding need looks strong, but the public artifact trail in the prepared input is limited.\nEvidence: The description says Specter is an independent on-chain investigator operating without institutional backing or commercial incentive. | The proposal says the work contributes pro bono through real-time investigation and public reporting of hacks, exploits, and stolen fund movements across Ethereum and its L2s. | Public links in the input are limited to Telegram and X.\nRationale / Track Record: The work appears active and relevant, but the input does not provide much age or continuity evidence beyond the self-description.\nRationale / Underfundedness: Pro bono work without institutional backing is a strong signal that marginal funding could directly sustain the effort.\nRationale / Ecosystem Leverage: Cross-ecosystem incident response and fund-tracing can materially improve security posture for many users and teams.\nRationale / Public Goods Openness: Public reporting is implied, but the input does not show open repositories, datasets, or durable documentation.\nRationale / Execution Clarity: The operating model is understandable, though the proposal does not specify concrete upcoming outputs.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/symproof-by-blockscience-shield3": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 1,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.68,
    "notes": "High-upside research direction, but the visible implementation is still very new and should be scored conservatively on maturity.\nEvidence: The proposal frames Symproof as formalizing the math layer of Ethereum security to surface hidden assumptions in protocol design. | The linked GitHub repo was created on 2026-04-09, was pushed on 2026-04-26, has 2 stars, and shows no license in the API response. | The project is associated with BlockScience and Shield3 rather than a lone unfunded maintainer.\nRationale / Track Record: The current public artifact is very new and still looks early despite the ambitious framing.\nRationale / Underfundedness: The work has research value, but the visible organizational affiliations make it less clearly underfunded than a solo public-good effort.\nRationale / Ecosystem Leverage: If successful, protocol-design formalization could have broad upstream impact across Ethereum security.\nRationale / Public Goods Openness: There is a public repo, but the evidence of mature reusable open artifacts is still limited.\nRationale / Execution Clarity: The technical thesis and intended contribution are stated clearly even though delivery evidence is still early.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/tanuki42": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.5,
    "notes": "The threat-research focus is valuable, but the prepared evidence is light beyond the self-description and social links.\nEvidence: The description presents tanuki42 as a pseudonymous crypto security researcher and on-chain analyst focused on DPRK-linked threats and laundering patterns. | The input shows public communication channels on Discord, Telegram, and X but no linked repository or fetched website. | The work is framed as ecosystem security research rather than a product or service.\nRationale / Track Record: The proposal shows relevant ongoing work, but the input does not provide strong age, adoption, or continuity evidence.\nRationale / Underfundedness: An independent threat researcher focused on public-interest work looks meaningfully underfunded from the available evidence.\nRationale / Ecosystem Leverage: Threat-intelligence research on major state-sponsored actors can help many teams and users across Ethereum.\nRationale / Public Goods Openness: Public communication exists, but the input does not show open datasets, code, or durable reusable artifacts.\nRationale / Execution Clarity: The focus area is clear, but the proposal does not specify concrete next deliverables.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/the-obol-collective": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.72,
    "notes": "Very strong ecosystem relevance; underfundedness is weaker because the project appears comparatively well organized and established.\nEvidence: The description says Obol builds Distributed Validator Technology for Ethereum and names Charon as its flagship middleware client. | The linked GitHub organization was created in 2021, has 56 public repos, and has 334 followers. | The site description says Obol is powering and securing the Ethereum economy with distributed validators.\nRationale / Track Record: There is strong evidence of sustained public work and ecosystem presence, though the input does not provide a single repo history for Charon itself.\nRationale / Underfundedness: Obol looks more institutionally organized than a small unfunded maintainer effort, even if it serves a public-good mission.\nRationale / Ecosystem Leverage: Validator resilience infrastructure is upstream security work with broad benefits for Ethereum staking.\nRationale / Public Goods Openness: The project has a sizable public GitHub footprint and public-facing documentation, though the input does not show exact licensing for the flagship component.\nRationale / Execution Clarity: The problem, product, and security value proposition are all described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/the-red-guild:-security-as-a-public-good": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.83,
    "notes": "Strong public-good security fit with visible multi-year output across education, research, and tooling.\nEvidence: The proposal says The Red Guild has worked full-time on Ethereum security since the beginning of 2023. | The linked GitHub organization was created in 2022, has 22 public repos, and the site highlights research, tools, and resources for the public good. | The description cites open research, free training, advisories, tooling, and a public blog record of technical writeups.\nRationale / Track Record: The input shows a multi-year public track record with repeated output across several security workstreams.\nRationale / Underfundedness: This looks like a small public-goods security organization where grants meaningfully extend ongoing work.\nRationale / Ecosystem Leverage: Free training, advisories, tooling, and research can improve security posture across many Ethereum teams and developers.\nRationale / Public Goods Openness: The work is strongly public-facing with visible repositories, a public site, and a stated public-benefit orientation.\nRationale / Execution Clarity: The proposal clearly explains what the team does, even if it stops short of quantified budget-to-output mapping.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/the-web3-opsec-standard-w3os": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.64,
    "notes": "Promising public-good standard, but the visible public history is still early and the funding posture is mixed.\nEvidence: The proposal describes W3OS as an open-source operational security standard for web3 teams. | The linked GitHub organization was created in 2025, has 5 public repos, and the fetched site profile points only to the GitHub org page. | The project is owned by Auditware, which suggests some organizational backing.\nRationale / Track Record: There is evidence of an initial shipped public artifact, but the visible project history is still short.\nRationale / Underfundedness: The open standard is useful, yet the Auditware affiliation weakens the case for very high underfundedness.\nRationale / Ecosystem Leverage: A usable shared opsec standard could benefit many teams beyond a single protocol or product.\nRationale / Public Goods Openness: The project is explicitly open-source and publicly accessible through GitHub.\nRationale / Execution Clarity: The problem statement and intended output are clear, even without a detailed milestones section.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/tid-research-risk-ratings": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.55,
    "notes": "The product framing is clear, but the visible posture looks more like a commercial research service than an underfunded open public good.\nEvidence: The proposal frames TID Research as independent risk ratings aimed at protecting Ethereum users from hacks and cascading DeFi failures. | The website title and description present TID Research as institutional DeFi research with reports, dashboards, and services. | The input does not include a public repository or open dataset link.\nRationale / Track Record: The project appears launched and externally visible, but the prepared evidence does not establish a long maintenance history.\nRationale / Underfundedness: The institutional research and services framing makes this look less underfunded than a small donation-dependent public-good project.\nRationale / Ecosystem Leverage: Independent risk assessments can help a meaningful segment of Ethereum users and protocols, but the input does not show broad standard-setting reuse.\nRationale / Public Goods Openness: Public outputs likely exist, yet the prepared evidence does not show clearly reusable open artifacts.\nRationale / Execution Clarity: The need and product framing are clear even though the funding request is not tied to specific quantified outputs.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/tool-against-price-manipulation-attacks-in-defi-on-evm": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.78,
    "notes": "Useful research direction, but the visible artifact looks static and the funding case is weak given clear commercial affiliations.\nEvidence: The proposal is for automated discovery of price manipulation and flash-loan attacks in composable DeFi systems. | The linked GitHub repo was created on 2024-01-05, last pushed on 2024-01-27, has 5 stars, and uses the Apache-2.0 license. | The project is presented by Martin Derka, identified in the input as Quantstamp's Head of New Initiatives and a Zircuit co-founder.\nRationale / Track Record: The public artifact exists, but it looks closer to a point-in-time research release than a long-running maintained project.\nRationale / Underfundedness: The visible leadership affiliations point to substantial institutional and commercial backing.\nRationale / Ecosystem Leverage: Automated detection of cross-protocol price manipulation could help many DeFi teams and researchers.\nRationale / Public Goods Openness: A public open-licensed repo exists, even though ongoing maintenance evidence is limited.\nRationale / Execution Clarity: The problem and intended technical contribution are explained clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/transaction-graph": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 1,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.81,
    "notes": "Clear open-source utility, but the repo is only weeks old and should be treated as early-stage on track record.\nEvidence: The proposal describes tx-graph as a transaction visualizer that turns an EVM transaction hash into an interactive graph. | The linked GitHub repo was created on 2026-03-24, was pushed on 2026-05-07, has 0 stars, and uses the GPL-2.0 license. | The input includes public repo and live demo links.\nRationale / Track Record: The project has a shipped artifact, but it is still very new by the available public evidence.\nRationale / Underfundedness: This looks like a small public-good tool from an individual builder, so marginal funding likely helps.\nRationale / Ecosystem Leverage: Better transaction tracing can help developers, auditors, and incident responders, though it is not yet obviously foundational.\nRationale / Public Goods Openness: The repo and demo are public and reusable, which supports a strong openness score.\nRationale / Execution Clarity: The problem, user workflow, and product scope are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/unphishable-web3-phishing-safe-challenges": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.84,
    "notes": "Solid public-good safety education project with clear public artifacts and enough visible continuity for a mid-high score.\nEvidence: The proposal describes Unphishable as a hands-on platform for learning to detect Web3 phishing through realistic challenges. | The description mentions 30+ interactive challenges. | The linked GitHub repo was created on 2025-05-12, was pushed on 2026-04-27, and the project has a public site.\nRationale / Track Record: There is about a year of visible public history plus a maintained repo and live product.\nRationale / Underfundedness: This looks like a small open education effort where grants could materially extend the work.\nRationale / Ecosystem Leverage: Phishing education improves user safety across a broad slice of the Ethereum ecosystem.\nRationale / Public Goods Openness: The project has a public repo and openly accessible learning site.\nRationale / Execution Clarity: The educational format, user value, and current content are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/unruggable": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security",
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.66,
    "notes": "Meaningful ENS-adjacent infrastructure with visible public work, but the organization looks more like a firm than a highly underfunded maintainer effort.\nEvidence: The proposal says Unruggable maintains Unruggable Gateways, described as a core component of ENSv2 and important for scaling ENS across L2s. | The site describes Unruggable as an independent R&D firm dedicated to scaling ENS through open-source protocol engineering. | The linked GitHub organization was created in 2023 and has 40 public repos.\nRationale / Track Record: The input shows sustained public technical work around ENS infrastructure, though it does not give a precise repo history for the named gateway component.\nRationale / Underfundedness: The work is public-good aligned, but the R&D firm framing makes it less clearly underfunded than a volunteer project.\nRationale / Ecosystem Leverage: ENS infrastructure has meaningful downstream value for Ethereum naming and verified-web safety.\nRationale / Public Goods Openness: There is a public GitHub footprint and explicit open-source positioning.\nRationale / Execution Clarity: The proposal clearly states the component, the ecosystem role, and why it matters.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/verifereum": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.87,
    "notes": "Good public-good verification tooling with clear open artifacts and recent maintenance.\nEvidence: The proposal says Verifereum is an open-source project using the HOL4 theorem prover for smart contract verification. | The linked GitHub repo was created on 2023-11-11, was pushed on 2026-05-07, has 46 stars, and uses the GPL-3.0 license. | The site repeats the project's focus on mathematically verified Ethereum smart contracts.\nRationale / Track Record: The repo shows more than two years of public history with recent maintenance.\nRationale / Underfundedness: The available evidence points to a small open-source public-good effort rather than a well-capitalized company.\nRationale / Ecosystem Leverage: Reusable formal verification tooling can improve security for many Ethereum smart contract teams.\nRationale / Public Goods Openness: The work has strong public artifact evidence through an open repo and public website.\nRationale / Execution Clarity: The technical goal and contribution are stated clearly, though the proposal does not quantify milestones.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/verity:-formal-verification-for-smart-contracts": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.82,
    "notes": "Experienced team and promising open tooling, but the project itself is still early on track record.\nEvidence: The proposal says LFG Labs shipped security-focused Ethereum products for the last three years before launching Verity. | The linked Verity repo was created on 2026-02-08, was pushed on 2026-05-07, has 76 stars, and uses the MIT license. | The site describes Verity as a Lean 4 EDSL for human-readable specs and formally verified smart contract implementations.\nRationale / Track Record: The team appears experienced, but Verity itself is still a young public artifact with only a few months of visible history.\nRationale / Underfundedness: This looks like a small startup-like effort rather than a heavily financed enterprise or a purely donation-funded volunteer project.\nRationale / Ecosystem Leverage: If adopted, formal verification tooling for smart contracts can benefit many builders and auditors.\nRationale / Public Goods Openness: The project has a public open-licensed repo and public documentation.\nRationale / Execution Clarity: The technical approach and intended deliverable are clearly described.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/vero-a-multi-node-validator-client": {
    "primaryCategory": "core-protocol-client-security",
    "themeBaskets": [
      "core-protocol-client-security"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.86,
    "notes": "Strong core-staking security relevance with good public artifacts; underfundedness is present but not extreme from the available evidence.\nEvidence: The proposal says Vero cross-checks blockchain state across multiple client implementations before validators submit attestations. | The linked GitHub repo was created on 2024-07-04, was pushed on 2026-05-06, has 54 stars, and uses the MIT license. | The docs and description both position Vero as protection against validator client bugs.\nRationale / Track Record: The project shows nearly two years of public history with recent maintenance, but it is not yet in the longest-running bracket.\nRationale / Underfundedness: This looks like a public-good infrastructure project with some organizational backing, making the funding case mixed rather than urgent.\nRationale / Ecosystem Leverage: Validator safety tooling sits high in the stack and can benefit many operators and the broader network.\nRationale / Public Goods Openness: The project has public code and public documentation, with clear reuse potential.\nRationale / Execution Clarity: The threat model, design, and user value are explained clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/vyper": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 5,
    "underfundedness": 3,
    "ecosystemLeverage": 5,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.93,
    "notes": "Clear flagship public-good tooling with exceptional track record and leverage; only the funding urgency is less definitive.\nEvidence: The proposal says Vyper secures more than $4 billion across multiple chains and is used by major protocols including Curve, Lido, and Yearn. | The linked GitHub repo was created on 2016-11-11, was pushed on 2026-05-07, and has 5,181 stars. | The site describes Vyper as a smart contract language focused on security, simplicity, and readability.\nRationale / Track Record: This is a long-running language project with strong adoption and current maintenance evidence.\nRationale / Underfundedness: The project is clearly public-good infrastructure, but its prominence and adoption make the funding urgency less obvious than for smaller efforts.\nRationale / Ecosystem Leverage: A major secure smart contract language is foundational tooling with compounding impact across Ethereum.\nRationale / Public Goods Openness: The project has very strong public artifact evidence through a large public repo and public docs.\nRationale / Execution Clarity: The role and value proposition are clear, though the proposal does not map donations to specific milestones.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/wake:-solidity-static-analysis-and-fuzzing-framework": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 1,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.76,
    "notes": "The tooling concept is strong, but the visible repo history is extremely new and should be scored accordingly.\nEvidence: The proposal describes Wake as a combined testing, fuzzing, static analysis, and IDE tooling framework for Solidity. | The linked GitHub repo was created on 2026-04-12, was pushed on 2026-04-13, has 0 stars, and uses the ISC license. | The project is presented as open-source tooling for building safer Ethereum dApps.\nRationale / Track Record: The current public artifact is only weeks old, so maturity evidence is still minimal.\nRationale / Underfundedness: This looks like a small open-source tooling effort where marginal grants likely matter.\nRationale / Ecosystem Leverage: A unified security-oriented development framework could be broadly useful to Solidity teams.\nRationale / Public Goods Openness: The code is public and open-licensed, which supports a strong openness score despite the early stage.\nRationale / Execution Clarity: The feature set and intended user value are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/wallet-security-ranking": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "education-research-coordination"
    ],
    "trackRecord": 3,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.78,
    "notes": "Useful public comparison work with visible methodology, but the funding case is mixed because it is housed inside a security company.\nEvidence: The proposal says the ranking has been built and maintained by Coinspect since 2024 and evaluates wallet security across mobile and browser platforms. | The linked GitHub repo was created on 2025-12-17, was pushed on 2026-05-07, and has a public data repository. | The project emphasizes objective, transparent, and reproducible scoring checklists.\nRationale / Track Record: The public repo is recent, but the proposal claims the ranking itself has been maintained since 2024, which supports a moderate continuity score.\nRationale / Underfundedness: Coinspect's company backing makes this less underfunded than a volunteer public-good effort.\nRationale / Ecosystem Leverage: Transparent wallet security comparisons can help many users and wallet teams improve security posture.\nRationale / Public Goods Openness: The work is publicly documented and presented as reproducible, with a visible GitHub data repo.\nRationale / Execution Clarity: The methodology and scope are clear from the proposal.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/walletbeat": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "education-research-coordination"
    ],
    "trackRecord": 4,
    "underfundedness": 4,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.89,
    "notes": "Strong wallet-transparency public good with credible repo history and very clear openness.\nEvidence: The proposal describes Walletbeat as an open-source public good for objective wallet ecosystem transparency. | The linked GitHub repo was created on 2023-12-01, was pushed on 2026-05-07, has 108 stars, and uses the MIT license. | The project explicitly compares its role for wallets to L2BEAT's role for Layer 2s.\nRationale / Track Record: The repo shows multiple years of maintenance and visible external interest.\nRationale / Underfundedness: The project is framed as an open-source public good rather than a commercial product, which strengthens the funding-need case.\nRationale / Ecosystem Leverage: Wallet ecosystem transparency can influence both user choice and wallet team security practices.\nRationale / Public Goods Openness: The project presents strong openness evidence through an active open-licensed repo and explicit public-good framing.\nRationale / Execution Clarity: The problem and intended role are clearly stated, even without budget-level detail.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/web3secnews:-security-intelligence-newsletter": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 4,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 4,
    "executionClarity": 4,
    "confidenceScore": 0.77,
    "notes": "Good public security-intelligence reach and continuity; openness is strong for public access but lighter for reusable technical artifacts.\nEvidence: The proposal says Web3Sec News was founded in April 2023 and has more than 10,000 community members across channels. | The description links the founder to an Ethereum Foundation grant, SEAL Alliance contributions, and MITRE AADAPT research. | The project has a public website plus Discord, Telegram, LinkedIn, and X channels.\nRationale / Track Record: The input shows a multi-year public operation with meaningful community scale.\nRationale / Underfundedness: This looks like a smaller public-interest community effort, though grant support means it is not obviously maximally underfunded.\nRationale / Ecosystem Leverage: Security intelligence distribution and community coordination can improve awareness for a broad slice of Ethereum participants.\nRationale / Public Goods Openness: The work is publicly accessible, but the input does not show open code or datasets.\nRationale / Execution Clarity: The audience, format, and value proposition are all clearly described.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/webacy-dd": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 1,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.63,
    "notes": "Broad user-safety relevance, but the visible posture is much closer to a closed company product than an open underfunded public good.\nEvidence: The proposal says DD.xyz by Webacy offers free real-time risk assessment across wallets, tokens, contracts, and transactions. | The description markets the platform as delivering institutional-grade onchain intelligence. | The input shows a public website and social channels, but the website fetch failed and no public repository is linked.\nRationale / Track Record: The project appears shipped and externally accessible, but the prepared evidence does not establish a long public maintenance history.\nRationale / Underfundedness: The product and branding read like a company-backed platform, which makes the underfundedness case weak.\nRationale / Ecosystem Leverage: A broadly accessible risk-assessment tool could help many users and teams avoid unsafe activity.\nRationale / Public Goods Openness: The service is public-facing, but the input does not show open code, open data, or clearly reusable artifacts.\nRationale / Execution Clarity: The use case and feature surface are clear from the proposal.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/webcat": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.87,
    "notes": "Strong open security infrastructure fit with credible maintenance history; funding need is moderated by institutional nonprofit backing.\nEvidence: The proposal says Freedom of the Press Foundation and Tor are building WEBCAT to block tampered or malicious website code. | The linked GitHub repo was created on 2024-01-24, was pushed on 2026-05-05, has 83 stars, and uses the MIT license. | The repo description calls WEBCAT a framework for blocking code signing, verification, integrity, and transparency checks for browser-based applications.\nRationale / Track Record: The project has more than two years of public repo history with recent maintenance.\nRationale / Underfundedness: The mission is public-good aligned, but the involvement of established nonprofits means funding urgency is not at the highest end of the scale.\nRationale / Ecosystem Leverage: Web code assurance is broadly useful security infrastructure for users and applications beyond a single wallet or protocol.\nRationale / Public Goods Openness: The project shows strong open public artifact evidence through a maintained MIT-licensed repo.\nRationale / Execution Clarity: The proposal explains the missing security mechanism and the intended technical response clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/webhash": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.66,
    "notes": "The use case is valuable, but the prepared evidence is weaker on exact open artifacts and financial posture than on the project pitch.\nEvidence: The proposal says WebHash provides decentralized web deployment and verification infrastructure to reduce DNS hijacking, frontend tampering, and related risks. | The input shows 8 project updates, a public site, a GitHub organization link, and broad community channels. | The site description says WebHash is a permissionless network for persistent website availability via trustless gateways.\nRationale / Track Record: The repeated project updates and public presence suggest continuity, but the input does not provide exact repo-level age evidence for the core system.\nRationale / Underfundedness: The project is public-good framed, but its polished company-like presence makes the funding posture mixed rather than clearly urgent.\nRationale / Ecosystem Leverage: Reducing frontend and hosting trust assumptions can benefit many Web3 applications and users.\nRationale / Public Goods Openness: There is some public artifact evidence, though the input does not show a specific open repo or license for the core infrastructure.\nRationale / Execution Clarity: The security problem and infrastructure direction are stated clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/wiimee-wallet-security-education": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "education-research-coordination"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 3,
    "confidenceScore": 0.45,
    "notes": "The safety focus is relevant, but the prepared input is sparse and does not show much public artifact depth.\nEvidence: The proposal focuses on wallet-safety education around malicious signing, seed phrase exposure, compromised sites, and phishing. | The input only links X and YouTube and does not include a fetched website or repository. | The project is framed as user education rather than a commercial product.\nRationale / Track Record: The work appears shipped in some public form, but continuity evidence is limited.\nRationale / Underfundedness: A small user-education effort is plausibly underfunded from the available evidence.\nRationale / Ecosystem Leverage: Wallet-safety education can help many end users, but the input does not show broader infrastructure or tool reuse.\nRationale / Public Goods Openness: Public channels exist, yet the evidence for durable reusable artifacts is thin.\nRationale / Execution Clarity: The problem area is clear, but the proposal does not specify a concrete build plan.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/yaudit": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 4,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.8,
    "notes": "Strong security track record and ecosystem reach, but the audit-services business model keeps underfundedness and openness from scoring higher.\nEvidence: The proposal describes yAudit as a security collective focused on smart contracts and zero-knowledge systems through auditing, research, training, and tooling. | The linked GitHub organization was created in 2022, has 48 public repos, and the site highlights reports, research, fellowships, and consulting. | The site text includes evidence of completed fellowships and active audits in 2024.\nRationale / Track Record: The public record shows multiple years of sustained output and organizational continuity.\nRationale / Underfundedness: The collective has clear service revenue and consulting activity, so the case for high underfundedness is weaker.\nRationale / Ecosystem Leverage: Research, training, and security tooling can help many projects and expand Ethereum security capacity.\nRationale / Public Goods Openness: Public outputs exist, but the organization also has a strong commercial audit-services component.\nRationale / Execution Clarity: The proposal and site make the workstreams and value proposition easy to understand.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/zachxbt": {
    "primaryCategory": "monitoring-incident-response-ops",
    "themeBaskets": [
      "monitoring-incident-response-ops",
      "education-research-coordination"
    ],
    "trackRecord": 5,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 3,
    "confidenceScore": 0.82,
    "notes": "Very strong public security track record; funding urgency is less clear because of visible institutional ties and limited open artifact detail.\nEvidence: The proposal says ZachXBT's investigation work began in 2021 and has grown into incident response, blockchain forensics, and threat intelligence. | The description says ZachXBT currently advises Paradigm on incident response. | The linked site hosts a password-protected investigation artifact rather than open documentation or code.\nRationale / Track Record: The input shows a long-running, high-visibility investigation practice with explicit multi-year history.\nRationale / Underfundedness: The work is still independent in spirit, but the Paradigm advisory role suggests some institutional support.\nRationale / Ecosystem Leverage: Major public investigations and fund-tracing can materially influence ecosystem security and user protection.\nRationale / Public Goods Openness: Public reporting is central to the work, but the input does not show open repositories or broadly reusable artifacts.\nRationale / Execution Clarity: The type of work is very clear, though the proposal does not specify future deliverables.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/zealynx-academy": {
    "primaryCategory": "education-research-coordination",
    "themeBaskets": [
      "education-research-coordination",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 2,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 3,
    "executionClarity": 4,
    "confidenceScore": 0.69,
    "notes": "Good educational concept and live platform, but the prepared evidence is weaker on track record and open artifact depth.\nEvidence: The proposal says Zealynx Academy is a free interactive platform where founders write code themselves using starter code and automated tests. | The public site describes the platform as free, gamified, and built by auditors. | The input links a personal GitHub account and the Zealynx Security brand rather than a dedicated open-source academy repository.\nRationale / Track Record: There is a visible public product, but the prepared evidence does not establish a long maintenance history.\nRationale / Underfundedness: Because the platform appears to be backed by a security firm, the underfundedness case is mixed.\nRationale / Ecosystem Leverage: Training founders to build safer protocols can improve developer quality across many projects.\nRationale / Public Goods Openness: The platform is free and public, but the input does not show clearly reusable open-source course infrastructure.\nRationale / Execution Clarity: The pedagogy and user workflow are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/zero-cool": {
    "primaryCategory": "tooling-fuzzing-formal-verification",
    "themeBaskets": [
      "tooling-fuzzing-formal-verification",
      "monitoring-incident-response-ops"
    ],
    "trackRecord": 2,
    "underfundedness": 4,
    "ecosystemLeverage": 3,
    "publicGoodsOpenness": 2,
    "executionClarity": 4,
    "confidenceScore": 0.63,
    "notes": "The funding need is credible, but the public-good openness case is limited because the visible artifact is mainly a product site.\nEvidence: The proposal says Zero Cool is an AI-powered security platform for early-stage crypto projects. | The description explicitly says the team is bootstrapped and has no outside funding. | The input links a public product site, but no public repository or open dataset is provided.\nRationale / Track Record: The project appears launched, but the prepared evidence does not show a long or deeply evidenced public history.\nRationale / Underfundedness: Bootstrapped status with no outside funding is a strong sign that marginal grants could matter.\nRationale / Ecosystem Leverage: Accessible security review tooling could help many smaller teams, but the visible downstream adoption evidence is still limited.\nRationale / Public Goods Openness: The platform is publicly visible, yet the input does not show open-source or reusable public artifacts.\nRationale / Execution Clarity: The target users and product value are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/zkbugs-ai": {
    "primaryCategory": "cryptography-zk-security",
    "themeBaskets": [
      "cryptography-zk-security",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 3,
    "underfundedness": 3,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.9,
    "notes": "Strong open ZK-security public good with good adoption signals; the main scoring restraint is that the project is still under two years old.\nEvidence: The proposal says zkSecurity maintains zkbugs, a public dataset of real zero-knowledge vulnerabilities, as part of open public-good infrastructure for Ethereum and L2 security. | The linked GitHub repo was created on 2024-07-22, was pushed on 2026-04-26, has 332 stars, and uses the MIT license. | The project explicitly targets zero-knowledge circuits, proving systems, and tooling.\nRationale / Track Record: The repo shows under two years of history with clear recent maintenance and external interest.\nRationale / Underfundedness: The work is strongly public-good oriented, but it is produced by an organized security team rather than an obviously resource-constrained solo maintainer.\nRationale / Ecosystem Leverage: Open ZK vulnerability datasets and tooling can benefit many L2 and proving-system teams, though the domain is more specialized than general smart contract tooling.\nRationale / Public Goods Openness: The project has strong open public artifact evidence through an active MIT-licensed repo and explicit dataset framing.\nRationale / Execution Clarity: The problem area and intended outputs are described clearly.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  },
  "https://qf.giveth.io/project/zodiac": {
    "primaryCategory": "wallet-app-user-safety",
    "themeBaskets": [
      "wallet-app-user-safety",
      "tooling-fuzzing-formal-verification"
    ],
    "trackRecord": 5,
    "underfundedness": 2,
    "ecosystemLeverage": 4,
    "publicGoodsOpenness": 5,
    "executionClarity": 4,
    "confidenceScore": 0.89,
    "notes": "Mature open Safe infrastructure with strong public artifacts; funding urgency is moderated by the established team behind it.\nEvidence: The proposal describes Zodiac as open-source security infrastructure for onchain entities built by Gnosis Guild. | The linked GitHub repo was created on 2021-07-28, was last pushed on 2025-10-15, has 480 stars, and uses the LGPL-3.0 license. | The site describes Zodiac as an operating system for using Safes with confidence.\nRationale / Track Record: The repo shows more than four years of public history with substantial external adoption signals.\nRationale / Underfundedness: The project is strongly public-good and open, but Gnosis Guild is an established team rather than a highly resource-constrained maintainer.\nRationale / Ecosystem Leverage: Composable Safe tooling and security infrastructure benefit many DAOs and onchain organizations.\nRationale / Public Goods Openness: The project has very strong openness evidence through a long-running open-licensed repo and public site.\nRationale / Execution Clarity: The problem space and product role are clearly explained.\nReviewed at: 2026-05-08T02:21:28Z",
    "source": "llm"
  }
};
