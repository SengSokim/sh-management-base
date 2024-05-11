import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomers } from "@/app/hooks/useCustomers";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function CustomerTable({ customers }: { customers: any }) {
  const { deleteCustomer, updateCustomer } = useCustomers();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const showDetail = async(details:any) => {
    setId(details.id);
    setName(details.name);
    setEmail(details.email);
    setPhone(details.phone);
    setAddress(details.address);
  }

  const editCustomer = async () => {
   
    updateCustomer(id, name, phone, address, email);
    setOpen(false)
  };

  const removeClient = async (id: Number) => {
    deleteCustomer(id);
  };
  return (
    <div className="">
      <div className="">
        <main className="">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Manage your customers and view their contact details.
              </CardDescription>
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </header>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.filter((item:any) => item.name.toLowerCase().includes(search)).map((customer: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell className="text-right">
                        {customer.address}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger className="outline-zinc-500  hover:bg-zinc-300 rounded px-2 flex items-center w-full" onClick={(e)=>showDetail(customer)}>
                                Edit
                              </DialogTrigger>
                              <DialogContent
                                onOpenAutoFocus={(e) => e.preventDefault()}
                              >
                                <DialogHeader>
                                  <DialogTitle>Customer Details</DialogTitle>
                                </DialogHeader>
                                <form
                                  action={editCustomer}
                                  name="add-customer-form"
                                  autoComplete="off"
                                >
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="name"
                                        className="text-right"
                                      >
                                        Name
                                      </Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        className="col-span-3"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="username"
                                        className="text-right"
                                      >
                                        Phone
                                      </Label>
                                      <Input
                                        id="username"
                                        type="number"
                                        name="phone"
                                        className="col-span-3"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="username"
                                        className="text-right"
                                      >
                                        Email
                                      </Label>
                                      <Input
                                        id="username"
                                        type="email"
                                        name="email"
                                        className="col-span-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="username"
                                        className="text-right"
                                      >
                                        Address
                                      </Label>
                                      <Input
                                        id="username"
                                        name="address"
                                        className="col-span-3"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="btn bg-zinc-500 text-white hover:bg-zinc-300"
                                    >
                                      Save change
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            
                            <DropdownMenuItem
                              onClick={(e: any) => removeClient(customer.id)}
                              className="hover:bg-zinc-300 text-red-400"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of{" "}
                <strong>{customers.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
