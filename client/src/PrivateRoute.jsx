import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { authData } = useAuth();
    if (!authData || authData.role !== 'admin') {
        return <Navigate to='/login' replace />
    }
    return <Outlet />

}

export default PrivateRoute