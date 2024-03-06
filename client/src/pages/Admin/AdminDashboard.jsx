import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardContent from './DashboardContent';
import CustomerDetails from './CustomerDetails';
import ManageCarsContent from './ManageCarsContent';

const AdminDashboard = () => {
  const [ dashboardMenu, setDashboardMenu ] = useState('dashboard');

  const handleSwapMenu = (menu) => {
      setDashboardMenu(menu);
  }

  const usersChoice = () => {
    switch (dashboardMenu) {
      case 'dashboard':
          return <DashboardContent />

      case 'manage-cars':
          return <ManageCarsContent />

      case 'customers':
        return <CustomerDetails />
    } 
  }


  
  return (
    <section className="container-fluid  overflow-hidden">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-black text-light vh-100 overflow-x-hidden">
          <h2 className='text-center p-2 fw-bold'>Rental <span style={{ color : "purple"}}>X</span></h2>
          <ul className="nav flex-column gap-3 mt-3">
            <li className="nav-item" onClick={() => handleSwapMenu('dashboard')}>
              <div className="nav-link text-light">
                <i className="bi bi-house-door"></i> Dashboard
              </div>
            </li>
            <li className="nav-item" onClick={() => handleSwapMenu('manage-cars')}>
              <div className="nav-link text-light">
                <i class="bi bi-layout-text-sidebar-reverse"></i> Manage Cars
              </div>
            </li>
            <li className="nav-item" onClick={() => handleSwapMenu('bookings')}>
              <div className="nav-link text-light">
                <i className="bi bi-calendar"></i> Bookings
              </div>
            </li>
            <li className="nav-item" onClick={() => handleSwapMenu('customers')}>
              <div className="nav-link text-light">
                <i className="bi bi-person"></i> Customers
              </div>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h2>Car Details</h2>
            {/* Admin Avatar with Dropdown */}
            <div className="dropdown">
              <img
                src="https://via.placeholder.com/40"
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
          { usersChoice() }
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
