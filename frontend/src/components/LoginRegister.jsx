import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

// import { AuthContext } from '../auth/AuthProvider.jsx';


const LoginRegister = ({action}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // const { setUser, setAccessToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const loginregister = async () => {
        if (action === 'Register') {
            try {
                const response = await axios.post(
                `${BASE_URL}/user/register`,
                { email, password },
                { withCredentials: true }
                );

                if (response.status === 201) {
                setMessage(response.data.message);
                console.log(response.data);
                // context
                  navigate('/login')
                }

                else if(response.status === 200 ){
                    setMessage(response.data.message);
                console.log(response.data);
                }
            } catch (error) {
                console.log(error);
                setMessage(error.response.data.message);
            }
        }
        else {
            try {
                const response = await axios.post(
                `${BASE_URL}/user/login`,
                { email, password },
                { withCredentials: true }
                );

                if (response.status === 201) {
                setMessage(response.data.message);
                // setUser(response.data.user)
                // setAccessToken(response.headers['x-access-token'])
                // console.log("LoginRegister component, loginregister, login, response =>", response.headers['x-access-token']);
                // context
                  navigate('/feed')
                }

                else if(response.status === 200 ){
                setMessage(response.data.message);
                console.log(response.data);
                }
            } catch (error) {
                console.log(error);
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <>
          <h2>{action}</h2>

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
            {action}
          </Button>
          <div>{message}</div>
        </>
      );

};


export default LoginRegister;