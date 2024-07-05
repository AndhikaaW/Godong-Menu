import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import bg from "../public/bg-login.png";
import { Plus, Upload, UploadCloud } from "lucide-react";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import axios from "axios";
import { AspectRatio } from "./ui/aspect-ratio";
interface ButtonAddProps {
  onMenuAdded: () => void;
}

export default function AddButton({
  onMenuAdded: onMenuAdded,
}: ButtonAddProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [error, setError] = useState<string | null>(null);
  const AddCategoryForm = ({ className }: React.ComponentProps<"form">) => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>(
      []
    );
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove the prefix from the base64 string
          const base64WithoutPrefix = base64String.replace(/^data:image\/\w+;base64,/, '');
          setBase64Image(base64WithoutPrefix);
          setImagePreview(URL.createObjectURL(file));
        };
        reader.readAsDataURL(file);
      }
    };
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://godongbackend.test/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    useEffect(() => {
      fetchCategories();
    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData(event.currentTarget);

      // Remove the file input from formData
      formData.delete('image');

      // Add the base64 image string if it exists
      if (base64Image) {
        formData.append('image', base64Image);
      }
      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }
      try {
        const response = await axios.post(
          "http://godongbackend.test/api/menu-items",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Menu item added successfully:", response.data);
        setOpen(false);
        onMenuAdded();
      } catch (error) {
        console.error("Error adding menu item:", error);
        // Handle error
      } finally {
        setIsSubmitting(false);
      }
    };
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-row gap-4 w-full", className)}>
        <div className="w-1/3">
          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="id">ID Menu</Label>
              <Input
                id="id"
                name="id"
                className="rounded-xl"
                placeholder="Id of Menu"
              />
            </div>
            <div>
              <Label htmlFor="category_id">Id Category</Label>
              <Select
                name="category_id"
                value={selectedCategoryId}
                onValueChange={(value) => setSelectedCategoryId(value)}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue>
                    {selectedCategoryId || "Select a category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <b>{category.id}</b> : {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="rounded-xl"
                placeholder="Name of Menu"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                className="rounded-xl"
                placeholder="Price of Menu"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex flex-col gap-2 w-full">
            <div>
              <Label htmlFor="omage">Image</Label>
              <Input
                id="image"
                name="image"
                className="rounded-xl w-full"
                placeholder="Upload Image"
                type="file"
                accept="image/*"
                onChangeCapture={handleFileChange}
              />
              <div className="w-full h-[155px] p-3 bg-white mt-2 rounded-xl justify-center items-center flex border border-gray-400">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    className="rounded-xl "
                    fill
                    src={imagePreview}
                    alt="Preview"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="rounded-xl h-[190px] resize-none"
              placeholder="Description of Menu"
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    );
  };

  const Content = ({ children }: { children: React.ReactNode }) => (
    <div className="grid gap-4 py-4">
      <DialogHeader>
        <DialogTitle>Add Menu</DialogTitle>
      </DialogHeader>
      <AddCategoryForm />
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#F4F7FE] text-black rounded-full hover:bg-gray-300">
            <Plus className="mr-2 h-4 w-4 " /> Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] sm:max--[500px] bg-light ">
          <Content>
            <AddCategoryForm />
          </Content>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#F4F7FE] text-black rounded-full hover:bg-gray-300"
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Category</DrawerTitle>
        </DrawerHeader>
        <Content>
          <AddCategoryForm className="px-4" />
        </Content>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
