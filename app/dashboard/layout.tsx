import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utils/supabase/server";
import {
  Check,
  CircleAlert,
  CircleEllipsis,
  CircleX,
  TriangleAlert,
} from "lucide-react";

import { redirect } from "next/navigation";

import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

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
      <main className="flex flex-1 flex-col ">
        <Header />

        <div className="p-4 sm:px-6 sm:py-0 bg-cloud dark:bg-darknight h-full max-h-full mb-3">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            unstyled: false,
            classNames: {
              error: 'bg-rose-500 text-cloud',
              success: 'bg-emerald-500 text-cloud',
              warning: 'bg-amber-400 text-cloud',
              info: 'bg-sky-400 text-cloud',
            },
          }}
          icons={{
            success: <Check />,
            info: <CircleAlert />,
            warning: <TriangleAlert />,
            error: <CircleX />,
            loading: <CircleEllipsis />,
          }}
        />
      </main>
    </div>
  );
}
