import axios from 'axios';
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';


const LoginRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const loginregister = async () => {
        try {
            const response = await axios.post(
            "http://localhost:5000/user/register",
            { email, password },
            // { withCredentials: true }
            );

            if (response.status === 201) {
              setMessage(response.data.message);
              console.log(response.data);
              // context
            //   navigate('/login')
            }

            else if(response.status === 200 ){
                setMessage(response.data.message);
            console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <>
          <h2>{'Register'}</h2>

          <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete='off'>
            <TextField
              sx={{ m: 1 }}
              id='email'
              type='email'
              label='Enter email...'
              variant='outlined'
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <TextField
              sx={{ m: 1 }}
              id='password'
              type='password'
              label='Enter password...'
              variant='outlined'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button variant='contained' onClick={loginregister}>
            {"Register"}
          </Button>
          <div>{message}</div>
        </>
      );

};


export default LoginRegister;