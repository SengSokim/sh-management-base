import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useInventory } from "@/app/hooks/useInventory";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const formSchema = z.object({
  supplier_id: z.string({
    required_error: "Please select a client.",
  }),
  item_name: z.string().min(4, {
    message: "Must be minimum 4 characters long",
  }),
  type: z.string().optional(),
  weight: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  quantity: z.coerce.number({
    required_error: "Please enter the quantity amount",
  }),
  date_received: z.date().optional(),
  reorder_level: z.coerce.number().optional(),
});

export function AddInventoryV2() {
  const { addItems } = useInventory();
  const { suppliers, getSuppliers } = useSuppliers();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getSuppliers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item_name: "",
      type: "",
      quantity: 0,
      date_received: new Date(),
      reorder_level: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const supplier_id = parseInt(values.supplier_id);
    const item_name = values.item_name;
    const type = values.type;
    const weight = values.weight;
    const color = values.color;
    const size = values.size;
    const quantity = values.quantity;
    const date_received = dayjs(values.date_received).format('YYYY-MM-DD');
    const reorder_level = values.reorder_level;
    addItems(
      supplier_id,
      item_name,
      type,
      weight,
      color,
      size,
      quantity,
      date_received,
      reorder_level
    ).then((result) => {
      if (result.success) {
        toast.success(`Item has been created successfully!`);
      }
    });
    setOpen(false);

    form.reset();
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="expandIcon" Icon={PlusCircle} iconPlacement="left">
          New Supplier
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[400px] overflow-auto">
        <SheetHeader>
          <SheetTitle>Enter supplier details</SheetTitle>
          <SheetDescription>
            Enter supplier information. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="supplier_id"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="supplier_id" className="text-right">
                    Suppliers
                  </Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="item_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Type" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Weight" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Size" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Size" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_received"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Received</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl >
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reorder_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reorder Level</FormLabel>
                  <FormControl>
                    <Input placeholder="Reorder Level" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="gooeyRight" className="btn mt-5">
              Save change
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
