import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/shell/Sidebar";
import { Navbar } from "@/components/shell/Navbar";
import {
  ThemeProvider,
  themeBootScript,
} from "@/components/shell/ThemeProvider";
import { CommandPaletteProvider } from "@/components/shell/CommandPalette";
import { PageActionsProvider } from "@/components/shell/PageActions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LeazeSure — Tenant Portal",
  description:
    "Your verified rental identity. Apply faster, pay rent, and build credit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen font-sans text-brand-ink antialiased dark:text-slate-100">
        <ThemeProvider>
          <PageActionsProvider>
            <CommandPaletteProvider>
              <div className="app-surface flex min-h-screen">
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Navbar />
                  <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10 2xl:px-12">
                    <div className="mx-auto w-full max-w-screen-2xl">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </CommandPaletteProvider>
          </PageActionsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
