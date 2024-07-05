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

interface ButtonAddProps {
  onCategoryAdded: () => void;
}

export default function ButtonAdd({ onCategoryAdded }: ButtonAddProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    try {
      const response = await axios.post('http://godongbackend.test/api/categories',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Category added successfully:', response.data);
      setOpen(false);
      onCategoryAdded();
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const AddCategoryForm = ({ className }: React.ComponentProps<"form">) => {
    return (
      <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 w-full", className)}>
        <div className="flex flex-row w-full gap-2">
          <div className="flex flex-col w-1/2">
            <div className="grid gap-2">
              <Label htmlFor="id">Category ID</Label>
              <Input name="id" type="text" id="id" className="rounded-xl" placeholder="G-21 Category" required />
            </div>
            <div className="h-full mt-2">
              <Label className="w-full mb-2 h-fit" htmlFor="description">Description</Label>
              <Textarea
                name="description"
                className="rounded-xl h-full"
                id="description"
                placeholder="Description of Category"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input name="name" id="name" className="rounded-xl" placeholder="Name of Category" required />
            </div>
            <div className="mt-9 flex items-center h-full justify-center w-full">
              <label
                htmlFor="icon"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Choose picture</span>
                  </p>
                </div>
                <input name="icon" id="icon" type="file" className="hidden" accept="image/*" required />
              </label>
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
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
      </DialogHeader>
      <AddCategoryForm />
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#F4F7FE] text-black rounded-full hover:bg-gray-300">
            <Plus className="mr-2 h-4 w-4" /> Add
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
        <Button variant="outline" className="bg-[#F4F7FE] text-black rounded-full hover:bg-gray-300">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Category</DrawerTitle>
        </DrawerHeader>
        <Content />
      </DrawerContent>
    </Drawer>
  );
}