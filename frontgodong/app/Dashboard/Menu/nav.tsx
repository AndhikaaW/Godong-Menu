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
                router.push('/dashboard/menu/food')
            },
            className: 'me-5',
        },
        {
            label: 'Drink',
            command: () => {
                router.push('/dashboard/menu/drink')
            },
            className: 'me-5'
        },
        {
            label: 'Snack',
            command: () => {
                router.push('/dashboard/menu/snack')
            },
            className: 'me-5'
        }
    ];
    return (
        <div className='surface-0 p-lg-4'>
            <div className='flex justify-content-end sm:flex-row mt-5 me-4'>
                <Input type="search" placeholder="Search" className=' w-1/4 ms-3 me-2 sm:w-1/4'/>
                <Link href='/dashboard/cart' className='flex justify-content-center align-items-center'>
                    <LuShoppingCart size={'30px'} color='black' />
                </Link>
            </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#d4a123', margin: '10px auto' }}></div>
                <p>Menu Godong</p>
                <Menubar model={nestedMenuitems} className='justify-content-center ' style={{ background: 'white', border: 'None' }}></Menubar>
            </div>
        </div>
    )
}

export default Menupage