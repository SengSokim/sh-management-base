import { useInventory } from "@/app/hooks/useInventory";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { CalendarIcon, Cog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
function EditInventory({ item }: { item: any }) {
    const { suppliers, getSuppliers } = useSuppliers();
    useEffect(() => {
        getSuppliers();
    }, []);
    const { updateItem } = useInventory();

    const [open, setOpen] = useState(false);
    const [id, setId] = useState<any>();
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
    const showDetail = async (details: any) => {
        setId(details.id);
        setSupplierId(details.suppliers.id);
        setItemName(details.item_name);
        setSKU(details.sku);
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
        sku,
        type,
        weight,
        color,
        size,
        quantity,
        dayjs(dateReceived).format("YYYY-MM-DD"),
        reorderLevel
        ).then((result) => {
        if (result.success) {
            toast.success(`Item has been updated successfully!`);
        }
        });

        setOpen(false);
    };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="text-darknight  hover:bg-zinc-300 rounded px-2 flex items-center w-full"
          onClick={(e) => showDetail(item)}
        >
          <Cog color="#6C757D" className="mr-3" />
          Edit
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
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
                      <SelectValue placeholder="Select a Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Clients</SelectLabel>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditInventory;
