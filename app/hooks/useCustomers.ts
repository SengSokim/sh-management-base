import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export const useCustomers = () => {
    const [customers, setCustomers] = useState<any>([])
    const supabase = createClient();
    
    const getCustomers = async () => {
        
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .eq('admin_id',user?.id)
        .range(0, 9)
        .order('id', { ascending: true })
        if(clients){
            setCustomers(clients)
        }
    }
    
    const addCustomer = async (name:String,phone:String,address:String,email:String) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('clients')
        .insert([
        {   name: name, 
            phone: phone,
            address: address,
            email: email,
            admin_id: user?.id
        },
        ])
        .select()
        
    }
            
    const updateCustomer = async(id:Number,name:String, phone:String,address:String, email:String) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('clients')
        .update({ 
            name: name, 
            phone: phone,
            address: address,
            email: email,
            admin_id: user?.id
        })
        .eq('id', id)
        .select()
                
    }
    const deleteCustomer = async(id:Number) => {
        
        const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        
    }
    return {
        customers,
        setCustomers,
        getCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer
    }
}