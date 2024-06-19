// context/UserContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'


interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
const defaultValue: UserContextType = {
  user: null,
  setUser: () =>{}
}
const UserContext = createContext<UserContextType>(defaultValue)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient();
  useEffect(() => {
    const getUser = async () => {

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user ?? null)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event:any, session:any) => {
      setUser(user ?? null)
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
