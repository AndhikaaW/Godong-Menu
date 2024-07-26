"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CircleCheck, CirclePlus, Delete, Plus, TicketPercent, Trash } from "lucide-react";
import { Badge } from 'primereact/badge';
import Link from "next/link";
import ProductCard from "../menu/ProductCard";
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from "jspdf";
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
interface TransactionItem {
    kode_menu: string;
    count: number;
    price: number;
}

interface TransactionData {
    id_user: string;
    no_telepon: string;
    alamat: string;
    sub_total: number;
    total: number;
    items: TransactionItem[];
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
    const [invoiceData, setInvoiceData] = useState<TransactionData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const currentDate = getCurrentDate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userinfo = localStorage.getItem("user-info");
            let email = userinfo ? userinfo.replace(/["]/g, "") : "";
            if (!email) {
                // setError("Email tidak ditemukan di localStorage");
                return;
            }
            try {
                const response = await axios.get(
                    `http://192.168.200.100:8000/api/user/${email}`
                );
                setUserData(response.data);
            } catch (err) {
                // setError("Gagal mengambil data user");
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

    const handleAddToCart = (product: any, quantity: number, discount: number, totalPrice: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.kode_menu === product.kode_menu);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.kode_menu === product.kode_menu ? { ...item, count: item.count + quantity, discount: item.discount + discount, totalPrice: item.totalPrice + totalPrice } : item
                );

            } else {
                return [...prevCart, { ...product, count: quantity, discount: discount, totalPrice: totalPrice }];
            }
        });
    };

    const filteredMenu = menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const subTotal = cart.reduce((total, item) => total + item.price * item.count, 0);
        const total = cart.reduce((total, item) => total + item.discount, 0);

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
            const response = await axios.post('http://192.168.200.100:8000/api/transaksi', transactionData);
            console.log(response.data);
            setNotification('Pesanan berhasil dibuat!');
            setCart([]);
            setTimeout(() => setNotification(null), 3000);
            setInvoiceData(transactionData);
            setIsDialogOpen(true);

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
                <Badge value={" " + product.diskon_persen + "% OFF"} className="bg-red-400 pi pi-tag mr-7 rounded-none p-1 w-[100px] shadow"></Badge>
            );
        }
        return null;
    };

    function formatCurrency(value: number) {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).replace('Rp', 'Rp.').trim();
    }
    function getCurrentDate() {
        return new Date().toLocaleDateString();
    }

    const documentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => documentRef.current,
        documentTitle: `Invoice-${invoiceData?.id_user}`,
        bodyClass: 'p-16',
        pageStyle: `
            @media print {
            .invoice-data {
                overflow: visible !important;
                height: auto !important;
            }
            }
        `,
    });

    return (
        <div className="container ">
            <div className='flex justify-content-end flex-col sm:flex-row me-4 sticky top-0 py-2 px-3 w-full bg-white z-10 shadow-sm rounded'>
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
                                <SheetDescription ></SheetDescription>
                                {cart.map((item, index) => (
                                    <Card key={index} className='my-3 p-2'>
                                        <div className='flex justify-content-between '>
                                            <div className="hidden lg:flex align-items-center">
                                                {item.image ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${item.image}`}
                                                        alt={item.name}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }}
                                                    />
                                                ) : (
                                                    <div className="avatar-fallback">img</div>
                                                )}
                                            </div>

                                            <div className="flex flex-col w-full ms-2">
                                                <div className="flex justify-content-start ">
                                                    <label htmlFor={`cart-item-${index}`} className=" text-start">{item.name}</label>
                                                </div>
                                                <div className="flex w-full align-items-center">
                                                    <div className="flex w-full">
                                                        <div className="flex w-1/2 text-start gap-2">
                                                            <label htmlFor={`cart-item-price-${index}`}>{formatCurrency(item.price)}</label>
                                                            <b>x</b>
                                                            <label htmlFor={`cart-item-price-${index}`}><b>{item.count} </b></label>
                                                        </div>
                                                        <div className="flex flex-col justify-content-end w-1/2 text-end">
                                                            {item.totalPrice - item.discount > 0 ? (
                                                                <>
                                                                    <label htmlFor={`cart-item-price-${index}`} style={{ textDecoration: 'line-through' }}>
                                                                        {formatCurrency(item.totalPrice)}
                                                                    </label>
                                                                    <label htmlFor={`cart-item-price-${index}`}>
                                                                        {formatCurrency(item.discount)}
                                                                    </label>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <label htmlFor={`cart-item-price-${index}`}>
                                                                        {formatCurrency(item.totalPrice)}
                                                                    </label>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex align-items-center w-1/1 ms-2">
                                                        <Trash size={'20px'} onClick={() => handleDelete(item.kode_menu)} className="cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </SheetHeader>
                            <SheetFooter className='flex row gap-4 mt-4'>
                                <Card>
                                    <div className='flex justify-content-between pe-0 py-2'>
                                        <div className='flex justify-center align-items-center gap-2 me-3'>
                                            <label htmlFor="total">SubTotal </label>
                                        </div>
                                        <div className='flex justify-center align-items-center gap-2'>
                                            <label htmlFor="price">{formatCurrency(cart.reduce((total, item) => total + item.price * item.count, 0))}</label>
                                        </div>
                                    </div>
                                    <div className='flex justify-content-between pe-0 py-2'>
                                        <div className='flex justify-center align-items-center gap-2 me-3'>
                                            <label htmlFor="total">Total pesanan anda</label>
                                        </div>
                                        <div className='flex justify-center align-items-center gap-2'>
                                            <label htmlFor="price">{formatCurrency(cart.reduce((total, item) => total + item.discount, 0))}</label>
                                        </div>
                                    </div>
                                </Card>
                                <SheetClose asChild disabled={cart.length === 0}>
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
                    {isDialogOpen && invoiceData && (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent ref={documentRef}>
                                <DialogHeader>
                                    <DialogTitle>Invoice</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                    <div className="p-1 sm:w-full">
                                        <div className='flex'>
                                            <div className='flex flex-col w-1/2 gap-2 text-start'>
                                                <label>www.godong.id</label>
                                                <label>godong@gmail.com</label>
                                                <label>082391838391</label>
                                            </div>
                                            <div className='flex w-1/2'>
                                                <div className='flex flex-row align-items-end justify-end w-full'>
                                                    <div className='flex flex-col text-end'>
                                                        <h4 className='text-[#61AB5B]'>Godong Menu</h4>
                                                        <label>Godong Resto Address</label>
                                                        <label>TAX 1982323272832280</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 p-3 outline bg-light shadow-lg rounded-lg bg-gray-100">
                                            <div className="flex flex-row align-items-start justify-content-between ">
                                                <div className="flex flex-col align-items-start w-auto">
                                                    <h5>Bill To</h5>
                                                    <label>Id User : {invoiceData.id_user}</label>
                                                    <label>Number : {invoiceData.no_telepon}</label>
                                                    <label>Address : {invoiceData.alamat}</label>
                                                </div>
                                                <div className="flex flex-col align-items-end">
                                                    <h6>Invoice of IDR</h6>
                                                    <h6>{formatCurrency(invoiceData.total)}</h6>
                                                </div>
                                            </div>
                                            <div className="flex flex-row align-items-center justify-content-between mt-3">
                                                <div className="flex flex-col align-items-start w-auto">
                                                    <h5>Invoice Date</h5>
                                                    <label>{currentDate}</label>
                                                </div>
                                                <div className="flex flex-col align-items-end">
                                                    <h5>Invoice Number</h5>
                                                    <label>{invoiceData.id_user}</label>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="flex flex-row align-items-center justify-content-between mt-3">
                                                <div className="flex flex-col align-items-center w-1/4">
                                                    <b>Item Detail</b>
                                                </div>
                                                <div className="flex flex-col align-items-center w-1/4">
                                                    <b>Qty</b>
                                                </div>
                                                <div className="flex flex-col align-items-center w-1/4">
                                                    <b>Unit Price</b>
                                                </div>
                                                <div className="flex flex-col align-items-center w-1/4">
                                                    <b>Amount</b>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="h-[100px] overflow-auto invoice-data" ref={documentRef}>
                                                {invoiceData.items.map((item, index) => (
                                                    <div className="flex flex-row align-items-center mt-3" key={index}>
                                                        <div className="flex flex-col align-items-center w-1/4">
                                                            <label>{item.kode_menu}</label>
                                                        </div>
                                                        <div className="flex flex-col align-items-center w-1/4">
                                                            <label>{item.count}</label>
                                                        </div>
                                                        <div className="flex flex-col align-items-center w-1/4">
                                                            <label>{formatCurrency(item.price)}</label>
                                                        </div>
                                                        <div className="flex flex-col align-items-center w-1/4">
                                                            <label>{formatCurrency(item.price * item.count)}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <hr />
                                            <div className="flex flex-row align-items-center justify-content-between mt-1">
                                                <div className="flex flex-col align-items-end w-full">
                                                    <label>Subtotal</label>
                                                </div>
                                                <div className="flex flex-col align-items-end w-1/2">
                                                    <label>{formatCurrency(invoiceData.sub_total)}</label>
                                                </div>
                                            </div>
                                            <div className="flex flex-row align-items-center justify-content-between">
                                                <div className="flex flex-col align-items-end w-full">
                                                    <label>Discount</label>
                                                </div>
                                                <div className="flex flex-col align-items-end w-1/2">
                                                    <label>{formatCurrency(invoiceData.sub_total - invoiceData.total)}</label>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-end">
                                                <hr className="w-1/2" />
                                            </div>
                                            <div className="flex flex-row align-items-center justify-content-between">
                                                <div className="flex flex-col align-items-end w-full">
                                                    <b>Total</b>
                                                </div>
                                                <div className="flex flex-col align-items-end w-1/2">
                                                    <label><b>{formatCurrency(invoiceData.total)}</b></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogHeader>
                                <DialogFooter id="react-no-print" className="d-print-none">
                                    {/* <Button onClick={() => setIsDialogOpen(false)}>Close</Button> */}
                                    <Button onClick={handlePrint} className="bg-[#61AB5B] text-white"><b>Export PDF</b></Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3">
                {filteredMenu.map((product) => (
                    <Card className="rounded text-sm" key={product.kode_menu}>
                        <CardHeader>
                            <div className="flex justify-content-center align-items-center p-overlay-badge ">
                                <Badge value={getDiscountBadge(product)} className=" bg-transparent pb-5"></Badge>
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
                                <span className="mb-0 text-sm fw-bold">{formatCurrency(product.price)}</span>
                            </div>
                            <div className="flex items-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex align-items-center bg-[#76C16F] rounded font-bold py-2 px-2 sm:bg-[#76C16F]" onClick={() => handleAddClick(product)}>
                                            add
                                            <div className="bg-white rounded-xl ms-2 ">
                                                <Plus size={'20px'} />
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">

                                        <DialogHeader>
                                            <DialogTitle>Add to Cart</DialogTitle>
                                            <div className="flex justify-content-center mb-0">
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
                                            <DialogDescription></DialogDescription>
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


// function setError(arg0: string) {
//     throw new Error("Function not implemented.");
// }