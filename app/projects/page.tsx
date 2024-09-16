import { createServerSupabaseClient } from '@/lib/server/server';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import Link from 'next/link';

interface Project {
  id: number;
  created_at: string;
  project_name: string;
  user_id: string;
}

export default async function ProjectsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: projects, error } = (await supabase
    .from('projects')
    .select('id, created_at, project_name, user_id')) as {
    data: Project[] | null;
    error: Error | null;
  };

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
        <Typography variant="h4">Projects</Typography>
        <Box>
          <Link href="/projects/my-projects" passHref>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
              My Projects
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
            <Link
              href={`/projects/${project.id}`}
              passHref
              style={{ textDecoration: 'none' }}
            >
              <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6">{project.project_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </Typography>
                  {user && project.user_id === user.id && (
                    <Typography variant="body2" color="primary">
                      Your Project
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
