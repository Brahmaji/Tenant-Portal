"use client";

import { ProgressTimeline } from "./ProgressTimeline";
import type { PassportProgressProps, PassportProgressVariant } from "./types";

const variants = {
  timeline: ProgressTimeline,
} as const satisfies Record<string, PassportProgressVariant>;

export type PassportProgressVariantKey = keyof typeof variants;

/**
 * Passport progress view.
 *
 * To swap to a different visualization (e.g. radial rings, wizard), implement
 * a component matching `PassportProgressVariant` and register it in the
 * `variants` map above. Then pass its key here as `variant=`.
 */
export function PassportProgress({
  variant = "timeline",
  ...rest
}: PassportProgressProps & { variant?: PassportProgressVariantKey }) {
  const Variant = variants[variant];
  return <Variant {...rest} />;
}
