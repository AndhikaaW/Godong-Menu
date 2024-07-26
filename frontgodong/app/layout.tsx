import '../styles/globals.css'
import { AuthProvider } from '../components/Auth/AuthProvider';
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
      <head>
      <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/logo2.png" type="icon" />
      </head>
      <body>
        <div>
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>  
        </body>
    </html>
  )
}
