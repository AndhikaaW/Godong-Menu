"use client";
import '../styles/globals.css'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bg from "../public/bg-login.png";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { Eye, EyeOff, Frown } from 'lucide-react';

export default function Login() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function login() {
    let item = { email, password };
    setIsLoading(true);
    try {
      let response = await axios.post(
        "http://godongbackend.test/api/login",
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user-info", JSON.stringify(email));

      if (response.data.success) {
        if (response.data.status === 2) {
          navigate.push("/dashboard/home");
        } else if (response.data.status === 1) {
          navigate.push("/admin");
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid = () => {
    return email && password;
  };




  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="flex items-center justify-center h-full w-full lg:w-1/2">
        <Card className="max-w-sm w-full bg-white text-black">
          <CardHeader>
            <CardTitle className="text-lg">Welcome To</CardTitle>
            <CardTitle className="text-2xl">Godong Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  autoComplete='off'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>

                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 w-full border rounded px-3 py-2 focus:outline-none"/>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 bg-transparent border-none cursor-pointer text-gray-600 focus:outline-none">
                    {showPassword ? <EyeOff size={'17px'}/> :  <Eye size={'17px'}/>}
                  </button>
                </div>

                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>

              <Button variant="ghost" type="submit"
                className={`w-full ${isFormValid() ? 'bg-[#61AB5B] text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                onClick={isFormValid() ? login : () => { }}
                disabled={!isFormValid() || isLoading}
              >{isLoading ? 'Loading...' : 'Sign in'} </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex h-full w-full lg:w-1/2 items-center justify-center bg-muted">
        <Image
          src={bg}
          alt="Image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* AlertDialog for login failure */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogOverlay className="bg-red-300/70">
          <AlertDialogContent className="bg-red-300 flex justify-center w-1/4 border-none">
            <AlertDialogHeader className="gap-2">
              {/* <AlertDialogTitle><TfiFaceSad size="100px" className="text-red-500 fw-bold"/></AlertDialogTitle> */}
              <AlertDialogTitle className="flex justify-center"><Frown size={'100px'} className="text-red-600" /></AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <p>Oh Sorry!</p>
                <p>Try again for your login</p>
              </AlertDialogDescription>
              <AlertDialogCancel className="bg-red-400 border-none">Try Again</AlertDialogCancel>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}