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
        p: 2, // Reduced from 3 to 2
        backgroundColor: '#d4b4e0', // Light purple background
        minHeight: '100vh', // Ensure the background covers the full viewport height
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px', // Add a max-width for better responsiveness
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          px: 1, // Reduced from 2 to 1
          mt: 4, // Added top margin to move everything down
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Calendar View
        </Typography>

        <Button
          startIcon={<CalendarMonthIcon />}
          onClick={toggleDrawer(true)}
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
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
          <Typography variant="body1" sx={{ mt: 1, mb: 4 }}> {/* Added mb: 4 for spacing */}
            Selected date: {selectedDate.format('MMMM D, YYYY')}
          </Typography>
        )}

        <Ingredients />
      </Box>
    </Box>
  );
}
