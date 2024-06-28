
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

export default function UsersAdminpage() {
    return (
        <Card className="m-3">
            <CardHeader>
                <CardDescription className="fst-italic text-blue-400">Pages/Users</CardDescription>
                <CardTitle>Users</CardTitle>
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
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-300">
                            <TableHead className="w-[60px] p-3">Id Users</TableHead>
                            <TableHead className="w-[100px]">Pictures</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[100px]">Email</TableHead>
                            <TableHead>NoTelp</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-semibold">001</TableCell>
                            <TableCell>
                                <img src="/favicon.ico" alt="" className="w-7" />
                            </TableCell>
                            <TableCell>
                                <Label>Rahma Dwi Kura Kura</Label>
                            </TableCell>
                            <TableCell>
                                <Label>RahmaDwiKura@gmail.com</Label>
                            </TableCell>
                            <TableCell>
                                <Label>08XXXXXXXXXX</Label>
                            </TableCell>
                            <TableCell>
                                <Button className="bg-#F13023"><RiDeleteBinLine className="mr-2" />Delete</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">001</TableCell>
                            <TableCell>
                                <img src="/favicon.ico" alt="" className="w-7" />
                            </TableCell>
                            <TableCell>
                                <Label>Rahma Dwi Kura Kura</Label>
                            </TableCell>
                            <TableCell>
                                <Label>RahmaDwiKura@gmail.com</Label>
                            </TableCell>
                            <TableCell>
                                <Label>08XXXXXXXXXX</Label>
                            </TableCell>
                            <TableCell>
                                <Button className="bg-red-500"><RiDeleteBinLine className="mr-2 " />Delete</Button>
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


