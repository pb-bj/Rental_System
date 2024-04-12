import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    const [auth, setAuth] = useState(localAuth || {
        token: null,
        role: null,
    });

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth({ token: null, role: null });
    }

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return <AuthContext.Provider value={{ setAuth, auth, logout }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;