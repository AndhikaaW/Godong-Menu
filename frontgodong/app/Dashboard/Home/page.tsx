"use client"
import React, { useEffect, useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { TbRosetteDiscount } from "react-icons/tb";
import { MdOutlineShoppingCart } from 'react-icons/md';
import axios from 'axios';
function Homepage() {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userinfo = localStorage.getItem('user-info');
            let email = userinfo!.replace(/["]/g, '')
            if (!email) {
                setError('Email tidak ditemukan di localStorage');
                return;
            }

            try {
                const response = await axios.get(`http://godongbackend.test/api/user/${email}`);
                setUserData(response.data);
            } catch (err) {
                setError('Gagal mengambil data user');
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>{localStorage.getItem("user-info")}</div>;
    }
    return (
        <div className="surface-0 vh-100">
            <div className="text-900 font-bold text-6xl mb-5 text-center pt-5">Welcome, {userData.nama}</div>
            <div className="container">
                <div className="flex sm:flex-row flex-col ">
                    <div className="col-6 m-lg-2 ">
                        <div className="flex">
                            <img src="/img-1.jpg" alt="gambar" width="250px" id='img-1' className="p-2 mb-5" style={{ borderRadius: '30px', marginTop: '-20px' }} />
                            <div className='flex-col'>
                                <img src="/img-2.jpg" alt="gambar" width="250px" className="p-2" style={{ borderRadius: '30px' }} />
                                <img src="/img-2.jpg" alt="gambar" width="250px" className="p-2" style={{ borderRadius: '30px' }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full m-lg-2 text-xl">
                        <h1 className="text-4xl font-bold mb-4">Godong Menu</h1>
                        <p className="text-gray-700 w-full ">
                            Selamat datang di Godong, restoran yang menyajikan cita rasa autentik Indonesia dalam suasana yang nyaman dan ramah.
                            Godong menghadirkan beragam hidangan khas Nusantara, mulai dari makanan utama yang mengenyangkan hingga camilan ringan dan minuman tradisional yang menyegarkan.
                            Kunjungi Godong dan rasakan sendiri kelezatan masakan Indonesia dalam setiap suapan!
                        </p>
                        <b><p className='mb-2'><FaRegClock className='mr-2 inline-flex items-center'/>Delivery within 30 minutes</p></b>
                        <b><p className='mb-2'><TbRosetteDiscount className='mr-2 inline-flex items-center'/>Best Offer & Prices</p></b>
                        <b><p className='mb-2'><MdOutlineShoppingCart className='mr-2 inline-flex items-center'/>Online Services Available</p></b>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Homepage