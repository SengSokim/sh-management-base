import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export const useSettings = () => {
    const [settings, setSettings] = useState<any>([])
    const supabase = createClient();
    
    const getSettings = async() => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
        let { data: settings, error } = await supabase
        .from('settings')
        .select('*')
        .eq('admin_id',user?.id)
        .order('id', { ascending: true })
        if(settings){
            setSettings(settings)
        }
    }
    const createSetting = async (admin_id:string) => {
        const { data, error } = await supabase
        .from('settings')
        .insert([
        {   
            admin_id:admin_id
        },
        ])
        .select()
    }
    const updateSetting = async (admin_id:string) => {
        
        const { data, error } = await supabase
        .from('settings')
        .update([
        {   
            admin_id:admin_id
        },
        ])
        .select()
    }
    

    return {
        settings,
        createSetting,
        updateSetting,
    }
}