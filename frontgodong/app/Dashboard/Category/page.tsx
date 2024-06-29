"use client";
import React, { useState } from "react";
import Link from 'next/link'
import { LucideIcon } from "lucide-react";
import { CupSoda, Pen, Plus, Popcorn, Search, Trash2, Upload, UtensilsCrossed, Cake } from "lucide-react";
interface Product {
    name: string;
    icon?: LucideIcon;
    description: string;
}
function Categorypage() {
    const [products, setProducts] = useState<Product[]>([
        {
            name: "Makanan",
            icon: UtensilsCrossed,
            description: "Kategori Makanan Untuk seperti Nasgor dkk",
        },
        {
            name: "Minuman",
            icon: CupSoda,
            description: "Kategori Minuman untuk seperti Ice dkk",
        },
        {
            name: "Snack",
            icon: Popcorn,
            description: "Snack untuk seperti popcorn dkk",
        },
        {
            name: "roti",
            icon: Cake,
            description: "Cake untuk seperti Roti dkk",
        },
    ]);
    return (

        <div className='surface-0 p-lg-5 vh-100 '>
            <div className='text-center'>
                <h1>Category</h1>
                <div className="underline" style={{ width: '150px', height: '4px', background: '#d4a123', margin: 'auto auto 50px' }}></div>
            </div>
            <div className="container">
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:flex-row justify-content-center align-items-center '>
                        {products.map((product) => (
                            <Link href={'/dashboard/menu/food'} className='no-underline p-5'>
                                <div className="card justify-content-center align-items-center ">
                                    <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center mt-3" style={{ width: '100px', height: '100px' }}>
                                        {product.icon && <product.icon size={24} />}
                                    </div>
                                    <div className="card-body text-center">
                                        {product.name && <product.name />}
                                        <h3 className="card-title">
                                            {product.name}
                                        </h3>
                                        <p className="card-text text-lg">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Categorypage