"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Home, User, Palette, Bell, Lock, Globe, Monitor, UserCog } from 'lucide-react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const menuItems = [
    { label: 'General', icon: Home, path:'/dashboard/settings/general' },
    { label: 'Profile', icon: User, path:'/dashboard/settings/profile' },
    { label: 'Theme', icon: Palette, path:'/dashboard/settings/theme' },
    { label: 'Notifications', icon: Bell, path:'/dashboard/settings/notifications' },
    { label: 'Privacy', icon: Lock, path:'/dashboard/settings/privacy' },
    { label: 'Language', icon: Globe, path:'/dashboard/settings/language' },
    { label: 'Display', icon: Monitor, path:'/dashboard/settings/display' },
    { label: 'Account', icon: UserCog, path:'/dashboard/settings/account' },
  ];
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-5">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground bg-platinum text-darknight p-3 h-full rounded-md"
          x-chunk="dashboard-04-chunk-0"
        >
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
              href={item.path}
              className={`${
                pathname.includes(item.path) ? "font-bold " : ""
              }`}
              key={index}
            >
              <li className="flex items-center space-x-2 text-gray-700 hover:bg-gray-300 p-2 rounded">
                <item.icon size={20} />
                <span>{item.label}</span>
              </li>
            </Link>
              
            ))}
          </ul>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}
