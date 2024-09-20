import React from 'react';

import { Box, Typography, Button, Grid2, SvgIconProps } from '@mui/material';
import Link from 'next/link';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CodeIcon from '@mui/icons-material/Code';

import CloudIcon from '@mui/icons-material/Cloud';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

interface BannerProps {
  session: boolean | null;
  userEmail?: string | null;
}
interface FeatureProps {
  Icon: React.ComponentType<SvgIconProps>; // Specifies that Icon is a React component that accepts SvgIconProps
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ Icon, title, description }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Icon color="secondary" />
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);

const BannerComponent: React.FC<BannerProps> = ({ session, userEmail }) => {
  return (
    <Box
      sx={{
        padding: '4rem',
        backgroundColor: '#fcfbf3' // Changed background color
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          alignItems: 'center'
        }}
      >
        {/* Image Grid */}
        <Grid2
          size={{
            xs: 12,
            md: 8
          }}
        >
          <Box
            sx={{
              width: '80%',
              height: '500px', // Fixed height, you can adjust as needed
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          ></Box>
        </Grid2>

        <Grid2
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Typography variant="h4" sx={{ mb: 1, color: 'primary.main' }}>
            {session
              ? `Welcome back, ${userEmail || 'User'}!`
              : 'Sign up now to get started'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {session
              ? 'Dive into the enhanced features and capabilities tailored for your development.'
              : 'Our library seamlessly integrates with Next.js 14, offering server-side rendering support and efficient data fetching with React Server Components.'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Feature
              Icon={SecurityIcon}
              title="Enhanced Security"
              description="State-of-the-art security for your apps."
            />
            <Feature
              Icon={SpeedIcon}
              title="Blazing Fast"
              description="Optimized for speed, making your apps run smoother."
            />
            <Feature
              Icon={CodeIcon}
              title="Developer Friendly"
              description="Easy to use API and thorough documentation."
            />
            <Feature
              Icon={CloudIcon}
              title="Cloud Integration"
              description="Seamless cloud capabilities with Supabase."
            />
            <Feature
              Icon={IntegrationInstructionsIcon}
              title="Easy Integration"
              description="Simple steps to integrate with your Next.js app."
            />
          </Box>

          <Link
            href={session ? '/dashboard' : '#get-started'}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              {session ? 'Explore Dashboard' : 'Get Started Now'}
            </Button>
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BannerComponent;
