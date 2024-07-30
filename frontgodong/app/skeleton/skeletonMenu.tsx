import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

const MenuSkeleton = () => (
  <Card className="rounded text-sm">
    <CardHeader>
      <Skeleton className="w-[200px] h-[150px] rounded-[20px]" />
    </CardHeader>
    <div className="mx-3 mb-2">
      <Skeleton className="h-5 w-3/4 mx-auto" />
      <div className="mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </div>
    </div>
    <CardFooter className="flex sm:flex-row flex-col">
      <Skeleton className="h-5 w-1/2 mb-2" />
      <Skeleton className="h-8 w-20" />
    </CardFooter>
  </Card>
);

const HeaderSkeleton = () => (
  <div className='flex justify-content-end flex-col-reverse sm:flex-row me-4 sticky top-0 py-2 px-3 w-full bg-white z-10 shadow-sm rounded'>
    <div className='text-start mt-2 w-full'>
      <Skeleton className="h-8 w-24 mb-2" />
      <div className="flex justify-start pt-3 mb-2 gap-4 w-full" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20" />
        ))}
      </div>
    </div>
    <div className="flex align-items-center justify-content-end sm:flex-row w-full ">
      <Skeleton className="h-10 w-1/2 ms-3 me-2 mt-2 sm:w-1/2" />
    </div>
  </div>
);

const ProductGridSkeleton = ({ count = 8 }) => (
  <>
    <HeaderSkeleton />
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3">
      {Array(count).fill(0).map((_, index) => (
        <MenuSkeleton key={index} />
      ))}
    </div>
  </>
);

export default ProductGridSkeleton;