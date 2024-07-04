import { CalendarIcon, MoreHorizontal, Search } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import { toast } from "sonner";
import { useInventory } from "@/app/hooks/useInventory";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
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
  const { suppliers, getSuppliers } = useSuppliers();
  useEffect(() => {
    getSuppliers();
  }, []);
  const { deleteItem, updateItem } = useInventory();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState<any>();
  const [supplierId, setSupplierId] = useState("");
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [dateReceived, setDateReceived] = useState<Date>();
  const [reorderLevel, setReorderLevel] = useState(0);
  const showDetail = async (details: any) => {
    setId(details.id);
    setSupplierId(details.suppliers.id);
    setItemName(details.item_name);
    setType(details.paper_type);
    setWeight(details.weight);
    setColor(details.color);
    setSize(details.size);
    setQuantity(details.quantity);
    setDateReceived(details.date_received);
    setReorderLevel(details.reorder_level);
  };
  const editInventory = async () => {
    updateItem(
      id,
      supplierId,
      itemName,
      type,
      weight,
      color,
      size,
      quantity,
      dayjs(dateReceived).format('YYYY-MM-DD'),
      reorderLevel
    ).then((result) => {
      if (result.success) {
        toast.success(`Item has been updated successfully!`);
      }
    });

    setOpen(false);
  };

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
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    {/* <TableHead className="text-right">Weight</TableHead>
                    <TableHead className="text-right">Color</TableHead>
                    <TableHead className="text-right">Size</TableHead> */}
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Date Received</TableHead>
                    <TableHead className="text-right">Reorder Level</TableHead>
                    <TableHead className="text-right"></TableHead>
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
                          <TableCell className="font-medium">
                            {index + (Number(page) - 1) * Number(per_page) + 1}
                          </TableCell>
                          <TableCell>{item.suppliers.name}</TableCell>
                          <TableCell>{item.item_name}</TableCell>
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
                          <TableCell className="text-right">
                            {item.reorder_level}
                          </TableCell>
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
                                <Dialog open={open} onOpenChange={setOpen}>
                                  <DialogTrigger
                                    className="text-darknight  hover:bg-zinc-300 rounded px-2 flex items-center w-full"
                                    onClick={(e) => showDetail(item)}
                                  >
                                    Edit
                                  </DialogTrigger>
                                  <DialogContent
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                  >
                                    <DialogHeader>
                                      <DialogTitle>Item Details</DialogTitle>
                                    </DialogHeader>
                                    <form
                                      action={editInventory}
                                      name="add-inventory-form"
                                      autoComplete="off"
                                    >
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="supplier_id"
                                            className="text-right"
                                          >
                                            Suppliers
                                          </Label>
                                          <div className="col-span-3">
                                            <Select
                                              onValueChange={setSupplierId}
                                              value={supplierId.toString()}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select a Client" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  <SelectLabel>
                                                    Clients
                                                  </SelectLabel>
                                                  {suppliers?.map(
                                                    (
                                                      item: any,
                                                      index: number
                                                    ) => (
                                                      <SelectItem
                                                        value={item.id.toString()}
                                                        key={index}
                                                      >
                                                        {item.name}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="item_name"
                                            className="text-right"
                                          >
                                            Item Name
                                          </Label>
                                          <Input
                                            id="item_name"
                                            type="text"
                                            name="item_name"
                                            className="col-span-3"
                                            value={itemName}
                                            onChange={(e) =>
                                              setItemName(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="type"
                                            className="text-right"
                                          >
                                            Paper Type
                                          </Label>
                                          <Input
                                            id="type"
                                            type="text"
                                            name="type"
                                            className="col-span-3"
                                            value={type}
                                            onChange={(e) =>
                                              setType(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="weight"
                                            className="text-right"
                                          >
                                            Weight
                                          </Label>
                                          <Input
                                            id="weight"
                                            type="text"
                                            name="weight"
                                            className="col-span-3"
                                            value={weight}
                                            onChange={(e) =>
                                              setWeight(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="color"
                                            className="text-right"
                                          >
                                            Color
                                          </Label>
                                          <Input
                                            id="color"
                                            type="text"
                                            name="color"
                                            className="col-span-3"
                                            value={color}
                                            onChange={(e) =>
                                              setColor(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="size"
                                            className="text-right"
                                          >
                                            Size
                                          </Label>
                                          <Input
                                            id="size"
                                            type="text"
                                            name="size"
                                            className="col-span-3"
                                            value={size}
                                            onChange={(e) =>
                                              setSize(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="quantity"
                                            className="text-right"
                                          >
                                            Quantity
                                          </Label>
                                          <Input
                                            id="quantity"
                                            type="number"
                                            name="quantity"
                                            className="col-span-3"
                                            value={quantity}
                                            onChange={(e) =>
                                              setQuantity(
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="size"
                                            className="text-right"
                                          >
                                            Date Received
                                          </Label>
                                          <div className="col-span-3 ">
                                            <Popover modal={true}>
                                              <PopoverTrigger asChild className="w-full">
                                                <Button
                                                  variant={"outline"}
                                                  className={cn(
                                                    "pl-3 text-left font-normal bg-cloud",
                                                    !dateReceived &&
                                                      "text-muted-foreground"
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
                                              <PopoverContent
                                                className="w-full p-0"
                                                align="start"
                                              >
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
                                          <Label
                                            htmlFor="reorder_level"
                                            className="text-right"
                                          >
                                            Reorder Level
                                          </Label>
                                          <Input
                                            id="reorder_level"
                                            type="text"
                                            name="reorder_level"
                                            className="col-span-3"
                                            value={reorderLevel}
                                            onChange={(e) =>
                                              setReorderLevel(
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="submit"
                                          variant="gooeyRight"
                                          className="btn mt-5"
                                        >
                                          Save change
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>

                                <DropdownMenuItem onClick={() => removeInventory(item.id)} className=" text-red-400">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-lg">
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
