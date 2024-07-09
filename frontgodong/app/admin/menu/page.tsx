"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ButtonAdd from "@/components/addButtonMenu";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Search, Trash2, Upload } from "lucide-react";
import axios from "axios";
import EditButton from "@/components/editButtonMenu";

interface Menu {
  id: string;
  category_id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

const fetchMenu = async (): Promise<Menu[]> => {
  const response = await axios.get("http://godongbackend.test/api/menu-items");
  return response.data;
};

const deleteMenu = async (id: string): Promise<void> => {
  await axios.delete(`http://godongbackend.test/api/menu-items/${id}`);
};

export default function Menu() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshMenu = useCallback(async () => {
    const menuItems = await fetchMenu();
    setMenu(menuItems);
  }, []);

  useEffect(() => {
    refreshMenu();
  }, [refreshMenu]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMenu(id);
      setMenu(menu.filter((product) => product.id !== id));
      console.log(`Deleted menu item with id: ${id}`);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const openModal = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const onGetExportProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      // const response = await axios.get("http://godongbackend.test/api/contactcol");
      // Check if the action result contains data and if it's an array
      if (menu && Array.isArray(menu)) {
        const dataToExport = menu.map((pro: any) => ({
          id: pro.id,
          category_id: pro.category_id,
          name: pro.name,
          // image: pro.image,
          description: pro.description,
          price: pro.price
        })
          ,);
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);

    }
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm text-gray-500">Pages / Menu</p>
        <h1 className="text-4xl font-semibold mt-2">Menu</h1>
      </div>
      <div className="flex justify-end items-end flex-col space-y-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            className="w-full bg-[#F4F7FE] p-2 border border-gray-300 rounded-xl shadow-xl pl-10"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        <div className="flex gap-4">
          <ButtonAdd onMenuAdded={refreshMenu} />
          <Button variant={"outline"} onClick={() => onGetExportProduct("Menu", "MenuExport")} className="bg-[#F4F7FE] rounded-full text-gray-700 px-4 py-2 flex items-center hover:bg-gray-300" >
            <span className="mr-2">
              <Upload size={15} />
            </span>
            {loading ? "Loading..." : "Export"}
          </Button>
        </div>
      </div>
      <Table className="min-w-full overflow-x-auto border">
        <TableHeader>
          <TableRow>
            <TableHead className="border-r text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              ID Menu
            </TableHead>
            <TableHead className="text-[11px] w-[90px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
              ID Category
            </TableHead>
            <TableHead className="text-[11px] w-[90px] p-0 text-black text-center bg-gray-300">
              Name
            </TableHead>
            <TableHead className="text-[11px] w-[90px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
              Pictures
            </TableHead>
            <TableHead className="text-[11px] w-[250px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              Description
            </TableHead>
            <TableHead className="text-[11px] w-[90px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              Price
            </TableHead>
            <TableHead className="text-[11px] w-[100px] p-0 text-black text-center bg-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMenu.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-blue-500">{product.id}</TableCell>
              <TableCell className="text-blue-500 hidden sm:table-cell">
                {product.category_id}
              </TableCell>
              <TableCell >{product.name}</TableCell>
              <TableCell className="hidden sm:table-cell ">
                {product.image && (
                  <Image
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    width={50}
                    height={50} 
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.description}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {product.price}
              </TableCell>
              <TableCell>
                <div className="flex center flex-col gap-2 sm:flex-row">
                  <EditButton menu={product} onMenuEditted={refreshMenu} />
                  <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-[#F13023] sm:opacity-80 sm:w-[70px] text-white w-[50px] p-2"
                        onClick={() => openModal(product)}
                      >
                        <Trash2 size={15} className="sm:mr-2" />
                        <span className="hidden sm:inline text-[12px] ">
                          Delete
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription className="text-black">
                        Are you sure you want to delete menu item <strong>{selectedMenu?.name}</strong>?
                      </DialogDescription>
                      <DialogFooter className="flex justify-end gap-2">
                        <Button onClick={() => setIsModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-red-700 text-white" onClick={() => handleDelete(selectedMenu!.id)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
