import React, { useState } from "react";
import axios from "axios";
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
import { Plus, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { log } from "console";

// interface ButtonDetailProps {
//     onCategoryAdded: () => void;
// }

export default function ButtonDetail() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        //// for (const pair of formData.entries()) {
        ////   console.log(`${pair[0]}: ${pair[1]}`);
        //// }

        // try {
        //   const response = await axios.post('http://godongbackend.test/api/categories',formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });

        //   console.log('Category added successfully:', response.data);
        //   setOpen(false);
        //   onCategoryAdded();
        // } catch (error) {
        //   console.error('Error adding category:', error);
        //   setError('Failed to add category. Please try again.');
        // } finally {
        //   setIsSubmitting(false);
        // }
    };

    const AddDetailForm = ({ className }: React.ComponentProps<"form">) => {
        return (
            <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 w-full", className)}>
                <div className="flex flex-row w-full gap-2">
                    <div className="flex flex-col w-1/2 ">
                        <div className="mb-3">
                            <Label htmlFor="id">Order ID</Label>
                            <Input name="id" type="text" id="id" className="rounded-xl" placeholder="G-21 Category" required />
                        </div>
                        <div>
                            <Label htmlFor="">Id Pemesan</Label>
                            <p className="border p-2 rounded">123</p>
                        </div>
                        <div className="h-full">
                            <Label htmlFor="">Items</Label>
                            <p className="border h-full p-2 rounded">adssa</p>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                        <div>
                            <Label htmlFor="">Harga Total</Label>
                            <p className="border p-2 rounded">123</p>
                        </div>
                        <div>
                            <Label htmlFor="">Alamat</Label>
                            <p className="border p-2 rounded">123</p>
                        </div>
                        <div>
                            <Label htmlFor="">No Telepon</Label>
                            <p className="border p-2 rounded">123</p>
                        </div>
                        <div>
                            <Label htmlFor="">Tanggal</Label>
                            <p className="border p-2 rounded">123</p>
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end gap-2 border-t pt-4 mt-4">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </Button>
                </div>
            </form>
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
                    <Button className=" bg-[#4ED4F1] w-[70px] text-white cursor-pointer rounded-full h-[20px] text-[12px]">
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
                {/* <Button variant="outline" className="bg-[#F4F7FE] text-black">
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button> */}
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