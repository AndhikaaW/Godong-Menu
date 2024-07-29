"use client";
import "../../styles/globals.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bg from "../../public/bg-login.png";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../components/Auth/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Frown, Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email : any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e : any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e : any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let item = { email, password };
    setIsLoading(true);
    try {
      let response = await axios.post(
        "http://192.168.200.100:8000/api/login",
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        login(response.data.user);
        document.cookie = `auth_token=${response.data.token}; path=/;`;
        setIsNavigating(true);
        if (response.data.status === 2) {
          router.push("/dashboard/home");
        } else if (response.data.status === 1) {
          router.push("/admin/dashboard");
        } else {
          setShowAlert(true);
          setIsNavigating(false);
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
    return validateEmail(email) && password.length >= 8;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 3000); // Adjust this timeout as needed

    return () => clearTimeout(timeout);
  }, [isNavigating]);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* ... (rest of the JSX remains the same) */}
      <div className='flex justify-center items-center lg:hidden bg-white'>
        <div className="h-[300px] w-[300px] flex items-end">
          <Image
            src={bg}
            alt="Image"
            priority
          />
        </div>
      </div>
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
                  autoComplete="off"
                  onChange={handleEmailChange}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>

                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="pr-10 w-full border rounded px-3 py-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 bg-transparent border-none cursor-pointer text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff size={"17px"} />
                    ) : (
                      <Eye size={"17px"} />
                    )}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                variant="ghost"
                type="submit"
                className={`w-full ${isFormValid()
                  ? "bg-[#61AB5B] text-white"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                onClick={handleLogin}
                disabled={!isFormValid() || isLoading || isNavigating}
              >
                {isLoading || isNavigating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading || isNavigating ? "Loading..." : "Sign in"}
              </Button>
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
      {/* ... (rest of the JSX remains the same) */}
      <div className="hidden lg:flex h-full w-full lg:w-1/2 items-center justify-center bg-muted">
        <Image
          src={bg}
          alt="Image"
          className="h-auto w-auto"
          priority
        />
      </div>
    </div>
  );
}