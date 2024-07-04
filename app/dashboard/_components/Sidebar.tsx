"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AtSign,
  Bell,
  BellOff,
  Cog,
  Home,
  LineChart,
  Package,
  Package2,
  ScrollText,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/app/hooks/useNotifications";
import { formatDate } from "@/lib/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Sidebar() {
  const pathname = usePathname();
  const { notifications, getNotifications } = useNotifications();

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="hidden md:block bg-midnight text-white">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Image
            src={"/logo.svg"}
            width="150"
            height="150"
            alt="logo"
            priority
          ></Image>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="gooeyLeft"
                size="icon"
                className="ml-auto h-8 w-8 relative"
              >
                <Bell className="h-4 w-4 text-gold" />
                <span className="sr-only">Toggle notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              
            </PopoverTrigger>
            <PopoverContent side="right" className="w-[500px] h-[500px] mt-3">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Your notifications will pop up here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1 p-1.5 h-[350px] overflow-auto no-scrollbar">
                  {notifications.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4 rounded-md p-2 hover:bg-zinc-400/80 hover:text-text-darknight transition-all ">
                      
                      <span className={`flex h-4 w-4 rounded-full bg-sky-500 ${item.is_read ? 'hidden':''}`} />
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.data.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.data.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.created_at,'YYYY-MM-DD',true)}
                          </p>
                        </div>
                        <div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                pathname == "/dashboard" ? "bg-cloud text-black font-bold" : ""
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
              <ScrollText className="h-4 w-4" />
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
              href="/dashboard/inventory"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${
                pathname.includes("inventory")
                  ? "bg-cloud text-black font-bold"
                  : ""
              }`}
            >
              <Warehouse className="h-4 w-4" />
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
        </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
