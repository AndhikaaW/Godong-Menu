import Nav from './nav'
import '../../../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export const metadata = {
  title: 'Godong',
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className='w-full'>
    <Nav/>
    <div className='mx-5'>
      {children}
    </div>
   </div>
  )
}