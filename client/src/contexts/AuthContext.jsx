import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../api/instance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        // storing the localStorage data when components mounts for user
        const storedAuthToken = localStorage.getItem('x-token')
        const storedAuthData = JSON.parse(localStorage.getItem('x-user'));

        if (storedAuthData && storedAuthToken) {
            setAuthData(storedAuthData);
            setAuthToken({ token : storedAuthToken });
        }
    }, []);


    // retieving the data and then storing the token and user data in localStorage.
    const setAuthInfo = (data) => {
        const { accessToken, user } = data;
        localStorage.setItem('x-token', accessToken);
        localStorage.setItem('x-user', JSON.stringify(user));

        setAuthToken({ token: accessToken });
        setAuthData({
            id: user.id,
            fullname: user.fullname,
            role: user.role
        });
    };

    const userLoggedOut = async () => {
        try {
            await instance.post('/api/auth/logout')
        } catch (err) {
            console.log('Error when logout', err);
        }
        localStorage.removeItem('x-token');
        localStorage.removeItem('x-user');

        setAuthData(null);
        setAuthToken(null);
    };

    return <AuthContext.Provider value={{ setAuthInfo, authToken, authData, userLoggedOut }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;


