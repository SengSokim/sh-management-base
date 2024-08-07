import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { capitalize } from "@/lib/helper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const headerList = headers();
  const pathname = headerList.get("x-current-path")?.split("/")[2];

  return {
    title: pathname ? capitalize(pathname) : 'Dashboard',
    description: "management dashboard",
    metadataBase: new URL(defaultUrl),
    manifest: '/manifest.json',
  };
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/fav-icon.svg" sizes="any" />
      </head>

      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
