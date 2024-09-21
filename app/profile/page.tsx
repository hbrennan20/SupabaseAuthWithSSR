import { createServerSupabaseClient } from '@/lib/server/server';
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  Divider,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';

async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  if (!authUser) {
    return <Typography>User not found</Typography>;
  }

  // Fetch user data from the 'users' table
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (error || !userData) {
    return <Typography>Error fetching user data</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
            {userData.username?.[0] || authUser.email?.[0]}
          </Avatar>
          <Typography variant="h4">Profile Page</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <ProfileItem
            icon={<AccountCircleIcon />}
            label="ID"
            value={userData.id}
          />
          <ProfileItem
            icon={<EmailIcon />}
            label="Email"
            value={authUser.email}
          />
          {userData.username && (
            <ProfileItem
              icon={<BadgeIcon />}
              label="Username"
              value={userData.username}
            />
          )}
          <ProfileItem
            icon={<WorkIcon />}
            label="Subscription Tier"
            value={userData.subscription_tier || 'Free'}
          />
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" href="/home/pricing" sx={{ mt: 2 }}>
            Upgrade Plan
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

function ProfileItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
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
