// RootLayout.tsx
import React, { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import RootErrorBoundary from '@/app/components/errorBoundary/ErrorBoundaryPage';
import { getSession } from '@/lib/server/supabase';
import Sidebar from '@/app/components/ui/Navbar/SideBar';
import { Box, Typography } from '@mui/material'; // Update this import
import { useState } from 'react'; // Add this import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('http://localhost:3000/'),
  title: 'Reporting Helper',
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
              minHeight: '100vh',
              backgroundColor: '#3f51b5'
            }}
          >
            <Sidebar session={isSessionAvailable} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '64px',
                  padding: '0 16px'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(63, 81, 181, 0.7)',
                    padding: '8px 16px',
                    borderRadius: '4px'
                  }}
                >
                  Reporting Helper
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, position: 'relative' }}>{children}</Box>
            </Box>
          </body>
        </RootErrorBoundary>
      </ThemeRegistry>
    </html>
  );
}
