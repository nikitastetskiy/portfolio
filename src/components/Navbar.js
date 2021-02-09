import React from 'react';
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemTxt,
  Avatar,
  Divider,
  List,
  Typography,
  Box,
} from '@material-ui/core';

import {
  ArrowBack,
  AssignmentInd,
  Home,
  Apps,
  ContactMail,
} from '@material-ui/icons';

const Navbar = () => (
  <Box component="nav">
    <AppBar position="static" style={{ background: '#222' }}>
      <Toolbar>
        <IconButton>
          <ArrowBack style={{ color: 'tomato' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
