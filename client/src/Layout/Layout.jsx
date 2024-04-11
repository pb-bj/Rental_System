import { Outlet, Navigate } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <div>
      <Navbar />
      <main className="mt-1">
        {auth.role === 'user' ? <Outlet /> : <Navigate to="/login" replace />}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout