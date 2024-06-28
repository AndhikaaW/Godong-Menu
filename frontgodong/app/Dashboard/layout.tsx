import '../../styles/globals.css';
import SidebarDekstop from '@/components/SidebarDekstop';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../../components/sidebarClient';

export const metadata = {
  title: 'Godong',
  description: 'Godong',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-[280px] sm:w-[280px] flex-shrink-0'>
        <Sidebar />
      </div>
      <div className='flex-grow p-3 overflow-auto'>
        {children}
      </div>
    </div>
  );
}
