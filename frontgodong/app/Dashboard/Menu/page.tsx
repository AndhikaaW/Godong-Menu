"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
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
import { CircleCheck, CirclePlus, Delete, Plus, TicketPercent, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
import { Badge } from 'primereact/badge';
import { Item } from "@radix-ui/react-select";

interface Menu {
    kode_menu: string;
    category_id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    diskon_persen: number;
    diskon_rupiah: number;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
}

interface Cart {
    kode_menu: string;
    name: string;
    image: string;
    count: number;
    price: number;
    discount: number;
    totalPrice: number;
}


const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get("http://192.168.200.100:8000/api/categories");
    return response.data;
};

const fetchMenu = async (): Promise<Menu[]> => {
    const response = await axios.get("http://192.168.200.100:8000/api/menu-items");
    return response.data;
};

const fetchMenuByCategory = async (categoryId: string): Promise<Menu[]> => {
    const response = await axios.get(`http://192.168.200.100:8000/api/categories/${categoryId}/menu-items`);
    return response.data.menuItems;
};

export default function Menu() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menu, setMenu] = useState<Menu[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);
    const [userData, setUserData] = useState<any>(null);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Menu | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [notification, setNotification] = useState<string | null>(null);
    function formatCurrency(value : number) {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace('Rp', 'Rp.').trim();
  }

    useEffect(() => {
        const fetchUserData = async () => {
            const userinfo = localStorage.getItem("user-info");
            let email = userinfo ? userinfo.replace(/["]/g, "") : "";
            if (!email) {
                setError("Email tidak ditemukan di localStorage");
                return;
            }

            try {
                const response = await axios.get(
                    `http://192.168.200.100:8000/api/user/${email}`
                );
                setUserData(response.data);
            } catch (err) {
                setError("Gagal mengambil data user");
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

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

    const handleAddToCart = (product: Menu, quantity: number, discount: number, totalPrice: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.kode_menu === product.kode_menu);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.kode_menu === product.kode_menu ? { ...item, count: item.count + quantity, discount: item.discount + discount ,totalPrice: item.totalPrice} : item
                );

            } else {
                return [...prevCart, { ...product, count: quantity, discount: discount, totalPrice:totalPrice}];
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

        const subTotal = cart.reduce((total, item) => total + item.price * item.count, 0);
        const total = subTotal;

        try {
            const transactionData = {
                id_user: userData.id,
                no_telepon: userData.phone,
                alamat: userData.address,
                sub_total: subTotal,
                total: total,
                items: cart.map(item => ({
                    kode_menu: item.kode_menu,
                    count: item.count,
                    price: item.price
                }))
            };
            const response = await axios.post('http://godongbackend.test/api/transaksi', transactionData);
            console.log(response.data);
            setNotification('Pesanan berhasil dibuat!');
            setCart([]);
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error(error);
            setNotification('Terjadi kesalahan saat membuat pesanan.');
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleDelete = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.kode_menu !== productId));
    };
    const getDiscountBadge = (product: any) => {
        if (product.diskon_persen && product.diskon_persen > 0) {
            return (
                // <span className="pi pi-shopping-cart text-sm font-bold text-red-600">
                //     -{product.diskon_persen}% OFF
                // </span>
                <div className="flex align-items-center">
                    <Badge value={" " + product.diskon_persen + "% OFF"} className="bg-red-400 pi pi-tag mr-2 rounded-none text-sm align-items-center p-1"></Badge>
                </div>

            );
        }
        return null;
    };
    return (
        <div className="container ">
            <div className='flex justify-content-end flex-col sm:flex-row me-4 sticky top-0 py-2 px-3 w-full bg-white z-10 '>
                <div className='text-start mt-2'>
                    <h1>Menu<div className="underline" style={{ width: '100px', height: '4px', background: '#61AB5B', margin: '2px' }}></div></h1>
                    <div className="flex justify-start pt-3 mb-2 gap-4 w-full" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
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
                </div>
                <div className="flex align-items-center justify-content-end sm:flex-row w-full ">
                    <Input
                        type="search"
                        placeholder="Search"
                        className=' w-1/2 ms-3 me-2 mt-2 sm:w-1/3'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex align-items-center pt-2">
                                <i className="pi pi-shopping-cart p-text-secondary p-overlay-badge" style={{ fontSize: '2rem' }}>
                                    <Badge value={cart.length} className="bg-[#61AB5B]"></Badge>
                                </i>
                            </div>
                        </SheetTrigger>
                        <SheetContent className="overflow-auto" style={{ scrollbarWidth: 'none' }}>
                            <SheetHeader >
                                <SheetTitle className='text-black'>Keranjang</SheetTitle>
                                <SheetDescription >
                                    {cart.map((item, index) => (
                                        <Card key={index} className='m-0 p-2'>
                                            <div className='flex justify-content-between gap-3'>
                                                <div>
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
                                                </div>

                                                <div className="w-3/4">
                                                    <div className="flex justify-content-start">
                                                        <label htmlFor={`cart-item-${index}`} className=" text-start w-[80px]">{item.name}</label>
                                                    </div>
                                                    <div className="flex justify-content-between align-items-center">
                                                        <div className="flex gap-2">
                                                            <label htmlFor={`cart-item-price-${index}`}>{formatCurrency(item.discount)}</label>
                                                            <b>x</b>
                                                            <label htmlFor={`cart-item-price-${index}`}><b>{item.count} </b></label>
                                                        </div>
                                                        <div className="flex gap-3 justify-content-end">
                                                            <label htmlFor={`cart-item-price-${index}`}>{formatCurrency(item.totalPrice)}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex align-items-center">
                                                    <Trash size={'20px'} onClick={() => handleDelete(item.kode_menu)} className="cursor-pointer" />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </SheetDescription>
                            </SheetHeader>
                            <SheetFooter className='flex row gap-4 mt-4'>
                                <Card>
                                    <div className='flex justify-content-between pe-0 py-2'>
                                        <div className='flex justify-center align-items-center gap-2 me-3'>
                                            <label htmlFor="total">Total pesanan anda</label>
                                        </div>
                                        <div className='flex justify-center align-items-center gap-2'>
                                            <label htmlFor="price">{formatCurrency(cart.reduce((total, item) => total + item.discount * item.count, 0))}</label>
                                        </div>
                                    </div>
                                </Card>
                                <SheetClose asChild>
                                    <Button type="submit" className='text-white bg-[#61AB5B]' onClick={handleSubmit}>Order</Button>
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
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredMenu.map((product) => (
                    <Card className="rounded mt-3 text-sm" key={product.kode_menu}>
                        <Badge value={getDiscountBadge(product)} className="p-0 bg-transparent"></Badge>
                        {/* {getDiscountBadge(product)} */}
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
                        <div className="mx-3 mb-2">
                            {/* <div className="flex align-items-center" key={product.id}>
                                <TicketPercent />
                                {getDiscountBadge(product)}
                            </div> */}
                            <div className="text-center h-[40px] mb-auto overflow-auto" style={{ scrollbarWidth: 'none' }}>
                                <h5>{product.name}</h5>
                            </div>
                            <div className="text-sm">
                                <div className="w-auto h-[40px] overflow-auto" style={{ scrollbarWidth: 'none' }}>
                                    {product.description}
                                </div>
                            </div>
                        </div>
                        <CardFooter className="flex sm:flex-row flex-col">
                            <div className="flex items-center sm:w-full mb-2">
                                {/* <formatCurrency/> */}
                                <p className="mb-0 text-sm fw-bold">{formatCurrency(product.price)}</p>
                            </div>
                            <div className="flex items-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className=" flex align-items-center bg-[#76C16F] rounded font-bold  py-2 px-2 sm:bg-[#76C16F]" onClick={() => handleAddClick(product)}>
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

const ProductCard: React.FC<{ product: Menu, onAddToCart: (product: Menu, quantity: number, discount: number, totalPrice: number) => void }> = ({ product, onAddToCart }) => {
    const [count, setCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(product.price);

    useEffect(() => {
        calculateDiscountedPrice();
    }, [product]);

    const handleDecrement = () => {
        setCount(prevCount => {
            const newCount = Math.max(prevCount - 1, 0);
            setTotalPrice(newCount * discountedPrice);
            return newCount;
        });
    };

    const handleIncrement = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            setTotalPrice(newCount * discountedPrice);
            return newCount;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let newCount = inputValue === '' ? 0 : parseInt(inputValue, 10);
        if (!isNaN(newCount)) {
            setCount(newCount);
            setTotalPrice(newCount * product.price);
        }
    };

    const handleAddToCart = () => {
        onAddToCart(product, count, discountedPrice, totalPrice);
    };

    const hasDiscount = product.diskon_persen > 0 || product.diskon_rupiah > 0;

    const calculateDiscountedPrice = () => {
        let price = product.price;
        if (product.diskon_persen > 0) {
            price = price - (price * (product.diskon_persen / 100));
        } else if (product.diskon_rupiah > 0) {
            price = price - product.diskon_rupiah;
        }
        setDiscountedPrice(price);
    };
    function formatCurrency(value: number) {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).replace('Rp', 'Rp.').trim();
    }

    return (
        <div className="text-black m-3">
            <h5>{product.name}</h5>
            {product.diskon_persen > 0 ? (
                <div className="flex flex-row justify-content-center gap-3">
                    <label htmlFor="price" className="line-through">{formatCurrency(product.price)}</label>
                    <label htmlFor="priceDiscount">{formatCurrency(discountedPrice)}</label>
                </div>
            ) : (
                <label htmlFor="price">{formatCurrency(product.price)}</label>
            )}
            <div className="flex justify-between pt-3 pb-2">
                <label>Total Price</label>
                <label>{formatCurrency(totalPrice)}</label>
            </div>
            {hasDiscount && (
                <div className="flex justify-between pb-2">
                    <label>Discount</label>
                    <label>{product.diskon_persen}%</label>
                    <label>(-) {formatCurrency(product.diskon_rupiah)}</label>
                </div>
            )}
            <div className="flex justify-between">
                <div className="flex items-center text-black">
                    <CiSquareMinus size={'40px'} onClick={handleDecrement} className="cursor-pointer" />
                    <input
                        type="text"
                        value={count}
                        onChange={handleInputChange}
                        className="mx-2 w-12 text-center"
                    />
                    <CiSquarePlus size={'40px'} onClick={handleIncrement} className="cursor-pointer" />
                </div>
                <DialogClose disabled={count === 0} className={'bg-[#6CC765] text-white flex-grow ms-4 rounded'} onClick={handleAddToCart}>
                    Add to Cart
                </DialogClose>
            </div>
        </div>
    );
};
function setError(arg0: string) {
    throw new Error("Function not implemented.");
}