import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useInventoryHistory = () => {
    const [data, setData] = useState<any>([])
    const supabase = createClient()
    
    const getItemHistory = async (inventory_id:any) => {
    
        let query = await supabase
        .from('inventory_history')
        .select(`
          id,
          created_at,
          inventory(
            item_name
          ),
          transaction_date,
          transaction_type,
          quantity_change,
          current_quantity,
          unit_price,
          notes
        `)
        .eq('inventory_id',inventory_id)
        .order('id', { ascending: false })


        const { data:inventory_history, error } = await query
        if(error) {
            return 'Cannot get items in inventory'
        }
        if(inventory_history){
            setData(inventory_history)
        }
    }
    
    
    return {
        data,
        getItemHistory
    }
}