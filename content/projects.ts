import type { Project } from "@/lib/types";

/**
 * PROJECT ARCHIVE — European programme projects and R&D/entrepreneurship
 * proposals. Source: claude/PENCHEFF_INFO_PROJECTS.md.
 *
 * Rules
 * - Personal roles are taken from the CV ("Financial Manager of
 *   Consortium" / "Financial Manager of Company"); do not expand them
 *   into coordinator, project manager, researcher or author.
 * - Do not invent budgets, partners, exact dates, outputs or results.
 * - Consortium-level project results are never attributed personally.
 * - REDA = Stara Zagora Regional Economic Development Agency, where
 *   Kostadin Penchev worked 2019–Jul 2024 (see content/about.ts).
 *
 * Still to verify (see source doc "NEXT VERIFICATION PASS"): exact
 * official titles/periods for DeCarb, GPP4Growth, INNOGROW, PLASTECO,
 * SMEOrigin, Act45, RES-SKILL, eUnited; current status of COALition.
 *
 * PDGA and DUST are kept in this file (data model) but unpublished
 * (`published: false`) — see each entry's own comment below. This
 * keeps the underlying data available without showing them on the
 * public Projects page / Project Archive.
 *
 * RES-SKILL vs ReSSKILL — do not confuse the two:
 * - RES-SKILL (included below): an Erasmus+ project on reskilling
 *   coal-industry workers for the renewable energy sector, run
 *   through the Stara Zagora Regional Economic Development Agency.
 * - ReSSKILL / "Renewable Energy System Integration and
 *   Digitalization Upskilling Initiative for Sustainable Buildings":
 *   a separate LIFE/CINEA project (2024–2027). It is NOT the same
 *   project and is intentionally NOT included here.
 */
export const projects: Project[] = [
  {
    slug: "decarb",
    title: "DeCarb",
    status: "completed",
    featured: false,
    category: "eu-projects",
    programme: "Interreg Europe",
    focus: "Energy Transition",
    roles: ["Financial Manager of Consortium"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Supporting the transition of coal-intensive European regions towards a low-carbon economy.",
    themes: ["just-transition", "regional-development"],
    overview: {
      body: [
        "DeCarb supported coal-intensive European regions in their transition towards a low-carbon economy. It focused on regional policy exchange and good practices addressing decarbonisation alongside employment, economic development and the social consequences of structural change in coal regions.",
      ],
    },
    myRole: {
      body: ["Financial Manager of Consortium, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [
      { label: "Interreg Europe", url: "https://www.interregeurope.eu/" },
      { label: "Policy brief — integrated low-carbon strategies (PDF)", url: "https://www.interregeurope.eu/sites/default/files/inline/2021_10_Integrated_low-carbon_strategies_PolicyBrief.pdf" },
    ],
  },
  {
    slug: "gpp4growth",
    title: "GPP4Growth",
    status: "completed",
    category: "eu-projects",
    programme: "Interreg Europe",
    focus: "Green Public Procurement",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Using Green Public Procurement to support resource-efficient regional growth and eco-innovation.",
    themes: ["sustainability", "regional-development"],
    overview: {
      body: [
        "GPP4Growth promoted Green Public Procurement as an instrument for resource efficiency, eco-innovation and greener regional economic growth. Partners exchanged experience and good practices to strengthen regional policies and public-sector capacity for applying environmental criteria in procurement.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [
      { label: "Project archive (former SZEDA site)", url: "https://www.former.szeda.eu/en/projects-en.html" },
      { label: "Interreg Europe", url: "https://www.interregeurope.eu/" },
    ],
  },
  {
    slug: "innogrow",
    title: "INNOGROW",
    status: "completed",
    featured: true,
    category: "eu-projects",
    programme: "Interreg Europe",
    focus: "Rural SMEs & Innovation",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Strengthening innovation-driven competitiveness and growth among SMEs in rural regions.",
    themes: ["innovation", "technology-adoption", "regional-development"],
    overview: {
      body: [
        "INNOGROW — Regional Policies for Innovation Driven Competitiveness and Growth of Rural SMEs — focused on strengthening the competitiveness and growth of SMEs in rural areas through innovation, technology adoption and new business models. It examined factors affecting the ability of rural SMEs to adopt innovation and used interregional learning to support improvements in regional policy.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [{ label: "Project summary (PDF)", url: "https://projects2014-2020.interregeurope.eu/fileadmin/user_upload/tx_tevprojects/library/file_1567499281.pdf" }],
  },
  {
    slug: "plasteco",
    title: "PLASTECO",
    status: "completed",
    category: "eu-projects",
    programme: "Interreg Europe",
    focus: "Circular Economy",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Supporting regional policies to reduce plastic waste and accelerate the transition towards a circular economy.",
    themes: ["sustainability", "regional-development"],
    overview: {
      body: [
        "PLASTECO — Supporting EU Regions to Curb Plastics Waste and Littering — supported European regions in improving policies to reduce plastic waste and littering. Its work was linked to the transition towards a circular economy, reducing unnecessary plastic use and encouraging more sustainable approaches to plastics management.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [
      { label: "Project archive (former SZEDA site)", url: "https://www.former.szeda.eu/en/projects-en.html" },
      { label: "Interreg Europe", url: "https://www.interregeurope.eu/" },
    ],
  },
  {
    slug: "smeorigin",
    title: "SMEOrigin",
    status: "completed",
    featured: true,
    category: "eu-projects",
    programme: "Interreg Europe",
    focus: "SMEs & Geographical Indications",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Supporting agri-food SMEs and regional products in adapting to changing markets and the digital economy.",
    themes: ["agricultural-entrepreneurship", "digital-transformation", "regional-development"],
    overview: {
      body: [
        "SMEOrigin — SMEs & European Original Geographical Indications — addressed the competitiveness of SMEs connected to agri-food products and European geographical indications. The project linked regional development, agri-food entrepreneurship, digital transformation and the protection and valorisation of regional products and heritage.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [
      { label: "Project page (former SZEDA site)", url: "https://former.szeda.eu/en/smeorigin-en.html" },
      { label: "Interreg Europe", url: "https://www.interregeurope.eu/" },
    ],
  },
  {
    slug: "act45",
    title: "Act45",
    status: "completed",
    category: "eu-projects",
    programme: "Erasmus+",
    focus: "Skills Development",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Supporting training, skills development and labour-market inclusion for low-skilled unemployed adults aged 45+.",
    themes: ["skills-development", "digital-transformation"],
    overview: {
      body: [
        "Act45 addressed the inclusion of unemployed and low-skilled adults aged 45+ by encouraging participation in training and skills development. It promoted cooperation between civil society organisations, employers and training providers, with attention to basic, digital and soft skills supporting employability and social inclusion.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [{ label: "Project website", url: "https://act45.eu/project/" }],
  },
  {
    slug: "res-skill",
    title: "RES-SKILL",
    status: "completed",
    category: "eu-projects",
    programme: "Erasmus+",
    focus: "Reskilling & Renewable Energy",
    roles: ["Financial Manager"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Supporting the reskilling of coal-industry workers for employment opportunities in the renewable energy sector.",
    themes: ["skills-development", "just-transition"],
    overview: {
      body: [
        "RES-SKILL was an Erasmus+ project focused on supporting the reskilling of workers from the coal industry for employment opportunities in the renewable energy sector. The project developed specialised training materials and learning pathways responding to the employment challenges created by the energy transition in European coal regions.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [{ label: "Project page (former SZEDA site)", url: "https://former.szeda.eu/bg/res-skill.html" }],
  },
  {
    slug: "eunited",
    title: "eUnited — Citizens' Forums for United Europe",
    status: "completed",
    category: "eu-projects",
    programme: "Europe for Citizens",
    focus: "European Citizenship & Civic Participation",
    roles: ["Financial Manager"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    summary: "Promoting democratic engagement, European citizenship and civic participation through forums, debates and activities involving citizens from six European countries.",
    themes: ["civic-participation", "social-inclusion", "sustainability"],
    overview: {
      body: [
        "eUnited — Citizens' Forums for United Europe promoted democratic engagement, European citizenship and civic participation through forums, debates and activities involving citizens from six European countries.",
        "The project addressed different European social and economic challenges across participating countries, including climate change and environment, digitalisation, migration and security, competitiveness, democracy and European communication.",
      ],
    },
    context: {
      body: ["Funded under Europe for Citizens, Strand 2 — Democratic engagement and civic participation."],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [{ label: "Project page (former SZEDA site)", url: "https://former.szeda.eu/en/europe-for-citizens-en.html" }],
  },
  {
    slug: "coalition",
    title: "COALition",
    status: "active",
    featured: true,
    category: "eu-projects",
    programme: "Horizon Europe",
    focus: "Just Transition",
    grantId: "101087022",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    period: { start: "2023", end: "2026" },
    summary: "Building innovation capacity and regional ecosystems for the transformation of European coal regions.",
    themes: ["just-transition", "innovation", "regional-development"],
    overview: {
      body: [
        "COALition — Promoting Innovation Excellence in Transformation of Coal Regions to Climate-Neutral, Thriving Economies — promotes innovation excellence in European coal regions undergoing structural transformation. It connects research and innovation, entrepreneurship, skills development and regional innovation ecosystems with the transition towards climate-neutral and economically resilient regional economies.",
        "The project includes transformation-oriented activity in coal-intensive regions including Southeast Bulgaria.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency. Reported period is from official CORDIS records; current status is subject to verification."],
    },
    links: [{ label: "CORDIS — project 101087022", url: "https://cordis.europa.eu/project/id/101087022" }],
  },
  {
    slug: "dust",
    title: "DUST",
    // Unpublished from the public Project Archive: information architecture
    // cleanup keeping Research/Publications/Projects/Entrepreneurship
    // clearly separated. Data kept for completeness; not shown publicly.
    published: false,
    status: "active",
    featured: true,
    category: "eu-projects",
    programme: "Horizon Europe",
    focus: "Just Transition / Citizen Participation",
    grantId: "101094869",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    period: { end: "2026" },
    summary: "Exploring more inclusive forms of citizen participation in Europe's just sustainability transitions.",
    themes: ["just-transition", "digital-transformation", "regional-development"],
    overview: {
      body: [
        "DUST — Democratising jUst Sustainability Transitions — investigates how citizens and communities can participate more effectively in sustainability transitions, particularly in regions affected by energy-intensive industries and structural economic change. It develops and tests approaches to citizen participation combining territorial engagement and digital tools.",
        "Stara Zagora is among the case-study regions associated with the project's work on just sustainability transitions.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency. External project information reports the project extending into 2026; exact dates and current status are subject to verification."],
    },
    links: [{ label: "Project website", url: "https://www.dustproject.eu/about" }],
  },
  {
    slug: "sitrans",
    title: "SITRANS",
    status: "completed",
    category: "eu-projects",
    programme: "LIFE",
    focus: "Just Transition",
    roles: ["Financial Manager of Company"],
    organisation: "Stara Zagora Regional Economic Development Agency",
    period: { start: "2022-11", end: "2025-04" },
    summary: "Supporting more inclusive governance and social dialogue in the transition of coal-dependent regions.",
    themes: ["just-transition", "regional-development"],
    overview: {
      body: [
        "SITRANS — Governance and Social Impact of Coal Regions under Transition — focused on the governance and social dimensions of the transition of coal-dependent regions. It sought more inclusive approaches to regional decarbonisation by engaging public institutions, private organisations, stakeholders and civil society.",
        "Its perspective included the social distribution of the benefits, costs and risks associated with structural transformation and decarbonisation.",
      ],
    },
    myRole: {
      body: ["Financial Manager, as part of European-project financial management at the Stara Zagora Regional Economic Development Agency (2019–2024)."],
    },
    links: [{ label: "Project page (SZEDA)", url: "https://szeda.eu/proekti/life/sitrans/" }],
  },
  {
    slug: "pdga",
    title: "PDGA — Predictive Dendritic Gathering Adapter",
    // Unpublished from the public Project Archive: PDGA is CREATIVE
    // DESTRUCTION VCC's own entrepreneurial proposal, not part of
    // Kostadin Penchev's professional Project Archive — it must not be
    // presented as such. Data kept for completeness; not shown publicly.
    // (This also removes the improper "Related projects" link on the
    // PhD research page via the existing published-filtering mechanism.)
    published: false,
    status: "proposal",
    featured: true,
    category: "artificial-intelligence",
    programme: "Horizon Europe — WIDERA / EIC Pre-Accelerator",
    focus: "Deep-tech AI",
    achievement: "Horizon Europe Seal of Excellence 2026",
    grantId: "101310034-PDGA",
    organisation: "CREATIVE DESTRUCTION VCC",
    period: { start: "2025", end: "2026" },
    summary: "Deep-tech AI architecture for continual learning and efficient model adaptation, awarded a Horizon Europe Seal of Excellence in 2026.",
    themes: ["artificial-intelligence", "innovation", "technology-adoption"],
    overview: {
      body: [
        "PDGA is a deep-tech AI project developing a new architecture for efficient continual learning and model adaptation. The concept addresses continual learning and parameter-efficient adaptation of AI models, aiming to enable models to acquire and integrate new knowledge while reducing the risk of catastrophic forgetting.",
        "The proposed development path was designed to advance the technology from TRL 4 towards TRL 6, combining technical maturation with validation, business development and preparation for market deployment.",
      ],
    },
    context: {
      body: [
        "The proposal was submitted under the Horizon Europe WIDERA call HORIZON-WIDERA-2025-02, topic HORIZON-WIDERA-2025-02-ACCESS-01 (EIC Pre-Accelerator — Widening). The EIC Pre-Accelerator is a joint scheme of the European Innovation Council and the Horizon Europe WIDERA programme, helping early-stage deep-tech SMEs in widening countries develop their technology, business and investment readiness.",
      ],
    },
    results: {
      body: [
        "Awarded the Horizon Europe Seal of Excellence following evaluation under the EIC Pre-Accelerator — Widening call, with an overall evaluation score of 13.50/15 (Excellence 4.50/5, Impact 4.50/5, Quality and efficiency of implementation 4.50/5). The proposal met the quality threshold but was not selected for funding within the available call budget.",
      ],
    },
    related: ["research/phd"],
    links: [
      { label: "European Commission — EIC Pre-Accelerator", url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-pre-accelerator_en" },
      { label: "CORDIS — HORIZON-WIDERA-2025-02-ACCESS-01", url: "https://cordis.europa.eu/programme/id/HORIZON_HORIZON-WIDERA-2025-02-ACCESS-01" },
      { label: "Horizon Europe Work Programme 2025 — WIDERA (PDF)", url: "https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/horizon/wp-call/2025/wp-11-widening-participation-and-strengthening-the-european-research-area_horizon-2025_en.pdf" },
      { label: "EIC — 2026 Pre-Accelerator call results", url: "https://eic.ec.europa.eu/news/eic-pre-accelerator-supports-70-early-stage-deep-tech-companies-countries-lower-innovation-2026-04-23_en" },
    ],
  },
];
