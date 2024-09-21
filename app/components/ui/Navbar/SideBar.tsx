'use client';

import React, { FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
  Box,
  Typography,
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignOutButton from './SignOut';
import { styled as styledMaterial } from '@mui/material/styles';

interface SideBarProps {
  session: boolean | null;
}

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary
}));

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const StyledSignOutButton = styled(SignOutButton)(({ theme }) => ({
  '& .MuiButton-root': {
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  '& .MuiButton-startIcon': {
    color: 'white',
  },
}));

const SideBar: FC<SideBarProps> = ({ session }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Projects', icon: <BuildIcon />, path: '/projects' },
    { text: 'Reports', icon: <BuildIcon />, path: '/reports' },

    { text: 'Upload CSV', icon: <AccountCircleIcon />, path: '/upload_csv' },
    { text: 'Match Viewer', icon: <BuildIcon />, path: '/match_viewer' }
  ];
  const drawerContent = (
    <StyledBox
      sx={{ width: 250, bgcolor: '#3f51b5', color: 'white' }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
        Menu
      </Typography>
      <List sx={{ pt: 2, flexGrow: 1 }}>
        {session ? (
          <>
            {menuItems.map((item) => (
              <StyledLink href={item.path} key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ py: 1, color: 'white' }}
                    selected={pathname === item.path}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              </StyledLink>
            ))}
            <StyledLink href="/profile">
              <ListItem sx={{ py: 1, color: 'white' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ color: 'white' }} />
              </ListItem>
            </StyledLink>
          </>
        ) : (
          <StyledLink href="/auth">
            <ListItem sx={{ py: 1, color: 'white' }}>
              <ListItemText primary="Sign in" sx={{ color: 'white' }} />
            </ListItem>
          </StyledLink>
        )}
      </List>
      {session && (
        <Box sx={{ mt: 'auto', p: 2 }}>
          <StyledSignOutButton />
        </Box>
      )}
    </StyledBox>
  );

  return (
    <>
      {!open && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            position: 'fixed',
            top: 60,
            left: 24,
            zIndex: 1300,
            padding: '12px 8px 12px 8px', // Updated padding
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideBar;
