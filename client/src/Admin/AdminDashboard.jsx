import { Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminImage from '../assets/Admin.png'
import { DashboardSidebar } from './index';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { authData, userLoggedOut } = useAuth()

  const handleLogout = () => userLoggedOut();

  return (
    <section className="container-fluid overflow-hidden">
      <div className="row">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h2 className="fs-5 w-75"><span className="text-secondary ">Welcome</span> {authData?.fullname}</h2>
            <div className="d-flex justify-content-end align-items-end w-75 fs-5 me-5" style={{ cursor: 'pointer' }}>
              <i className="bi bi-bell"></i>
            </div>

            {/* Admin Avatar with Dropdown */}
            <div className="dropdown">
              <img
                src={AdminImage}
                alt="Admin Avatar"
                className="rounded-circle dropdown-toggle"
                id="adminDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                <li className="px-2" style={{ cursor: 'pointer' }}>
                  <div onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
