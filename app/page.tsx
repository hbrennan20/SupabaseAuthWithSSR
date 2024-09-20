import 'server-only';
import React from 'react';
import BannerComponent from './components/landingpage/Banner';
import Profile from './components/landingpage/Profile';
import Divider from '@mui/material/Divider';
import FeatureCard from './components/landingpage/FeatureCard';
import Pricing from './components/landingpage/Pricing';
import Testimonials from './components/landingpage/Testimonials';
import { getSession } from '@/lib/server/supabase';

export default async function LandingPage() {
  const session = await getSession();
  const isSessionAvailable = session !== null;
  const userEmail = session?.email;
  return (
    <div
      style={{ backgroundColor: 'rgba(63, 81, 181, 0.7)', minHeight: '100vh' }}
    >
      <BannerComponent session={isSessionAvailable} userEmail={userEmail} />
      <FeatureCard />
      <Divider />
      <Pricing />
      <Divider />
      <Testimonials />
      <Divider />
      <Profile />
      <Divider />
    </div>
  );
}
