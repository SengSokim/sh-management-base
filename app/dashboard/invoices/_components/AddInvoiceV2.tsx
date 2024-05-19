import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PlusCircle } from "lucide-react";
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
import { useProducts } from "@/app/hooks/useProducts";

export function AddInvoiceV2() {
  const { customers, getCustomers, } = useCustomers();
  const { products, getProducts } = useProducts();
 
  useEffect(() => {
    getCustomers()
    getProducts()
  }, [])
  
  const { addInvoice } = useInvoices();
  const [open, setOpen] = useState(false);
  const add = async (formData: FormData) => {
    const client_id = formData.get("client_id") as any;
    const quantity = formData.get("quantity") as any;
    const price = formData.get("price") as any;
    const status = formData.get("status") as string;
    addInvoice(client_id,quantity,price,status)
    setOpen(false);
  };

  return (
    <Drawer
      direction="right"
      snapPoints={[0.31]}
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
      <DrawerContent className="p-5 h-[1000px] ">
        <div className=" w-[550px]">
          <h2 className="font-bold my-5">Invoices Details</h2>
          <form action={add} name="add-customer-form" autoComplete="off">
            <div className="space-y-5">
              <div className="">
                <Label htmlFor="clients" className="text-right">
                  Clients
                </Label>
                <Select name="client_id">
                  <SelectTrigger>
                    <SelectValue placeholder="Clients" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      <SelectLabel>Clients</SelectLabel>
                      {customers?.map((item:any,index:number) => (
                        <SelectItem value={item.id.toString()} key={index}>{item.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  name="quantity"
                  className="col-span-3"
                />
              </div>
              <div className="">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" name="price" className="col-span-3" />
              </div>
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
                      <SelectItem value="paid" className="capitalize">paid</SelectItem>
                      <SelectItem value="unpaid" className="capitalize">unpaid</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="btn bg-zinc-500 text-white hover:bg-zinc-300 mt-5"
            >
              Save change
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
