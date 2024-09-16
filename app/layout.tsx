// RootLayout.tsx
import React, { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import RootErrorBoundary from '@/app/components/errorBoundary/ErrorBoundaryPage';
import { getSession } from '@/lib/server/supabase';
import Sidebar from '@/app/components/ui/Navbar/SideBar';
import { Box } from '@mui/material'; // Add this import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('http://localhost:3000/'),
  title: 'Supabase SSR Auth Example',
  description:
    'An example demonstrating server-side rendering with authentication using Supabase.'
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const session = await getSession(); // Get session
  const isSessionAvailable = session !== null;
  return (
    <html lang="en">
      <ThemeRegistry>
        <RootErrorBoundary>
          <body
            className={inter.className}
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <Sidebar session={isSessionAvailable} />
            <Box sx={{ paddingTop: '64px', flexGrow: 1 }}>
              {' '}
              {/* Add this Box */}
              {children}
            </Box>
          </body>
        </RootErrorBoundary>
      </ThemeRegistry>
    </html>
  );
}
