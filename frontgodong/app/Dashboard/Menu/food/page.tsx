"use client";
import React, { useState } from "react";
import soto from '../../../../public/soto.png'
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StaticImageData } from 'next/image';
interface Product {
  idMenu: string;
  idCategory: string;
  name: string;
  image: StaticImageData;
  description: string;
  count: string,
  price: string;
}

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

function Foodpage() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([
    {
      idMenu: "322002",
      idCategory: "302002",
      name: "Iwak Lamongan",
      image: soto,
      description: "Soto Lamongan, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.20.000",
    }
  ]);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className='surface-0  vh-100 '>
      <div className="container">
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {products.map((product) => (
              <Card className='rounded mt-3 text-sm'>
                <CardHeader>
                  <img src="/img-4.jpg" alt="" className='shadow' style={{ width: '100%', borderRadius: '20px' }} />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className='text-sm'>
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <div className="flex items-center">
                    <p className="mb-0 text-sm fw-bold">{product.price}</p>
                  </div>
                  <div className="flex items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Add</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <h3 className="mb-3">Add to Cart</h3>
                          <DialogDescription>
                            <div className="flex justify-content-center mb-3">
                              <img src="/img-4.jpg" alt="" style={{ width: '40%', borderRadius: '20px' }} />
                            </div>
                            <h5>{product.name}</h5>
                            <CardDescription className='text-sm'>
                              {product.description}
                            </CardDescription>
                            <div className="flex justify-end ">
                              <div className="flex items-center text-black">
                                <CiSquareMinus size={'30px'} onClick={handleDecrement}/>
                                <p className="mb-0 mx-2">{count}</p>
                                <CiSquarePlus size={'30px'} onClick={handleIncrement}/>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button type="submit" className="text-white">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

