import { Link } from "react-router-dom"

const DashboardSidebar = () => {
  // const [ isActive, setIsActive ] = useState('bg-text-seco')
  return (
     <div className="col-2 vh-100 bg-black text-light overflow-x-hidden">
          <h4 className='text-center py-4 px-2 fw-bold'>Rental <span style={{ color : "purple"}}>Hub</span></h4>
          <ul className="d-flex flex-column gap-3 mt-3 list-style-none" style={{ cursor : 'pointer', listStyle : 'none'}}>
            <li className="nav-item mb-3">
              <div className="nav-link rounded ">
                <Link to="dashboard" className='text-decoration-none text-white'>
                <span className="bi bi-house-door ">{" "}Dashboard</span> 
                </Link>
              </div>
            </li>
            <li className="nav-item mb-3">
              <div className="nav-link text-light">
                <Link to="cars-details" className='text-decoration-none text-white'>
                <span className="bi bi-layout-text-sidebar-reverse">{" "}Manage Cars</span>
                </Link> 
              </div>
            </li>
            <li className="nav-item mb-3">
              <div className="nav-link text-light">
                <Link to="bookings-details" className='text-decoration-none text-white'>
                <span className="bi bi-calendar">{" "}Bookings</span>
                </Link> 
              </div>
            </li>
            <li className="nav-item mb-3" >
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