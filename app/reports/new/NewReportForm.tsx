'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client/client';

interface NewReportFormProps {
  userId: string;
}

export default function NewReportForm({ userId }: NewReportFormProps) {
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportType, setReportType] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!reportName.trim() || !reportDescription.trim() || !reportType) {
      setError('All fields are required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([
          {
            report_name: reportName.trim(),
            report_description: reportDescription.trim(),
            report_type: reportType,
            user_id: userId
          }
        ])
        .select();

      if (error) throw error;

      console.log('New report added:', data);
      router.push('/reports');
    } catch (error: unknown) {
      console.error('Error adding new report:', error);
      setError(
        `Failed to add new report: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Report Name"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Report Description"
        value={reportDescription}
        onChange={(e) => setReportDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="report-type-label">Report Type</InputLabel>
        <Select
          labelId="report-type-label"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          label="Report Type"
        >
          <MenuItem value="financial">Financial</MenuItem>
          <MenuItem value="operational">Operational</MenuItem>
        </Select>
      </FormControl>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Create Report
      </Button>
    </form>
  );
}
