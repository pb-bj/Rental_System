
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const AdminDashboard = () => {
  return (
    <section className="container-fluid  overflow-hidden">
      <div className="row">
        {/* Sidebar */}
        
        <div className="col-md-3 bg-black text-light vh-100 overflow-x-hidden">
          <h2 className=''>Rental X</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light">
                <i className="bi bi-house-door"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cars" className="nav-link text-light">
                <i className="bi bi-car"></i> Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bookings" className="nav-link text-light">
                <i className="bi bi-calendar"></i> Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link text-light">
                <i className="bi bi-person"></i> Customers
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
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

          <section className="container-fluid mx-3 p-3">
            {/* Car Details Table */}
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model</th>
                  <th>Make</th>
                  <th>Year</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Toyota Camry</td>
                  <td>Toyota</td>
                  <td>2022</td>
                  {/* Add more rows with car details */}
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
