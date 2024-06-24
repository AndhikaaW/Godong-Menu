"use client";
import React,{
    useState
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import "../styles/login.css";
import Link from 'next/link';

export default function Login() {
    const [status]=useState(2)
    const navigate = useRouter()
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        let item = { email, password };
        try {
            let response = await axios.post("http://godongbackend.test/api/login", item, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            localStorage.setItem("user-info", JSON.stringify(response.data));
            const status = response.data
            if (response.data == 1) {
                navigate.push('/Dashboard');
            } else {
                alert("Login failed. Please check your credentials and try again.");
            }
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
                                <label htmlFor="email" className="block text-900 font-medium mb-2" >Email</label>
                                <InputText  onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="Email address" className="w-full mb-3" />

                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <InputText  onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="w-full mb-3" />

                                <div className="flex align-items-center justify-content-between mb-3">
                                    <span></span>
                                    <a className="font-medium no-underline ml-2 text-blue-500 text- cursor-pointer">Forgot your password?</a>
                                </div>
                                <Button label="Login" icon="pi pi-user" className="w-full"  onClickCapture={login}/>
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




