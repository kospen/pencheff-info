/**
 * Content model for PENCHEFF.INFO.
 *
 * Every piece of work shares a common base (BaseEntry). Specific kinds
 * (projects, ventures, publications, activity, research programmes, roles)
 * extend it. Relationships between entries are expressed with `related`
 * (a list of entry references, e.g. "projects/example-project").
 *
 * Adding content = adding an object to the relevant file in /content.
 * No layout code needs to change.
 */

/** A reference to another entry: "<collection>/<slug>". */
export type EntryRef = `${Collection}/${string}`;

export type Collection =
  | "projects"
  | "ventures"
  | "publications"
  | "activity"
  | "research"
  | "roles"
  | "themes";

/**
 * Dates are ISO-like strings with variable precision:
 * "2026", "2026-05" or "2026-05-14".
 */
export type PartialDate = string;

export interface Period {
  start?: PartialDate | null;
  /** `null` = ongoing. `undefined` = unknown / not shown. */
  end?: PartialDate | null;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface MediaItem {
  /** Path under /public, e.g. "/photo/example.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
}

export interface BaseEntry {
  slug: string;
  title: string;
  /** One sentence. */
  summary?: string;
  period?: Period;
  /** Theme ids from content/taxonomy.ts */
  themes?: string[];
  related?: EntryRef[];
  /** Show on the homepage / at the top of its section. */
  featured?: boolean;
  /**
   * `placeholder` entries are development scaffolding. They render only while
   * `site.showPlaceholders` is true and are always visibly marked.
   */
  placeholder?: boolean;
  /** Set to false to keep an entry in the repository without publishing it. */
  published?: boolean;
}

/* ---------------------------------------------------------------- Projects */

export type ProjectStatus =
  | "active"
  | "in-development"
  | "proposal"
  | "completed"
  | "archived";

export interface ProjectSection {
  /** Optional heading; defaults are provided per key. */
  heading?: string;
  /** Paragraphs of plain text. */
  body?: string[];
  /** Bulleted items. */
  items?: string[];
}

export interface Project extends BaseEntry {
  /**
   * The project's own status (active/completed/proposal/…) — this is a
   * historical/administrative fact about the project, not a statement of
   * Kostadin Penchev's current personal involvement. Kept for data
   * completeness (e.g. for potential future use) but intentionally NOT
   * surfaced on /projects or on this project's own detail page, since a
   * project archive entry can be "Active" long after his own role ended.
   */
  status: ProjectStatus;
  /** Category id from content/taxonomy.ts */
  category: string;
  roles?: string[];
  organisation?: string;
  partners?: string[];
  programme?: string;
  /** Short thematic tag shown as "Focus" on /projects (e.g. "Just Transition"). */
  focus?: string;
  /** A specific, dated achievement (e.g. a Seal of Excellence) — never a funding outcome. */
  achievement?: string;
  grantId?: string;
  location?: string;
  overview?: ProjectSection;
  context?: ProjectSection;
  objectives?: ProjectSection;
  myRole?: ProjectSection;
  work?: ProjectSection;
  results?: ProjectSection;
  researchConnection?: ProjectSection;
  outputs?: ProjectSection;
  media?: MediaItem[];
  links?: ExternalLink[];
}

/* ---------------------------------------------------------------- Ventures */

export type VentureStatus =
  | "active"
  | "live"
  | "beta"
  | "in-development"
  | "exploring"
  | "completed"
  | "concluded"
  | "closed"
  | "exited"
  | "discontinued";

export interface Venture extends BaseEntry {
  /** Venture type id from content/taxonomy.ts (company, product, …) */
  type: string;
  status: VentureStatus;
  roles?: string[];
  /** Parent company slug for products. */
  parent?: string;
  website?: string;
  overview?: ProjectSection;
  problem?: ProjectSection;
  work?: ProjectSection;
  myRole?: ProjectSection;
  results?: ProjectSection;
  researchConnection?: ProjectSection;
  links?: ExternalLink[];
}

/* ------------------------------------------------------------ Publications */

export type PublicationStatus =
  | "published"
  | "presented"
  | "accepted"
  | "under-review"
  | "in-preparation";

export interface Publication extends BaseEntry {
  /** Year of publication (or expected year for work in preparation). */
  year?: number;
  authors: string[];
  /** Publication type id from content/taxonomy.ts */
  type: string;
  status: PublicationStatus;
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  /** Path under /public. Only if distribution rights allow it. */
  pdf?: string;
  abstract?: string;
  keywords?: string[];
}

/* ---------------------------------------------------------------- Activity */

export type ActivityLevel = "featured" | "standard" | "archive";

export interface ActivityEntry extends BaseEntry {
  /** Activity type id from content/taxonomy.ts (activityTypes) */
  type: string;
  /** Specific wording shown instead of the generic type, e.g. "International Scientific Conference". */
  typeDetail?: string;
  /**
   * Visual weight: featured (major / international / representative),
   * standard (forums, doctoral schools, substantial training),
   * archive (smaller activities — full archive only, never on the homepage).
   */
  level?: ActivityLevel;
  /** Planned / not yet taken place. */
  upcoming?: boolean;
  /** Role ids from content/taxonomy.ts (activityRoles). Keep them distinct. */
  roles?: string[];
  location?: string;
  organiser?: string;
  /** One or two sentences. */
  description?: string;
  /** Title of the paper or presentation delivered (only if stated). */
  presentationTitle?: string;
  /** Co-authors, as they should be displayed. */
  coAuthors?: string[];
  /** External page of the event — verified URLs only. */
  links?: ExternalLink[];
  /** Photos. */
  media?: MediaItem[];
  /** Programmes, certificates, slides — verified files only. */
  documents?: ExternalLink[];
}

/* ------------------------------------------------------------------- Roles */

export interface Role extends BaseEntry {
  organisation?: string;
  /** academic | professional | entrepreneurial */
  kind: "academic" | "professional" | "entrepreneurial" | "other";
  current?: boolean;
}

/* ---------------------------------------------------------------- Research */

export type StageStatus = "completed" | "in-progress" | "planned" | "unconfirmed";

export interface Milestone {
  id: string;
  label: string;
  status: StageStatus;
  period?: Period;
  summary?: string;
  related?: EntryRef[];
}

export interface ResearchQuestion {
  id: string;
  question: string;
  sub?: string[];
}

export interface DocSection {
  id: string;
  number: string;
  title: string;
  /** Paragraphs. Missing content → the section shows "In development". */
  body?: string[];
  items?: string[];
  /** Two-column definition list (e.g. Object / Subject). */
  pairs?: { label: string; text: string }[];
  placeholder?: boolean;
}

export interface ResearchNote extends BaseEntry {
  date: PartialDate;
  type: "note" | "milestone" | "method-update" | "finding" | "presentation" | "material";
}

export interface ResearchProgramme extends BaseEntry {
  type: "doctoral" | "funded" | "independent" | "collaborative";
  status: "planned" | "active" | "completed" | "archived";
  titleLocal?: { lang: string; text: string };
  institution?: string;
  faculty?: string;
  department?: string;
  supervisor?: string;
  meta?: { label: string; value?: string }[];
  sections?: DocSection[];
  questions?: ResearchQuestion[];
  milestones?: Milestone[];
  notes?: ResearchNote[];
  lastUpdated?: PartialDate;
  /** Route of the programme page. */
  href: string;
}

/* ------------------------------------------------------------------ Themes */

export interface Theme {
  id: string;
  label: string;
  group: "technology" | "domain" | "policy" | string;
  researchArea?: boolean;
  /** Short definition, written by the site owner. */
  definition?: string;
}

/* ------------------------------------------------------------ Current focus */

export interface FocusItem {
  label: string;
  text: string;
  href?: string;
  linkLabel?: string;
  placeholder?: boolean;
}
