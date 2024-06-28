import '../../styles/globals.css';
// import SidebarDekstop from '@/components/SidebarDekstop';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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
    <div className='flex h-screen w-screen'>
      <div className='sm:w-[280px]'>
        <Sidebar />
      </div>
      <div className='flex-1 sm-ms:0'>
        {children}
      </div>
    </div>
  );
}


{/* <div className="flex items-start justify-between">
      <Sidebar/>

    <main className='w-full h-full sm:p-4 p-10'>
      {children}
    </main>
  </div> */}