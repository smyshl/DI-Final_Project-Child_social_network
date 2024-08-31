import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import DeleteConfirmation from './DeleteConfirmation.jsx';
import ModalWindow from './ModalWindow.jsx';

import { deletePost } from '../utils/postActions.js';
import { getNewAccessToken } from '../utils/getNewAccessToken.js';
import { AuthContext } from '../auth/AuthProvider.jsx';


function VertIconMenu({ post_id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ deleteConfirmationIsOpen, setDeleteConfirmationIsOpen ] = useState(false);

  const { logout, login, accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleIconButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleMenuItemClick = (action) => {
    console.log("VertIcon component, handleMenuItemClick, =>", );
    setAnchorEl(null);    
    if (action === 'Delete') {
        getNewAccessToken(login, logout, navigate);
        setDeleteConfirmationIsOpen(true)
    };

  }

  const onClose = () => {
    console.log("VertIconMenu component onClose =>", open);
    setDeleteConfirmationIsOpen(false)
}



  return (
    <>
        {
            <ModalWindow isOpen={deleteConfirmationIsOpen} onClose={onClose}>
                <DeleteConfirmation 
                action={`Are you sure you want to delete this post?`}
                onClose={onClose}
                onConfirm={() => deletePost(post_id, accessToken)}/>
            </ModalWindow>
        }

      <IconButton aria-label="settings" onClick={handleIconButtonClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={() => handleMenuItemClick('Edit')}>
            <EditIcon />
        </MenuItem> */}
        <MenuItem onClick={() => handleMenuItemClick('Delete')}>
            <DeleteForeverIcon />
        </MenuItem>

      </Menu>
    </>
  );
}

export default VertIconMenu;
