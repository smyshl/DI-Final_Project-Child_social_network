import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react";

import ModalWindow from "./ModalWindow";
import LoginRegister from './LoginRegister.jsx'

function HomePage() {

    const [ loginIsOpen, setLoginIsOpen ] = useState(false);

    const loginClickHandle = () => {
        setLoginIsOpen(!loginIsOpen);
    }

    const onClose = () => {
        console.log("HomePage component onClose loginIsOpen =>", loginIsOpen);
        
        setLoginIsOpen(!loginIsOpen)
    }


    return (
      <>
        <h1>Welcome to the Hamster network</h1>

        <img
          src={`${process.env.PUBLIC_URL}/hamster_logo.webp`}
          style={{ width: "23rem" }}
        ></img>

        {/* <div>
          <Button LinkComponent={Link} to="/login">
            Login
          </Button>
        </div> */}

        <div>
          <Button onClick={loginClickHandle}>
            Login
          </Button>
        </div>


        <ModalWindow isOpen={loginIsOpen} onClose={onClose}>
            <LoginRegister action={'Login'}/>
        </ModalWindow>

      </>
    );
};

export default HomePage