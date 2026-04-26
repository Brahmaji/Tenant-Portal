"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  Contact,
  CreditCard,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { notifications as seed, type Notification } from "@/lib/mock";
import { cn } from "@/lib/cn";

const iconFor = {
  application: FileText,
  message: MessageSquare,
  payment: CreditCard,
  passport: Contact,
  system: Sparkles,
} as const;

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(seed);
  const wrapRef = useRef<HTMLDivElement>(null);

  const unreadCount = useMemo(
    () => items.filter((n) => n.unread).length,
    [items]
  );

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
          unreadCount > 0
            ? "border-brand-blue/20 bg-brand-gradient-soft text-brand-blue hover:border-brand-blue/40 dark:border-cyan-400/20 dark:text-cyan-300 dark:hover:border-cyan-400/40"
            : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
        )}
      >
        <Bell
          className="h-[18px] w-[18px]"
          strokeWidth={unreadCount > 0 ? 2.2 : 1.9}
        />
        {unreadCount > 0 ? (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-rose-500 p-1 text-[10px] font-bold leading-none text-white shadow-[0_2px_6px_-1px_rgba(244,63,94,0.6)] ring-2 ring-white dark:ring-slate-950"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-12 z-40 w-[360px] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-glow animate-fadeIn dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold tracking-tight">
                Notifications
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "You're all caught up."}
              </div>
            </div>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-brand-blue transition hover:bg-brand-gradient-soft disabled:opacity-40"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          </div>

          <ul className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto scrollbar-clean dark:divide-slate-800">
            {items.map((n) => {
              const Icon = iconFor[n.kind];
              return (
                <li key={n.id}>
                  <Link
                    href={n.href || "#"}
                    onClick={() => {
                      markRead(n.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex gap-3 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/60",
                      n.unread && "bg-brand-gradient-soft/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                        n.unread
                          ? "bg-brand-gradient-soft text-brand-blue ring-brand-blue/20"
                          : "bg-slate-50 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold leading-tight">
                          {n.title}
                        </div>
                        {n.unread ? (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-gradient" />
                        ) : null}
                      </div>
                      <div className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
                        {n.body}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {n.time}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-slate-100 px-4 py-2.5 text-center dark:border-slate-800">
            <Link
              href="/messages"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold text-brand-blue hover:underline"
            >
              View all activity →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
