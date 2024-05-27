import React, { useState } from "react";
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
import { useProducts } from "@/app/hooks/useProducts";
import { useSuppliers } from "@/app/hooks/useSuppliers";
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

export function AddSupplierV2() {
  const { addSupplier } = useSuppliers();
  const [open, setOpen] = useState(false);
  const add = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    addSupplier(name, email, phone, address);
    setOpen(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300 border">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Supplier
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="min-w-[400px]">
        <SheetHeader>
          <SheetTitle>Enter supplier details</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form action={add} name="add-supplier-form" autoComplete="off">
          <div className="space-y-5">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="">
              <Label htmlFor="username" className="text-right">
                Phone
              </Label>
              <Input
                id="username"
                type="number"
                name="phone"
                className="col-span-3"
              />
            </div>
            <div className="">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                type="email"
                name="email"
                className="col-span-3"
              />
            </div>
            <div className="">
              <Label htmlFor="username" className="text-right">
                Address
              </Label>
              <Input id="username" name="address" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                className="btn bg-zinc-500 text-white hover:bg-zinc-300 mt-5"
              >
                Save change
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
