import React from 'react';
import {
  Box,
  Container,
  Grid2,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import Link from 'next/link';
type Feature = {
  title: string;
  description: string | React.ReactElement;
  Icon: string;
};

const features = [
  {
    title: 'Advanced AI Integration',
    description:
      'Leverage state-of-the-art AI capabilities for enhanced NLP features and efficient data retrieval.',
    Icon: '🤖'
  },
  {
    title: 'Real-time Updates',
    description:
      'Stay informed with real-time data sourced from reputable sources, ensuring you have the most recent updates.',
    Icon: '🔄'
  },
  {
    title: 'Deep Insights',
    description:
      'Dive deep into the data, understanding intricate patterns and insights that can help drive informed decisions.',
    Icon: '📚'
  },
  {
    title: 'Guidelines & Protocols',
    description:
      'Stay informed about organizational structures, guidelines, and best practices to ensure smooth operations.',
    Icon: '🔐'
  },
  {
    title: 'Absence Policies',
    description:
      'Know the protocol for leaves, attendance, sick days, and other related matters for smooth workflow.',
    Icon: '📅'
  },
  {
    title: 'Financial Information',
    description: (
      <>
        Stay informed about financial regulations, provisions, and insights.
        Learn more at{' '}
        <Link
          href="#models"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          Financial Info
        </Link>
        .
      </>
    ),
    Icon: '💰'
  }
];

const FeatureCard: React.FC<Feature> = ({ title, description, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 5,
        textAlign: 'center',
        borderRadius: '12px',
        borderColor: 'grey.800',
        height: '100%',
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <Box sx={{ p: 3, fontSize: 50, opacity: 0.9 }}>{Icon}</Box>
      <Typography
        variant="h6"
        color="primary"
        gutterBottom
        sx={{
          fontWeight: 'bold'
        }}
      >
        {title}
      </Typography>
      <Divider variant="middle" />
      <Typography
        variant="body2"
        component="div"
        sx={{
          color: 'text.secondary',
          mt: 3
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default function Component() {
  return (
    <Box
      id="models"
      sx={{ width: '100%', pt: [1, 2, 3, 6], pb: [4, 6, 8, 12] }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: 'center',
            mb: 10
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Monospace',
              letterSpacing: '0.1em',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundGradient: 'linear(to r, white, grey.500)'
            }}
          >
            Discover Our Features
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              maxWidth: 800,
              mx: 'auto',
              fontFamily: 'Monospace',
              letterSpacing: '0.05em'
            }}
          >
            Harnessing Advanced AI for Better Insights and Efficient Operations
          </Typography>
        </Box>
        <Grid2 container spacing={10}>
          {features.map((feature, index) => (
            <Grid2
              key={index}
              style={{ display: 'flex' }}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                Icon={feature.Icon}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
