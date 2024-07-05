import '../styles/globals.css'
export const metadata = {
  title: 'Godong',
  description: 'Godong Menu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
            {children}
        </div>  
        </body>
    </html>
  )
}
