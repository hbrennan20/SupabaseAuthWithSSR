import 'server-only';
import React from 'react';
import BannerComponent from './components/landingpage/Banner';
import Profile from './components/landingpage/Profile';
import Divider from '@mui/material/Divider';
import FeatureCard from './components/landingpage/FeatureCard';
import Pricing from './components/landingpage/Pricing';

import Testimonials from './components/landingpage/Testimonials';
import { getSession } from '@/lib/server/supabase'; // Import getSession

export default async function LandingPage() {
  const session = await getSession();
  const isSessionAvailable = session !== null;
  const userEmail = session?.email;
  return (
    <>
      <BannerComponent session={isSessionAvailable} userEmail={userEmail} />
      <FeatureCard />
      <Divider />
      <Pricing 
        title="Our Pricing"
        price="$9.99"
        description="Get started with our basic plan"
        features={["Feature 1", "Feature 2", "Feature 3"]}
        buttonText="Subscribe Now"
      />
      <Divider />
      <Testimonials />
      <Divider />
      <Profile />
      <Divider />
    </>
  );
}
