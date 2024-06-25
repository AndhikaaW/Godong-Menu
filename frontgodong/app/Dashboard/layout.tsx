import '../../styles/globals1.css';
import SidebarDekstop from '@/components/SidebarDekstop';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../../components/sidebar';

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
    <div className='flex'>
      <div className='flex-initial mx-3 sm:w-[280px]'>
      <Sidebar/>
      </div>
      <div>
      <main className='ml-2 mt-16 sm:ml-0 sm:mt-3'>
        {children}
      </main>
      </div>
    </div>
  );
}
