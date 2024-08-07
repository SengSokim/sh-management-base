import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useCustomers = () => {
    const [customers, setCustomers] = useState<any>([])
    const supabase = createClient()
    
    const getCustomers = async () => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
        .from('customers')
        .select('*')
        .eq('admin_id',user?.id)
        .order('id', { ascending: false })
        if(filter) {
            query = query.eq('name', filter) 
        }

        const { data:customers, error } = await query
        if(error) {
            return 'Cannot get data for customers'
        }
        if(customers){
            setCustomers(customers)
        }
    }
    
    const addCustomer = async (name:String,type:any, company_name:any,phone:String,address:String,email:String, tin_number:String) => {
       
        const { data, error } = await supabase
        .from('customers')
        .insert([
        {   name: name, 
            customer_type: type, 
            company_name: company_name, 
            phone: phone,
            address: address,
            email: email,
            tin_number: tin_number || null
        },
        ])
        .select()

        if(error) {
            return error
        }

        return success()
        
    }
    const addMultiCustomers = async (customerData:any) => {
       
        const { data, error } = await supabase
        .from('customers')
        .insert(customerData)
        .select()

        if(error) {
            return error
        }

        return success()
        
    }
            
    const updateCustomer = async(id:Number,name:String, type:any, company_name:any, phone:String,address:String, email:String, tin_number:String) => {
    
        const { data, error } = await supabase
        .from('customers')
        .update({ 
            name: name, 
            customer_type: type, 
            company_name: company_name, 
            phone: phone,
            address: address,
            email: email,
            tin_number: tin_number
        })
        .eq('id', id)
        .select()

        if(error) {
            return error
        }

        return success()
                
    }
    const deleteCustomer = async(id:Number) => {
        
        const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id)
        
        if(error) {
            return error
        }

        return success()
        
    }
    return {
        customers,
        setCustomers,
        getCustomers,
        addCustomer,
        addMultiCustomers,
        updateCustomer,
        deleteCustomer
    }
}