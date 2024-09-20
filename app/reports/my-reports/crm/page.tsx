import { createServerSupabaseClient } from '@/lib/server/server';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import Link from 'next/link';

interface Project {
  id: number;
  created_at: string;
  project_name: string;
  user_id: string;
}

export default async function CRMPipelinePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <Typography>Please sign in to view your CRM pipeline.</Typography>;
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching projects:', error);
    return (
      <Typography color="error">
        Error loading projects. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h4">CRM Pipeline</Typography>
        <Box>
          <Link href="/projects" passHref>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
              All Projects
            </Button>
          </Link>
          <Link href="/projects/new" passHref>
            <Button variant="contained" color="primary">
              New Project
            </Button>
          </Link>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {projects?.map((project: Project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.project_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
