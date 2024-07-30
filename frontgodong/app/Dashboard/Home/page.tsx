"use client";
import React, { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { TbRosetteDiscount } from "react-icons/tb";
import { MdOutlineShoppingCart } from 'react-icons/md';
import axios from 'axios';
import HomepageSkeleton from '../../skeleton/skeletonHome';
import { Card, CardHeader } from '@/components/ui/card';
import img1 from '../../../public/ic_category.png'
import img2 from '../../../public/ic_menu.png'
import img3 from '../../../public/ic_cart_2.png'
import img4 from '../../../public/ic_cart.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';

interface review {
    email: string,
    message: string,
    pictures: string
}
function Homepage() {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const menu = [
        {
            img: img1,
            name: "Select Category",
            description: "Select the menu category you want to order. There are 3 categories, namely, Food, Drinks and Snacks"
        }, {
            img: img2,
            name: "Select Menu",
            description: "Select the menu you want. There are also lots of discounts on several menus"
        }, {
            img: img3,
            name: "Add to Cart",
            description: "The menu you add will automatically go to your shop chart. Next, go to cart."
        }, {
            img: img4,
            name: "Order",
            description: "After entering the shopping cart page, check the menu again that you want to order. Once you are sure, you can make your order"
        }
    ]
    const [review, setReview] = useState<review[]>([]);
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://192.168.200.100:8000/api/contact", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                setReview(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            } finally {
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userinfo = localStorage.getItem('user-info');
            let email = userinfo ? userinfo.replace(/["]/g, '') : '';
            if (!email) {
                setError('Email tidak ditemukan di localStorage');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://192.168.200.100:8000/api/user/${email}`);
                setUserData(response.data);
            } catch (err) {
                setError('Gagal mengambil data user');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <HomepageSkeleton />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div></div>;
    }

    return (
        <div className="surface-0 vh-100 pt-4">
            <div className="text-900 font-bold text-6xl mb-5 text-center pt-5">Welcome, {userData.nama}</div>
            <div className="container">
                <div className="flex sm:flex-row flex-col">
                    <div className="col-6 m-lg-2">
                        <div className="flex">
                            <img src="/img-1.jpg" alt="gambar" width="250px" id='img-1' className="p-2 mb-5" style={{ borderRadius: '30px', marginTop: '-20px' }} />
                            <div className='flex-col'>
                                <img src="/img-6.png" alt="gambar" width="210px" className="p-2" style={{ borderRadius: '30px' }} />
                                <img src="/img-2.png" alt="gambar" width="210px" className="p-2" style={{ borderRadius: '30px' }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full m-lg-2 text-xl">
                        <h1 className="text-4xl font-bold mb-4">Godong Menu</h1>
                        <p className="text-gray-700 w-full mb-4">
                            Selamat datang di Godong, restoran yang menyajikan cita rasa autentik Indonesia dalam suasana yang nyaman dan ramah.
                            Godong menghadirkan beragam hidangan khas Nusantara, mulai dari makanan utama yang mengenyangkan hingga camilan ringan dan minuman tradisional yang menyegarkan.
                            Kunjungi Godong dan rasakan sendiri kelezatan masakan Indonesia dalam setiap suapan!
                        </p>
                        <b><p className='mb-2'><FaRegClock className='mr-2 inline-flex items-center' />Delivery within 30 minutes</p></b>
                        <b><p className='mb-2'><TbRosetteDiscount className='mr-2 inline-flex items-center' />Best Offer & Prices</p></b>
                        <b><p className='mb-2'><MdOutlineShoppingCart className='mr-2 inline-flex items-center' />Online Services Available</p></b>
                    </div>
                </div>
            </div>
            <div className="text-3xl mb-5 text-center pt-20 fw-bold"><label htmlFor="">How To Order with Godong Menu</label></div>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:flex-row justify-content-center align-items-center gap-4'>
                    {menu.map((item, index) => (
                        <Card className="rounded text-sm" key={index}>
                            <CardHeader>
                                <div className="flex justify-content-center align-items-center">
                                    <div style={{ width: '200px', height: '150px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #ccc', background: '#ccc' }}>
                                        {item.img ? (
                                            <Image src={item.img} alt={item.name} />
                                        ) : (
                                            <div className="avatar-fallback">img</div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <div className="mx-3 mb-2">
                                <div className="text-center h-[40px] mb-auto">
                                    <h5 className="text-truncate" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                                        {item.name}
                                    </h5>
                                </div>
                                <div className="text-sm">
                                    <div className="w-auto h-[80px] overflow-auto  ">
                                        <label htmlFor="">{item.description}</label>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="text-3xl mb-5 text-center pt-20 fw-bold"><label>Special Discount</label></div>
            <div className='flex flex-col  sm:flex-row justify-center'>
                <div className='flex w-full sm:w-1/2  justify-center '>
                    <div className="rounded-lg shadow-2xl bg-[#5F7554] p-4 w-1/2">
                        <img src="/logo2.png" alt="" className='w-[200px] h-[200px]' />
                    </div>
                </div>
                <div className='flex flex-col w-full sm:w-1/2 gap-3'>
                    <label htmlFor="" className=' text-3xl pt-20 fw-bold w-full'>Get 30% Special Promo</label>
                    <p>Enjoy our discount up to 30% for orders via Godong Menu</p>
                    <Link href={'/dashboard/menu/'} className='no-underline p-5 text-black'>
                        <div className='flex justify-start'>
                            <Button className='w-1/4 bg-[#76C16F] '> Order now <ShoppingCart /></Button>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="text-3xl mb-5 text-center pt-20 fw-bold"><label>Customer Review</label></div>
            <div className="container mx-auto flex justify-center pb-5">
                <Carousel
                    opts={{
                        align: "center",
                    }}
                    className="w-full max-w-[300px] sm:max-w-[800px]"
                >
                    <CarouselContent>
                        {review.map((item: any, index: any) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:flex-row justify-content-center align-items-center gap-4'> */}
                                <Card className="rounded text-sm">
                                    <CardHeader>
                                        <div className="flex align-items-center ">
                                            <div className="flex flex-col">
                                                <div className=" flex text-center h-[50px] mb-2 gap-2 ">
                                                    {item.pictures ? (
                                                        <Image src={item.pictures}
                                                            alt="nahh"
                                                            width={50}
                                                            height={50}
                                                            style={{ borderRadius: '50px', overflow: 'hidden' }} />
                                                    ) : (
                                                        <div className="avatar-fallback">img</div>
                                                    )}
                                                    {/* <div style={{ width: '30px', height: '30px', borderRadius: '50px', overflow: 'hidden', border: '3px solid #ccc', background: '#ccc' }}>

                                                    </div> */}
                                                    <div className='flex align-items-center'>
                                                        <h5 className="text-truncate" style={{ maxWidth: '170px', whiteSpace: 'nowrap' }}>
                                                            {item.email}
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="text-sm">
                                                    <div className="w-[250px] h-[40px] overflow-auto">
                                                        <label htmlFor="" className="d-inline-block"
                                                            style={{ maxWidth: '100%', cursor: 'pointer', whiteSpace: 'normal', wordWrap: 'break-word' }}
                                                        >{item.message}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                                {/* </div> */}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>
    );
}

export default Homepage;
