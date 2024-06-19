"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Copy,
  File,
  ListFilter,
  MoreVertical,
  Printer,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { useInvoices } from "@/app/hooks/useInvoices";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  copyToClipboard,
  exportTable,
  formatCurrency,
  formatDate,
  leadingZeros,
} from "@/lib/helper";
import { AddInvoiceV2 } from "./_components/AddInvoiceV2";
import { PaginationControls } from "../_components/PaginationControls";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

function Invoices({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { invoices, getInvoices, updateStatus, deleteInvoice } = useInvoices();
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

    toast.success(`Invoice has been deleted successfully!`);
  };

  const updateStatusInvoice = async (id: Number) => {
    updateStatus(id);

    toast.success(`Invoice has been marked as paid!`);
  };

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const paginatedData = invoices.slice(start, end);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;

    if (printContents) {
      const printWindow = window.open("", "", "height=500,width=800");
      if (printWindow) {
        printWindow.document.write("<html><head><title>Print</title>");
        const linkElement = printWindow.document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href =
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

        linkElement.onload = () => {
          printWindow.document.write("</head><body>");
          printWindow.document.write(printContents);
          printWindow.document.write("</body></html>");
          printWindow.document.close();
          const images = printWindow.document.images;
          const totalImages = images.length;
          let loadedImages = 0;

          if (totalImages === 0) {
            printWindow.print();
          } else {
            for (let i = 0; i < totalImages; i++) {
              images[i].onload = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                  printWindow.print();
                }
              };
              images[i].onerror = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                  printWindow.print();
                }
              };
            }
          }
        };
        printWindow.document.head.appendChild(linkElement);
      }
    }
  };
  return (
    <div className="">
      <h1 className="text-[32px] font-bold ">Invoices</h1>
      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3 ">
                <CardTitle className="">Your Orders</CardTitle>

                <CardDescription className="max-w-lg leading-relaxed ">
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
                <CardTitle className="text-2xl">
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
            <Card x-chunk="dashboard-05-chunk-2 text-midnight">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-2xl">
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
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="expandIcon"
                Icon={File}
                iconPlacement="left"
                className="ml-3"
                onClick={() =>
                  exportTable(invoices, "Invoice", "InvoiceExport")
                }
              >
                Export
              </Button>
            </div>

            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  Recent invoices from your store. <br />
                  Total record(s): {invoices.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10%]">#</TableHead>
                      <TableHead className="w-[20%]">Customer</TableHead>

                      <TableHead className="w-[20%] sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="w-[20%] md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="w-[20%] md:table-cell">
                        Paid Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData ? (
                      paginatedData.map((invoice: any, index: any) => (
                        <TableRow
                          key={index}
                          className="hover:bg-anti-flash-white"
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
                            <div className=" text-sm text-muted-foreground md:inline">
                              {invoice.clients?.email}
                            </div>
                          </TableCell>

                          <TableCell className=" sm:table-cell">
                            <Badge
                              className="text-xs capitalize"
                              variant="secondary"
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className=" md:table-cell">
                            {formatDate(invoice.created_at, "DD MMM YYYY")}
                          </TableCell>
                          <TableCell className=" md:table-cell">
                            {formatDate(invoice.paid_at, "DD MMM YYYY")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <>
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-8" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-8" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-8" />
                          </TableCell>
                        </TableRow>
                      </>
                    )}
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
          <Card
            className="overflow-hidden mt-3"
            x-chunk="dashboard-05-chunk-4"
            ref={printRef}
          >
            <div className="ml-auto flex flex-col items-end gap-1 p-3">
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="gooeyLeft"
                  className="h-8 gap-1"
                  onClick={() => handlePrint()}
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Print
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="gooeyLeft" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
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
            </div>
            <CardHeader className="flex flex-row justify-between items-end bg-muted/50">
              <Image
                src="/sh.png"
                className=""
                priority
                width="70"
                height="70"
                alt="logo"
              ></Image>
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Invoice #SH-
                  {leadingZeros(invoices[invoiceIndex]?.invoice_number)}
                  <Button
                    size="icon"
                    variant="ringHover"
                    className="h-6 w-6"
                    onClick={() =>
                      copyToClipboard(
                        `#SH-${leadingZeros(
                          invoices[invoiceIndex]?.invoice_number
                        )}`
                      )
                    }
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Invoice ID</span>
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
                          variant="expandIcon"
                          Icon={CircleCheck}
                          iconPlacement="left"
                        >
                          Mark As Paid
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to update the status?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will update the
                            invoice status to PAID.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e: any) =>
                              updateStatusInvoice(invoices[invoiceIndex]?.id)
                            }
                          >
                            <div className="group text-gold hover:text-gold/60 transition duration-300 ">
                              Update
                              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gold"></span>
                            </div>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    ""
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details </div>
                <Table className="table-auto">
                  <TableHeader>
                    <TableRow className="">
                      <TableHead>Item Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Sub Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices[invoiceIndex]?.products?.map(
                      (item: any, index: number) => (
                        <TableRow key={item.name}>
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
                      variant="ringHover"
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
                      variant="ringHover"
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
