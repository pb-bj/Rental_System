import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        fullname: null,
        id: null,
        role: null,
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserData({
                    fullname: decodedToken.fullname,
                    id: decodedToken.id,
                    role: decodedToken.role,
                });
            } catch (error) {
                console.error("Token decoding failed:", error);
                localStorage.removeItem('token');  // In case the token is invalid or expired
            }
        }
    }, []);

    const setTokenStorage = (authToken) => {
        if (authToken) {
            localStorage.setItem('token', authToken);
            const decodedToken = jwtDecode(authToken);
            setUserData({
                fullname: decodedToken.fullname,
                id: decodedToken.id,
                role: decodedToken.role,
            });
        } else {
            // Clear user data if no token is provided
            localStorage.removeItem('token');  // Clear token from localStorage
            setUserData({
                fullname: null,
                id: null,
                role: null,
            });
        }
    }

    const logout = () => {
        return localStorage.removeItem('token');
    }

    return <AuthContext.Provider value={{ userData, setTokenStorage, logout }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;