import type { ActivityLevel, ExternalLink, MediaItem } from "@/lib/types";

/** Display-ready activity entry (prepared on the server, safe for client components). */
export interface ActivityRecord {
  slug: string;
  title: string;
  typeText: string;
  rolesText: string;
  isPresenter: boolean;
  dateText: string;
  dateTime?: string;
  level: ActivityLevel;
  location?: string;
  organiser?: string;
  description?: string;
  presentationTitle?: string;
  coAuthors?: string[];
  links?: ExternalLink[];
  documents?: ExternalLink[];
  media?: MediaItem[];
  related: { ref: string; href: string; title: string; kindLabel: string }[];
  section: string;
  upcoming?: boolean;
  placeholder?: boolean;
}
