"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { useInvoices } from "@/app/hooks/useInvoices";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { formatCurrency, formatDate } from "@/lib/helper";
import { AddInvoiceV2 } from "./_components/AddInvoiceV2";
import SuccessAlert from "@/components/SuccessAlert";
import { PaginationControls } from "../_components/PaginationControls";

function Invoices({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { invoices, getInvoices, updateStatus, deleteInvoice } = useInvoices();
  const [showToast, setShowToast] = useState(false);

  const [invoiceIndex, setInvoiceIndex] = useState(0);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    getInvoices();
    const subscribeChannel = supabase
      .channel("all-invoices-changes-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invoices" },
        (payload: any) => {
          getInvoices();
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

  const totalWeek = () => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return invoices.reduce((total: any, item: any) => {
      const paidAt = new Date(item.paid_at);

      if (
        item.status.toLowerCase() === "paid" &&
        paidAt >= firstDayOfWeek &&
        paidAt <= lastDayOfWeek
      ) {
        return total + item.grand_total;
      } else {
        return total;
      }
    }, 0);
  };

  const totalMonth = () => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    const firstDayOfMonth = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfMonth = new Date(firstDayOfMonth);
    firstDayOfMonth.setDate(1);
    lastDayOfMonth.setMonth(todayObj.getMonth() + 1, 0);

    return invoices.reduce((total: any, item: any) => {
      const paidAt = new Date(item.paid_at);

      if (
        item.status.toLowerCase() === "paid" &&
        paidAt >= firstDayOfMonth &&
        paidAt <= lastDayOfMonth
      ) {
        return total + item.grand_total;
      } else {
        return total;
      }
    }, 0);
  };

  const removeInvoice = async (id: Number) => {
    deleteInvoice(id);
  };

  const updateStatusInvoice = async (id: Number) => {
    updateStatus(id);
  };

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const paginatedData = invoices.slice(start, end);
  return (
    <div className="">
      {showToast && <SuccessAlert />}
      <title>Invoices</title>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Orders</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <AddInvoiceV2 />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatCurrency(totalWeek())}
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent> */}
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatCurrency(totalMonth())}
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent> */}
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4">
            <div className="ml-auto gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>

            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Customer</TableHead>

                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Paid Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((invoice: any, index: any) => (
                      <TableRow
                        key={index}
                        className="hover:bg-zinc-300"
                        onClick={() =>
                          setInvoiceIndex(
                            index + (Number(page) - 1) * Number(per_page)
                          )
                        }
                      >
                        <TableCell>
                          {index + (Number(page) - 1) * Number(per_page) + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {invoice.clients?.name}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {invoice.clients?.email}
                          </div>
                        </TableCell>

                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            className="text-xs capitalize"
                            variant="secondary"
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(invoice.created_at, "DD MMM YYYY")}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(invoice.paid_at, "DD MMM YYYY")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <PaginationControls
                totalData={invoices.length}
                hasNext={end < invoices.length}
                customPerPage={10}
                hasPrev={start > 0}
              />
            </Card>
          </div>
        </div>

        <div>
          <Card className="h-[220px]"></Card>
          <Card className="overflow-hidden mt-3" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Date:{" "}
                  {formatDate(
                    invoices[invoiceIndex]?.created_at || "",
                    "DD MMM YYYY"
                  )}{" "}
                  <br />
                  Status: {invoices[invoiceIndex]?.status.toUpperCase()}
                  <br />
                  {invoices[invoiceIndex]?.status == "unpaid" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 mt-3"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Mark as Paid
                          </span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to update the status?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will update the
                            invoice status to paid.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e: any) =>
                              updateStatusInvoice(invoices[invoiceIndex]?.id)
                            }
                          >
                            Update
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    ""
                  )}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Track Order
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e: any) =>
                        removeInvoice(invoices[invoiceIndex]?.id)
                      }
                      className="hover:bg-zinc-300 text-red-400"
                    >
                      Trash{" "}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Sub Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices[invoiceIndex]?.products?.map(
                      (item: any, index: number) => (
                        <TableRow>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit_price}</TableCell>
                          <TableCell>{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                <ul className="grid gap-3"></ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {formatCurrency(invoices[invoiceIndex]?.sub_total)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {formatCurrency(invoices[invoiceIndex]?.shipping_fees)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>
                      {formatCurrency(invoices[invoiceIndex]?.tax_charges)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>
                      {formatCurrency(invoices[invoiceIndex]?.grand_total)}
                    </span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>{invoices[invoiceIndex]?.clients.name}</span>
                    <span>{invoices[invoiceIndex]?.clients.address}</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>{invoices[invoiceIndex]?.clients.name}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">
                        {invoices[invoiceIndex]?.clients.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">{invoices[invoiceIndex]?.clients.phone}</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              {/* <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={(e) => setInvoiceIndex(invoiceIndex - 1)}
                      disabled={!invoiceIndex}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only">Previous Order</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={(e) => setInvoiceIndex(invoiceIndex + 1)}
                      disabled={invoiceIndex == invoices.length - 1}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Next Order</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Invoices;
