import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type SectionStatus = "complete" | "needs_update" | "missing";

export type PassportSection = {
  key: string;
  label: string;
  status: SectionStatus;
};

export type PassportSectionDetail = {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** What still needs doing for non-complete sections. */
  todos: string[];
  /** Verb on the primary CTA. */
  cta: string;
  /** Last edit hint shown for context. */
  updated?: string;
};

export type PassportProgressProps = {
  sections: PassportSection[];
  detail: Record<string, PassportSectionDetail>;
  completion: number;
};

export type PassportProgressVariant = ComponentType<PassportProgressProps>;
