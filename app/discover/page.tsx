"use client";

import { useMemo, useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import { properties, dashboardRails, type Property } from "@/lib/properties";
import {
  PropertyCard,
  FeaturedPropertyCard,
} from "@/components/property/PropertyCard";
import { Rail } from "@/components/ui/Rail";
import {
  defaultFilters,
  FilterBar,
  type Filters,
} from "@/components/property/FilterBar";

export default function DiscoverPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filtered = useMemo(() => filterProperties(properties, filters), [filters]);

  const featured = filtered[0] || properties[0];
  const sideGrid = filtered.slice(1, 5);

  return (
    <div className="space-y-8">
      <header className="mb-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue ring-1 ring-brand-blue/15">
          <Compass className="h-3.5 w-3.5" />
          Discover
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Find a place that <span className="text-gradient">approves you back.</span>
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          Real listings, verified landlords, and one-click applications powered by
          your Tenant Passport.
        </p>
      </header>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />

      {/* Hero gallery */}
      {filtered.length > 0 ? (
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeaturedPropertyCard property={featured} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:h-[480px]">
            {sideGrid.map((p) => (
              <PropertyCard key={p.id} property={p} size="fill" />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState onReset={() => setFilters(defaultFilters)} />
      )}

      {/* Editorial rails — only shown when no narrow filters are active */}
      {!isNarrowed(filters) && (
        <>
          {dashboardRails.map((r) =>
            r.items.length > 0 ? (
              <Rail key={r.name} title={r.name}>
                {r.items.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </Rail>
            ) : null
          )}
        </>
      )}

      {/* All results grid */}
      {filtered.length > 0 ? (
        <section>
          <header className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                {isNarrowed(filters) ? "Matches" : "All listings"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {filtered.length} homes · sorted by{" "}
                {filters.sort === "price-asc"
                  ? "price (low → high)"
                  : filters.sort === "price-desc"
                  ? "price (high → low)"
                  : filters.sort === "rating"
                  ? "top rated"
                  : "recommended"}
              </p>
            </div>
            <span className="hidden items-center gap-1 rounded-full bg-brand-gradient-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue sm:inline-flex">
              <Sparkles className="h-3 w-3" /> Verified by LeazeSure
            </span>
          </header>
          <div className="grid grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} size="lg" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function isNarrowed(f: Filters) {
  return (
    f.q.length > 0 ||
    f.beds !== null ||
    f.baths !== null ||
    f.neighborhood !== null ||
    f.type !== null ||
    f.moveInBy !== "" ||
    f.lease !== "any" ||
    f.pets ||
    f.parking ||
    f.laundry ||
    f.gym ||
    f.furnished ||
    f.minPrice > 1000 ||
    f.maxPrice < 5000
  );
}

function filterProperties(items: Property[], f: Filters) {
  let out = items.filter((p) => {
    if (f.q) {
      const q = f.q.toLowerCase();
      const hay = `${p.title} ${p.neighborhood} ${p.city} ${p.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (p.price < f.minPrice || p.price > f.maxPrice) return false;
    if (f.beds !== null) {
      if (f.beds === 0 ? p.beds !== 0 : p.beds < f.beds) return false;
    }
    if (f.baths !== null && p.baths < f.baths) return false;
    if (f.neighborhood && p.neighborhood !== f.neighborhood) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.moveInBy && new Date(p.available) > new Date(f.moveInBy)) return false;
    if (f.lease !== "any" && !p.leaseLengths.includes(f.lease)) return false;
    if (f.pets && !p.pets) return false;
    if (f.parking && !p.parking) return false;
    if (f.laundry && !p.laundry) return false;
    if (f.gym && !p.gym) return false;
    if (f.furnished && !p.furnished) return false;
    return true;
  });

  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      out = [...out].sort((a, b) => b.rating - a.rating);
      break;
    default:
      out = [...out].sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
  }
  return out;
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15">
        <Compass className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight">
        No homes match those filters yet.
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try widening your price range or removing a few filters.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
      >
        Reset filters
      </button>
    </div>
  );
}
