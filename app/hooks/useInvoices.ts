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
            quantity,
            price,
            status,
            clients (
                name,
                email,
                phone,
                address
            ),
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
    
    const addInvoice = async (client_id:number,quantity:number,price:number,status:string) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        
          if(status == 'unpaid') {
            now = null;
          }
        const { data, error } = await supabase
        .from('invoices')
        .insert([
        {   
            client_id: client_id,
            quantity: quantity,
            price: price,
            status: status,
            admin_id: user?.id,
            paid_at: now
        },
        ])
        .select()
        
    }
            
    const updateInvoice = async(id:Number,client_id:number,quantity:number,price:number,status:string) => {
       
        const { data, error } = await supabase
        .from('invoices')
        .update({ 
            client_id: client_id, 
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