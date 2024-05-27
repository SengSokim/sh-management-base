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
import { useCustomers } from "@/app/hooks/useCustomers";
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

export function AddCustomerV2() {
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
    // <Drawer
    //   direction="right"
    //   snapPoints={[0.31]}
    //   open={open}
    //   onOpenChange={setOpen}
    // >
    //   <DrawerTrigger asChild>
    //     <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300 border">
    //       <PlusCircle className="h-3.5 w-3.5" />
    //       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //         Add Customer
    //       </span>
    //     </div>
    //   </DrawerTrigger>
    //   <DrawerContent className="p-5 h-full">
    //     <div className="max-w">

    //       <h2 className="font-bold py-5">Customer Details</h2>
    //       <form action={add} name="add-customer-form" autoComplete="off">
    //         <div className="space-y-5">
    //           <div className="">
    //             <Label htmlFor="name" className="text-right">
    //               Name
    //             </Label>
    //             <Input id="name" name="name" className="col-span-3" />
    //           </div>
    //           <div className="">
    //             <Label htmlFor="username" className="text-right">
    //               Phone
    //             </Label>
    //             <Input
    //               id="username"
    //               type="number"
    //               name="phone"
    //               className="col-span-3"
    //             />
    //           </div>
    //           <div className="">
    //             <Label htmlFor="username" className="text-right">
    //               Email
    //             </Label>
    //             <Input
    //               id="username"
    //               type="email"
    //               name="email"
    //               className="col-span-3"
    //             />
    //           </div>
    //           <div className="">
    //             <Label htmlFor="username" className="text-right">
    //               Address
    //             </Label>
    //             <Input id="username" name="address" className="col-span-3" />
    //           </div>
    //         </div>
    //         <Button
    //           type="submit"
    //           className="btn bg-zinc-500 text-white hover:bg-zinc-300 mt-5"
    //         >
    //           Save change
    //         </Button>
    //       </form>
    //     </div>
    //   </DrawerContent>
    // </Drawer>
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300 border">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Customer
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="min-w-[400px]">
        <SheetHeader>
          <SheetTitle>Enter Customer details</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form action={add} name="add-customer-form" autoComplete="off">
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
