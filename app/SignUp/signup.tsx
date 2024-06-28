"use client";
import React,{
    useState
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';

import Link from 'next/link';
export default function SignUp() {
    const [nama,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [status]=useState(2)
    const navigate = useRouter()
    async function usersignup() {
        let item = { nama, password, email, status };
        try {
            let response = await axios.post("http://godongbackend.test/api/register", item, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            localStorage.setItem("user-info", JSON.stringify(response.data));
            navigate.push('/');
        } catch (error) {
            console.error("There was an error!", error);
        }
    }
    return (
        <div className="container-fluid login-container">
            <div className="login-form">
                <div className="login-box">
                    <div className="flex align-items-center justify-content-center">
                        <div className=" p-4 lg:w-6">
                            <div className="text-left mb-5">
                                <img src="./hyper.svg" alt="hyper" height={50} className="mb-3" />
                                <div className="text-900 text-3xl font-medium mb-3">
                                    Welcome to <br /><strong>Godong Menu</strong>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                                <InputText value={nama} onChange={(e)=>setName(e.target.value)} id="username" type="text" placeholder="Username" className="w-full mb-3" />

                                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                                <InputText value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <InputText value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="w-full mb-3" />

                                <Link href='/'>
                                    <Button onClick={usersignup} label="Sign Up" icon="pi pi-user" className="w-full mt-4" />
                                </Link>
                            </div>
                            <div className="flex align-items-center justify-content-center mt-3 mb-3 ">
                                    <span className="text-600 font-medium line-height-3">have an account?</span>
                                    <Link href='/' className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Login</Link>
                                </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="login-image" ></div>
        </div>
    )
}
