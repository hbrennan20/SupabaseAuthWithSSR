import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { createServerSupabaseClient } from '@/lib/server/server';
import { redirect } from 'next/navigation';
import NewProjectForm from './NewReportForm';

export default async function NewProjectPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <NewProjectForm userId={user.id} />
      </Paper>
    </Box>
  );
}
