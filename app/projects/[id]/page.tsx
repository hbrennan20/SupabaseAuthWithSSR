import { createServerSupabaseClient } from '@/lib/server/server';
import { Box, Typography, Paper } from '@mui/material';

interface Project {
  id: number;
  created_at: string;
  project_name: string;
  // Add other fields as needed
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return <Typography color="error">Error loading project: {error.message}</Typography>;
  }

  if (!project) {
    return <Typography>Project not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>{project.project_name}</Typography>
        <Typography variant="body1">
          Created: {new Date(project.created_at).toLocaleDateString()}
        </Typography>
        {/* Add more project details here */}
      </Paper>
    </Box>
  );
}
