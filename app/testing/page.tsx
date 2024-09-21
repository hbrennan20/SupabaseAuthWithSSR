'use client';

import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

export default function TestingPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const router = useRouter();

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleGoBack} aria-label="go back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 2 }}>
          Calendar View
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ width: '100%', maxWidth: 360 }}
        />
      </LocalizationProvider>
      {selectedDate && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected date: {selectedDate.format('MMMM D, YYYY')}
        </Typography>
      )}
    </Box>
  );
}
