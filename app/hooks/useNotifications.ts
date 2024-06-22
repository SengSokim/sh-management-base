import { success } from "@/lib/helper"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<any>([])
    const supabase = createClient()
    
    const getNotifications = async () => {
        const filter = null
        const {
            data: { user },
          } = await supabase.auth.getUser()
        let query = await supabase
        .from('notifications')
        .select('*')
        .eq('admin_id',user?.id)
        .order('id', { ascending: false })

        if(filter) {
            query = query.eq('name', filter) 
        }

        const { data:notifications, error } = await query
        if(error) {
            return 'Cannot get data for notifications'
        }
        if(notifications){
            setNotifications(notifications)
        }
    }
    const addNotifications = async (item:any) => {
       
        const { data, error } = await supabase
        .from('notifications')
        .insert([
            {   
                data: item, 
            },
        ])
        .select()

        if(error) {
            return error
        }

        return success()
        
    }
    const updateStatusNotification = async () => {
        const { error } = await supabase
        .from('notifications') 
        .update({ 
            is_read: true
        })
        .select()

        if(error) {
            return error
        }

        return success()
    }
    return {
        notifications,
        setNotifications,
        getNotifications,
        addNotifications,
        updateStatusNotification
    }
}