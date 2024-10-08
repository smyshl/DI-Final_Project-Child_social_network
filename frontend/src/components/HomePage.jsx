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
      <div style={{color: '#1e79d3', marginBottom: '2.5rem'}}>
        <h1 style={{ marginBottom: '0.2rem'}}>Welcome to the Hamsters network</h1>
        A safe space for parents to share photos of their children with relatives</div>

        <img
          src={`${process.env.PUBLIC_URL}/hamsters_images/2.webp`}
          style={{ width: "23rem", border: '1px solid #1e79d3', borderRadius: '3%'}}
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

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem'}}>
        <div style={{marginRight: '0.5rem'}}>For demo use:</div>
        <div style={{textAlign: 'left', marginLeft: '0.5rem'}}>
        <div>Login: demo</div>
        <div>Password: day</div>  
        </div>
        </div>

        <div style={{marginTop: '20px', fontSize: '0.8rem'}}>
        There may be delays in the website's operation because the demo servers often go to sleep.<br />
        Please be patient with them.
        </div>

        <div style={{marginTop: '5px', fontSize: '0.8rem'}}>
        Demo prototype, not all features are implemented. Have question - email me: <a href="mailto:">e.smyshl@gmail.com</a>
        </div>
      </>
    );
};

export default HomePage