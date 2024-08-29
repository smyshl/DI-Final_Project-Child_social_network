import axios from "axios";
import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


export function AuthProvider ({ children }) {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [ loggedIn, setLoggedIn ] = useState(false);

    const navigate = useNavigate();

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoggedIn(true)

        console.log("AuthProvider component, login, userdata, token =>", userData, token);
    
    };
    
    const logout = async () => {
        console.log("AuthProvider component, logout =>");
        
        setUser(null);
        setAccessToken(null);
        localStorage.clear();
        setLoggedIn(false)
        navigate('/');

        let response;

        try {
            response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`, {
                withCredentials: true,
            });
        } catch (error) {
            console.log(error);
        }

        // console.log("AuthProvider component, del tokens response =>", response);
        
    };

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, login, logout, loggedIn }} >
            {children}
        </AuthContext.Provider>
    );
};