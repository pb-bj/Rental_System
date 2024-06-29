import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
// import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  // const { auth } = useAuth();
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: '55px' }}>
        {/* {auth.role === 'user' ? <Outlet /> : <Navigate to="/login" replace />} */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout