"use client";

import { useState } from "react";
import {
  Lock,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Smile,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { conversations } from "@/lib/mock";
import { cn } from "@/lib/cn";

type Msg = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

const seed: Record<string, Msg[]> = {
  c1: [
    { id: "m1", from: "them", text: "Hi Aiden — your application looks great.", time: "10:14" },
    { id: "m2", from: "them", text: "We've drafted the lease. Move-in date?", time: "10:14" },
    { id: "m3", from: "me", text: "Thanks Mira! Aiming for May 1.", time: "10:21" },
    { id: "m4", from: "them", text: "Perfect. I'll send the e-sign link tonight.", time: "10:24" },
    { id: "m5", from: "them", text: "Lease draft is ready — let me know your move-in date.", time: "Just now" },
  ],
  c2: [
    { id: "m1", from: "them", text: "We received your application and references.", time: "Yesterday" },
  ],
  c3: [
    { id: "m1", from: "them", text: "Are pets considered? She is hypoallergenic.", time: "Yesterday" },
  ],
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const active = conversations.find((c) => c.id === activeId)!;
  const messages = seed[activeId] || [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="BlackBox · Encrypted"
        title="Messages"
        description="Secure conversations with landlords, tied to each application."
      />

      <Card className="overflow-hidden">
        <div className="grid grid-rows-[auto_1fr] lg:h-[640px] lg:grid-cols-[320px_1fr] lg:grid-rows-1">
          <aside className="flex max-h-[280px] flex-col border-b border-slate-100 dark:border-slate-800 lg:max-h-none lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-100 p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search conversations…"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-sm focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-clean">
              <ul className="divide-y divide-slate-100">
                {conversations.map((c) => {
                  const isActive = c.id === activeId;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(c.id)}
                        className={cn(
                          "flex w-full items-start gap-3 p-3.5 text-left transition",
                          isActive
                            ? "bg-brand-gradient-soft"
                            : "hover:bg-slate-50/60"
                        )}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {c.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="truncate text-sm font-semibold">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {c.time}
                            </div>
                          </div>
                          <div className="truncate text-[11px] text-slate-500">
                            {c.role}
                          </div>
                          <div
                            className={cn(
                              "mt-0.5 truncate text-xs",
                              c.unread > 0
                                ? "font-semibold text-brand-ink"
                                : "text-slate-500"
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
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <section className="flex min-h-[460px] min-w-0 flex-col lg:min-h-0">
            <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5 dark:border-slate-800">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white sm:h-10 sm:w-10">
                  {active.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {active.name}
                  </div>
                  <div className="truncate text-[11px] text-slate-500">
                    {active.role}
                  </div>
                </div>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 sm:inline-flex">
                <ShieldCheck className="h-3 w-3" /> Verified landlord
              </span>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50/40 to-white p-4 scrollbar-clean sm:p-5 dark:from-slate-900/40 dark:to-slate-950">
              <DateDivider label="Today" />
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
            </div>

            <footer className="border-t border-slate-100 p-2.5 sm:p-3 dark:border-slate-800">
              <div className="flex items-end gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 sm:gap-2 sm:p-2 dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  aria-label="Attach"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  placeholder="Write a message…"
                  className="h-9 min-w-0 flex-1 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 sm:flex dark:hover:bg-slate-800"
                  aria-label="Emoji"
                >
                  <Smile className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-brand-gradient px-3 text-xs font-semibold text-white shadow-glow"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 px-1 text-[11px] text-slate-500">
                <Lock className="h-3 w-3" /> Messages are encrypted by BlackBox.
              </div>
            </footer>
          </section>
        </div>
      </Card>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const me = msg.from === "me";
  return (
    <div className={cn("flex w-full", me ? "justify-end" : "justify-start")}>
      <div className="max-w-[80%]">
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-snug shadow-soft",
            me
              ? "bg-brand-gradient text-white"
              : "bg-white text-brand-ink ring-1 ring-slate-200"
          )}
        >
          {msg.text}
        </div>
        <div
          className={cn(
            "mt-1 text-[10px]",
            me ? "text-right text-slate-400" : "text-slate-400"
          )}
        >
          {msg.time}
        </div>
      </div>
    </div>
  );
}

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
