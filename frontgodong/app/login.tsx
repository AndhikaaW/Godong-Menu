"use client";
import '../styles/globals.css'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bg from "../public/bg_login.png";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      localStorage.setItem("user-info", JSON.stringify(response.data));
      if (response.data == 1) {
        navigate.push("/Dashboard");
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("There was an error!", error);
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Button
                variant="ghost"
                type="submit"
                className={`w-full ${isFormValid() ? 'bg-[#6358DC] text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                onClick={isFormValid() ? login : () => {}}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/SignUp" className="underline">
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
    </div>
  );
}
