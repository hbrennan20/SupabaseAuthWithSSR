"use client";

import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // Simulating file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('File upload simulation complete');
    setUploading(false);
    setFile(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload CSV
      </Typography>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Select CSV File
        </Button>
      </label>
      {file && <Typography sx={{ mt: 2 }}>{file.name}</Typography>}
      <Button
        sx={{ mt: 2, ml: file ? 2 : 0 }}
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </Box>
  );
}