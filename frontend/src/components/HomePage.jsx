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
        <h1 style={{color: '#1e79d3'}}>Welcome to the Hamsters network</h1>

        <img
          src={`${process.env.PUBLIC_URL}/hamsters_images/2.webp`}
          style={{ width: "23rem" }}
        ></img>

        {/* <div>
          <Button LinkComponent={Link} to="/login">
            Login
          </Button>
        </div> */}
        <br /><br />
        <div>
          <Button onClick={loginClickHandle} size="large">
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