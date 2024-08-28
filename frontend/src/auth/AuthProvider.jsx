import { createContext, useState } from "react";


export const AuthContext = createContext(null);


export function AuthProvider ({ children }) {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("user", JSON.stringify(userData));

        console.log("AuthProvider component, login, userdata, token =>", userData, token);
        

    };
    
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
};