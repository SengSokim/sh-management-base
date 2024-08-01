
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { NextResponse } from "next/server";
import { useState } from 'react';

export function formatCurrency(num:number) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return USDollar.format(num)
}
export function formatDate( dateString:any,format:string='YYYY-MM-DD',time_from_now:boolean=false) { 
    if(!dayjs(dateString).isValid()){
        return 'N/A';
    }
    
    let formattedDate;
    if(time_from_now) {
      dayjs.extend(relativeTime);
      formattedDate = dayjs(dateString).format('YYYY-MM-DD HH:mm:ss')
      
      formattedDate = dayjs(formattedDate).fromNow()
    
    }else{
      formattedDate = dayjs(dateString).format(format)
    }
 
    return formattedDate;
}

// Define types for better type safety
type ExportData = Record<string, any>[];

interface ExportConfig {
  headers: string[];
  mapFunction: (item: any) => Record<string, any>;
}

const exportConfigs: Record<string, ExportConfig> = {
  invoice: {
    headers: ["Customer", "Status", "Date", "Paid_date", "Shipping_fees", "Tax_charges", "Sub_total", "Grand_total"],
    mapFunction: (item: any) => ({
      Customer: item.customers.name,
      Status: item.status,
      Date: formatDate(item.created_at),
      Paid_date: formatDate(item.paid_at),
      Shipping_fees: formatCurrency(item.shipping_fees),
      Tax_charges: formatCurrency(item.tax_charges),
      Sub_total: formatCurrency(item.sub_total),
      Grand_total: formatCurrency(item.grand_total),
    })
  },
  customer: {
    headers: ["Name","Type","Company_Name","Phone","Email","Address"],
    mapFunction: (item: any) => ({
      Name: item.name,
      Type: item.customer_type,
      Company_Name: item.company_name,
      Phone: item.phone,
      Email: item.email,
      Address: item.address,
    })
  },
  supplier: {
    headers: ["Name", "Email", "Phone", "Address"],
    mapFunction: (item: any) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Address: item.address,
    })
  },
  inventory: {
    headers: ["SKU", "Supplier", "Item", "Type", "Weight", "Color", "Size", "Quantity", "Date_Received", "Reorder_Level"],
    mapFunction: (item: any) => ({
      SKU: item.sku,
      Supplier: item.suppliers.name,
      Item: item.item_name,
      Type: item.paper_type,
      Weight: item.weight,
      Color: item.color,
      Size: item.size,
      Quantity: item.quantity,
      Date_Received: item.date_received,
      Reorder_Level: item.reorder_level,
    })
  }
};

export function exportTable(data?: ExportData, title?: string, worksheetName?: string): void {
  if (!data || !Array.isArray(data) || data.length === 0) {
    toast.error('No data to export');
    return;
  }

  if (!title) {
    toast.error('Export title is required');
    return;
  }
  const lowercaseTitle = title.toLowerCase();
  const config = exportConfigs[lowercaseTitle];

  if (!config) {
    toast.error(`Unsupported export type: ${title}`);
    return;
  }
  try {
    const dataToExport = data.map(config.mapFunction);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: config.headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName || 'Sheet1');

    const fileName = `${title}-export-${dayjs().format('DD-MM-YYYY')}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    toast.success(`${title} has been exported successfully!`);
  } catch (error: any) {
    toast.error(`Export Error: ${error.message}`);
  }
}
 
export function importTable(e: React.ChangeEvent<HTMLInputElement>): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const file = e.target.files?.[0];
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const binaryStr = event.target?.result as string;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        // Convert keys to lowercase
        const lowercaseData = sheetData.map((row:any) => 
          Object.keys(row).reduce((acc, key) => {
            acc[key.toLowerCase()] = row[key];
            return acc;
          }, {} as Record<string, any>)
        );
        resolve(lowercaseData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
}

export function capitalize(str:any) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function leadingZeros(num:any, targetLength:number = 4) {
  let numStr = num?.toString();
  while ( numStr?.length < targetLength ) {
    numStr = '0' + numStr;
  }
  return numStr;
}

export function copyToClipboard(text:any) {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success('Copied to clipboard!')
    },
    (err:any) => {
      toast.error('Could not copy clipboard'+ err)
    }
  )
}

export function success(data = null) {
  const response = NextResponse.json(
    { success: true, data },
    { status: 200 } // 200 is the HTTP status code for success
  );
  
  const result = response.json().then((body:any) => {
    return body
  })
  return result;
}
