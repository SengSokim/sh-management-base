"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { Card } from "@/components/ui/card";
function ImportCustomer() {
  const [importedData, setImportedData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const handleImport = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData: any = XLSX.utils.sheet_to_json(sheet);

      setImportedData(sheetData);
    };

    reader.readAsBinaryString(file);
  };
  console.log(importedData)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={(e) => console.log(e)} asChild>
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
          <Input type="file" onChange={(e) => handleImport(e)} />
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
                        </TableRow>
                    </thead>
                    <tbody className="h-96 ">
                    {importedData.length ? (
                        importedData.map((item: any) => (
                            <TableRow key={item.Name}>
                              <TableCell>{item.Name}</TableCell>
                              <TableCell>{item.Type}</TableCell>
                              <TableCell>{item.Company_Name}</TableCell>
                              <TableCell>{item.Email}</TableCell>
                              <TableCell>{item.Phone}</TableCell>
                              <TableCell>{item.Address}</TableCell>
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
          {/* <Card className="mt-3 max-h-[400px] overflow-auto no-scrollbar">
            <Table className="w-full">
              <TableHeader className="bg-onyx text-cloud sticky top-0">
                <TableRow >
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importedData.length ? (
                  importedData.map((item: any) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.address}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Record
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCustomer;
