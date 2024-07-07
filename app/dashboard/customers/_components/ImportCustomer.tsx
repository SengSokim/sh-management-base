"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { File, MinusIcon } from "lucide-react";
import { importTable } from "@/lib/helper";
import { useCustomers } from "@/app/hooks/useCustomers";
import { toast } from "sonner";
function ImportCustomer() {
  const { addMultiCustomers } = useCustomers()
  const [importedData, setImportedData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const handleImport = (e: any) => {
    importTable(e).then((response) => {
      setImportedData(response)
    })
  };
  const handleRemove = (index: any) => {
    const newItems = importedData.filter((_:any, i:any) => i !== index);
    setImportedData(newItems);
  };

  const ImportCustomers = () => {
    addMultiCustomers(importedData).then(result => {
     
      if(result.success) {
        toast.success('Customers imported successfully');
        setImportedData([])
      }else{
        toast.error(result.message)
      }

      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="expandIcon"
          Icon={File}
          iconPlacement="left"
          className=""
          title="Import Customers"
        >
          Import
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="min-w-[1000px]"
      >
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between gap-4">

            <Input type="file" onChange={(e) => handleImport(e)} />
            <Button variant="gooeyLeft" onClick={() => ImportCustomers()}>Import</Button>
          </div>
            <div className="table-wrap block mt-3 max-h-96 overflow-auto no-scrollbar">
                <table className="w-full">
                    <thead className="bg-white border-b sticky top-0">
                        <TableRow className="bg-onyx text-cloud uppercase">
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </thead>
                    <tbody className="h-96 ">
                    {importedData.length ? (
                        importedData.map((item: any,index:number) => (
                            <TableRow key={item.name}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.customer_type}</TableCell>
                              <TableCell>{item.company_Name}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>{item.phone}</TableCell>
                              <TableCell>{item.address}</TableCell>
                              <TableCell onClick={() => handleRemove(index)} >
                                <MinusIcon className="hover:text-cloud hover:bg-slate-gray hover:rounded-full transition-all delay-200 ease-in-out"/>
                              </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                              No Record
                            </TableCell>
                        </TableRow>
                        )}
                    </tbody>
                </table>
            </div>
                          
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCustomer;
