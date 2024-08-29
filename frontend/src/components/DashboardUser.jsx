import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthProvider.jsx';


export default function DashBoardUser({ userName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const { logout, user } = useContext(AuthContext);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    console.log("DashBoardUser component, handleMenuItemClick, action, logOut =>", action, logout, user);
    if (action === 'Logout') logout();
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
      >
        {userName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Logout')}>Logout</MenuItem>
      </Menu>
    </div>
  );
}