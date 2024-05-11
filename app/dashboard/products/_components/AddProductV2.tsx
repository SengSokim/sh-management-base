import React, { useState } from 'react'
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
import AddProduct from "./AddProduct";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/app/hooks/useProducts";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function AddProductV2() {
  const { addProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const add = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as any;
    const quantity = formData.get("quantity") as any;

    addProduct(name, description, category, price, quantity);
    setOpen(false)
  };

  return (

    <Drawer direction="right" snapPoints={[0.31]} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300 border">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-5 h-[1000px] ">
        <div className=" w-[550px]">
          <h2 className="font-bold my-5">Product Details</h2>
          <form action={add} name="add-customer-form" autoComplete="off">
            <div className="space-y-5">
              <div className="">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" />
              </div>
              <div className="">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  className="col-span-3"
                />
              </div>
              <div className="">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  type="text"
                  name="category"
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
