"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';

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

        }
    ];
    return (
        <div className='pt-5'>
            <div className='text-end me-3'>
                <span className="p-input-icon-left me-3">
                    <i className="pi pi-search ps-3" />
                    <InputText type="text" placeholder="Search" className='ps-5' />
                </span>
                <Link href='/Dashboard/Cart'>
                    <LuShoppingCart size={'30px'} color='black' />
                </Link>
            </div>
            <div className='text-center'>
                <h1>Menu</h1>
                <div className="underline" style={{ width: '100px', height: '4px', background: '#d4a123', margin: '10px auto' }}></div>
                <p>Menu Godong</p>
                <Menubar model={nestedMenuitems} className='justify-content-center' style={{ background: 'white', border: 'None' }}></Menubar>
            </div>
            <div className=''>
                {children}
            </div>
        </div >
    )
}

export default Menupage