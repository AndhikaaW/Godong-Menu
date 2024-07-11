"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
    DialogClose,
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
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { LuShoppingCart } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleCheck, CirclePlus, Delete, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Menu {
    id: number;
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

interface Cart {
    id: number;
    name: string;
    image: string;
    count: number;
    price: number;
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
    const [cart, setCart] = useState<Cart[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Menu | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [notification, setNotification] = useState<string | null>(null);

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
    }, [selectedCategory, refreshMenu, refreshAllMenu]);

    useEffect(() => {
        refreshAllMenu();
    }, [refreshAllMenu]);

    const handleCategoryChange = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
    };

    const handleAddClick = (product: Menu) => {
        setSelectedProduct(product);
    };

    const handleAddToCart = (product: Menu, quantity: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, count: item.count + quantity } : item
                );

            } else {
                return [...prevCart, { ...product, count: quantity }];
            }
        });
    };

    const filteredMenu = menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (cart.length === 0) {
            return;
        }
    
        const total = cart.reduce((total, item) => total + item.price * item.count, 0);
    
        try {
            const response = await axios.post('http://godongbackend.test/api/cart', { value: JSON.stringify(cart), total });
            console.log(response.data);
            setNotification('Pesanan berhasil dibuat!');
            setCart([]);
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
    return (
        <div className="container">
            <div className='flex justify-content-end sm:flex-row mt-5 me-4'>
                <Input
                    type="search"
                    placeholder="Search"
                    className=' w-1/4 ms-3 me-2 sm:w-1/4'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Sheet>
                    <SheetTrigger asChild>
                        <div className='flex align-items-center'>
                            <LuShoppingCart size={'30px'} color='black' />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto" style={{ scrollbarWidth: 'none' }}>
                        <SheetHeader >
                            <SheetTitle className='text-black'>Keranjang</SheetTitle>
                            <SheetDescription >
                                {cart.map((item, index) => (
                                    <Card key={index} className='m-2 p-3'>
                                        <div className='flex justify-content-between '>
                                            <div className='flex justify-center align-items-center gap-2'>
                                                {/* <Checkbox id={`cart-item-${index}`} /> */}
                                                {item.image ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${item.image}`}
                                                        alt={item.name}
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '10px' }}
                                                    />
                                                ) : (
                                                    <div className="avatar-fallback">img</div>
                                                )}
                                                <label htmlFor={`cart-item-${index}`} className=" text-start w-[80px]">{item.name}</label>
                                            </div>
                                            <div className="flex justify-start align-items-center">
                                                <label htmlFor={`cart-item-price-${index}`}><b>{item.count} x </b></label>
                                            </div>
                                            <div key={item.id} className='flex justify-start align-items-center gap-2'>
                                                <label htmlFor={`cart-item-price-${index}`}>{item.price}</label>
                                                <Trash size={'20px'} onClick={() => handleDelete(item.id)} />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter className='flex row gap-4 mt-4'>
                            <Card>
                                <div className='flex justify-content-between p-3'>
                                    <div className='flex justify-center align-items-center gap-2 me-3'>
                                        <label htmlFor="total">Total pesanan anda</label>
                                    </div>
                                    <div className='flex justify-center align-items-center gap-3'>
                                        <label htmlFor="price">Rp. {cart.reduce((total, item) => total + item.price * item.count, 0)}</label>
                                    </div>
                                </div>
                            </Card>
                            <SheetClose asChild>
                                <Button type="submit" className='text-white bg-[#61AB5B]' onClick={handleSubmit}>Tambah Pesanan</Button>
                            </SheetClose>
                            <div>
                                {notification && (
                                    <h4 className="notification text-center">
                                        {notification}
                                    </h4>
                                )}
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#61AB5B', margin: '10px auto' }}></div>
                <p>Nama</p>
            </div>
            <div className=" flex justify-center mt-3 mb-4 gap-4" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                <a href="#all">
                    <Button
                        onClick={() => handleCategoryChange(null)}
                        className={`text-black hover:bg-[#61AB5B] hover:font-bold ${selectedCategory === null ? 'bg-[#61AB5B]' : 'bg-[#333'}`}>
                        All
                    </Button>
                </a>
                {categories.map((category) => (
                    <a key={category.id} href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <Button
                            onClick={() => handleCategoryChange(category.id)}
                            className={`text-black hover:bg-[#61AB5B] hover:font-bold ${selectedCategory === category.id ? 'bg-[#61AB5B]' : 'bg-[#D5FFD4]'}`}>
                            {category.name}
                        </Button>
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                            <CardTitle className="text-center h-[70px] mb-auto overflow-auto" style={{ scrollbarWidth: 'none' }}>{product.name}</CardTitle>
                            <CardDescription className="text-sm">
                                <div className="w-auto h-[80px] overflow-auto mt-auto" style={{ scrollbarWidth: 'none' }}>
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
                                        <div className=" flex align-items-center bg-[#76C16F] ms rounded font-bold ms-1 p-2 sm:bg-[#76C16F]  sm:w-full sm:p-2" onClick={() => handleAddClick(product)}>
                                            add
                                            <div className="bg-white rounded-xl ms-2 ">
                                                <Plus size={'20px'} />
                                            </div>
                                        </div>
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
                                                        <ProductCard product={selectedProduct} onAddToCart={handleAddToCart} />
                                                    </div>
                                                )}
                                            </DialogDescription>
                                        </DialogHeader>
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

const ProductCard: React.FC<{ product: Menu, onAddToCart: (product: Menu, quantity: number) => void }> = ({ product, onAddToCart }) => {
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

    const handleAddToCart = () => {
        if (count === 0) return;
        onAddToCart(product, count);
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
                <DialogClose>
                    <Button type="submit" className="bg-[#6CC765] text-white flex-grow ms-4" onClick={handleAddToCart}>Add to Cart</Button>
                </DialogClose>
            </div>
        </div>
    );
};

