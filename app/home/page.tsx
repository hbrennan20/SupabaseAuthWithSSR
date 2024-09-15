import React from 'react';
import Link from 'next/link';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const HomePage = () => {
  const features = [
    { title: 'Projects', description: 'View and manage your projects. Links with the supabase instance too', link: '/projects' },
    { title: 'Upload CSV', description: 'Upload and process CSV files', link: '/upload_csv' },
    { title: 'London Run Clubs', description: 'Explore run clubs in London', link: '/runclubs/london' },
    { title: 'Dublin Run Clubs', description: 'Discover run clubs in Dublin', link: '/runclubs/dublin' },
    { title: 'Match Viewer', description: 'View and analyze match data', link: '/match_viewer' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Here's some of the features I've added so far:
      </Typography>      
      <Box sx={{ mb: 8 }}>
        {/* This Box component adds margin-bottom (mb) of 4 units */}
      </Box>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button component={Link} href={feature.link} variant="contained" fullWidth>
                  Go to {feature.title}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
