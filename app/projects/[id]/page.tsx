import { createServerSupabaseClient } from '@/lib/server/server';
import { Box, Typography, Paper, Grid, Chip, Divider, IconButton } from '@mui/material';
import ProjectStageSelect from './ProjectStageSelect';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default async function ProjectPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createServerSupabaseClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return <div>Error loading project</div>;
  }

  async function updateProjectStage(newStage: 'early' | 'late') {
    'use server';
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from('projects')
      .update({ project_stage: newStage })
      .eq('id', params.id);

    if (error) {
      throw new Error('Failed to update project stage');
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: 'auto' }}>
      <Link href="/projects" passHref>
        <IconButton edge="start" aria-label="back" sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
          {project.project_name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                Created: {new Date(project.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Chip
              label={`Stage: ${project.project_stage}`}
              color={project.project_stage === 'early' ? 'primary' : 'secondary'}
              sx={{ fontWeight: 'bold' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-start" mt={2}>
              <DescriptionIcon sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
              <Typography variant="body1">
                {project.project_description || 'No description available'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Update Project Stage
            </Typography>
            <ProjectStageSelect
              initialStage={project.project_stage as 'early' | 'late'}
              projectId={project.id}
              updateProjectStage={updateProjectStage}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
