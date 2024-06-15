import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/app/hooks/useCustomers";

export default function AddCustomer() {
  const { addCustomer } = useCustomers();
  const [open, setOpen] = useState(false);
  const add = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    addCustomer(name, phone, address, email);
    setOpen(false);
  };
  return (
    <div className="border rounded">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="outline-zinc-500  hover:bg-zinc-300 rounded px-2 flex items-center">
          <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Customer
            </span>
          </div>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e: any) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          <form action={add} name="add-customer-form" autoComplete="off">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
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
              <div className="grid grid-cols-4 items-center gap-4">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Address
                </Label>
                <Input id="username" name="address" className="col-span-3" />
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
