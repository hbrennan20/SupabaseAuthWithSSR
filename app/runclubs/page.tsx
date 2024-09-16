import { createServerSupabaseClient } from '@/lib/server/server';
import { Typography, Box, Paper, Grid } from '@mui/material';
import Link from 'next/link';

async function RunClubsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Run Clubs
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Link
            href="/runclubs/london"
            passHref
            style={{ textDecoration: 'none' }}
          >
            <Paper elevation={3} sx={{ p: 3, cursor: 'pointer' }}>
              <Typography variant="h5" gutterBottom>
                Run Club London
              </Typography>
              <Typography>Join our weekly runs in London!</Typography>
              <Typography>Meeting point: Hyde Park</Typography>
              <Typography>Time: Every Saturday at 9:00 AM</Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link
            href="/runclubs/dublin"
            passHref
            style={{ textDecoration: 'none' }}
          >
            <Paper elevation={3} sx={{ p: 3, cursor: 'pointer' }}>
              <Typography variant="h5" gutterBottom>
                Run Club Dublin
              </Typography>
              <Typography>Join our weekly runs in Dublin!</Typography>
              <Typography>Meeting point: Phoenix Park</Typography>
              <Typography>Time: Every Sunday at 10:00 AM</Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RunClubsPage;
