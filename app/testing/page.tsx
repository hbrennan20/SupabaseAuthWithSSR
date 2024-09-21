'use client';

import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Typography, IconButton, Drawer, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import Ingredients from './components/Ingredients'; // Updated import
import ReactPlayer from 'react-player'; // Add this import

export default function TestingPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1, // Reduced from 2 to 1
        backgroundColor: '#d4b4e0', // Light purple background
        minHeight: '100vh', // Ensure the background covers the full viewport height
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1000px', // Reduced from 1200px to 1000px
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          px: 0.5, // Reduced from 1 to 0.5
          mt: 2, // Reduced from 4 to 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
          Calendar View
        </Typography>

        <Button
          startIcon={<CalendarMonthIcon />}
          onClick={toggleDrawer(true)}
          variant="contained"
          size="small" // Added size="small"
          sx={{ mt: 1, mb: 1 }} // Reduced margins
        >
          Open Calendar
        </Button>

        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, pt: 8, mt: 6 }}> {/* Increased pt to 8 and added mt: 6 */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Box>
        </Drawer>

        {selectedDate && (
          <Typography variant="body2" sx={{ mt: 0.5, mb: 2 }}> {/* Changed to body2 and reduced margins */}
            Selected date: {selectedDate.format('MMMM D, YYYY')}
          </Typography>
        )}

        {/* Add the live stream component here */}
        <Box sx={{ mb: 2, width: '100%', aspectRatio: '16/9' }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with your actual stream URL
            width="100%"
            height="100%"
            playing={true}
            controls={true}
          />
        </Box>

        <Ingredients />
      </Box>
    </Box>
  );
}
