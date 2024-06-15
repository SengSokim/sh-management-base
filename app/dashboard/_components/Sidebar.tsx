"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Cog, Home, LineChart, Package, Package2, ShoppingCart, Truck, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function Sidebar() {
    const pathname = usePathname()
  return (
    
    <div className="hidden bg-muted/40 md:block bg-midnight text-white">
        
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 hover:text-alice-blue" />
              <span className="hover">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4 text-gold" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${pathname == '/dashboard' ? 'bg-cloud text-black font-bold' : ''}`}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/dashboard/invoices"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${pathname.includes('invoices') ? 'bg-cloud text-black font-bold' : ''}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Invoices
                
              </Link>
              <Link
                href="/dashboard/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${pathname.includes('customers') ? 'bg-cloud text-black font-bold' : ''}`}
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="/dashboard/suppliers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${pathname.includes('suppliers') ? 'bg-cloud text-black font-bold' : ''}`}
              >
                <Truck className="h-4 w-4"/>
                Suppliers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                  href="/dashboard/settings/general"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-alice-blue ${pathname.includes('settings') ? 'bg-cloud text-black font-bold' : ''}`}
                >
                  <Cog className="h-4 w-4"/>
                  Settings
                </Link>
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <form action={signOut}>
                    <Button size="sm" className="w-full text-red-500 hover:bg-zinc-300">
                      Logout
                    </Button>
                    
                </form>
                
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
  )
}

export default Sidebar