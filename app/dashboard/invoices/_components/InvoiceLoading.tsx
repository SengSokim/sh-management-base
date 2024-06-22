import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function InvoiceLoading() {
  return (
    <div className="">
      <Skeleton className="h-8 w-[200px]" />
      <div className="flex mt-5">
        <Skeleton className="h-[180px] w-[400px] mr-3" />
        <Skeleton className="h-[180px] w-[180px] mr-3" />
        <Skeleton className="h-[180px] w-[180px] mr-5" />
        <Skeleton className="h-[220px] w-[380px] mr-3" />
      </div>
      <div className="flex mt-5">
        <Skeleton className="h-[500px] w-[785px] mr-5"/>
        <Skeleton className="h-[500px] w-[380px]"/>
      </div>
    </div>
  )
}

export default InvoiceLoading