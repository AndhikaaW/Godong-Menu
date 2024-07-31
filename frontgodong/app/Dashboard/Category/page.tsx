"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import axios from "axios";
import { Card, CardHeader } from "@/components/ui/card";
import { CategorySkeleton } from "@/app/skeleton/skeletonCategory";

interface Category {
    name: string;
    icon: string | null;
    description: string;
}
function Categorypage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTruncated, setIsTruncated] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://192.168.200.100:8000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    if (loading) {
        return <CategorySkeleton />;
    }
    
    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };
    return (
        <div className="container">
            <div className='text-center mt-3'>
                <h1>Category</h1>
                <div className="underline" style={{ width: '150px', height: '4px', background: '#61AB5B', margin: 'auto auto 50px' }}></div>
            </div>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:flex-row justify-content-center align-items-center'>
                    {categories.map((category, index) => (
                        <Link href={'/dashboard/menu/'} className='no-underline p-5' key={index}>
                            <Card className="card justify-content-center align-items-center w-auto h-[400px] shadow-lg">
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
                                    <div className={`w-[200px] h-[200px] hidden sm:flex overflow-auto text-sm `} style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
                                        <label
                                            htmlFor=""
                                            className={`d-inline-block`}>
                                            {category.description}
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Categorypage