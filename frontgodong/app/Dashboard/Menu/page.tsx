"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import axios from "axios";

interface Menu {
    id: string;
    category_id: string;
    name: string;
    image: string;
    description: string;
    price: string;
}

const fetchMenu = async (): Promise<Menu[]> => {
    const response = await axios.get("http://godongbackend.test/api/menu-items");
    return response.data;
};

export default function Menu() {
    const [menu, setMenu] = useState<Menu[]>([]);

    const refreshMenu = useCallback(async () => {
        const menuItems = await fetchMenu();
        setMenu(menuItems);
    }, []);

    useEffect(() => {
        refreshMenu();
    }, [refreshMenu]);


    return (
        <div className="p-6 space-y-6">
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {menu.map((product) => (
                        <Card className='rounded mt-3 text-sm'>
                            <CardHeader>
                                {product.image && (
                                    <div className="flex justify-center">
                                        <Image src={`data:image/jpeg;base64,${product.image}`}
                                            alt={product.name}
                                            width={250}
                                            height={250}
                                            style={{ maxWidth: "250px", maxHeight: "250px", borderRadius: "10%" }} />
                                    </div>
                                )}
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
                                                            {/* <CiSquareMinus size={'30px'} onClick={handleDecrement}/>
                                <p className="mb-0 mx-2">{count}</p>
                                <CiSquarePlus size={'30px'} onClick={handleIncrement}/> */}
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
    );
}
