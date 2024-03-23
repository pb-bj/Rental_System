import { Link, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminImage from '../assets/Admin.png'
import { DashboardSidebar } from './index'

const AdminDashboard = () => {
  return (
    <section className="container-fluid overflow-hidden">
      <div className="row">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h2 className="fs-5 ">Welcome User</h2>
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
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-3">
          <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
