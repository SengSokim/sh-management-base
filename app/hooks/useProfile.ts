import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useProfile = () => {
    const [profile, setProfile] = useState<any>([])
    const supabase = createClient()
    
    const getProfile = async() => {
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id',user?.id)
        .order('id', { ascending: true })
        if(profiles){
            setProfile(profiles[0])
        }
    }
    const updateProfile = async (tin_number:string, exchange_rate: number) => {
        const {
            data: { user },
          } = await supabase.auth.getUser()
        const { data, error } = await supabase
        .from('profiles')
        .update([
        {   
            tin_number:tin_number,
            exchange_rate:exchange_rate
        },
        ])
        .eq('admin_id',user?.id)
        .select()

        return success()
    }
    

    return {
        profile,
        getProfile,
        updateProfile,
    }
}