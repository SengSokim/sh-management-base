import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export const useInvoices = () => {
    const [invoices, setInvoices] = useState<any>([])
    const supabase = createClient();
    
    const getInvoices = async () => {
        
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: invoices, error } = await supabase
        .from('invoices')
        .select(`
            id,
            quantity,
            price,
            status,
            clients (
                name,
                email,
                phone,
                address
            ),
            products (
                name
            ),
            created_at
        `)
        .eq('admin_id',user?.id)
        .range(0, 9)
        .order('id', { ascending: true })
        if(invoices){
            setInvoices(invoices)
        }
    }
    
    const addInvoice = async (client_id:number,product_id:number,quantity:number,price:number,status:string) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('invoices')
        .insert([
        {   
            client_id: client_id, 
            product_id: product_id,
            quantity: quantity,
            price: price,
            status: status,
            admin_id: user?.id
        },
        ])
        .select()
        
    }
            
    const updateInvoice = async(id:Number,client_id:number,product_id:number,quantity:number,price:number,status:string) => {
       
        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            client_id: client_id, 
            product_id: product_id,
            quantity: quantity,
            price: price,
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
    return {
        invoices,
        setInvoices,
        getInvoices,
        addInvoice,
        updateInvoice,
        deleteInvoice
    }
}