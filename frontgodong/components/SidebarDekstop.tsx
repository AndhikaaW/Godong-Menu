"use client"
import React, { useEffect, useState } from "react";
import SideBarButton from "./SideBarButton";
import { SidebarItems } from "@/types/sidebartypes";
import Link from "next/link";
import { CircleUser, LogOut, MoreHorizontal } from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import axios from "axios";

interface SidebarDekstopProps {
  sidebarItems: SidebarItems;
}

export default function SidebarDekstop(props: SidebarDekstopProps) {
  const pathname = usePathname();

  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <h3 className="my-2 text-center text-5xl font-bold text-foreground font-poppins">
          Godong Menu
        </h3>
        <div className="flex flex-column gap-2 mt-5">
          {props.sidebarItems.links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link key={index} href={link.href}>
                <SideBarButton
                  variant="outline"
                  className={`border-1 ${isActive ? 'border-[#61AB5B] text-[#61AB5B]' : 'border-transparent text-gray-700 hover:border-[#61AB5B] hover:text-[#61AB5B]'}`}
                  icon={link.icon}
                >
                  {link.label}
                </SideBarButton>
              </Link>
            );
          })}
        </div>
        <div className="absolute left-0 bottom-1 w-full border-top p-1">
          <Popover>
            <Button variant="ghost" className="w-full justify-start">
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="https://img.freepik.com/free-photo/curly-man-with-broad-smile-shows-perfect-teeth-being-amused-by-interesting-talk-has-bushy-curly-dark-hair-stands-indoor-against-white-blank-wall_273609-17092.jpg" />
                      <AvatarFallback>Max Programming</AvatarFallback>
                    </Avatar>
                    <span className="align-self-center">{userData.nama}</span>
                  </div>
                  <MoreHorizontal size={20} />
                </div>
              </PopoverTrigger>
            </Button>
            <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
              <div className="space-y-1">
                <Link href='/'>
                  <SideBarButton size="sm" icon={LogOut} className="w-full">
                    Log Out
                  </SideBarButton>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  );
}
