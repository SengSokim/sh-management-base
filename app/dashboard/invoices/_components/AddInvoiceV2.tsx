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
  const add = async (formData: FormData) => {
    const client_id = formData.get("client_id") as any;
    const status = formData.get("status") as string;
    const shipping_fees = formData.get("shipping_fees") as any;
   

    addInvoice(client_id, shipping_fees,status, productItems);
    setOpen(false);
  };

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

  return (
    <Drawer
      direction="right"
      snapPoints={[0.45]}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300 border">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create New Invoice
          </span>
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="fixed flex flex-col px-5 h-full ">
          <div className="max-w-[50rem] w-full overflow-auto px-2" data-vaul-no-drag>
            <h2 className="font-bold my-5">Invoice Details</h2>
            <form action={add} name="add-invoice-form" autoComplete="off">
              <div className="space-y-5">
                <div className="">
                  <Label htmlFor="clients" className="text-right">
                    Clients
                  </Label>
                  <Select name="client_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Clients" />
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
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[20%] sticky left-0 bg-white">
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
                            <TableCell className="font-semibold sticky left-0 bg-white">
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
                              <Label
                                htmlFor="product_price"
                                className="sr-only"
                              >
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
                <Label htmlFor="shipping_fees" className="text-right">
                  Shipping Fees
                </Label>
                
                <Input id="tax_charges" name="tax_charges" type="number" />
                <div className="">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select name="status">
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
                </div>
              </div>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="btn"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="btn bg-zinc-500 text-white hover:bg-zinc-300 mt-5"
              >
                Save change
              </Button>
            </form>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
