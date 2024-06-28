import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";
import { FaEdit } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';

function CategoryAdminpage() {
  return (
    <Card className="m-3">
      <CardHeader>
        <CardDescription className="fst-italic text-blue-400">Pages/Category</CardDescription>
        <CardTitle>Category</CardTitle>
        <div className="d-flex justify-content-end">
          <div className="flex items-center bg-white border rounded-md shadow-sm px-3 py-2">
            <Search className="text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="outline-none ml-2 flex-grow"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div className="flex items-center bg-gray-200 px-2 py-1 gap-2 w-1" style={{borderRadius:'20px'}}>
            <CiCirclePlus size="30px" className="text-gray-400" />
            <label htmlFor="add">Add</label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-300">
              <TableHead className="w-[60px] p-3">Id Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Category Icon</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">001</TableCell>
              <TableCell>
                <Label>Food</Label>
              </TableCell>
              <TableCell>
                <img src="/favicon.ico" alt="" className="w-7" />
              </TableCell>

              <TableCell>
                <Label>Godong Resto menghadirkan berbagai-</Label>
              </TableCell>
              <TableCell>
                <div className='d-flex flex-row'>
                  <div className='col'>
                    <Button className="bg-blue-500" style={{ width: '100px' }}><FaEdit className="mr-2" />Edit</Button>
                  </div>
                  <div className='col'>
                    <Button className="bg-red-500"><RiDeleteBinLine className="mr-2" />Delete</Button>
                  </div>

                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">001</TableCell>
              <TableCell>
                <Label>Drink</Label>
              </TableCell>
              <TableCell>
                <img src="/favicon.ico" alt="" className="w-7" />
              </TableCell>

              <TableCell>
                <Label>Godong Resto menghadirkan berbagai-</Label>
              </TableCell>
              <TableCell>
                <div className='d-flex flex-row'>
                  <div className='col'>
                    <Button className="bg-#2B3674"><FaEdit className="mr-2" />Edit</Button>
                  </div>
                  <div className='col'>
                    <Button className="bg-#F13023"><RiDeleteBinLine className="mr-2" />Delete</Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
        
            {/* <TableRow>
      <TableCell className="font-semibold">GGPC-002</TableCell>
      <TableCell>
        <Label htmlFor="stock-2" className="sr-only">
          Stock
        </Label>
        <Input id="stock-2" type="number" defaultValue="143" />
      </TableCell>
      <TableCell>
        <Label htmlFor="price-2" className="sr-only">
          Price
        </Label>
        <Input id="price-2" type="number" defaultValue="99.99" />
      </TableCell>
      <TableCell>
        <ToggleGroup type="single" defaultValue="m" variant="outline">
          <ToggleGroupItem value="s">S</ToggleGroupItem>
          <ToggleGroupItem value="m">M</ToggleGroupItem>
          <ToggleGroupItem value="l">L</ToggleGroupItem>
        </ToggleGroup>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-semibold">GGPC-003</TableCell>
      <TableCell>
        <Label htmlFor="stock-3" className="sr-only">
          Stock
        </Label>
        <Input id="stock-3" type="number" defaultValue="32" />
      </TableCell>
      <TableCell>
        <Label htmlFor="price-3" className="sr-only">
          Stock
        </Label>
        <Input id="price-3" type="number" defaultValue="99.99" />
      </TableCell>
      <TableCell>
        <ToggleGroup type="single" defaultValue="s" variant="outline">
          <ToggleGroupItem value="s">S</ToggleGroupItem>
          <ToggleGroupItem value="m">M</ToggleGroupItem>
          <ToggleGroupItem value="l">L</ToggleGroupItem>
        </ToggleGroup>
      </TableCell>
    </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default CategoryAdminpage