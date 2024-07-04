import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useSettings = () => {
    const [settings, setSettings] = useState<any>([])
    const supabase = createClient()
    
    const getSettings = async() => {
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let { data: settings, error } = await supabase
        .from('settings')
        .select('*')
        .eq('admin_id',user?.id)
        .order('id', { ascending: true })
        if(settings.length){
            setSettings(settings[0])
        }
    }
    const updateSettings = async (tin_number:string) => {
        const {
            data: { user },
          } = await supabase.auth.getUser()
        const { data, error } = await supabase
        .from('settings')
        .update([
        {   
            tin_number:tin_number
        },
        ])
        .eq('admin_id',user?.id)
        .select()

        return success()
    }
    

    return {
        settings,
        getSettings,
        updateSettings,
    }
}