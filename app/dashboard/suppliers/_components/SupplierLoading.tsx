import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function SupplierLoading() {
  return (
    <div className="">
      <Skeleton className="h-8 w-[200px]" />
      <div className="flex mt-5">
        {[1,2,3].map((item) => (
          <Skeleton key={item} className="h-8 w-[100px] mr-3" />
        ))}
      </div>
      <div className="mt-5">
        <Skeleton className="h-[500px] "/>
      </div>
    </div>
  );
}

export default SupplierLoading;
