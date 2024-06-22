import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<any>([])
    const supabase = createClient()
    
    const getSuppliers = async () => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
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
        .order('id', { ascending: false })

        if(filter) {
            query = query.eq('name', filter) 
        }

        const { data:suppliers, error } = await query
        if(error) {
            return 'Cannot get data for suppliers'
        }
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

        if(error) {
            return error
        }
        return success(data)
        
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

        if(error) {
            return error
        }
        return success(data)
                
    }
    const deleteSupplier = async(id:Number) => {
        
        const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id)

        if(error) {
            return error
        }
        return success()
        
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