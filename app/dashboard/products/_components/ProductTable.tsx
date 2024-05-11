import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProducts } from "@/app/hooks/useProducts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {formatCurrency} from "@/lib/helper";

export default function ProductTable({ products }: { products: any }) {
  const { deleteProduct, updateProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const removeProduct = async (id: Number) => {
    deleteProduct(id);
  };
  const [id, setId] = useState<any>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const showDetail = async (product: any) => {
    setId(product.id);
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
  };
  const editProduct = async () => {
    updateProduct(id, name, description, category, price, quantity);
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
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
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.filter((item:any) => item.name.toLowerCase().includes(search)).map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.quantity}
                </TableCell>
                <TableCell id="action">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger
                          className="outline-zinc-500  hover:bg-zinc-300 rounded px-2 flex items-center w-full"
                          onClick={(e) => showDetail(item)}
                        >
                          Edit
                        </DialogTrigger>
                        <DialogContent
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                          </DialogHeader>
                          <form
                            action={editProduct}
                            name="add-customer-form"
                            autoComplete="off"
                          >
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
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
                                  htmlFor="description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                                <Textarea id="description" name="description" className="col-span-3" value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }/>
                                
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="category"
                                  className="text-right"
                                >
                                  Category
                                </Label>
                                <Input
                                  id="category"
                                  type="text"
                                  name="category"
                                  className="col-span-3"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                  Price
                                </Label>
                                <Input
                                  id="price"
                                  name="price"
                                  className="col-span-3"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="quantity"
                                  className="text-right"
                                >
                                  Quantity
                                </Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  name="quantity"
                                  className="col-span-3"
                                  value={quantity}
                                  onChange={(e) => setQuantity(e.target.value)}
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
                        onClick={(e: any) => removeProduct(item.id)}
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
          Showing <strong>1-10</strong> of <strong>{products.length}</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  );
}
