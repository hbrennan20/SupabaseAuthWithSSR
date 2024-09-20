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

interface Report {
  id: number;
  created_at: string;
  report_name: string;
  user_id: string;
}

export default async function ReportsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: reports, error } = (await supabase
    .from('reports')
    .select('id, created_at, report_name, user_id')) as {
    data: Report[] | null;
    error: Error | null;
  };

  if (error) {
    console.error('Error fetching reports:', error);
    return (
      <Typography color="error">
        Error loading reports. Please try again later.
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
        <Typography variant="h4">Reports</Typography>
        <Box>
          <Link href="/reports/my-reports" passHref>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
              My Reports
            </Button>
          </Link>
          <Link href="/reports/new" passHref>
            <Button variant="contained" color="primary">
              New Report
            </Button>
          </Link>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {reports?.map((report: Report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Link
              href={`/reports/${report.id}`}
              passHref
              style={{ textDecoration: 'none' }}
            >
              <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6">{report.report_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(report.created_at).toLocaleDateString()}
                  </Typography>
                  {user && report.user_id === user.id && (
                    <Typography variant="body2" color="primary">
                      Your Report
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
