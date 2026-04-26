"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Maximize2,
  MapPin,
  ParkingCircle,
  PawPrint,
  Share2,
  ShieldCheck,
  Shirt,
  Sofa,
  Sparkles,
  Star,
  Wifi,
} from "lucide-react";
import { findProperty, properties } from "@/lib/properties";
import { HeartButton } from "@/components/property/HeartButton";
import { ApplyModal } from "@/components/property/ApplyModal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Rail } from "@/components/ui/Rail";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const amenityIcon: Record<string, React.ReactNode> = {
  "Pet-friendly": <PawPrint className="h-4 w-4" />,
  Parking: <ParkingCircle className="h-4 w-4" />,
  "Parking (2)": <ParkingCircle className="h-4 w-4" />,
  "Valet parking": <ParkingCircle className="h-4 w-4" />,
  "In-suite laundry": <Shirt className="h-4 w-4" />,
  "Laundry on floor": <Shirt className="h-4 w-4" />,
  Laundry: <Shirt className="h-4 w-4" />,
  Furnished: <Sofa className="h-4 w-4" />,
  Wifi: <Wifi className="h-4 w-4" />,
};

export default function PropertyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const property = findProperty(id);
  if (!property) notFound();

  const [applyOpen, setApplyOpen] = useState(false);

  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.neighborhood === property.neighborhood ||
          p.type === property.type)
    )
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discover
      </Link>

      {/* Title row */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {property.highlight ? (
              <span className="rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                {property.highlight}
              </span>
            ) : null}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700">
              {property.type}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
              {property.rating} · {property.reviews} reviews
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
            {property.title}
          </h1>
          <div className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {property.neighborhood} · {property.city}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <HeartButton />
        </div>
      </header>

      {/* Gallery */}
      <section className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.images[0]}
          alt=""
          className="col-span-4 row-span-2 h-[480px] w-full object-cover sm:col-span-2"
        />
        {[1, 2, 3, 4].map((i) => (
          <img
            // eslint-disable-next-line @next/next/no-img-element
            key={i}
            src={property.images[i] || property.images[0]}
            alt=""
            className={cn(
              "hidden h-full w-full object-cover sm:block",
              "h-[236px]"
            )}
          />
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left column */}
        <div className="space-y-8">
          {/* Host strip */}
          <section className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.host.avatar}
                alt=""
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  Hosted by {property.host.name}
                  {property.host.verified ? (
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  ) : null}
                </div>
                <div className="text-xs text-slate-500">
                  Verified landlord · On LeazeSure since {property.host.since}
                </div>
              </div>
            </div>
            <Link
              href="/messages"
              className="hidden text-xs font-semibold text-brand-blue hover:underline sm:inline"
            >
              Message host →
            </Link>
          </section>

          {/* Specs */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec icon={<BedDouble className="h-4 w-4" />} label="Bedrooms" value={property.beds === 0 ? "Studio" : property.beds} />
            <Spec icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={property.baths} />
            <Spec icon={<Maximize2 className="h-4 w-4" />} label="Square feet" value={property.sqft.toLocaleString()} />
            <Spec icon={<CalendarDays className="h-4 w-4" />} label="Available" value={new Date(property.available).toLocaleDateString("en-CA", { month: "short", day: "numeric" })} />
          </section>

          {/* About */}
          <section>
            <h2 className="text-lg font-bold tracking-tight">About this home</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {property.description}
            </p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-lg font-bold tracking-tight">What this home offers</h2>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {property.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-3.5 py-2.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15">
                    {amenityIcon[a] || <CheckCircle2 className="h-4 w-4" />}
                  </span>
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Lease */}
          <section className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-bold tracking-tight">Lease terms</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <Term label="Lease length" value={property.leaseLengths.map((l) => l === "month" ? "Monthly" : l === "6mo" ? "6 mo" : "12 mo").join(", ")} />
              <Term label="Move-in" value={new Date(property.available).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })} />
              <Term label="Deposit" value="1 month rent" />
              <Term label="Utilities" value={property.amenities.find((a) => a.toLowerCase().includes("heat")) ? "Heat included" : "Tenant pays" } />
            </div>
          </section>
        </div>

        {/* Sticky apply card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft">
            <div className="border-b border-slate-100 bg-brand-gradient-soft p-5">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-3xl font-extrabold tracking-tight">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="ml-1 text-sm font-medium text-slate-500">
                    /month
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-200">
                  <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                  {property.rating}
                </div>
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Available {new Date(property.available).toLocaleDateString("en-CA", { month: "long", day: "numeric" })}
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="rounded-xl border border-slate-200/70 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Apply with your Tenant Passport
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Verified income, ID, references, and Equifax-reported rent
                  history — sent in one click.
                </p>
              </div>

              <Button
                className="w-full !h-12"
                onClick={() => setApplyOpen(true)}
              >
                <Sparkles className="h-4 w-4" />
                Apply with Passport
              </Button>
              <Link
                href="/messages"
                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Message host first
              </Link>

              <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 ring-1 ring-emerald-200">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Free to apply · No commitment
                </div>
                <p className="mt-1">
                  Your verified Passport is shared securely. Sensitive
                  documents only unlock after the landlord makes an offer.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <Mini label="Beds" value={property.beds === 0 ? "Studio" : property.beds} />
                <Mini label="Baths" value={property.baths} />
                <Mini label="Sq ft" value={property.sqft.toLocaleString()} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 ? (
        <Rail title="More homes you might like" href="/discover">
          {similar.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </Rail>
      ) : null}

      <ApplyModal
        property={property}
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
      />
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15">
        {icon}
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </div>
        <div className="text-base font-bold leading-tight">{value}</div>
      </div>
    </div>
  );
}

function Term({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-sm font-semibold text-brand-ink">{value}</div>
    </div>
  );
}

function Mini({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}
