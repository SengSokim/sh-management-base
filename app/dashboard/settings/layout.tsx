"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-5">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="/dashboard/settings/general" className={`${
              pathname.includes("general") ? "font-bold" : ""
            }`}>
            General
          </Link>
          <Link
            href="/dashboard/settings/profile"
            className={`${
              pathname.includes("profile") ? "font-bold" : ""
            }`}
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings/theme"
            className={`${
              pathname.includes("theme") ? "font-bold" : ""
            }`}
          >
            Theme
          </Link>
          <Link href="#">Notifications</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Language</Link>
          <Link href="#">Display</Link>
          <Link href="#">Account</Link>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}
