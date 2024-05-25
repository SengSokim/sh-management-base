import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SH Dashboard",
  description: "System management dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const supabase = createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">

        <Sidebar />
        <main className="flex flex-1 flex-col lg:gap-6 ">
           
            <Header />
            <div className="lg:p-6 p-4 dark:bg-zinc-800">
                {children}
            </div>
            
        </main>
    </div>
  );
}
