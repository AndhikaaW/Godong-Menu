"use client";
import React, { useState } from "react";
import { LucideIcon, User } from "lucide-react";
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
  idReview:string;
  idUser: string;
  Review: string;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([
    {
      idReview:"1",
      idUser: "322002",
      Review: "Suntoyo",
    },
    {
      idReview:"1",
      idUser: "322002",
      Review: "Garam Sedang pas",
    },
    {
      idReview:"1",
      idUser: "322002",
      Review: "Garam Sedikit",
    },
    {
      idReview:"1",
      idUser: "322002",
      Review: "Garam Kebanyakan",
    }
  ]);
  const handleDelete = (id: string) => {
    // Implement delete functionality here
    console.log(`Delete product with id: ${id}`);
    setProducts(products.filter((product) => product.idUser !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb and Header */}
      <div>
        <p className="text-sm text-gray-500">Pages / Reviews</p>
        <h1 className="text-4xl font-semibold mt-2">Reviews</h1>
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
              ID
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              ID User
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              Review
            </TableHead>
            <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.idReview}>
              <TableCell className="text-blue-500 text-center">
                {product.idReview}
              </TableCell>
              <TableCell className="text-black text-center">
                {product.idUser}
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
              {product.Review}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <Button
                      className="bg-[#F13023] opacity-80 sm:w-[70px] text-white w-[50px] p-2"
                      onClick={() => handleDelete(product.idUser)}
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
