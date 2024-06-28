import React from "react";
import { SidebarItems } from "@/types/sidebartypes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Menu, MoreHorizontal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SideBarButtonSheet as SideBarButton } from "./SideBarButton";
import { Separator } from "./ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export default function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 fixed top-3 left-3">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent hideClose className="px-3 py-4 " side="left">
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          <span className="text-lg font-semibold text-foreground mx-3">
            Godong Menu
          </span>
          <SheetClose asChild>
            <Button className="h-5 w-5 p-0" variant="ghost">
              <X size={15} className="m-0" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div>
          <div className="flex flex-column gap-2 mt-3">
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SideBarButton
                  variant="outline"
                  className={`border-1 ${pathname === link.href ? "border-orange-500 text-orange-500" : "border-transparent text-gray-700 hover:border-orange-500 hover:text-orange-500"
                  }`}
                  icon={link.icon}
                >
                  {link.label}
                </SideBarButton>
              </Link>
            ))}
          </div>
          <div className="absolute w-full bottom-4 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <Button variant="ghost" className="w-full justify-start">
                <DrawerTrigger asChild>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://img.freepik.com/free-photo/curly-man-with-broad-smile-shows-perfect-teeth-being-amused-by-interesting-talk-has-bushy-curly-dark-hair-stands-indoor-against-white-blank-wall_273609-17092.jpg" />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                      <span className="align-self-center">Username</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </DrawerTrigger>
              </Button>
              <DrawerContent className="mb-2 p-2">
                <div className="flex flex-col -space-y-2 mt-2">
                  <Link href="/">
                    <SideBarButton size="sm" icon={LogOut} className="w-full">
                      Log Out
                    </SideBarButton>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
