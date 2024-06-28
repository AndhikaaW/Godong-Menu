"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';
import { Input } from "@/components/ui/input"

const Menupage = ({ children }: any) => {
    const router = useRouter();
    const nestedMenuitems = [
        {
            label: 'Food',
            command: () => {
                router.push('/Dashboard/Menu/Food')
            },
            className: 'me-5',
        },
        {
            label: 'Drink',
            command: () => {
                router.push('/Dashboard/Menu/Drink')
            },
            className: 'me-5'
        },
        {
            label: 'Snack',
            command: () => {
                router.push('/Dashboard/Menu/Snack')
            },
            className: 'me-5'
        }
    ];
    return (
        <div className='surface-0 p-lg-4'>
                <div className='flex justify-content-end mr-2 mt-3 sm:mt-0'>
                    <div className="flex w-3 max-w-sm items-center space-x-2 gap-2">
                        <Input type="search" placeholder="Search" />
                        <Link href='/Dashboard/Cart'>
                            <LuShoppingCart size={'30px'} color='black' />
                        </Link>
                    </div>
                </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#d4a123', margin: '10px auto' }}></div>
                <p>Menu Godong</p>
                <Menubar model={nestedMenuitems} className='justify-content-center ' style={{ background: 'white', border: 'None' }}></Menubar>
            </div>
        </div>

        // <div className='pt-5'>
        //     <div className='flex justify-content-end mr-2'>
        //         <div className="flex w-3 max-w-sm items-center space-x-2 gap-2">
        //             <Input type="search" placeholder="Search" />
        //             <Link href='/Dashboard/Cart'>
        //                 <LuShoppingCart size={'30px'} color='black'/>
        //             </Link>
        //         </div>
        //     </div>
        //     <div className='text-center '>
        //         <h1>Menu</h1>
        //         <div className="underline" style={{ width: '100px', height: '4px', background: '#d4a123', margin: '10px auto' }}></div>
        //         <p>Menu Godong</p>
        //         <Menubar model={nestedMenuitems} className='justify-content-center ' style={{ background: 'white', border: 'None' }}></Menubar>
        //     </div>
        //     <div>
        //         {children}
        //     </div>
        // </div >
    )
}

export default Menupage