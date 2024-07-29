"use client";
import React, { useEffect, useState } from "react";
import { Search, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ButtonDetail from "@/components/detailButton";
import axios from "axios";
import { BreadcrumbSkeleton, SearchSkeleton, ActionButtonSkeleton, TableSkeleton } from "@/components/Skeletons";

interface Product {
  faktur: string;
  id_user: number;
  no_telepon: string;
  alamat: string;
  item: string; // JSON string
  tanggal: string;
  total: number;
  diskon_persen : number;
  diskon_rupiah : number;
}

export default function TransactionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const response = await axios.get("http://192.168.200.100:8000/api/alltransaksi");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching transaksi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaksi();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb and Header */}
      {loading ? (
        <BreadcrumbSkeleton />
      ) : (
        <div>
          <p className="text-sm text-gray-500">Pages / Transaction</p>
          <h1 className="text-4xl font-semibold mt-2">Transaction</h1>
        </div>
      )}

      {/* Search and Action Buttons */}
      <div className="flex justify-end items-end flex-col space-y-4">
        {loading ? (
          <SearchSkeleton />
        ) : (
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
        )}
        {loading ? (
          <ActionButtonSkeleton />
        ) : (
          <div className="flex gap-4">
            <Button className="bg-[#F4F7FE] rounded-full text-gray-700 px-4 py-2 flex items-center">
              <span className="mr-2">
                <Upload size={15} />
              </span>{" "}
              Export
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table className="min-w-full overflow-x-auto border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
                ID Order
              </TableHead>
              <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
                ID Pemesan
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
                Alamat
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
                No Telepon
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
                Diskon Persen
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
                Diskon Rupiah
              </TableHead>
              <TableHead className="text-[13px] w-[150px] p-0 text-black text-center bg-gray-300 sm:table-cell">
                Total
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300 sm:table-cell">
                Tanggal
              </TableHead>
              <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300">
                Detail
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.faktur}>
                <TableCell className="text-blue-500 text-[12px] text-center">
                  {product.faktur}
                </TableCell>
                <TableCell className="text-blue-500 text-[12px] text-center">
                  {product.id_user}
                </TableCell>
                <TableCell className="text-center hidden text-[12px] sm:table-cell">
                  {product.alamat}
                </TableCell>
                <TableCell className="text-center text-[12px] hidden md:table-cell">
                  {product.no_telepon}
                </TableCell>
                <TableCell className="text-center hidden text-[12px] md:table-cell">
                  {product.diskon_persen}
                </TableCell>
                <TableCell className="text-center hidden text-[12px] md:table-cell">
                  {product.diskon_rupiah}
                </TableCell>
                <TableCell className="text-center hidden text-[12px] md:table-cell">
                  Rp. {product.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-center text-[12px] hidden md:table-cell">
                  {new Date(product.tanggal).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  <ButtonDetail product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
