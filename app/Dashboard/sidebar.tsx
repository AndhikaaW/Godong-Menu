"use client";

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/navigation';
// import { link } from 'fs';
// import { Link, useHref } from 'react-router-dom';

// import "../../styles/sidebar.css";
// import styles from '../../styles/sidebar.module.css';

const SideBar = ({ children }: any) => {
  const router = useRouter();
  const tieredMenuItems: MenuItem[] = [
    {
      label:'Godong Menu',
      style:{fontWeight:'bold',fontSize:'20px',width:'180px'},
    },
    {
      label: 'Home',
      icon: 'pi pi-fw pi-table',
      command: () => {
        router.push ('/Dashboard/Home')
      }
    },
    {
      label: 'Category',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => {
        router.push ('/Dashboard/Category')
      }
      // items: [
      //   {
      //     label: 'View',
      //     icon: 'pi pi-fw pi-list'
      //   },
      //   {
      //     label: 'Search',
      //     icon: 'pi pi-fw pi-search'
      //   }
      // ]
    },
    {
      label: 'Menu',
      icon: 'pi pi-fw pi-envelope',
      command: () => {
        router.push ('/Dashboard/Menu')
      }
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => {
        router.push ('/Dashboard/Profile')
      }
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-user',
      command: () => {
        router.push ('/Dashboard/Contact')
      }
    },
    {
      separator: true
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        router.push ('/')
      }
    }
  ];

  return (
    <div className=''>
      <TieredMenu model={tieredMenuItems} className='vh-100 d-inline-flex'/>
      <div className=''>
        {children}
      </div>
    </div>
  );
}

export default SideBar;
