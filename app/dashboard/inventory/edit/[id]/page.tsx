"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowLeftCircle, CalendarIcon, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useInventoryHistory } from "@/app/hooks/useInventoryHistory";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import { useInventory } from "@/app/hooks/useInventory";
const InventoryEdit = ({ params }: { params: { id: number } }) => {
    const { suppliers, getSuppliers } = useSuppliers();
    const {item, getItemById } = useInventory();
    useEffect(() => {
        getSuppliers();
        getItemById(params.id);
    }, []);
    
    const [supplierId, setSupplierId] = useState("");
    const [itemName, setItemName] = useState("");
    const [sku, setSKU] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [dateReceived, setDateReceived] = useState<Date>();
    const [reorderLevel, setReorderLevel] = useState(0);
    return (
    <div className="">
      <Link href="/dashboard/inventory">
        <ArrowLeftCircle />
      </Link>
      <div className="flex justify-start items-center mt-3">
        <h1 className="text-[32px] font-bold ">Edit</h1>
      </div>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Edit Item</CardTitle>
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
        <form
            action=""
            name="add-inventory-form"
            autoComplete="off"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input
                  id="sku"
                  type="text"
                  name="sku"
                  className="col-span-3"
                  value={sku}
                  onChange={(e) => setSKU(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier_id" className="text-right">
                  Suppliers
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={setSupplierId}
                    value={supplierId.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Supplier</SelectLabel>
                        {suppliers?.map((item: any, index: number) => (
                          <SelectItem value={item.id.toString()} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item_name" className="text-right">
                  Item Name
                </Label>
                <Input
                  id="item_name"
                  type="text"
                  name="item_name"
                  className="col-span-3"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Paper Type
                </Label>
                <Input
                  id="type"
                  type="text"
                  name="type"
                  className="col-span-3"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight
                </Label>
                <Input
                  id="weight"
                  type="text"
                  name="weight"
                  className="col-span-3"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  type="text"
                  name="color"
                  className="col-span-3"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Size
                </Label>
                <Input
                  id="size"
                  type="text"
                  name="size"
                  className="col-span-3"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  name="quantity"
                  className="col-span-3"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Date Received
                </Label>
                <div className="col-span-3 ">
                  <Popover modal={true}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal bg-cloud",
                          !dateReceived && "text-muted-foreground"
                        )}
                      >
                        {dateReceived ? (
                          format(dateReceived, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateReceived}
                        onSelect={setDateReceived}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reorder_level" className="text-right">
                  Reorder Level
                </Label>
                <Input
                  id="reorder_level"
                  type="text"
                  name="reorder_level"
                  className="col-span-3"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(parseInt(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="gooeyRight" className="btn mt-5">
                Save change
              </Button>
            </DialogFooter>
          </form>
        </CardContent>
      </Card>
    </div>
    );
};

export default InventoryEdit;
