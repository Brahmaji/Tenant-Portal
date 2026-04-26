"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowDownAZ,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  DollarSign,
  Filter as FilterIcon,
  MapPin,
  PawPrint,
  ParkingCircle,
  Search,
  Shirt,
  SlidersHorizontal,
  Sofa,
  X,
} from "lucide-react";
import { neighborhoods, propertyTypes } from "@/lib/properties";
import { cn } from "@/lib/cn";

export type Filters = {
  q: string;
  minPrice: number;
  maxPrice: number;
  beds: number | null; // null = any; 0 = studio; 1/2/3+ etc.
  baths: number | null;
  neighborhood: string | null;
  type: string | null;
  moveInBy: string;
  lease: "any" | "month" | "6mo" | "12mo";
  pets: boolean;
  parking: boolean;
  laundry: boolean;
  gym: boolean;
  furnished: boolean;
  sort: "rec" | "price-asc" | "price-desc" | "rating";
};

export const defaultFilters: Filters = {
  q: "",
  minPrice: 1000,
  maxPrice: 5000,
  beds: null,
  baths: null,
  neighborhood: null,
  type: null,
  moveInBy: "",
  lease: "any",
  pets: false,
  parking: false,
  laundry: false,
  gym: false,
  furnished: false,
  sort: "rec",
};

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
  resultCount: number;
};

export function FilterBar({ filters, onChange, resultCount }: Props) {
  const [openMore, setOpenMore] = useState(false);
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const active = useMemo(() => {
    const list: { label: string; clear: () => void }[] = [];
    if (filters.q) list.push({ label: `"${filters.q}"`, clear: () => set({ q: "" }) });
    if (filters.beds !== null)
      list.push({
        label: filters.beds === 0 ? "Studio" : `${filters.beds}+ bd`,
        clear: () => set({ beds: null }),
      });
    if (filters.baths !== null)
      list.push({ label: `${filters.baths}+ ba`, clear: () => set({ baths: null }) });
    if (filters.neighborhood)
      list.push({ label: filters.neighborhood, clear: () => set({ neighborhood: null }) });
    if (filters.type) list.push({ label: filters.type, clear: () => set({ type: null }) });
    if (filters.moveInBy)
      list.push({ label: `By ${filters.moveInBy}`, clear: () => set({ moveInBy: "" }) });
    if (filters.lease !== "any")
      list.push({
        label: filters.lease === "month" ? "Month-to-month" : filters.lease === "6mo" ? "6 mo lease" : "12 mo lease",
        clear: () => set({ lease: "any" }),
      });
    (
      ["pets", "parking", "laundry", "gym", "furnished"] as const
    ).forEach((k) => {
      if (filters[k])
        list.push({
          label: ({
            pets: "Pet-friendly",
            parking: "Parking",
            laundry: "Laundry",
            gym: "Gym",
            furnished: "Furnished",
          } as Record<string, string>)[k],
          clear: () => set({ [k]: false } as Partial<Filters>),
        });
    });
    if (filters.minPrice > 1000 || filters.maxPrice < 5000)
      list.push({
        label: `$${filters.minPrice.toLocaleString()}–$${filters.maxPrice.toLocaleString()}`,
        clear: () => set({ minPrice: 1000, maxPrice: 5000 }),
      });
    return list;
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-6 border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search city, neighborhood, or address…"
            value={filters.q}
            onChange={(e) => set({ q: e.target.value })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-soft focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        <Dropdown
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Neighborhood"
          value={filters.neighborhood}
        >
          <div className="grid max-h-72 w-72 grid-cols-2 gap-1 overflow-y-auto p-2 scrollbar-clean">
            {neighborhoods.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set({ neighborhood: filters.neighborhood === n ? null : n })}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-left text-xs font-medium transition",
                  filters.neighborhood === n
                    ? "bg-brand-gradient-soft text-brand-blue"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          icon={<DollarSign className="h-3.5 w-3.5" />}
          label="Price"
          value={
            filters.minPrice > 1000 || filters.maxPrice < 5000
              ? `$${filters.minPrice}–$${filters.maxPrice}`
              : null
          }
        >
          <div className="w-72 space-y-3 p-3">
            <PriceRow
              label="Min"
              value={filters.minPrice}
              onChange={(v) => set({ minPrice: Math.min(v, filters.maxPrice - 100) })}
              min={1000}
              max={5000}
            />
            <PriceRow
              label="Max"
              value={filters.maxPrice}
              onChange={(v) => set({ maxPrice: Math.max(v, filters.minPrice + 100) })}
              min={1000}
              max={5000}
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>${filters.minPrice}/mo</span>
              <span>${filters.maxPrice}/mo</span>
            </div>
          </div>
        </Dropdown>

        <Dropdown
          icon={<BedDouble className="h-3.5 w-3.5" />}
          label="Beds"
          value={filters.beds === null ? null : filters.beds === 0 ? "Studio" : `${filters.beds}+`}
        >
          <div className="flex w-72 flex-wrap gap-1.5 p-3">
            {[
              { v: null, l: "Any" },
              { v: 0, l: "Studio" },
              { v: 1, l: "1+" },
              { v: 2, l: "2+" },
              { v: 3, l: "3+" },
              { v: 4, l: "4+" },
            ].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                onClick={() => set({ beds: o.v as Filters["beds"] })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                  filters.beds === o.v
                    ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                )}
              >
                {o.l}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          icon={<Bath className="h-3.5 w-3.5" />}
          label="Baths"
          value={filters.baths === null ? null : `${filters.baths}+`}
        >
          <div className="flex w-72 flex-wrap gap-1.5 p-3">
            {[
              { v: null, l: "Any" },
              { v: 1, l: "1+" },
              { v: 2, l: "2+" },
              { v: 3, l: "3+" },
            ].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                onClick={() => set({ baths: o.v as Filters["baths"] })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                  filters.baths === o.v
                    ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                )}
              >
                {o.l}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          icon={<Building2 className="h-3.5 w-3.5" />}
          label="Type"
          value={filters.type}
        >
          <div className="flex w-72 flex-wrap gap-1.5 p-3">
            {propertyTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set({ type: filters.type === t ? null : t })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                  filters.type === t
                    ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Dropdown>

        <button
          type="button"
          onClick={() => setOpenMore(true)}
          className="inline-flex h-11 items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-soft hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          More filters
        </button>

        <div className="ml-auto flex items-center gap-2">
          <SortMenu value={filters.sort} onChange={(v) => set({ sort: v })} />
        </div>
      </div>

      {/* Active chips */}
      {active.length > 0 ? (
        <div className="mx-auto mt-2 flex w-full max-w-7xl flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {resultCount} results
          </span>
          {active.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={a.clear}
              className="inline-flex items-center gap-1 rounded-full bg-brand-gradient-soft px-2.5 py-1 text-[11px] font-semibold text-brand-blue ring-1 ring-brand-blue/15 hover:bg-white"
            >
              {a.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            className="text-[11px] font-semibold text-slate-500 underline hover:text-brand-ink"
          >
            Clear all
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-2 w-full max-w-7xl text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {resultCount} homes available
        </div>
      )}

      <MoreFiltersDrawer
        open={openMore}
        onClose={() => setOpenMore(false)}
        filters={filters}
        onChange={onChange}
      />
    </div>
  );
}

function Dropdown({
  icon,
  label,
  value,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const active = !!value;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-2xl border px-3 text-xs font-semibold shadow-soft transition",
          active
            ? "border-brand-blue/30 bg-brand-gradient-soft text-brand-blue"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        )}
      >
        {icon}
        {value || label}
      </button>
      {open ? (
        <div className="absolute left-0 top-12 z-30 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-glow animate-fadeIn dark:border-slate-700 dark:bg-slate-900">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PriceRow({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        <span>{label}</span>
        <span className="text-brand-ink">${value.toLocaleString()}/mo</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={50}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-brand-blue"
      />
    </div>
  );
}

function SortMenu({
  value,
  onChange,
}: {
  value: Filters["sort"];
  onChange: (v: Filters["sort"]) => void;
}) {
  const opts: { v: Filters["sort"]; l: string }[] = [
    { v: "rec", l: "Recommended" },
    { v: "price-asc", l: "Price: low → high" },
    { v: "price-desc", l: "Price: high → low" },
    { v: "rating", l: "Top rated" },
  ];
  return (
    <Dropdown
      icon={<ArrowDownAZ className="h-3.5 w-3.5" />}
      label="Sort"
      value={opts.find((o) => o.v === value)?.l || null}
    >
      <div className="w-56 p-1">
        {opts.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition",
              value === o.v ? "bg-brand-gradient-soft text-brand-blue" : "text-slate-700 hover:bg-slate-50"
            )}
          >
            {o.l} {value === o.v ? <Check className="h-3.5 w-3.5" /> : null}
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

function MoreFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;
  const set = (p: Partial<Filters>) => onChange({ ...filters, ...p });
  const drawer = (
    <div className="fixed inset-0 z-[60] flex" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70"
        onClick={onClose}
      />
      <div className="relative ml-auto h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl animate-slideInRight scrollbar-clean dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">More filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <Section icon={<CalendarDays className="h-4 w-4" />} title="Move-in & lease">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Move in by
            </span>
            <input
              type="date"
              value={filters.moveInBy}
              onChange={(e) => set({ moveInBy: e.target.value })}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Lease length
            </div>
            <div className="flex gap-1.5">
              {[
                { v: "any", l: "Any" },
                { v: "month", l: "Month-to-month" },
                { v: "6mo", l: "6 months" },
                { v: "12mo", l: "12 months" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => set({ lease: o.v as Filters["lease"] })}
                  className={cn(
                    "flex-1 rounded-xl border px-2 py-2 text-xs font-semibold transition",
                    filters.lease === o.v
                      ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={<FilterIcon className="h-4 w-4" />} title="Amenities">
          <div className="grid grid-cols-2 gap-2">
            <Toggle
              icon={<PawPrint className="h-3.5 w-3.5" />}
              label="Pet-friendly"
              on={filters.pets}
              onChange={(v) => set({ pets: v })}
            />
            <Toggle
              icon={<ParkingCircle className="h-3.5 w-3.5" />}
              label="Parking"
              on={filters.parking}
              onChange={(v) => set({ parking: v })}
            />
            <Toggle
              icon={<Shirt className="h-3.5 w-3.5" />}
              label="In-suite laundry"
              on={filters.laundry}
              onChange={(v) => set({ laundry: v })}
            />
            <Toggle
              icon={<FilterIcon className="h-3.5 w-3.5" />}
              label="Gym"
              on={filters.gym}
              onChange={(v) => set({ gym: v })}
            />
            <Toggle
              icon={<Sofa className="h-3.5 w-3.5" />}
              label="Furnished"
              on={filters.furnished}
              onChange={(v) => set({ furnished: v })}
            />
          </div>
        </Section>

        <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            className="text-xs font-semibold text-slate-500 underline dark:text-slate-400"
          >
            Reset all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(drawer, document.body);
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 space-y-3">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  icon,
  label,
  on,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition",
        on
          ? "border-brand-blue bg-brand-gradient-soft text-brand-blue"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md ring-1",
          on
            ? "bg-white text-brand-blue ring-brand-blue/15"
            : "bg-slate-50 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
