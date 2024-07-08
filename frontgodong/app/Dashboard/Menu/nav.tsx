// "use client"
// import React, { useEffect, useState } from 'react'
// import { InputText } from 'primereact/inputtext';
// import { LuShoppingCart } from 'react-icons/lu';
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"

// import {
//     Card,
// } from "@/components/ui/card"


// import { Button } from "@/components/ui/button"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet"
// import axios from 'axios';

// interface Product {
//     name: string;
//     description: string;
//     price: string;
//     count: String;
// }
// interface Menu {
//     name: string;
// }
// const Menupage = () => {

//     const [menu, setCategories] = useState<Menu[]>([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://godongbackend.test/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('There was an error fetching the users!', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const [products, setProducts] = useState<Product[]>([
//         {
//             name: "Iwak Lamongan",
//             description: "Soto Lamongan, soto khas Jawa Timur -",
//             price: "Rp.20.000",
//             count: '1'
//         },
//         {
//             name: "Soto Lamongan",
//             description: "Soto Lamongan, soto khas Jawa Timur -",
//             price: "Rp.20.000",
//             count: '3'
//         },
//         {
//             name: "Es Teh",
//             description: "Soto Lamongan, soto khas Jawa Timur -",
//             price: "Rp.20.000",
//             count: '10'
//         },
//         {
//             name: "Risoles",
//             description: "Soto Lamongan, soto khas Jawa Timur -",
//             price: "Rp.20.000",
//             count: '12'
//         },

//     ]);
//     return (
//         <div className='surface-0'>
//             <div className='flex justify-content-end sm:flex-row mt-5 me-4'>
//                 <Input type="search" placeholder="Search" className=' w-1/4 ms-3 me-2 sm:w-1/4' />
//                 <Sheet>
//                     <SheetTrigger asChild>
//                         <div className='flex align-items-center'>
//                             <LuShoppingCart size={'30px'} color='black'/>
//                         </div>
//                     </SheetTrigger>
//                     <SheetContent>
//                         <SheetHeader>
//                             <SheetTitle className='text-black'>Keranjang</SheetTitle>
//                             <SheetDescription>
//                                 {products.map((product) => (
//                                     <Card className='m-2 p-3'>
//                                         <div className='flex justify-content-between'>
//                                             <div className='flex justify-center align-items-center gap-2 me-3'>
//                                                 <Checkbox id="terms" />
//                                                 <img src="/soto.png" alt="" />
//                                                 <label htmlFor="name">{product.name}</label>
//                                             </div>
//                                             <div className='flex justify-center align-items-center gap-3'>
//                                                 <label htmlFor="price"><b>{product.count} pcs</b></label>
//                                                 <label htmlFor="price">{product.price}</label>
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 ))}
//                             </SheetDescription>
//                         </SheetHeader>
//                         <SheetFooter className='flex row gap-4 mt-4'>
//                             <Card>
//                                 <div className='flex justify-content-between p-3'>
//                                     <div className='flex justify-center align-items-center gap-2 me-3'>
//                                         <label htmlFor="total">Total pesanan anda</label>
//                                     </div>
//                                     <div className='flex justify-center align-items-center gap-3'>
//                                         <label htmlFor="price">Rp.</label>
//                                     </div>
//                                 </div>
//                             </Card>
//                             <SheetClose asChild>
//                                 <Button type="submit" className='text-white bg-[#61AB5B]'>Tambah Pesanan</Button>
//                             </SheetClose>
//                         </SheetFooter>
//                     </SheetContent>
//                 </Sheet>
//             </div>
//             <div className='text-center'>
//                 <h1>Menu</h1>
//                 <div className="underline" style={{ width: '100px', height: '4px', background: '#61AB5B', margin: '10px auto' }}></div>
//                 <p>Nama</p>
//                 <div className='flex flex-row justify-center gap-3'>
//                     {/* {menu.map((listmenu) => (
//                         // <a href='#'><Button className='bg-white border'>{listmenu.name}</Button></a>
//                         <a href={`#${listmenu.name.replace(/\s+/g, '-').toLowerCase()}`}>
//                             <Button variant="ghost" className="bg-[#D5FFD4] text-black hover:bg-[#61AB5B] hover:font-bold">
//                                 {listmenu.name}
//                             </Button>
//                         </a>
//                     ))} */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Menupage


// // const nestedMenuitems = [
// //     {
// //         label: 'Food',
// //         command: () => {
// //             router.push('/dashboard/menu/food')
// //         },
// //         className: 'me-5',
// //     },
// //     {
// //         label: 'Drink',
// //         command: () => {
// //             router.push('/dashboard/menu/drink')
// //         },
// //         className: 'me-5'
// //     },
// //     {
// //         label: 'Snack',
// //         command: () => {
// //             router.push('/dashboard/menu/snack')
// //         },
// //         className: 'me-5'
// //     }
// // ];