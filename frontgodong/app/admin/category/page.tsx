"use client";
import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CupSoda, Pen, Plus, Popcorn, Search, Trash2, Upload, UtensilsCrossed } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Product {
  idCategory: string;
  name: string;
  icon?: LucideIcon;
  description: string;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      idCategory: "322002",
      name: "Makanan",
      icon: UtensilsCrossed,
      description: "Kategori Makanan Untuk seperti Nasgor dkk",
    },
    {
      idCategory: "312002",
      name: "Minuman",
      icon: CupSoda,
      description: "Kategori Minuman untuk seperti Ice dkk",
    },
    {
      idCategory: "332002",
      name: "Snack",
      icon: Popcorn,
      description: "Snack untuk seperti popcorndkk",
    },
  ]);

  const handleEdit = (id: string) => {
    // Implement edit functionality here
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality here
    console.log(`Delete product with id: ${id}`);
    setProducts(products.filter((product) => product.idCategory !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb and Header */}
      <div>
        <p className="text-sm text-gray-500">Pages / Category</p>
        <h1 className="text-4xl font-semibold mt-2">Category</h1>
      </div>

      {/* Search and Action Buttons on the right, with Search above Add and Export */}
      <div className="flex justify-end items-end flex-col space-y-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            className="w-full bg-[#F4F7FE] p-2 border border-gray-300 rounded-xl shadow-xl pl-10"
            placeholder="Search"
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger className="bg-[#F4F7FE] rounded-full text-black px-4 py-2 flex items-center">
              <span className="mr-2">
                <Plus size={15} color="black" />
              </span>{" "}
              Add
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="bg-[#F4F7FE] rounded-full text-gray-700 px-4 py-2 flex items-center">
            <span className="mr-2">
              <Upload size={15} />
            </span>{" "}
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="min-w-full overflow-x-auto border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              ID Category
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              Name
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
              Icon
            </TableHead>
            <TableHead className="text-[13px] w-[250px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              Description
            </TableHead>
            <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.idCategory}>
              <TableCell className="text-blue-500 text-center">
                {product.idCategory}
              </TableCell>
              <TableCell className="text-blue-500 text-center">
                {product.name}
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                {product.icon && <product.icon size={24} />}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {product.description}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <Button
                      className="bg-[#2B3674] mb-2 opacity-75 sm:w-[70px] text-white w-[50px] p-2"
                      onClick={() => handleEdit(product.idCategory)}
                    >
                      <Pen className="sm:mr-2" size={12} />
                      <span className="hidden sm:inline text-[12px]">Edit</span>
                    </Button>
                    <Button
                      className="bg-[#F13023] opacity-80 sm:w-[70px] text-white w-[50px] p-2"
                      onClick={() => handleDelete(product.idCategory)}
                    >
                      <Trash2 size={15} className="sm:mr-2" />
                      <span className="hidden sm:inline text-[12px]">
                        Delete
                      </span>
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
