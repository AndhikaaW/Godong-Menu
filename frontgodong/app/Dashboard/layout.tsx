import '../../styles/globals.css';
// import SidebarDekstop from '@/components/SidebarDekstop';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/sidebar';

export const metadata = {
  title: 'Godong',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between" style={{overflow:"hidden"}}>
      <div className='fixed w-[300px] '><Sidebar/></div>
    <main className=' overflow-auto sm:ml-[260px] w-screen h-screen sm:p-0 ps-4 pe-2'>
      {children}
    </main>
  </div>
  );
}


{/* <div className="flex items-start justify-between">
      <Sidebar/>

    <main className='w-full h-full sm:p-4 p-10'>
      {children}
    </main>
  </div> */}