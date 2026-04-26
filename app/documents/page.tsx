import {
  Eye,
  File,
  FileText,
  FolderLock,
  Receipt,
  ShieldCheck,
  Upload,
  UserCircle2,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { documents } from "@/lib/mock";

const categories = [
  { key: "ID", label: "Identification", icon: UserCircle2, count: 1 },
  { key: "Income", label: "Pay stubs & income", icon: Receipt, count: 3 },
  { key: "Lease", label: "Lease agreements", icon: FileText, count: 1 },
  { key: "References", label: "References", icon: ShieldCheck, count: 0 },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Secure Vault"
        title="Documents"
        description="A locked, encrypted vault for everything a landlord might ask for."
        action={
          <Button>
            <Upload className="h-4 w-4" /> Upload document
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map(({ key, label, icon: Icon, count }) => (
          <Card key={key} className="p-4 transition hover:shadow-glow">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </div>
                <div className="text-lg font-bold leading-tight">
                  {count} {count === 1 ? "file" : "files"}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Your documents"
          description="All files are encrypted at rest. Only you and chosen landlords can view them."
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <FolderLock className="h-3 w-3" /> AES-256 encrypted
            </span>
          }
        />
        <CardBody className="grid gap-3 md:grid-cols-2">
          {documents.map((d) => (
            <div
              key={d.id}
              className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-3.5 transition hover:shadow-glow"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                  <File className="h-4.5 w-4.5 text-brand-blue" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {d.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {d.type} · {d.size} · Uploaded {d.uploaded}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  tone={
                    d.status === "verified"
                      ? "success"
                      : d.status === "pending"
                      ? "warning"
                      : "danger"
                  }
                >
                  {d.status === "verified"
                    ? "Verified"
                    : d.status === "pending"
                    ? "Pending"
                    : "Missing"}
                </Badge>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition group-hover:bg-slate-50 group-hover:text-brand-blue"
                  aria-label="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="border-dashed">
        <CardBody className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-blue ring-1 ring-brand-blue/15">
            <Upload className="h-5 w-5" />
          </span>
          <div className="text-sm font-semibold">
            Drag & drop files here, or click to upload
          </div>
          <div className="text-xs text-slate-500">
            PDF, JPG, PNG · up to 10 MB each
          </div>
          <Button variant="outline" size="sm" className="mt-2">
            Choose files
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
