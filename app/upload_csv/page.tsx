'use client';

import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Snackbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // Simulating file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSnackbarOpen(true);
    setUploading(false);
    setFile(null);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
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
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Select CSV File
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Selected file: {file.name}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || uploading}
            sx={{ minWidth: 120 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="File upload simulation complete"
      />
    </Box>
  );
}
