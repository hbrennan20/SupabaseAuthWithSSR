import { createServerSupabaseClient } from '@/lib/server/server';
import { Typography, Box, Paper } from '@mui/material';

async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile Page
        </Typography>
        <Typography>ID: {user.id}</Typography>
        <Typography>Email: {user.email}</Typography>
        {user.user_metadata?.username && (
          <Typography>Username: {user.user_metadata.username}</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ProfilePage;
