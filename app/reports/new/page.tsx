import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createServerSupabaseClient } from '@/lib/server/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
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
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Link href="/reports" passHref>
        <IconButton
          aria-label="back to reports"
          sx={{ mb: 3 }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Add New Project
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <NewProjectForm userId={user.id} />
      </Paper>
    </Box>
  );
}
