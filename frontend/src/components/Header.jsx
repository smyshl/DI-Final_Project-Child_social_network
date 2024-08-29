import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useContext, useEffect } from "react";

import { AuthContext } from "../auth/AuthProvider";
import DashBoardUser from "./DashboardUser";

const Header = (props) => {

  // const { userName } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));
  let userName;

  user?.first_name ? userName = user.first_name : userName = "anonimous Hamster";


  return (
    <Stack spacing={2} direction={"row"}>
      <Button LinkComponent={Link} to='/'>
        Home
      </Button>
      <Button LinkComponent={Link} to='/register'>
        View users
      </Button>

      <Button LinkComponent={Link} to='/register'>
        Add user
      </Button>


          <DashBoardUser userName={userName}/>
    </Stack>
  );
};
export default Header;