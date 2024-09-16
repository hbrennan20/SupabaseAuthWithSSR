'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client/client';

interface NewMatchFormProps {
  userId: string;
}

export default function NewMatchForm({ userId }: NewMatchFormProps) {
  const [matchName, setMatchName] = useState('');
  const [matchUrl, setMatchUrl] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!matchName.trim() || !matchUrl.trim()) {
      setError('Match Name and Match URL are required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([
          {
            match_name: matchName.trim(),
            match_url: matchUrl.trim(),
            match_date: matchDate || null,
            user_id: userId
          }
        ])
        .select();

      if (error) throw error;

      console.log('New match added:', data);
      router.push('/match_viewer');
    } catch (error) {
      console.error('Error adding new match:', error);
      setError('Failed to add new match. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Match Name"
        value={matchName}
        onChange={(e) => setMatchName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Match URL"
        value={matchUrl}
        onChange={(e) => setMatchUrl(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Match Date"
        type="date"
        value={matchDate}
        onChange={(e) => setMatchDate(e.target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Create Match
      </Button>
    </form>
  );
}
