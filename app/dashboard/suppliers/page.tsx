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
import { useUser } from "@/context/UserContext";
import { exportTable } from "@/lib/helper";
import { createClient } from "@/utils/supabase/client";
import { File, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PaginationControls } from "../_components/PaginationControls";
import { AddSupplierV2 } from "./_components/AddSupplierV2";
import SupplierLoading from "./_components/SupplierLoading";
import { SupplierTable } from "./_components/SupplierTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Suppliers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { suppliers, getSuppliers } = useSuppliers();
  const [loading, setLoading] = useState(true);
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

  const paginatedData = suppliers.slice(start, end);

  return !suppliers.length && loading ? (
    <SupplierLoading />
  ) : (
    <div>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-[32px] font-bold ">Suppliers</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/suppliers">Suppliers</BreadcrumbLink>
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
            onClick={() => exportTable(suppliers, "Supplier", "SupplierExport")}
          >
            Export
          </Button>
          <AddSupplierV2 />
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <SupplierTable
          suppliers={paginatedData}
          page={page}
          per_page={per_page}
          total_record={suppliers.length}
        />
        <CardFooter>
          <PaginationControls
            totalData={suppliers.length}
            hasNext={end < suppliers.length}
            customPerPage={10}
            hasPrev={start > 0}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Suppliers;
