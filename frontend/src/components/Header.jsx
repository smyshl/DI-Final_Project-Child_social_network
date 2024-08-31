import { Link } from "react-router-dom";
import { Button, Stack, TextField, Avatar } from "@mui/material";
import { useContext, useEffect } from "react";

import { AuthContext } from "../auth/AuthProvider";
import DashBoardUser from "./DashboardUser";

const Header = ({ setAddPostIsOpen, addPostIsOpen }) => {

  // const { userName } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));
  let userName;

  user?.first_name ? userName = user.first_name : userName = "anonimous Hamster";


  return (
    <Stack spacing={2} direction={"row"} elevation={10} sx={{
      position: 'fixed', 
      top: 0,
      height: '4rem',
      width: '70vw',
      alignItems: 'center',
      zIndex: 1000,
      backgroundColor: 'white',
      justifyContent: 'flex-end',
      }}>

{ user && user.role === 'admin' &&
      <TextField
          // label="Size"
          id="standard-size-small"
          // defaultValue="Small"
          size="small"
          variant="standard"
        />}

{ user && user.role === 'admin' &&
        <div>
          <Button onClick={() => setAddPostIsOpen(!addPostIsOpen)} sx={{
            marginRight: '10vw',
          }}>
            Add post
          </Button>
        </div>}


      {/* <Button LinkComponent={Link} to='/register' sx={{

      }}>
        Add user
      </Button> */}


          <DashBoardUser 
          userName={userName}
          userRole={user.role} />


          <Avatar src="/avatars/1.webp" />

    </Stack>
  );
};


export default Header;