import { HeroPassport } from "@/components/dashboard/HeroPassport";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RentReportingCard } from "@/components/dashboard/RentReportingCard";
import { ApplicationsCard } from "@/components/dashboard/ApplicationsCard";
import { MessagesPreview } from "@/components/dashboard/MessagesPreview";
import { SearchHero } from "@/components/dashboard/SearchHero";
import { Rail } from "@/components/ui/Rail";
import { PropertyCard } from "@/components/property/PropertyCard";
import { dashboardRails } from "@/lib/properties";

export default function DashboardHome() {
  return (
    <div className="space-y-10">
      {/* 1. Verified Tenant Passport */}
      <HeroPassport />

      {/* 2. Quick stats — Applications Sent, Active Lease, etc. */}
      <QuickStats />

      {/* 3. Rent Reporting + Messages */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RentReportingCard />
        </div>
        <MessagesPreview />
      </div>

      {/* 4. Applications */}
      <ApplicationsCard />

      {/* 5. Property discovery — moved to bottom */}
      <SearchHero />

      {dashboardRails.map((r) =>
        r.items.length > 0 ? (
          <Rail
            key={r.name}
            title={r.name}
            href="/discover"
            subtitle={subtitleFor(r.name)}
          >
            {r.items.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </Rail>
        ) : null
      )}
    </div>
  );
}

function subtitleFor(name: string) {
  const map: Record<string, string> = {
    "Recommended for you": "Matched to your Passport, score, and budget.",
    "Move-in ready May 1": "Apply today, move in next month.",
    "Pet-friendly homes": "Hand-picked spots that welcome your roommate.",
    "Newly listed": "Fresh listings from verified landlords.",
  };
  return map[name];
}
