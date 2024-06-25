'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../styles/globals.css'
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { useEffect } from 'react';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
   useEffect(() => {
    // Memeriksa apakah halaman sudah di-refresh sebelumnya
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Set item di sessionStorage untuk menandakan bahwa halaman sudah di-refresh
      sessionStorage.setItem('hasRefreshed', 'true');
      // Reload halaman
      window.location.reload();
    }
  }, []);
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
