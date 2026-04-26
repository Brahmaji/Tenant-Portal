import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin, Star } from "lucide-react";
import type { Property } from "@/lib/properties";
import { HeartButton } from "./HeartButton";
import { cn } from "@/lib/cn";

export function PropertyCard({
  property,
  size = "md",
  className,
}: {
  property: Property;
  size?: "sm" | "md" | "lg" | "fill";
  className?: string;
}) {
  const widths = {
    sm: "w-[260px]",
    md: "w-[300px]",
    lg: "w-full",
    fill: "w-full h-full",
  };
  const heights = {
    sm: "h-[200px]",
    md: "h-[230px]",
    lg: "h-[280px]",
    fill: "h-full",
  };
  const isFill = size === "fill";

  return (
    <Link
      href={`/discover/${property.id}`}
      className={cn(
        "group relative block shrink-0 overflow-hidden rounded-2xl",
        widths[size],
        isFill && "flex flex-col",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          heights[size],
          isFill && "flex-1"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.cover}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {property.highlight ? (
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
              {property.highlight}
            </span>
          ) : null}
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur">
            {property.type}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <HeartButton size={size === "sm" ? "sm" : "md"} />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider opacity-90">
              <MapPin className="h-3 w-3" />
              {property.neighborhood}
            </div>
            <div className="mt-0.5 truncate text-sm font-bold drop-shadow">
              {property.title}
            </div>
          </div>
          <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold backdrop-blur">
            <Star className="h-3 w-3 fill-white" />
            {property.rating}
          </div>
        </div>

        {isFill ? (
          <div className="absolute right-3 top-12 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold text-brand-ink shadow-soft backdrop-blur dark:bg-slate-900/90 dark:text-slate-100">
            ${property.price.toLocaleString()}
            <span className="font-medium text-slate-500 dark:text-slate-400">/mo</span>
          </div>
        ) : null}
      </div>

      {isFill ? null : (
      <div className="mt-3 flex items-end justify-between gap-2 px-1">
        <div className="min-w-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 text-brand-blue" />
            {property.beds === 0 ? "Studio" : `${property.beds} bd`}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-brand-blue" />
            {property.baths} ba
          </span>
          <span className="inline-flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5 text-brand-blue" />
            {property.sqft} sq ft
          </span>
        </div>
        <div className="text-right leading-none">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            From
          </div>
          <div className="text-sm font-extrabold text-brand-ink dark:text-slate-100">
            ${property.price.toLocaleString()}
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">/mo</span>
          </div>
        </div>
      </div>
      )}
    </Link>
  );
}

/** Editorial featured card used as the hero element on Discover. */
export function FeaturedPropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/discover/${property.id}`}
      className="group relative block overflow-hidden rounded-3xl"
    >
      <div className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[480px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.cover}
          alt={property.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                Featured this week
              </span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur">
                {property.type}
              </span>
            </div>
            <HeartButton />
          </div>

          <div className="text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider opacity-90">
              <MapPin className="h-3.5 w-3.5" />
              {property.neighborhood} · {property.city}
            </div>
            <h3 className="mt-1 max-w-xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
              {property.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/85 line-clamp-2 sm:text-base">
              {property.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-white px-4 py-2 text-brand-ink shadow-soft">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  From
                </div>
                <div className="text-lg font-extrabold leading-none">
                  ${property.price.toLocaleString()}
                  <span className="text-xs font-medium text-slate-500">/mo</span>
                </div>
              </div>
              <Stat label="Beds" value={property.beds === 0 ? "Studio" : property.beds} />
              <Stat label="Baths" value={property.baths} />
              <Stat label="Sq ft" value={property.sqft} />
              <Stat label="Rating" value={`★ ${property.rating}`} />
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-blue shadow-soft transition group-hover:bg-brand-gradient group-hover:text-white">
                View listing →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white/12 px-3 py-2 text-white backdrop-blur ring-1 ring-white/15">
      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
        {label}
      </div>
      <div className="text-sm font-bold leading-none">{value}</div>
    </div>
  );
}
