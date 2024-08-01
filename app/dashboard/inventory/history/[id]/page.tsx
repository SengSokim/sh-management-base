"use client"
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowLeftCircle, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useInventoryHistory } from "@/app/hooks/useInventoryHistory";

const InventoryHistory = ({ params }: { params: { id: number } }) => {
  
  const {data, getItemHistory} = useInventoryHistory()

  useEffect(() => {
    getItemHistory(params.id)
  }, [])
  return (
    <div className="">
      <Link href="/dashboard/inventory">
        <ArrowLeftCircle />
      </Link>
      <div className="flex justify-between items-center mt-3">
        <h1 className="text-[32px] font-bold ">Inventory History</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/inventory`}>Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/inventory/history/${params.id}`}>Inventory history</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Inventory History</CardTitle>
          <CardDescription>
            Manage your warehouse and view the item details history. <br />
          </CardDescription>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 ">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px] "
              />
            </div>
          </header>
        </CardHeader>
        <CardContent>
         
          <Table>
            <TableHeader>
              <TableRow className="uppercase">
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity Change</TableHead>
                <TableHead>Current Quantity</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (data.map((row:any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.transaction_date}</TableCell>
                  <TableCell>{row.inventory.item_name}</TableCell>
                  <TableCell>{row.transaction_type}</TableCell>
                  <TableCell>{row.quantity_change}</TableCell>
                  <TableCell>{row.current_quantity}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              ))):(
                <TableRow>
                      <TableCell colSpan={6} className="text-center text-lg font-bold">
                        No Record history
                      </TableCell>
                    </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryHistory;
