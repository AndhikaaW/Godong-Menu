"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import profileIcon from '../../../public/UserEdit.png';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

function Profilepage() {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
                    `http://godongbackend.test/api/user/${email}`
                );
                setUserData(response.data);
            } catch (err) {
                setError("Gagal mengambil data user");
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setSelectedImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedImage || !userData) {
            return;
        }

        setIsUploading(true);

        try {
            const response = await axios.post(
                "http://godongbackend.test/api/upload-profile-picture",
                {
                    image: selectedImage,
                    email: userData.email
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setUserData({ ...userData, pictures: response.data.image_url });
                alert("Profile picture updated successfully!");
                setIsDialogOpen(false);  // Close the dialog after successful upload
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to update profile picture. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container vh-100 flex items-center justify-center sm:w-full">
            <div id="box" className="p-5 shadow-lg rounded-lg bg-light sm:w-1/2">
                <div className="row g-2 mb-3 ps-0 items-center justify-center">
                    <div className="col-auto position-relative d-inline-block mr-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Avatar className="h-[150px] w-[150px] cursor-pointer">
                                    <AvatarImage src={userData.pictures || profileIcon.src} width={100} height={200} alt="profil" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[400px] ">
                                <div className="mt-2 flex flex-col w-[350px] h-[400px]">
                                    <h3 >Upload Image</h3>
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            className="w-full mt-2"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                            <div className="h-full w-full flex justify-center items-center">
                                                <Avatar className="w-[200px] h-[200px]">
                                                    <AvatarImage src={selectedImage || userData.pictures || profileIcon.src} alt="profil" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        <div className="flex justify-end">
                                            <Button type="submit" disabled={isUploading}>
                                                {isUploading ? 'Uploading...' : 'Save changes'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="mt-4">
                    <hr />
                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="Nama">Nama</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">
                            {userData.nama}
                        </a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="EmailAccount">Email Account</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">
                            {userData.email}
                        </a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="DateofBirth">Address</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">
                            {userData.address}
                        </a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="NumberPhone">No.Handphone</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">
                            {userData.phone}
                        </a>
                    </div>
                    <hr />
                    <div className="flex align-items-center justify-content-center text-gray-400">
                        <p>copyright@byGodongMenu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profilepage;
