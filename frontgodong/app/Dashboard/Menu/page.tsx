"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input";
import { LuShoppingCart } from "react-icons/lu";

interface Menu {
    id: string;
    category_id: string;
    name: string;
    image: string;
    description: string;
    price: number;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get("http://godongbackend.test/api/categories");
    return response.data;
};

const fetchMenu = async (): Promise<Menu[]> => {
    const response = await axios.get("http://godongbackend.test/api/menu-items");
    return response.data;
};

const fetchMenuByCategory = async (categoryId: string): Promise<Menu[]> => {
    const response = await axios.get(`http://godongbackend.test/api/categories/${categoryId}/menu-items`);
    return response.data.menuItems;
};

export default function Menu() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menu, setMenu] = useState<Menu[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Menu | null>(null);
    const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");


    const refreshCategories = useCallback(async () => {
        const categories = await fetchCategories();
        setCategories(categories);
    }, []);

    const refreshMenu = useCallback(async (categoryId: string) => {
        const menuItems = await fetchMenuByCategory(categoryId);
        setMenu(menuItems);
    }, []);

    const refreshAllMenu = useCallback(async () => {
        const menuItems = await fetchMenu();
        setMenu(menuItems);
    }, []);

    useEffect(() => {
        refreshCategories();
    }, [refreshCategories]);

    useEffect(() => {
        if (selectedCategory) {
            refreshMenu(selectedCategory);
        } else {
            refreshAllMenu();
        }
    }, [selectedCategory, refreshMenu, , refreshAllMenu]);

    useEffect(() => {
        refreshAllMenu();
    }, [refreshAllMenu]);

    const handleCategoryChange = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
    };
    const handleAddClick = (product: Menu) => {
        setSelectedProduct(product);
        setCount(1);
    };

    const filteredMenu = menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className='flex justify-content-end sm:flex-row mt-5 me-4'>
                <Input type="search" placeholder="Search" className=' w-1/4 ms-3 me-2 sm:w-1/4' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
                <Sheet>
                    <SheetTrigger asChild>
                        <div className='flex align-items-center'>
                            <LuShoppingCart size={'30px'} color='black' />
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className='text-black'>Keranjang</SheetTitle>
                            <SheetDescription>
                                {/* {products.map((product) => (
                                    <Card className='m-2 p-3'>
                                        <div className='flex justify-content-between'>
                                            <div className='flex justify-center align-items-center gap-2 me-3'>
                                                <Checkbox id="terms" />
                                                <img src="/soto.png" alt="" />
                                                <label htmlFor="name">{product.name}</label>
                                            </div>
                                            <div className='flex justify-center align-items-center gap-3'>
                                                <label htmlFor="price"><b>{product.count} pcs</b></label>
                                                <label htmlFor="price">{product.price}</label>
                                            </div>
                                        </div>
                                    </Card>
                                ))} */}
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter className='flex row gap-4 mt-4'>
                            <Card>
                                <div className='flex justify-content-between p-3'>
                                    <div className='flex justify-center align-items-center gap-2 me-3'>
                                        <label htmlFor="total">Total pesanan anda</label>
                                    </div>
                                    <div className='flex justify-center align-items-center gap-3'>
                                        <label htmlFor="price">Rp.</label>
                                    </div>
                                </div>
                            </Card>
                            <SheetClose asChild>
                                <Button type="submit" className='text-white bg-[#61AB5B]'>Tambah Pesanan</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#61AB5B', margin: '10px auto' }}></div>
                <p>Nama</p>
                <div className='flex flex-row justify-center gap-3'>
                    {/* {menu.map((listmenu) => (
                        // <a href='#'><Button className='bg-white border'>{listmenu.name}</Button></a>
                        <a href={`#${listmenu.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            <Button variant="ghost" className="bg-[#D5FFD4] text-black hover:bg-[#61AB5B] hover:font-bold">
                                {listmenu.name}
                            </Button>
                        </a>
                    ))} */}
                </div>
            </div>
            <div className=" flex justify-center mt-3 mb-4 gap-4" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                <a href="#all">
                    <Button
                        onClick={() => handleCategoryChange(null)}
                        className={`text-black hover:bg-[#61AB5B] hover:font-bold ${selectedCategory === null ? ' bg-[#61AB5B]' : 'bg-[#333'}`}>
                        All
                    </Button>
                </a>
                {categories.map((category) => (
                    <a key={category.id} href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <Button
                            onClick={() => handleCategoryChange(category.id)}
                            className={`text-black hover:bg-[#61AB5B] hover:font-bold ${selectedCategory === category.id ? 'bg-[#61AB5B]' : 'bg-[#D5FFD4]'}`}
                        >
                            {category.name}
                        </Button>
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* {menu.map((product) => ( */}
                {filteredMenu.map((product) => (
                    <Card className="rounded mt-3 text-sm" key={product.id}>
                        <CardHeader>
                            <div className="flex justify-content-center align-items-center ">
                                <div style={{ width: '200px', height: '150px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #ccc', background: '#ccc' }}>
                                    {product.image ? (
                                        <img
                                            src={`data:image/jpeg;base64,${product.image}`}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="avatar-fallback">img</div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-center h-[50px]">{product.name}</CardTitle>
                            <CardDescription className="text-sm">
                                <div className="w-auto h-[80px] overflow-auto" style={{ scrollbarWidth: 'none' }}>
                                    {product.description}
                                </div>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="flex items-center">
                                <p className="mb-0 text-sm fw-bold">Rp.{product.price}</p>
                            </div>
                            <div className="flex items-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex align-items-center rounded font-bold sm:bg-[#76C16F] p-2 w-3 sm:w-full" onClick={() => handleAddClick(product)}>add<CiSquarePlus size={'20px'} /></div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <h3 className="mb-3">Add to Cart</h3>
                                            <DialogDescription >
                                                <div className="flex justify-content-center mb-3">
                                                    <div style={{ width: '200px', height: '150px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #ccc', background: '#ccc' }}>
                                                        {product.image ? (
                                                            <img
                                                                src={`data:image/jpeg;base64,${product.image}`}
                                                                alt={product.name}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <div className="avatar-fallback">img</div>
                                                        )}
                                                    </div>
                                                </div>
                                                {selectedProduct && (
                                                    <div className="mt-5">
                                                        <ProductCard product={selectedProduct} />
                                                    </div>
                                                )}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>

                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    );
}

const ProductCard: React.FC<{ product: Menu }> = ({ product }) => {
    const [count, setCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDecrement = () => {
        setCount(prevCount => {
            const newCount = Math.max(prevCount - 1, 0);
            setTotalPrice(newCount * product.price);
            return newCount;
        });
    };

    const handleIncrement = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            setTotalPrice(newCount * product.price);
            return newCount;
        });
    };

    return (
        <div className="text-black m-3">
            <h5>{product.name}</h5>
            <label htmlFor="price">Rp.{product.price}</label>
            <div className="flex justify-between pt-3 pb-2">
                <label>Total Price</label>
                <label>Rp.{totalPrice}</label>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center text-black">
                    <CiSquareMinus size={'40px'} onClick={handleDecrement} />
                    <p className="mb-0 mx-2">{count}</p>
                    <CiSquarePlus size={'40px'} onClick={handleIncrement} />
                </div>
                <Button type="submit" className="bg-[#6CC765] text-white flex-grow ms-4">Add to Cart</Button>
            </div>
        </div>
    );
};

