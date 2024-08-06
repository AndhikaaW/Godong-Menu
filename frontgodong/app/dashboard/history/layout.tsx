import '../../../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export const metadata = {
  title: 'Godong',
}

export default function HistoryLayout({
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