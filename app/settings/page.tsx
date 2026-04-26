import { Bell, Lock, ShieldCheck, TrendingUp, UserRound } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { PageHeader } from "@/components/ui/PageHeader";
import { tenant } from "@/lib/mock";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your profile, privacy, and what we share with landlords."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav className="sticky top-24 self-start rounded-2xl border border-slate-200/70 bg-white p-2 shadow-soft">
          {[
            { icon: UserRound, label: "Profile", active: true },
            { icon: Bell, label: "Notifications" },
            { icon: Lock, label: "Privacy & Consent" },
            { icon: TrendingUp, label: "Rent Reporting" },
            { icon: ShieldCheck, label: "Security" },
          ].map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-brand-gradient-soft font-semibold text-brand-blue"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Profile" description="This shows up on every application you submit." />
            <CardBody className="grid gap-4 md:grid-cols-2">
              <Field label="First name" defaultValue={tenant.firstName} />
              <Field label="Last name" defaultValue={tenant.lastName} />
              <Field label="Email" defaultValue={tenant.email} type="email" />
              <Field label="Phone" defaultValue={tenant.phone} />
              <Field label="City" defaultValue={tenant.city} className="md:col-span-2" />
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Notifications" description="Choose what we ping you about." />
            <CardBody className="space-y-4">
              <Toggle
                label="Application updates"
                description="When a landlord views, replies, or makes a decision."
              />
              <Toggle
                label="Rent reminders"
                description="3 days before each rent due date."
              />
              <Toggle
                label="Credit & reporting"
                description="When a payment is reported to Equifax."
              />
              <Toggle
                defaultChecked={false}
                label="Marketing & news"
                description="Occasional updates about new LeazeSure features."
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Privacy & Consent" description="You're in control of who sees your verified data." />
            <CardBody className="space-y-4">
              <Toggle
                label="Share verified Tenant Score"
                description="Required for instant approvals on partner listings."
              />
              <Toggle
                label="Share income range"
                description="Sent as a band (e.g. $5K–$7K), not the exact figure."
              />
              <Toggle
                defaultChecked={false}
                label="Allow third-party screening"
                description="Lets landlords run external screening when needed."
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Rent Reporting" description="Build credit with every rent payment." />
            <CardBody className="space-y-4">
              <Toggle
                label="Enable rent reporting"
                description="Reports on-time payments to Equifax monthly."
              />
              <Toggle
                label="Backreport eligible payments"
                description="Include up to 24 months of prior on-time payments."
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
  className,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
      />
    </label>
  );
}
