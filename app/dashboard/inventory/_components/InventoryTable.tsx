import { ArrowLeftRight, Cog, Eye, MoreHorizontal, Search, Trash2, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { useInventory } from "@/app/hooks/useInventory";
import EditInventory from "./EditInventory";
import Link from "next/link";
export function InventoryTable({
  items,
  page,
  per_page,
  total_record,
}: {
  items: any;
  page: any;
  per_page: any;
  total_record: any;
}) {
  const { deleteItem } = useInventory();
  const [search, setSearch] = useState("");

  const removeInventory = async (id: Number) => {
    deleteItem(id).then((result) => {
      if (result.success) {
        toast.success(`Item has been deleted successfully!`);
      }
    });
  };
  return (
    <div className="">
      <div className="">
        <main className="">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                Manage your warehouse and view the stock details. <br />
                Total record(s): {total_record}
              </CardDescription>
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 ">
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px] "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </header>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="uppercase">
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    {/* <TableHead className="text-right">Weight</TableHead>
                    <TableHead className="text-right">Color</TableHead>
                    <TableHead className="text-right">Size</TableHead> */}
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Date Received</TableHead>
                    <TableHead className="text-right">Reorder Level</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length ? (
                    items
                      .filter((item: any) =>
                        item.item_name.toLowerCase().includes(search)
                      )
                      .map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link href={`/dashboard/inventory/history/${item.id}`} className="flex items-center">
                                  <DropdownMenuItem>
                                    <Eye color="#6C757D" className="mr-3" />
                                    View History
                                  </DropdownMenuItem>
                                </Link>
                                <Link href={`/dashboard/inventory/edit/${item.id}`} className="flex items-center w-full">
                                  <DropdownMenuItem>
                                      <Cog color="#6C757D" className="mr-3" />
                                      Edit
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                  <ArrowLeftRight color="#6C757D" className="mr-3" />
                                  Transaction
                                </DropdownMenuItem>
                                <EditInventory item={item}/>

                                <DropdownMenuItem onClick={() => removeInventory(item.id)} className=" text-red-400">
                                  <Trash2 className="mr-3" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell className="font-medium">
                            {index + (Number(page) - 1) * Number(per_page) + 1}
                          </TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.suppliers.name}</TableCell>
                          <TableCell className="w-[170px]">{item.item_name}</TableCell>
                          <TableCell>{item.paper_type}</TableCell>
                          {/* <TableCell className="text-right">
                            {item.weight}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.color}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.size}
                          </TableCell> */}
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.date_received}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.reorder_level}
                          </TableCell>
                          
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-lg font-bold">
                        No Record
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
