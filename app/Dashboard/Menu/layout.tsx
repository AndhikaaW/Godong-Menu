import Nav from './nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export const metadata = {
  title: 'Godong',
}

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div>
    <Nav/>
    <div>
      {children}
    </div>
   </div>
  )
}