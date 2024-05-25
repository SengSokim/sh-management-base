"use client";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import SuccessAlert from "@/components/SuccessAlert";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { File, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AddSupplierV2 } from "./_components/AddSupplierV2";
import { SupplierTable } from "./_components/SupplierTable";

function page() {
  const { suppliers, getSuppliers } = useSuppliers();
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    getSuppliers();
    const subscribeChannel = supabase
      .channel("all-suppliers-changes-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "suppliers" },
        (payload: any) => {
          getSuppliers();
          setShowToast(true);

          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribeChannel);
    };
  }, [supabase, router]);
 
  return (
    <div>
      {showToast && <SuccessAlert />}
      <title>Suppliers</title>
      <div className="">
        <div className="flex items-center gap-2 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <AddSupplierV2 />
        </div>
      </div>
      <SupplierTable suppliers={suppliers} />
    </div>
  );
}

export default page;