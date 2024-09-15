'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client/client';

interface NewProjectFormProps {
  userId: string;
}

export default function NewProjectForm({ userId }: NewProjectFormProps) {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { 
            project_name: projectName.trim(), 
            user_id: userId
          }
        ])
        .select();

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
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Create Project
      </Button>
    </form>
  );
}
