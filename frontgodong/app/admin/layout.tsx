"use client"
import '../../styles/globals.css';
import SidebarDekstop from '@/components/SidebarDekstop';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../../components/sidebarAdmin';
import { useState } from 'react';

interface DashboardAdminLayoutProps {
  children: React.ReactNode;
}
export default function DashboardAdminLayout({ children }: DashboardAdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    //   <div className="flex items-start justify-between" style={{overflow:"hidden"}}>
    //     <div className='fixed w-[300px] '><Sidebar/></div>
    //   <main className=' overflow-auto sm:ml-[260px] w-screen h-screen sm:p-0 p-10'>
    //     {children}
    //   </main>
    // </div>
    <div className="flex items-start justify-between" style={{ overflow: "hidden" }}>
      <div className={`fixed transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[80px]' : 'w-[270px]'}`}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <main className={`overflow-auto transition-all duration-300 ease-in-out ${isCollapsed ? 'sm:ml-[80px]' : 'sm:ml-[270px]'} w-screen h-screen sm:p-0 ps-4 pe-2`}>
        {children}
      </main>
    </div>
  );
}
