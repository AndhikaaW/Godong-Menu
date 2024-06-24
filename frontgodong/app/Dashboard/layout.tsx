import Sidebar from './sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export const metadata  = {
    title: 'Godong',
    description: 'Godong',
  }
  
  export default function dashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
          <div className='d-flex flex-row'>
            <div><Sidebar/></div>
            <div>{children}</div>
          </div>
    )
  }