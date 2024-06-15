import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MinusIcon, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useInvoices } from "@/app/hooks/useInvoices";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomers } from "@/app/hooks/useCustomers";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  client_id: z.string({
    required_error: "Please select a client.",
  }),
  shipping_fees: z.coerce.number({
    required_error: "Please enter the shipping fees amount",
  }),
  status: z.string({
    required_error: "Please select the status.",
  }),
});
interface productItem {
  product_name: string;
  product_quantity: number;
  product_price: number;
  product_description: string;
  invoice_id?: string; // Optional new key
  admin_id?: string; // Optional new key
}
export function AddInvoiceV2() {
  const { customers, getCustomers } = useCustomers();

  useEffect(() => {
    getCustomers();
  }, []);
  const [productItems, setProductItems] = useState<productItem[]>([
    {
      product_name: "",
      product_quantity: 0,
      product_price: 0.0,
      product_description: "",
    },
  ]);
  const { addInvoice } = useInvoices();
  const [open, setOpen] = useState(false);

  const handleChange = (index: any, event: any) => {
    const { name, value } = event.target;

    const newItems = [...productItems];

    newItems[index] = {
      ...newItems[index],
      [name]: value,
    };

    setProductItems(newItems);
  };

  const handleAdd = () => {
    setProductItems([
      ...productItems,
      {
        product_name: "",
        product_quantity: 0,
        product_price: 0.0,
        product_description: "",
      },
    ]);
  };

  const handleRemove = (index: any) => {
    const newItems = productItems.filter((_, i) => i !== index);
    setProductItems(newItems);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipping_fees: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const client_id = parseInt(values.client_id);
    const shipping_fees = values.shipping_fees;
    const status = values.status;

    if (
      !productItems[0].product_name ||
      !productItems[0].product_price ||
      !productItems[0].product_description ||
      !productItems[0].product_quantity
    ) {
      alert("Please enter atleast one product detail");
    } else {
      addInvoice(client_id, shipping_fees, status, productItems);
      setOpen(false);

      form.reset();
      setProductItems([
        {
          product_name: "",
          product_quantity: 0,
          product_price: 0.0,
          product_description: "",
        },
      ]);
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="expandIcon" Icon={PlusCircle} iconPlacement="left">
          Create New Invoice
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px] overflow-auto dark:bg-midnight">
        <SheetHeader>
          <SheetTitle className="">Enter Invoice details</SheetTitle>
          <SheetDescription>
            Create invoice details. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full overflow-auto px-2" data-vaul-no-drag>
          <h2 className="font-bold my-5">Invoice Details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="clients" className="text-right">
                      Clients
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
                          {customers?.map((item: any, index: number) => (
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
              <Card className="mt-3">
                <CardHeader>
                  <CardTitle>Product</CardTitle>
                  <CardDescription>Enter product details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table className="w-[800px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[20%] sticky left-0 bg-platinum ">
                          Name
                        </TableHead>
                        <TableHead className="w-[20%]">Description</TableHead>
                        <TableHead className="w-[20%]">Quantity</TableHead>
                        <TableHead className="w-[20%]">Price</TableHead>
                        <TableHead className="w-[20%]">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold sticky left-0 bg-platinum">
                            <Label htmlFor="product_name" className="sr-only">
                              Name
                            </Label>
                            <Input
                              id="product_name"
                              name="product_name"
                              type="text"
                              value={item.product_name}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </TableCell>
                          <TableCell>
                            <Label
                              htmlFor="product_description"
                              className="sr-only"
                            >
                              Description
                            </Label>
                            <Input
                              id="product_description"
                              name="product_description"
                              type="text"
                              value={item.product_description}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </TableCell>
                          <TableCell>
                            <Label
                              htmlFor="product_quantity"
                              className="sr-only"
                            >
                              Quantity
                            </Label>
                            <Input
                              id="product_quantity"
                              name="product_quantity"
                              type="number"
                              value={item.product_quantity}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="product_price" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="product_price"
                              name="product_price"
                              type="number"
                              value={item.product_price}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="total" className="sr-only">
                              Total
                            </Label>
                            {formatCurrency(
                              item.product_quantity * item.product_price
                            )}
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => handleRemove(index)}
                            >
                              <MinusIcon />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                    type="button"
                    onClick={handleAdd}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add more items
                  </Button>
                </CardFooter>
              </Card>
              <FormField
                control={form.control}
                name="shipping_fees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping fees</FormLabel>
                    <FormControl>
                      <Input placeholder="Amount" {...field} type="number" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="paid" className="capitalize">
                            paid
                          </SelectItem>
                          <SelectItem value="unpaid" className="capitalize">
                            unpaid
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="gooeyRight"
                className="btn mt-5"
              >
                Save change
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
