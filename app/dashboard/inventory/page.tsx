"use client";
import { useSuppliers } from "@/app/hooks/useSuppliers";
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
import { exportTable } from "@/lib/helper";
import { createClient } from "@/utils/supabase/client";
import { File, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PaginationControls } from "../_components/PaginationControls";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useInventory } from "@/app/hooks/useInventory";
import InventoryLoading from "./_components/InventoryLoading";
import { AddInventoryV2 } from "./_components/AddInventoryV2";
import { InventoryTable } from "./_components/InventoryTable";

function Inventory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { items, getItems } = useInventory();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    getItems();
    const subscribeChannel = supabase
      .channel("all-inventory-changes-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        (payload: any) => {
          getItems();
        }
      )
      .subscribe();
    setLoading(false)
    return () => {
      supabase.removeChannel(subscribeChannel);
    };
  }, [supabase, router]);
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const paginatedData = items.slice(start, end);

  return !items.length && loading ? (
    <InventoryLoading />
  ) : (
    <div>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-[32px] font-bold ">Inventory</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/inventory">Inventory</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
            onClick={() => exportTable(items, "Inventory", "InventoryExport")}
          >
            Export
          </Button>
          <AddInventoryV2 />
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <InventoryTable
          items={paginatedData}
          page={page}
          per_page={per_page}
          total_record={items.length}
        />
        <CardFooter>
          <PaginationControls
            totalData={items.length}
            hasNext={end < items.length}
            customPerPage={10}
            hasPrev={start > 0}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Inventory;
