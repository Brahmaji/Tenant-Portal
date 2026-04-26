"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { NotificationsMenu } from "./NotificationsMenu";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPaletteTrigger } from "./CommandPalette";
import { CreditChip } from "./CreditChip";
import { PageActionsSlot } from "./PageActions";
import { MobileSidebarTrigger } from "./MobileSidebar";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex h-14 w-full items-center gap-1.5 px-3 sm:gap-2 sm:px-6 lg:px-8">
        <MobileSidebarTrigger />

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 lg:hidden"
          aria-label="LeazeSure home"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-glow">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.4} />
          </div>
          <span className="hidden text-sm font-bold sm:inline">
            Leaze<span className="text-gradient">Sure</span>
          </span>
        </Link>

        <div className="hidden flex-1 sm:block lg:max-w-md">
          <CommandPaletteTrigger />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <PageActionsSlot />

          <CreditChip />

          <CommandPaletteTrigger variant="icon" className="sm:hidden" />
          <ThemeToggle />
          <NotificationsMenu />
          <span
            aria-hidden
            className="mx-0.5 hidden h-6 w-px bg-slate-200/80 sm:block dark:bg-slate-800"
          />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
