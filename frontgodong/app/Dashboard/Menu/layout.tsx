// import Nav from './nav'
import '../../../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    {/* <Nav/> */}
    <div className='lg:mx-10 '>
      {children}
    </div>
   </div>
  )
}