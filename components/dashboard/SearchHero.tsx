import Link from "next/link";
import { ArrowRight, MapPin, Search, Sparkles } from "lucide-react";

const chips = [
  "King West",
  "Liberty Village",
  "The Annex",
  "Yorkville",
  "Leslieville",
  "Distillery District",
  "The Beaches",
];

export function SearchHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft sm:p-6">
      <div className="pointer-events-none absolute -right-32 -top-24 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue ring-1 ring-brand-blue/15">
            <Sparkles className="h-3 w-3" />
            Discover
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Find your next home
          </h2>
          <p className="text-sm text-slate-500">
            Verified listings · One-click apply with your Passport
          </p>
        </div>
        <Link
          href="/discover"
          className="hidden items-center gap-1 text-xs font-semibold text-brand-blue hover:gap-1.5 sm:inline-flex"
        >
          Explore all listings <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <form
        className="relative mt-4 flex flex-wrap items-stretch gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-soft"
        action="/discover"
      >
        <div className="flex flex-1 items-center gap-2 px-3">
          <MapPin className="h-4 w-4 text-brand-blue" />
          <input
            name="q"
            placeholder="Where to next? Try 'King West' or 'Pet-friendly'"
            className="h-11 w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-brand-gradient px-4 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      <div className="relative mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Popular
        </span>
        {chips.map((c) => (
          <Link
            key={c}
            href={`/discover?n=${encodeURIComponent(c)}`}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-blue/30 hover:text-brand-blue"
          >
            {c}
          </Link>
        ))}
      </div>
    </section>
  );
}
