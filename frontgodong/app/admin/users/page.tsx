"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LucideIcon, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
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
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  nama: string;
  icon?: LucideIcon;
  email: string;
  address: string;
  phone: string;
}

export default function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const response = await axios.get("http://godongbackend.test/api/getUser", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error!", error);
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://godongbackend.test/api/deleteuser/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
      setSelectedUser(null); // Close the dialog
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb and Header */}
      <div>
        <p className="text-sm text-gray-500">Pages / Users</p>
        <h1 className="text-4xl font-semibold mt-2">Users</h1>
      </div>

      {/* Search and Action Buttons on the right, with Search above Add and Export */}
      <div className="flex justify-end items-end flex-col space-y-4">
        <div className="relative w-full sm:w-1/3">
          <Input
            type="text"
            className="w-full bg-[#F4F7FE] p-2 border border-gray-300 rounded-xl shadow-xl pl-10"
            placeholder="Search"
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
      </div>
      {/* Table */}
      <Table className="min-w-full overflow-x-auto border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              ID User
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300">
              Pictures
            </TableHead>
            <TableHead className="text-[13px] w-[90px] p-0 text-black text-center bg-gray-300 hidden sm:table-cell">
              Name
            </TableHead>
            <TableHead className="text-[13px] w-[250px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="text-[13px] w-[250px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              Address
            </TableHead>
            <TableHead className="text-[13px] w-[250px] p-0 text-black text-center bg-gray-300 hidden md:table-cell">
              No Telp
            </TableHead>
            <TableHead className="text-[13px] w-[100px] p-0 text-black text-center bg-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-blue-500 text-center">
                {user.id}
              </TableCell>
              <TableCell className="text-black text-center">
                {user.icon && <user.icon size={24} />}
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                {user.nama}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {user.email}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {user.address}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {user.phone}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <Button
                      className="bg-[#F13023] opacity-80 sm:w-[70px] text-white w-[50px] p-2"
                      onClick={() => setSelectedUser(user)}
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

      {/* Confirmation Dialog */}
      {selectedUser && (
        <Dialog open={true} onOpenChange={() => setSelectedUser(null)}>
          <DialogOverlay className="fixed inset-0" />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete user {selectedUser.nama}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setSelectedUser(null)}>Cancel</Button>
              <Button
                className="bg-red-600 text-white"
                onClick={() => handleDelete(selectedUser.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
