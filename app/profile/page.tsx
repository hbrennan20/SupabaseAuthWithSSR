import { createServerSupabaseClient } from '@/lib/server/server';
import { Typography, Box, Paper, Avatar, Grid, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';

async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
            {user.user_metadata?.username?.[0] || user.email?.[0]}
          </Avatar>
          <Typography variant="h4">Profile Page</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <ProfileItem icon={<AccountCircleIcon />} label="ID" value={user.id} />
          <ProfileItem icon={<EmailIcon />} label="Email" value={user.email} />
          {user.user_metadata?.username && (
            <ProfileItem icon={<BadgeIcon />} label="Username" value={user.user_metadata.username} />
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  return (
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography>{value}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default ProfilePage;
