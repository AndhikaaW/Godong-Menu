// import { Button } from 'primereact/button'
"use client"
import React, { useState } from 'react'
import { CiInstagram } from 'react-icons/ci'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaCircle, FaPhoneVolume } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { Input } from "@/components/ui/input";

function Contactpage() {
    const email = localStorage.getItem('user-info');
    const [message, setMessage] = useState("");

    async function messageuser() {
        let item = { email, message};
        try {
            let response = await axios.post(
                "http://godongbackend.test/api/contact",
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            // console.error(response.data)
        } catch (error) {
            console.error("There was an error!", error);
        }
    }
    const isFormValid = () => {
        return message;
    };

    const clearInput = () => {
        setMessage('');
    };

    return (
        <div className='surface-0'>
            <div className='container'>
                <div className=" flex h-screen sm:flex-row flex-col sm:">
                    <div className=" h-70 p-5" style={{ background: '#C4C4C4' }}>
                        <div className='mt-4 ms-4'>
                            <h3 className='text-white'>Contact Information</h3>
                        </div>
                        <div className='mt-8 ms-1 text-white'>
                            <div className='mt-5'>
                                <label htmlFor="phone" className='flex align-items-center gap-2'><FaPhoneVolume />08XXXXXXXXXX</label>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="email" className='flex align-items-center gap-2'><MdOutlineMail />godongmenu@gmail.com</label>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="address" className='flex align-items-center gap-2'><FaMapMarkerAlt />Address</label>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="instagram" className='flex align-items-center gap-2'><CiInstagram />Instagram</label>
                            </div>

                        </div>

                    </div>
                    <div className="col-7 p-6">
                        <div className='flex justify-content-text-center align-items-center h-full'>
                            <div className='w-full flex-row'>
                                <label htmlFor="messages" className='mb-2' style={{ color: '#8D8D8D' }}>Messages</label>
                                <Input
                                    className="w-full mb-3 border-b"
                                    id="message"
                                    placeholder="Write Your Messages"
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className='flex justify-content-end '>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className=" bg-black text-white border-dark-subtle" style={{ borderRadius: '10px', padding: '10px' }}
                                                type="submit"
                                                onClick={isFormValid() ? messageuser : () => { }}
                                                disabled={!isFormValid()}
                                            >Send Message</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Thank You 🙏</DialogTitle>
                                                <DialogDescription>
                                                    Thank you for your review of the menu at Godong restaurant. We really appreciate your time and input.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="sm:justify-center">
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary" onClick={clearInput}>
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Contactpage



