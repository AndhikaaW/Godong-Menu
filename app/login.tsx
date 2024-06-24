"use client";
import React from 'react';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import "../styles/login.css";
import Link from 'next/link';

export default function Login() {
    const [checked, setChecked] = useState(false);
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
                                <label htmlFor="email" className="block text-900 font-medium mb-2" >Email</label>
                                <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />

                                <div className="flex align-items-center justify-content-between mb-3">
                                    <span></span>
                                    <a className="font-medium no-underline ml-2 text-blue-500 text- cursor-pointer">Forgot your password?</a>
                                </div>
                                <Link href='/Dashboard'>
                                    <Button label="Login" icon="pi pi-user" className="w-full" />
                                </Link>
                                <div className="flex align-items-center justify-content-center mt-3 mb-3 ">
                                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                                    <Link href='/SignUp' className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-image"></div>
        </div>
    )
}




