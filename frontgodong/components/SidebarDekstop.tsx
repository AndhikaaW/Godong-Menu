"use client"
import React, { useEffect, useState, useCallback } from "react";
import SideBarButton from "./SideBarButton";
import { SidebarItems } from "@/types/sidebartypes";
import Link from "next/link";
import { CircleUser, LogOut, MoreHorizontal } from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../components/Auth/useAuth";
import HomepageSkeleton from "@/app/skeleton/skeletonSidebarDesktop";


interface SidebarDekstopProps {
  sidebarItems: SidebarItems;
}

export default function SidebarDekstop(props: SidebarDekstopProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userinfo = localStorage.getItem('user-info');
      let email = userinfo ? userinfo.replace(/["]/g, '') : null;
      if (!email) {
        setError('Email tidak ditemukan di localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://192.168.200.100:8000/api/user/${email}`);
        setUserData(response.data);
      } catch (err) {
        setError('Gagal mengambil data user');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      // Jalankan navigasi dan logout secara bersamaan
      await Promise.all([
        router.push('/login'),
        logout()
      ]);
    } catch (error) {
      console.error('Terjadi kesalahan saat logout:', error);
      // Opsional: Tambahkan notifikasi error untuk pengguna
    }
  }, [router, logout]);

  if (loading) {
    return <HomepageSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
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
                      <AvatarImage src={userData.pictures} />
                      <AvatarFallback>Max Programming</AvatarFallback>
                    </Avatar>
                    <span className="align-self-center">{userData.nama}</span>
                  </div>
                  <MoreHorizontal size={20} />
                </div>
              </PopoverTrigger>
            </Button>
            <PopoverContent className="mb-2 w-auto h-auto p-3 rounded-[1rem]">
              <SideBarButton
                size="sm"
                icon={LogOut}
                onClick={handleLogout}
                className="w-[200px] h-[35px] animate-none border-[1px] bg-[#61AB5B] text-white"
              >
                Log Out
              </SideBarButton>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  );
}