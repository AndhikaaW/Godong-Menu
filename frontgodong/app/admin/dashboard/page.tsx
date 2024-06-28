"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import soto from "../../../public/soto.png";
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
import { Pen, Plus, Search, Trash2, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Product {
  idCategory: string;
  name: string;
  image: StaticImageData;
  description: string;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      idCategory: "302002",
      name: "Iwak Lamongan",
      image: soto,
      description: "Soto Lamongan, soto khas Jawa Timur -",
    },
    {
      idCategory: "302002",
      name: "Iwak Lamongan",
      image: soto,
      description: "Soto Lamongan, soto khas Jawa Timur -",
    },
    {
      idCategory: "302002",
      name: "Iwak Lamongan",
      image: soto,
      description: "Soto Lamongan, soto khas Jawa Timur -",
    },
    {
      idCategory: "302002",
      name: "Iwak Lamongan",
      image: soto,
      description: "Soto Lamongan, soto khas Jawa Timur -",
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
            className="w-full  bg-[#F4F7FE] p-2 border border-gray-300 rounded-xl shadow-xl pl-10"
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
          <Button className="bg-[#F4F7FE] rounded-full text-gray-700 px-4 py-2  flex items-center">
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
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
              ID
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
              <TableCell className="text-blue-500 hidden sm:table-cell">
                {product.idCategory}
              </TableCell>
              <TableCell className="text-blue-500">{product.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.image}
                  width="64"
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.description}
              </TableCell>
              <TableCell>
                <div className="flex center flex-col sm:flex-row">
                  <Button
                    className="bg-[#2B3674] sm:mr-3 mb-2 sm:opacity-75 sm:w-[70px] text-white w-[50px] p-2"
                    onClick={() => handleEdit(product.idCategory)}
                  >
                    <Pen className="sm:mr-2" size={12} />
                    <span className="hidden sm:inline text-[12px] ">Edit</span>
                  </Button>
                  <Button
                    className="bg-[#F13023] sm:opacity-80 sm:w-[70px] text-white w-[50px] p-2"
                    onClick={() => handleDelete(product.idCategory)}
                  >
                    <Trash2 size={15} className="sm:mr-2" />
                    <span className="hidden sm:inline text-[12px] ">
                      Delete
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
