import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export const useProducts = () => {
    const [products, setProducts] = useState<any>([])
    const supabase = createClient();
    
    const getProducts = async () => {
        
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('admin_id',user?.id)
        .range(0, 9)
        .order('id', { ascending: true })
        if(products){
            setProducts(products)
        }
    }
    
    const addProduct = async (name:String,description:String,category:String,price:Number,quantity:Number) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('products')
        .insert([
        {   name: name, 
            description: description,
            category: category,
            price: price,
            quantity: quantity,
            admin_id: user?.id
        },
        ])
        .select()
        
    }

    const updateProduct = async (id:Number,name:String,description:String,category:String,price:String,quantity:String) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('products')
        .update(
        {   name: name, 
            description: description,
            category: category,
            price: price,
            quantity: quantity,
            admin_id: user?.id
        },
        )
        .eq('id', id)
        .select()
        
    }
            
    const deleteProduct = async(id:Number) => {
        
        const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        
    }
    return {
        products,
        setProducts,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct
    }
}