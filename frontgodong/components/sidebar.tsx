'use client'
import React from 'react'
import SidebarDekstop from './SidebarDekstop'
import { Contact, History, Home, LayoutGrid, SquareMenu, User } from 'lucide-react'
import {useMediaQuery} from 'usehooks-ts'
import { SidebarItems } from '@/types/sidebartypes'
import SidebarMobile from './SidebarMobile'
const sidebarItems: SidebarItems = {
    links :[
        {label : 'Home', href: '/dashboard/home', icon:Home},
        {label : 'Category', href: '/dashboard/category', icon:LayoutGrid},
        {label : 'Menu', href: '/dashboard/menu', icon:SquareMenu},
        {label : 'Profile', href: '/dashboard/profile', icon:User},
        {label : 'Contact', href: '/dashboard/contact', icon:Contact},
        {label : 'History', href: '/dashboard/history', icon:History}
      ]
}
export default function sidebar() {
  const isDekstop = useMediaQuery('(min-width:640px)',{
    initializeWithValue:false,
})
  if (isDekstop) return <SidebarDekstop sidebarItems={sidebarItems} />
  return <SidebarMobile sidebarItems={sidebarItems}/>
}
