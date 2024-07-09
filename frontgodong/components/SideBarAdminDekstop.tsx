import React, { useEffect, useState } from "react";
import SideBarButton from "./SideBarButton";
import { SidebarItems } from "@/types/sidebartypes";
import Link from "next/link";
import { LogOut, MoreHorizontal } from "lucide-react";
import { Popover, PopoverTrigger } from "./ui/popover";
import lg from '../public/profil.png';
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
    <aside className="w-[260px] h-screen  border-r ">
      <div className="h-full px-3 py-4 flex flex-col justify-between">
        <div>
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={lg} alt="logo" className="" />
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            {props.sidebarItems.links.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link key={index} href={link.href}>
                  <SideBarButton
                    variant="ghost"
                    className={`border-1 ${isActive ? 'bg-black text-white' : 'border-transparent text-gray-700 hover:bg-black hover:text-white'}`}
                    icon={link.icon}
                  >
                    {link.label}
                  </SideBarButton>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="border-t">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://img.freepik.com/free-photo/curly-man-with-broad-smile-shows-perfect-teeth-being-amused-by-interesting-talk-has-bushy-curly-dark-hair-stands-indoor-against-white-blank-wall_273609-17092.jpg" />
                      <AvatarFallback>MP</AvatarFallback>
                    </Avatar>
                    <span>{userData.nama}</span>
                  </div>
                  <MoreHorizontal size={20} />
                </div>
              </Button>
            </PopoverTrigger>
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
