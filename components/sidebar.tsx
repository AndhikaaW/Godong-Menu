'use client'
import React from 'react'
import SidebarDekstop from './SidebarDekstop'
import { Contact, Home, LayoutGrid, SquareMenu, User } from 'lucide-react'
import {useMediaQuery} from 'usehooks-ts'
import { SidebarItems } from '@/types/sidebartypes'
import SidebarMobile from './SidebarMobile'
const sidebarItems: SidebarItems = {
    links :[
        {label : 'Home', href: '/Dashboard/Home', icon:Home},
        {label : 'Category', href: '/Dashboard/Category', icon:LayoutGrid},
        {label : 'Menu', href: '/Dashboard/Menu', icon:SquareMenu},
        {label : 'Profile', href: '/Dashboard/Profile', icon:User},
        {label : 'Contact', href: '/Dashboard/Contact', icon:Contact}
      ]
}
export default function sidebar() {
  const isDekstop = useMediaQuery('(min-width:640px)',{
    initializeWithValue:false,
})
  if (isDekstop) return <SidebarDekstop sidebarItems={sidebarItems} />
  return <SidebarMobile sidebarItems={sidebarItems}/>
}
