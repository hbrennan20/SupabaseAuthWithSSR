import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { createServerSupabaseClient } from '@/lib/server/server';
import { redirect } from 'next/navigation';
import NewMatchForm from './NewMatchForm';

export default async function NewMatchPage() {
  const supabase = createServerSupabaseClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Match</Typography>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <NewMatchForm userId={user.id} />
      </Paper>
    </Box>
  );
}
