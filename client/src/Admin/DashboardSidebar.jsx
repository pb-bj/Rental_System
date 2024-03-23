import { Link } from "react-router-dom"

const DashboardSidebar = () => {
  return (
     <div className="col-2 vh-100 bg-black text-light overflow-x-hidden">
          <h2 className='text-center p-2 fw-bold'>Rental <span style={{ color : "purple"}}>X</span></h2>
          <ul className="nav flex-column gap-3 mt-3" style={{ cursor : 'pointer'}}>
            <li className="nav-item" >
              <div className="nav-link text-light ">
                <Link to="dashboard" className='text-decoration-none text-white'>
                <span className="bi bi-house-door ">{" "}Dashboard</span> 
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link text-light">
                <Link to="cars-details" className='text-decoration-none text-white'>
                <span className="bi bi-layout-text-sidebar-reverse">{" "}Manage Cars</span>
                </Link> 
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link text-light">
                <Link to="bookings-details" className='text-decoration-none text-white'>
                <span className="bi bi-calendar">{" "}Bookings</span>
                </Link> 
              </div>
            </li>
            <li className="nav-item" >
              <div className="nav-link text-light">
                <Link to="customers-details" className='text-decoration-none text-white'>
                <span className="bi bi-person">{" "}Customers</span> 
                </Link>
              </div>
            </li>
          </ul>
        </div>
  )
}

export default DashboardSidebar