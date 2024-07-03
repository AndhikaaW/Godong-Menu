"use client";
import React, { useState } from "react";
import soto from '../../../../public/soto.png'
import esteh from '../../../../public/favicon.ico'
import {CiSquarePlus, CiSquareMinus } from "react-icons/ci";
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

function Drinkpage() {
  const [products, setProducts] = useState<Product[]>([
    {
      idMenu: "322002",
      idCategory: "302002",
      name: "Es Teh",
      image: soto,
      description: "Es Kuwut, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.5000",
    },
    {
      idMenu: "302002",
      idCategory: "302002",
      name: "Es Kuwut",
      image: soto,
      description: "Es Kuwut, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.5000",
    },
    {
      idMenu: "322002",
      idCategory: "302002",
      name: "Es Teh",
      image: esteh,
      description: "Es Kuwut, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.5000",
    },
    {
      idMenu: "302002",
      idCategory: "302002",
      name: "Es Kuwut",
      image: soto,
      description: "Es Kuwut, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.5000",
    },
    {
      idMenu: "322002",
      idCategory: "302002",
      name: "Es Teh",
      image: esteh,
      description: "Es Kuwut, soto khas Jawa Timur -",
      count: "1",
      price: "Rp.5000",
    }
  ]);
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
                    <CiSquareMinus size={'30px'} />
                    <p className="mb-0 mx-2">1</p>
                    <CiSquarePlus size={'30px'} />
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

export default Drinkpage