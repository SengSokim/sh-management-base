import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { useState } from "react"

export const useInvoices = () => {
    const [invoices, setInvoices] = useState<any>([])
    const supabase = createClient();
    let now:any = dayjs()
    const getInvoices = async () => {
        
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: invoices, error } = await supabase
        .from('invoices')
        .select(`
            id,
            status,
            clients (
                name,
                email,
                phone,
                address
            ),
            products (
                name,
                description,
                unit_price,
                quantity,
                total
            ),
            shipping_fees,
            tax_charges,
            sub_total,
            grand_total,
            created_at,
            paid_at,
            description
        `)
        .eq('admin_id',user?.id)
        .order('id', { ascending: true })
        if(invoices){
            setInvoices(invoices)
        }
    }
    interface productItem {
        name: string;
        quantity: number;
        unit_price: any;
        total: string;
        description: string;
        invoice_id?: string; // Make it optional if not all objects will have this property
      }
    const addInvoice = async (client_id:number,shipping_fees:number, status:string,productItems:Array<any>) => {
       
        if(status == 'unpaid') {
        now = null;
        }
        const newProductItems: productItem[] = productItems.map((item) => {
            return {
                name: item.product_name,
                quantity: item.product_quantity,
                unit_price: parseFloat(item.product_price).toFixed(2),
                total: (parseFloat(item.product_quantity) * parseFloat(item.product_price)).toFixed(2),
                description: item.product_description
                
            }
        })
        const sub_total = newProductItems.reduce((sum, item) => sum + parseFloat(item.total), 0);
        const tax_charges = sub_total * 0.1;
        const cost_of_shipping = shipping_fees ? shipping_fees : 0;
        const grand_total = sub_total + tax_charges + cost_of_shipping;
        const { data, error } = await supabase
        .from('invoices')
        .insert([
        {   
            client_id: client_id,
            status: status,
            paid_at: now,
            shipping_fees: cost_of_shipping,
            tax_charges: sub_total * 0.1,
            sub_total:sub_total,
            grand_total: grand_total
        },
        ])
        .select()
        if (error) {
            console.error('Error inserting invoice:', error);
            return;
          }
          
          if (!data || data.length === 0) {
            console.error('No data returned from insert');
            return;
          }
        const invoiceId = data[0].id;
        newProductItems.forEach(item => {
            item.invoice_id = invoiceId;
        })
    
        await supabase
        .from('products')
        .insert(newProductItems)
        .select()
    }
            
    const updateInvoice = async(id:Number,client_id:number,status:string) => {
       
        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            client_id: client_id, 
            status: status,
        })
        .eq('id', id)
        .select()
                
    }
    const deleteInvoice = async(id:Number) => {
        
        const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)
        
    }
    const updateStatus = async(id:Number) => {
        

        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            status: 'paid',
            paid_at: now
        })
        .eq('id', id)
        .select()
    }
    return {
        invoices,
        setInvoices,
        getInvoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        updateStatus
    }
}