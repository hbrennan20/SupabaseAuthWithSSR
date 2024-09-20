import { createServerSupabaseClient } from '@/lib/server/server';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default async function ReportPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createServerSupabaseClient();
  const { data: report, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching report:', error);
    return <div>Error loading report</div>;
  }

  return (
    <Box
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 3 }}
    >
      <IconButton
        component={Link}
        href="/reports"
        sx={{ alignSelf: 'flex-start', mb: 2 }}
        aria-label="Back to Reports"
      >
        <ArrowBackIcon />
      </IconButton>
      <Paper
        elevation={3}
        sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h4" gutterBottom>
          {report.report_name}
        </Typography>
        <Typography variant="body1">
          Created: {new Date(report.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Description: {report.report_description || 'No description available'}
        </Typography>
      </Paper>
    </Box>
  );
}
