import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useInventory = () => {
    const [items, setItems] = useState<any>([])
    const [item, setItem] = useState<any>()
    const supabase = createClient()
    
    const getItems = async () => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
        .from('inventory')
        .select(`
          id,
          suppliers(
            id,
            name
          ),
          sku,
          item_name,
          paper_type,
          weight,
          color,
          size,
          quantity,
          date_received,
          reorder_level
        `)
        .eq('admin_id',user?.id)
        .order('id', { ascending: false })

        if(filter) {
            query = query.eq('item_name', filter) 
        }

        const { data:inventory, error } = await query
        if(error) {
            return 'Cannot get items in inventory'
        }
        if(inventory){
            setItems(inventory)
        }
    }
    const getItemById = async (id:number) => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
        .from('inventory')
        .select(`
          id,
          suppliers(
            id,
            name
          ),
          sku,
          item_name,
          paper_type,
          weight,
          color,
          size,
          quantity,
          date_received,
          reorder_level
        `)
        .eq('admin_id',user?.id)
        .eq('id',id)
        .order('id', { ascending: false })

        if(filter) {
            query = query.eq('item_name', filter) 
        }

        const { data:inventory, error } = await query
        if(error) {
            return 'Cannot get item in inventory'
        }
        if(inventory){
            setItem(inventory[0])
        }
    }
    const addItems = async (supplier_id:number,item_name:string,sku:string, paper_type:any,weight:any, color:any, size:any, quantity:number, date_received:any, reorder_level:any) => {
        
        const { data, error } = await supabase
        .from('inventory')
        .insert([
        {   
            supplier_id: supplier_id, 
            item_name: item_name,
            sku: sku,
            paper_type: paper_type,
            weight: weight,
            color: color,
            size: size,
            quantity: quantity,
            date_received: date_received,
            reorder_level: reorder_level,

        },
        ])
        .select()

        if(error) {
            return error
        }
        return success(data)
        
    }
            
    const updateItem = async(id:number, supplier_id:any,item_name:string,sku:string, paper_type:string,weight:string, color:string, size:string, quantity:number, date_received:any, reorder_level:number) => {
       
        const { data, error } = await supabase
        .from('inventory')
        .update({ 
            supplier_id: parseInt(supplier_id), 
            item_name: item_name,
            sku: sku,
            paper_type: paper_type,
            weight: weight,
            color: color,
            size: size,
            quantity: quantity,
            date_received: date_received,
            reorder_level: reorder_level,
        })
        .eq('id', id)
        .select()

        if(error) {
            return error
        }
        return success(data)
                
    }
    const deleteItem = async(id:Number) => {
        
        const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id)

        if(error) {
            return error
        }
        return success()
        
    }
    return {
        items,
        item,
        setItem,
        setItems,
        getItems,
        getItemById,
        addItems,
        updateItem,
        deleteItem
    }
}