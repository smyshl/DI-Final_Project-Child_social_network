import * as React from 'react';
import {useState, useContext, useEffect} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import { AuthContext } from '../auth/AuthProvider.jsx';
import { getAllUsers, getNewUserInvitationLink } from '../utils/userActions.js';


export default function UsersTable() {

    const [ usersList, setUsersList ] = useState([])
    const [ invitation, setInvitation ] = useState('')

    const { accessToken } = useState(AuthContext);

    // console.log("UsersTable component, rows =>", rows);


    useEffect(() => {
        getAllUsers(accessToken)
        .then(res => setUsersList(res))
        .catch(err => console.log(err));
        console.log("UsersTable component, useEffect, usersList =>", usersList);
    }, [])

    
    const addNewUserClick = () => {
        getNewUserInvitationLink(accessToken)
        .then(res => setInvitation({message: res.message, url: res.invitation}))
        // .then(res => console.log("UsersTable component, useEffect, NewUserInvitationLink =>", res.message))
        .catch(err => console.log(err));
    }


  return (
    <>
    <TableContainer component={Paper}>
        <h2>Manage users</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">First Name</TableCell>
            {/* <TableCell align="center">Last Name</TableCell> */}
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.first_name}</TableCell>
              {/* <TableCell align="center">{row.last_name}</TableCell> */}
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                <EditIcon />
                </TableCell>
                <TableCell align="center">
                <DeleteForeverIcon color="error"/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

<Button variant='contained' onClick={addNewUserClick}  sx={{ m: 1, marginTop: '20px' }} color="success">
Add new user
</Button>
<div style={{paddingTop: '10px'}}><strong>{invitation.message}</strong></div>
<div style={{padding: '10px'}}>{invitation.url}</div>
{ invitation && <div style={{color: "red"}}>A new user should use this link for registration. This link is one-time use.</div>}
</>
  );
}