import { createServerSupabaseClient } from '@/lib/server/server';
import { cookies } from 'next/headers';
import { Box, Typography, Paper } from '@mui/material';
import ProjectStageSelect from './ProjectStageSelect';

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
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {project.project_name}
        </Typography>
        <Typography variant="body1">
          Created: {new Date(project.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Description:{' '}
          {project.project_description || 'No description available'}
        </Typography>
        <ProjectStageSelect
          initialStage={project.project_stage as 'early' | 'late'}
          projectId={project.id}
          updateProjectStage={updateProjectStage}
        />
      </Paper>
    </Box>
  );
}
