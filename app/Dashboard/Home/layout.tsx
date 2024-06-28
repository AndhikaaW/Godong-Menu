import '../../../styles/globals1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export const metadata = {
  title: 'Godong',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}