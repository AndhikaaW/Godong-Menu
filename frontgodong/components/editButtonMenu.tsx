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
  import { Pen, Plus, Upload, UploadCloud } from "lucide-react";
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
  
  interface ButtonEditProps {
    menu: {
      id: string;
      category_id: string;
      name: string;
      image: string;
      description: string;
      price: string;
    };
    onMenuEditted: () => void;
  }
  
  export default function EditButton({ menu, onMenuEditted }: ButtonEditProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      id: menu.id,
      category_id: menu.category_id,
      image: menu.image,
      description: menu.description,
      price: menu.price,
      name: menu.name,
    });
  
    useEffect(() => {
      setFormData({
        id: menu.id,
        category_id: menu.category_id,
        image: menu.image,
        description: menu.description,
        price: menu.price,
        name: menu.name,
      });
    }, [menu]);
  
    const EditMenuForm = ({ className }: React.ComponentProps<"form">) => {
      const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
      const [base64Image, setBase64Image] = useState<string | null>(null);
      const [imagePreview, setImagePreview] = useState<string>("");
      const [selectedCategoryId, setSelectedCategoryId] = useState(formData.category_id);
      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64WithoutPrefix = base64String.replace(/^data:image\/\w+;base64,/, "");
            setBase64Image(base64WithoutPrefix);
            setImagePreview(URL.createObjectURL(file));
          };
          reader.readAsDataURL(file);
        }
      };
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://godongbackend.test/api/categories");
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
        formData.delete("image");
        if (base64Image) {
          formData.append("image", base64Image);
        }
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        //   }
  
        try {
          const response = await axios.post(
            "http://godongbackend.test/api/editmenu",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          console.log("Menu item added successfully:", response.data);
          setOpen(false);
          onMenuEditted();
        } catch (error) {
          console.error("Error adding menu item:", error);
          setError("Failed to add menu item. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
  
      return (
        <form onSubmit={handleSubmit} className={cn("flex flex-row gap-4 w-full", className)}>
          <div className="w-1/3">
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="id">ID Menu</Label>
                <Input
                  id="id"
                  name="id"
                  defaultValue={formData.id}
                  className="rounded-xl"
                  placeholder="ID of Menu"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select
                  name="category_id"
                  value={selectedCategoryId}
                  onValueChange={(value) => setSelectedCategoryId(value)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue>
                      {selectedCategoryId ? `${selectedCategoryId}` : "Select a category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.id} : {category.name}
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
                  defaultValue={formData.name}
                  className="rounded-xl"
                  placeholder="Name of Menu"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  defaultValue={formData.price}
                  className="rounded-xl"
                  placeholder="Price of Menu"
                />
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  className="rounded-xl w-full"
                  placeholder="Upload Image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.image && !imagePreview && (
                  <div className="w-full h-[155px] p-3 bg-white mt-2 rounded-xl justify-center items-center flex border border-gray-400">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <Image
                        className="rounded-xl"
                        fill
                        src={`data:image/jpeg;base64,${formData.image}`}
                        alt="Current"
                      />
                    </AspectRatio>
                  </div>
                )}
                {imagePreview && (
                  <div className="w-full h-[155px] p-3 bg-white mt-2 rounded-xl justify-center items-center flex border border-gray-400">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <Image
                        className="rounded-xl"
                        fill
                        src={imagePreview}
                        alt="Preview"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={formData.description}
                className="rounded-xl h-[190px] resize-none"
                placeholder="Description of Menu"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col justify-center gap-2  mt-4">
            <Button type="submit" className="h-1/2"  disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button type="button" className="h-1/2" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      );
    };
  
    const Content = ({ children }: { children: React.ReactNode }) => (
      <div className="grid gap-4 py-4">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
        </DialogHeader>
        {children}
      </div>
    );
  
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2B3674] sm:mr-3 mb-2 sm:opacity-75 sm:w-[70px] text-white w-[50px] p-2">
              <Pen className="sm:mr-2" size={12} />
              <span className="hidden sm:inline text-[12px]">Edit</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] sm:max-h-[500px] bg-white">
            <Content>
              <EditMenuForm />
            </Content>
          </DialogContent>
        </Dialog>
      );
    }
  
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="bg-[#2B3674] sm:mr-3 mb-2 sm:opacity-75 sm:w-[70px] text-white w-[50px] p-2">
            <Pen className="sm:mr-2" size={12} />
            <span className="hidden sm:inline text-[12px]">Edit</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Menu</DrawerTitle>
          </DrawerHeader>
          <Content>
            <EditMenuForm className="px-4" />
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