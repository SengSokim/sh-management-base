import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSuppliers } from "@/app/hooks/useSuppliers";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function SupplierTable({
  suppliers,
  page,
  per_page,
  total_record,
}: {
  suppliers: any;
  page: any;
  per_page: any;
  total_record: any;
}) {
  const { deleteSupplier, updateSupplier } = useSuppliers();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const showDetail = async (details: any) => {
    setId(details.id);
    setName(details.name);
    setEmail(details.email);
    setPhone(details.phone);
    setAddress(details.address);
  };

  const editSupplier = async () => {
    updateSupplier(id, name, email, phone, address).then((result) => {
      if (result.success) {
        toast.success(`Supplier has been updated successfully!`);
      }
    });

    setOpen(false);
  };

  const removeSupplier = async (id: Number) => {
    deleteSupplier(id).then((result) => {
      if (result.success) {
        toast.success(`Supplier has been deleted successfully!`);
      }
    });
  };
  return (
    <div className="">
      <div className="">
        <main className="">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>
                Manage your Suppliers and view their contact details. <br />
                Total record(s): {total_record}
              </CardDescription>
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 ">
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px] "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </header>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="uppercase">
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Work Phone</TableHead>
                    <TableHead className="text-right">Address</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.length ? (
                    suppliers
                      .filter((item: any) =>
                        item.name.toLowerCase().includes(search)
                      )
                      .map((supplier: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {index + (Number(page) - 1) * Number(per_page) + 1}
                          </TableCell>
                          <TableCell>{supplier.name}</TableCell>
                          <TableCell>{supplier.email}</TableCell>
                          <TableCell>{supplier.phone}</TableCell>
                          <TableCell className="text-right">
                            {supplier.address}
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
                                  <DialogTrigger
                                    className="text-darknight  hover:bg-zinc-300 rounded px-2 flex items-center w-full"
                                    onClick={(e) => showDetail(supplier)}
                                  >
                                    Edit
                                  </DialogTrigger>
                                  <DialogContent
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                  >
                                    <DialogHeader>
                                      <DialogTitle>
                                        Supplier Details
                                      </DialogTitle>
                                    </DialogHeader>
                                    <form
                                      action={editSupplier}
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
                                            onChange={(e) =>
                                              setName(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                              setPhone(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                              setEmail(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                              setAddress(e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="submit"
                                          variant="gooeyRight"
                                          className="btn mt-5"
                                        >
                                          Save change
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>

                                <DropdownMenuItem
                                  onClick={(e: any) =>
                                    removeSupplier(supplier.id)
                                  }
                                  className=" text-red-400"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-lg">No Record</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
