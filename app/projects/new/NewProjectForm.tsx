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

interface NewProjectFormProps {
  userId: string;
}

export default function NewProjectForm({ userId }: NewProjectFormProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!projectName.trim() || !projectDescription.trim() || !projectStage) {
      setError('All fields are required');
      return;
    }

    try {
      // @ts-ignore
      const { data, error } = await supabase.from('projects').insert([
        {
          project_name: projectName.trim(),
          project_description: projectDescription.trim(),
          project_stage: projectStage,
          user_id: userId
        }
      ]);

      if (error) throw error;

      console.log('New project added:', data);
      router.push('/projects');
    } catch (error) {
      console.error('Error adding new project:', error);
      setError('Failed to add new project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Project Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="project-stage-label">Project Stage</InputLabel>
        <Select
          labelId="project-stage-label"
          value={projectStage}
          onChange={(e) => setProjectStage(e.target.value)}
          label="Project Stage"
        >
          <MenuItem value="early">Early</MenuItem>
          <MenuItem value="late">Late</MenuItem>
        </Select>
      </FormControl>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Create Project
      </Button>
    </form>
  );
}
