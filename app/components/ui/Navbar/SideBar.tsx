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
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignOutButton from './SignOut';

interface SideBarProps {
  session: boolean | null;
}

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
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
    { text: 'Upload CSV', icon: <AccountCircleIcon />, path: '/upload_csv' },
    { text: 'London Run Clubs', icon: <AccountCircleIcon />, path: '/runclubs/london' },
    { text: 'Dublin Run Clubs', icon: <AccountCircleIcon />, path: '/runclubs/dublin' },
    { text: 'Match Viewer', icon: <BuildIcon />, path: '/match_viewer' },



  ];
  const drawerContent = (
    <Box sx={{ width: 250, bgcolor: 'black', color: 'white', height: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>Menu</Typography>
      <List sx={{ pt: 2 }}>
        {session ? (
          <>
            {menuItems.map((item) => (
              <StyledLink href={item.path} key={item.text}>
                <ListItem sx={{ py: 1, color: 'white' }} selected={pathname === item.path}>
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: 'white' }} />
                </ListItem>
              </StyledLink>
            ))}
            <StyledLink href="/profile">
              <ListItem sx={{ py: 1, color: 'white' }}>
                <ListItemIcon sx={{ color: 'white' }}><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" sx={{ color: 'white' }} />
              </ListItem>
            </StyledLink>
            <ListItem sx={{ py: 1, color: 'white' }}>
              <SignOutButton />
            </ListItem>
          </>
        ) : (
          <StyledLink href="/auth">
            <ListItem sx={{ py: 1, color: 'white' }}>
              <ListItemText primary="Sign in" sx={{ color: 'white' }} />
            </ListItem>
          </StyledLink>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideBar;
