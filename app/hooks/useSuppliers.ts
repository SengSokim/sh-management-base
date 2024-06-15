import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<any>([])
    const supabase = createClient();
    
    const getSuppliers = async () => {
        
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: suppliers, error } = await supabase
        .from('suppliers')
        .select(`
            id,
            name,
            email,
            phone,
            address,
            created_at
        `)
        .eq('admin_id',user?.id)
        .order('id', { ascending: true })
        if(suppliers){
            setSuppliers(suppliers)
        }
    }
    
    const addSupplier = async (name:string,email:string,phone:string,address:string) => {
        
        const { data, error } = await supabase
        .from('suppliers')
        .insert([
        {   
            name: name, 
            email: email,
            phone: phone,
            address: address
        },
        ])
        .select()
        
    }
            
    const updateSupplier = async(id:Number,name:string,email:string,phone:string,address:string) => {
       
        const { data, error } = await supabase
        .from('suppliers')
        .update({ 
            name: name, 
            email: email,
            phone: phone,
            address: address,
        })
        .eq('id', id)
        .select()
                
    }
    const deleteSupplier = async(id:Number) => {
        
        const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id)
        
    }
    return {
        suppliers,
        setSuppliers,
        getSuppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier
    }
}