import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';

const ChildcareSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(isOpen);
    };

  return (
    <Box>
      <IconButton
        sx={{ pl: 4 }}
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'black',
            color: 'black',
            width: 250
          }
        }}
      >
        <List sx={{ pt: 10, pl: 2 }}>
          {['Dashboard', 'About', 'FAQs'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemIcon>
                <HelpOutlineIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: 'white' }}
                onClick={() => {
                  if (text === 'Dashboard') {
                    window.location.href = '/childcare/dashboard';
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default ChildcareSidebar;
