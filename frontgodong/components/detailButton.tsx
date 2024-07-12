import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  id_user: number;
  no_telepon: string;
  alamat: string;
  item: string; // JSON string
  tanggal: string;
  total: number;
}

interface ButtonDetailProps {
  product: Product;
}

export default function ButtonDetail({ product }: ButtonDetailProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const AddDetailForm = ({ className }: React.ComponentProps<"form">) => {
        const items = JSON.parse(product.item);
        
        return (
            <div className={cn("grid items-start gap-4 w-full", className)}>
                <div className="flex flex-row w-full gap-2">
                    <div className="flex flex-col w-1/2 ">
                        <div className="mb-3">
                            <Label htmlFor="id">Order ID</Label>
                            <p className="border p-2 rounded">{product.id}</p>
                        </div>
                        <div>
                            <Label htmlFor="">Id Pemesan</Label>
                            <p className="border p-2 rounded">{product.id_user}</p>
                        </div>
                        <div className="h-full">
                            <Label htmlFor="">Items</Label>
                            <div className="border h-full p-2 rounded">
                                {items.map((item: any, index: number) => (
                                    <p key={index}>{item.name} - Rp.{item.price} x {item.count}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                        <div>
                            <Label htmlFor="">Harga Total</Label>
                            <p className="border p-2 rounded">Rp. {product.total.toFixed(2)}</p>
                        </div>
                        <div>
                            <Label htmlFor="">Alamat</Label>
                            <p className="border p-2 rounded">{product.alamat}</p>
                        </div>
                        <div>
                            <Label htmlFor="">No Telepon</Label>
                            <p className="border p-2 rounded">{product.no_telepon}</p>
                        </div>
                        <div>
                            <Label htmlFor="">Tanggal</Label>
                            <p className="border p-2 rounded">{new Date(product.tanggal).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4 mt-4">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </div>
        );
    };

    const Content = () => (
        <div className="grid gap-4 py-4">
            <DialogTitle>Detail Transaction</DialogTitle>
            <AddDetailForm />
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[#4ED4F1] w-[70px] text-white cursor-pointer rounded-full h-[20px] text-[12px]">
                        Detail
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] sm:max--[500px] bg-[#F4F7FE]">
                    <Content />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="bg-[#4ED4F1] w-[70px] text-white cursor-pointer rounded-full h-[20px] text-[12px]">
                    Detail
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Detail Transaction</DrawerTitle>
                </DrawerHeader>
                <Content />
            </DrawerContent>
        </Drawer>
    );
}