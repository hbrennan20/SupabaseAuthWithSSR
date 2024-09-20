import { createServerSupabaseClient } from '@/lib/server/server';
import { cookies } from 'next/headers';
import { Box, Typography, Paper } from '@mui/material';
import ProjectStageSelect from './ReportStageSelect';

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

  async function updateReportStage(newStage: 'early' | 'late') {
    'use server';
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from('reports')
      .update({ report_stage: newStage })
      .eq('id', params.id);

    if (error) {
      throw new Error('Failed to update report stage');
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {report.report_name}
        </Typography>
        <Typography variant="body1">
          Created: {new Date(report.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Description:{' '}
          {report.report_description || 'No description available'}
        </Typography>
        <ProjectStageSelect
          initialStage={report.report_stage as 'early' | 'late'}
          updateReportStage={updateReportStage}
        />
      </Paper>
    </Box>
  );
}
