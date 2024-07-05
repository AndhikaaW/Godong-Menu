"use client";
import axios from "axios";
// import { LucideIcon, User } from "lucide-react";
import React, { useEffect, useState } from "react";
// import { FaCircleUser } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

function Profilepage() {

    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // edit profile
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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
        // return <div>{localStorage.getItem("user-info")}</div>;
        return <div></div>;
    }


    // edit profile
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedImage) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://godongbackend.test/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();
            console.log('Image uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <div className='container vh-100 flex items-center justify-center sm:w-full'>
            <div id='box' className=" p-5 shadow-lg rounded-lg bg-light sm:w-1/2">
                <div className="row g-2 mb-3 ps-0">
                    <div className="col-3 position-relative d-inline-block me-2 ">
                        {/* <FaCircleUser size={70} className="position-relative"> */}
                        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '100%' }} />}
                        <Dialog>
                            <DialogTrigger asChild>
                                <LuPencilLine className="position-absolute shadow" style={{ fontSize: '25px', color: '#000', top: '75%', left: '55%', background: '#F5F7F8', transform: 'translate(-50%, -50%)', borderRadius: '50%', padding: '3px' }} />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <div>
                                    <h3>Upload Image</h3>
                                    <form onSubmit={handleSubmit}>
                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                        <button type="submit">Upload</button>
                                    </form>

                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="col-6">
                        <h5>{userData.nama}</h5>
                        <p className='text-black-50'>{userData.email}</p>
                    </div>
                </div>

                <div>
                    <hr />
                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="Nama">Nama</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">{userData.nama}</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="EmailAccount">Email Account</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">{userData.email}</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="DateofBirth">Address</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">{userData.address}</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="NumberPhone">No.Handphone</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">{userData.phone}</a>
                    </div>
                    <hr />
                    <div className='flex align-items-center justify-content-center text-gray-400'>
                        <p>copyright@byGodongMenu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profilepage
