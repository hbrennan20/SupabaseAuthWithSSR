'use client';

import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';

interface ReportStageSelectProps {
  initialStage: 'early' | 'late';
  updateReportStage: (newStage: 'early' | 'late') => Promise<void>;
}

export default function ReportStageSelect({
  initialStage,
  updateReportStage
}: ReportStageSelectProps) {
  const [stage, setStage] = useState(initialStage);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStageChange = (newStage: 'early' | 'late') => {
    setStage(newStage);
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      await updateReportStage(stage);
      alert('Report stage updated successfully!');
    } catch (error) {
      console.error('Error updating report stage:', error);
      alert('Failed to update report stage. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="report-stage-label">Stage</InputLabel>
        <Select
          labelId="report-stage-label"
          value={stage}
          label="Stage"
          onChange={(e) =>
            handleStageChange(e.target.value as 'early' | 'late')
          }
        >
          <MenuItem value="early">Early</MenuItem>
          <MenuItem value="late">Late</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isUpdating}
        sx={{ mt: 2 }}
      >
        {isUpdating ? 'Updating...' : 'Update Stage'}
      </Button>
    </>
  );
}
