"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Product {
    name: string;
    description: string;
    price: string;
}

const Menupage = ({ children }: any) => {
    const router = useRouter();
    const nestedMenuitems = [
        {
            label: 'Food',
            command: () => {
                router.push('/dashboard/menu/food')
            },
            className: 'me-5',
        },
        {
            label: 'Drink',
            command: () => {
                router.push('/dashboard/menu/drink')
            },
            className: 'me-5'
        },
        {
            label: 'Snack',
            command: () => {
                router.push('/dashboard/menu/snack')
            },
            className: 'me-5'
        }
    ];
    const [products, setProducts] = useState<Product[]>([
        {
            name: "Iwak Lamongan",
            description: "Soto Lamongan, soto khas Jawa Timur -",
            price: "Rp.20.000",
        },
        {
            name: "Iwak Lamongan",
            description: "Soto Lamongan, soto khas Jawa Timur -",
            price: "Rp.20.000",
        },
        {
            name: "Iwak Lamongan",
            description: "Soto Lamongan, soto khas Jawa Timur -",
            price: "Rp.20.000",
        },
        {
            name: "Iwak Lamongan",
            description: "Soto Lamongan, soto khas Jawa Timur -",
            price: "Rp.20.000",
        },
        {
            name: "Iwak Lamongan",
            description: "Soto Lamongan, soto khas Jawa Timur -",
            price: "Rp.20.000",
        },
       
    ]);
    return (
        <div className='surface-0 p-lg-4'>
            <div className='flex justify-content-end sm:flex-row mt-5 me-4'>
                <Input type="search" placeholder="Search" className=' w-1/4 ms-3 me-2 sm:w-1/4' />
                <Dialog>
                    <DialogTrigger asChild>
                        <LuShoppingCart size={'30px'} color='black' />
                    </DialogTrigger>
                    <DialogContent className="flex-grow">
                        <DialogHeader>
                            <DialogTitle>Keranjang</DialogTitle>
                            <DialogDescription className='flex flex-wrap w-auto'>
                                {products.map((product) => (
                                    <Card className='m-2 w-1/3'>
                                        <CardHeader >
                                            <CardTitle>{product.name}</CardTitle>
                                            <CardDescription>{product.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit" className='text-white'>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#d4a123', margin: '10px auto' }}></div>
                <p>Menu Godong</p>
                <Menubar model={nestedMenuitems} className='justify-content-center ' style={{ background: 'white', border: 'None' }}></Menubar>
            </div>
        </div>
    )
}

export default Menupage

