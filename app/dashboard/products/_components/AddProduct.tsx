import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/app/hooks/useProducts'
import { Textarea } from '@/components/ui/textarea'

export default function AddProduct() {
    const {addProduct} = useProducts();
    const [open, setOpen] = useState(false);
    const add = async (formData: FormData) => {
      
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const price = formData.get("price") as any;
        const quantity = formData.get("quantity") as any ;
        
        addProduct(name,description,category,price,quantity)
        setOpen(false)
        
      };
  return (
    <div className='border rounded'>
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className='outline-zinc-500  hover:bg-zinc-300 rounded px-2 flex items-center'>
                <div className="flex items-center px-2 rounded h-7 gap-1 hover:bg-zinc-300">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </div>
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                
                </DialogHeader>
                <form action={add} name="add-customer-form" autoComplete='off'>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" name="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                            Description
                            </Label>
                            <Textarea id="description" name="description" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                            Category
                            </Label>
                            <Input id="category" type="text" name="category" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                            Price
                            </Label>
                            <Input id="price" name="price" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                            Quantity
                            </Label>
                            <Input id="quantity" type="number" name="quantity" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="btn bg-zinc-500 text-white hover:bg-zinc-300">Save change</Button>
                        
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
