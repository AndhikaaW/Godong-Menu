import React from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function Foodpage() {
  return (
    <div className='surface-0  vh-100 '>
      <div className="container">
        <div className='container mx-auto '>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[...Array(8)].map((_, index) => (
              <Card key={index} className='rounded mt-3 text-sm'>
                <CardHeader>
                  <img src="/img-5.jpg" alt="" className='shadow' style={{ width: '100%', borderRadius: '20px' }} />
                </CardHeader>
                <CardContent>
                  <CardTitle>Risoles</CardTitle>
                  <CardDescription className='text-sm'>
                    Nasi Pecel khas Madiun yang memadukan nasi putih dengan aneka sayuran segar yang disiram dengan bumbu kacang khas. Dalam setiap porsinya, Anda akan menemukan kombinasi lezat dari sayuran.
                  </CardDescription>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <div className="flex items-center">
                    <p className="mb-0 text-sm fw-bold">Rp 15.000</p>
                  </div>
                  <div className="flex items-center">
                    <CiCircleMinus size={'30px'} />
                    <p className="mb-0 mx-2">1</p>
                    <CiCirclePlus size={'30px'} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Foodpage