"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  CircleUser,
  Cog,
  Home,
  LineChart,
  LoaderCircle,
  Menu,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login page after sign out
  };

  if (loading) {
    return (
      <div className="flex h-14 items-center gap-4 dark:bg-darknight px-4 lg:h-[60px] lg:px-6">
        <LoaderCircle className="text-darknight dark:text-cloud animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-cloud dark:bg-darknight">
      <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ringHover"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col flex-1 w-64 bg-darknight lg:max-w-screen-lg overflow-y-scroll max-h-screen"
          >
            <Image
              src={"/logo.svg"}
              width="150"
              height="150"
              alt="logo"
              priority
            ></Image>

            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                  pathname == "/dashboard"
                    ? "bg-cloud text-black font-bold"
                    : ""
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/dashboard/invoices"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                  pathname.includes("invoices")
                    ? "bg-cloud text-black font-bold"
                    : ""
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Invoices
              </Link>
              <Link
                href="/dashboard/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                  pathname.includes("customers")
                    ? "bg-cloud text-black font-bold"
                    : ""
                }`}
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="/dashboard/suppliers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                  pathname.includes("suppliers")
                    ? "bg-cloud text-black font-bold"
                    : ""
                }`}
              >
                <Truck className="h-4 w-4" />
                Suppliers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue"
              >
                <LineChart className="h-4 w-4" />
                Inventory
              </Link>
              <Link
                href="/dashboard/settings/general"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                  pathname.includes("settings")
                    ? "bg-cloud text-black font-bold"
                    : ""
                }`}
              >
                <Cog className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-8 w-8" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}

export default Header;
