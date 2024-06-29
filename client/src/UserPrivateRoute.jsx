import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const UserPrivateRoute = () => {
    const { authData } = useAuth();
    return authData ? <Outlet /> : <Navigate to='/login' replace /> 
}

export default UserPrivateRoute