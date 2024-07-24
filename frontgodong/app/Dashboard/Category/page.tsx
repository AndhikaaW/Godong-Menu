"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import axios from "axios";

interface Categories {
    name: string;
    icon: string | null;
    description: string;
}
function Categorypage() {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://godongbackend.test/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        };
        fetchUsers();
    }, []);
    return (

        <div className='surface-0 p-lg-5 vh-100 '>
            <div className='text-center'>
                <h1>Category</h1>
                <div className="underline" style={{ width: '150px', height: '4px', background: '#61AB5B', margin: 'auto auto 50px' }}></div>
            </div>
            <div className="container">
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:flex-row justify-content-center align-items-center '>
                        {categories.map((category) => (
                            <Link href={'/dashboard/menu/'} className='no-underline p-5'>
                                <div className="card justify-content-center align-items-center w-auto h-[400px]">
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #ccc', marginTop: '20px', background: '#ccc' }}>
                                        {category.icon ? (
                                            <img
                                                src={`data:image/jpeg;base64,${category.icon}`}
                                                alt={category.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="avatar-fallback">img</div>
                                        )}
                                    </div>
                                    <div className="card-body text-center">
                                        <h3 className="card-title">
                                            {category.name}
                                        </h3>
                                        <div style={{ width: '200px', height: '200px', overflow: "auto" ,scrollbarWidth:'none'}}>
                                            <p className="card-text text-lg">
                                                {category.description}
                                            </p>
                                        </div>
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