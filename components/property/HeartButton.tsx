"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

export function HeartButton({
  defaultSaved = false,
  size = "md",
}: {
  defaultSaved?: boolean;
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(defaultSaved);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((s) => !s);
      }}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "group/h flex items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-soft backdrop-blur transition hover:scale-105 hover:text-rose-500",
        size === "sm" ? "h-8 w-8" : "h-9 w-9"
      )}
    >
      <Heart
        className={cn(
          "transition",
          size === "sm" ? "h-4 w-4" : "h-4.5 w-4.5",
          saved ? "fill-rose-500 stroke-rose-500" : "fill-transparent"
        )}
      />
    </button>
  );
}
