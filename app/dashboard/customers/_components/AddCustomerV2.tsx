import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCustomers } from "@/app/hooks/useCustomers";
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().min(9, {
    message: "Must be minimum 9 digits long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  tin_number: z.string().optional()
});
export function AddCustomerV2() {
  const { addCustomer } = useCustomers();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:"",
      company_name:"",
      phone: "",
      email: "",
      address: "",
      tin_number: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values.name;
    const type = values.type;
    const company_name = values.company_name;
    const phone = values.phone;
    const email = values.email;
    const address = values.address;
    const tin_number = values.tin_number || "";
    addCustomer(name, type, company_name, phone, address, email, tin_number).then((result) => {
      if(result.success) {
        toast.success(`Customer has been created successfully!`)
      }
    });
    setOpen(false);
    form.reset();

  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="expandIcon" Icon={PlusCircle} iconPlacement="left" title="Create New Customer">
          New Customer
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px] overflow-auto">
        <SheetHeader>
          <SheetTitle>Enter Customer details</SheetTitle>
          <SheetDescription>
            Enter the customer information. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
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
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="individual" className="capitalize">
                            Individual
                          </SelectItem>
                          <SelectItem value="business" className="capitalize">
                            Business
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tin_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tin Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Tin Number" {...field} />
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
