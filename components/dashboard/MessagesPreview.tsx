import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { conversations } from "@/lib/mock";
import { cn } from "@/lib/cn";

export function MessagesPreview() {
  return (
    <Card>
      <CardHeader
        title="Messages"
        description="BlackBox keeps every landlord conversation secure."
        action={
          <Link
            href="/messages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue"
          >
            Open <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <CardBody className="px-0 py-2">
        <ul className="divide-y divide-slate-100">
          {conversations.map((c) => (
            <li
              key={c.id}
              className="flex cursor-pointer items-start gap-3 px-6 py-3 transition hover:bg-slate-50/60"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                {c.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-semibold">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{c.time}</div>
                </div>
                <div className="truncate text-[11px] text-slate-500">
                  {c.role}
                </div>
                <div
                  className={cn(
                    "mt-0.5 truncate text-xs",
                    c.unread > 0 ? "font-semibold text-brand-ink" : "text-slate-500"
                  )}
                >
                  {c.last}
                </div>
              </div>
              {c.unread > 0 ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gradient px-1.5 text-[10px] font-bold text-white">
                  {c.unread}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
