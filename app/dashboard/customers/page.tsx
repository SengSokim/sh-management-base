"use client";
import { useCustomers } from "@/app/hooks/useCustomers";
import SuccessAlert from "@/components/SuccessAlert";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { File, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { PaginationControls } from "../_components/PaginationControls";
import { AddCustomerV2 } from "./_components/AddCustomerV2";
import { CustomerTable } from "./_components/CustomerTable";

function Customers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { customers, getCustomers } = useCustomers();
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    getCustomers();
    const subscribeChannel = supabase
      .channel("all-clients-changes-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        (payload: any) => {
          getCustomers();
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
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const paginatedData = customers.slice(start, end);
  return (
    <div className="flex flex-col">
      {showToast && <SuccessAlert />}
      <title>Customers</title>
      <h1 className="text-[32px] font-bold">Customers</h1>
      <div className="">
        <div className="flex items-center gap-2 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="expandIcon"
                Icon={ListFilter}
                iconPlacement="left"
              >
                Filter
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
          <Button
            variant="expandIcon"
            Icon={File}
            iconPlacement="left"
            className=""
          >
            Export
          </Button>
          <AddCustomerV2 />
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CustomerTable
          customers={paginatedData}
          page={page}
          per_page={per_page}
        />
        <CardFooter>
          <PaginationControls
            totalData={customers.length}
            hasNext={end < customers.length}
            customPerPage={10}
            hasPrev={start > 0}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Customers;
