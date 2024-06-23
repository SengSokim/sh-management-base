import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function InvoiceLoading() {
  return (
    <div className="">
      <Skeleton className="h-8 max-w-sm" />
      <div className="flex mt-5">
        <Skeleton className="h-[180px] w-full max-w-2xl mr-3" />
        <Skeleton className="h-[180px] w-full max-w-xl mr-3" />
        <Skeleton className="h-[180px] w-full max-w-xl mr-5" />
        <Skeleton className="h-[220px] w-full max-w-xl mr-3" />
      </div>
      <div className="flex mt-5">
        <Skeleton className="h-[500px] w-full max-w-5xl mr-5"/>
        <Skeleton className="h-[500px] w-full max-w-xl"/>
      </div>
    </div>
  )
}

export default InvoiceLoading