
import dayjs from 'dayjs';
import * as XLSX from "xlsx";
import { toast } from "sonner"
export function formatCurrency(num:number) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return USDollar.format(num)
}
export function formatDate( dateString:any,format:string='YYYY-MM-DD' ) { 
    if(!dayjs(dateString).isValid()){
        return 'N/A';
    }
    const formattedDate = dayjs(dateString).format(format)

    
    return formattedDate;
}

export function exportTable(data?: any, title?: string, worksheetname?: string) {
    try {
        if(title?.toLowerCase() == 'invoice') {
            if (data && Array.isArray(data)) {
            
                const dataToExport = data.map((item: any) => (
                {
                    Customer: item.clients.name,
                    Status: item.status,
                    Date: formatDate(item.created_at),
                    Paid_date: formatDate(item.paid_at),
                    Shipping_fees: formatCurrency(item.shipping_fees),
                    Tax_charges: formatCurrency(item.tax_charges),
                    Sub_total: formatCurrency(item.sub_total),
                    Grand_total: formatCurrency(item.grand_total),
                }));
               
              // Create Excel workbook and worksheet
              const workbook = XLSX.utils.book_new();
              const worksheet = XLSX.utils?.json_to_sheet(dataToExport,{header:["Customer","Status","Date","Paid_date","Shipping_fees","Tax_charges","Sub_total","Grand_total"]});
              XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
              // Save the workbook as an Excel file
              XLSX.writeFile(workbook, `${title}.xlsx`);
              
              toast.success(`${title} has been export successfully!`)
              
            } else {
              toast.error('Export Error!')
              
            }
        }else if(title?.toLowerCase() == 'customer' || title?.toLowerCase() == 'supplier') {
            if (data && Array.isArray(data)) {
            
                const dataToExport = data.map((item: any) => (
                {
                    Name: item.name,
                    Email: item.email,
                    Phone: item.phone,
                    Address: item.address,
                }));
               
              // Create Excel workbook and worksheet
              const workbook = XLSX.utils.book_new();
              const worksheet = XLSX.utils?.json_to_sheet(dataToExport,{header:["Name","Email","Phone","Address"]});
              XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
              // Save the workbook as an Excel file
              XLSX.writeFile(workbook, `${title}.xlsx`);
              toast.success(`${title} has been export successfully!`)
              
            } else {
              toast.error('Export Error!')
            }
        }
      } catch (error: any) {
        toast.error('Export Error!'+error.message)
      }
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
