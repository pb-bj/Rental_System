import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        fullname: null,
        id: null,
        role: null,
    });

    console.log('userdata', userData)

    return <AuthContext.Provider value={{ setUserData, userData }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;