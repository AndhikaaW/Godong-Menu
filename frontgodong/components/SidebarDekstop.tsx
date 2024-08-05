import React, { useCallback } from "react";
import { SidebarItems, UserData } from "@/types/sidebartypes";
import Link from "next/link";
import { LogOut, UserRound, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../components/Auth/useAuth";
import { Separator } from "./ui/separator";

interface SidebarDekstopProps {
  sidebarItems: SidebarItems;
  userData: UserData;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function SidebarDekstop({ sidebarItems, userData, isCollapsed, setIsCollapsed }: SidebarDekstopProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = useCallback(() => {
    router.push('/login');
    router.refresh();
    setTimeout(() => {
      logout();
    }, 100);
  }, [router, logout]);

  return (
    <aside className={`w-[${isCollapsed ? '80px' : '270px'}] max-w-xs h-screen fixed left-0 top-0 z-40 border-r transition-all duration-300`}>
      <div className="h-full px-3 py-4">
        <div className="flex justify-between items-center mb-5">
        {isCollapsed ? (
            <div className="w-10 h-10 rounded-full text-green-400 flex items-center justify-center text-4xl font-bold ">
              G
            </div>
          ) : (
            <h3 className="text-center text-3xl font-bold text-foreground font-poppins">Godong Menu</h3>
          )}
          <Button variant="ghost" onClick={toggleCollapse} className="p-1">
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </Button>
        </div>
        <div className="flex flex-column gap-2 mt-5">
          {sidebarItems.links.map((link, index) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={index} href={link.href}>
                <Button
                  variant="outline"
                  className={`border-1 w-full justify-start ${isActive ? 'border-[#61AB5B] text-[#61AB5B]' : 'border-transparent text-gray-700 hover:border-[#61AB5B] hover:text-[#61AB5B]'}`}
                >
                  <Icon size={24} />
                  {!isCollapsed && <span className="ml-2">{link.label}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className="absolute left-0 bottom-1 w-full border-top p-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={userData.pictures} />
                      <AvatarFallback><UserRound /></AvatarFallback>
                    </Avatar>
                    {!isCollapsed && <span className="align-self-center">{userData.nama}</span>}
                  </div>
                  {!isCollapsed && <MoreHorizontal size={20} />}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="mb-2 w-auto h-auto p-3 rounded-[1rem]">
              <Button
                size="sm"
                onClick={handleLogout}
                className="w-[200px] h-[35px] animate-none border-[1px] bg-[#61AB5B] text-white"
              >
                <LogOut className="mr-2" size={16} />
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  );
}