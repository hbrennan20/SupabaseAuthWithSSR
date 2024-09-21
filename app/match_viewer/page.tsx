import React from 'react';
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { createServerSupabaseClient } from '@/lib/server/server';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface Match {
  id: string;
  match_name: string;
  match_date: string;
}

export default async function MatchViewer() {
  const supabase = createServerSupabaseClient();

  // Check user's subscription tier
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error fetching user:', userError);
    return <div>Error loading user data: {userError.message}</div>;
  }

  if (!user.user) {
    return <div>User not authenticated</div>;
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('subscription_tier')
    .eq('id', user.user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
    return <div>Error loading profile data</div>;
  }

  if (profile.subscription_tier !== 'enterprise') {
    return (
      <Container maxWidth="sm">
        <Card elevation={3} sx={{ mt: 4, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Upgrade to Enterprise
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Unlock Match Viewer and more!
            </Typography>
            <Typography paragraph>
              The Match Viewer feature is exclusive to our Enterprise tier
              subscribers. Upgrade now to access advanced analytics, unlimited
              matches, and premium support.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Link href="/home/pricing" passHref>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowUpwardIcon />}
              >
                Upgrade to Enterprise
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Container>
    );
  }

  // Fetch matches
  const { data: matches, error } = (await supabase
    .from('matches')
    .select('*')) as { data: Match[] | null; error: Error | null };

  if (error) {
    console.error('Error fetching matches:', error);
    return <div>Error loading matches</div>;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Match Viewer
        </Typography>
        <Link href="/match_viewer/new" passHref>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            New Match
          </Button>
        </Link>
      </Box>
      <Paper elevation={3}>
        <List>
          {matches?.map((match: Match) => (
            <ListItem key={match.id} divider>
              <ListItemText
                primary={match.match_name}
                secondary={new Date(match.match_date).toLocaleDateString()}
              />
              <Link href={`/match_viewer/${match.id}`} passHref>
                <Button variant="outlined" color="primary">
                  View Match
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
