import React from 'react';
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button
} from '@mui/material';
import { createServerSupabaseClient } from '@/lib/server/server';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

interface Match {
  id: string;
  match_name: string;
  match_date: string;
}

export default async function MatchViewer() {
  const supabase = createServerSupabaseClient();
  const { data: matches, error } = await supabase.from('matches').select('*');

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
          {matches.map((match: Match) => (
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
