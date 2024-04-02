import { Link } from "react-router-dom"
import { dashboardSidebarMenu } from '../constant/index';

const DashboardSidebar = () => {

  return (
     <div className="col-2 vh-100 bg-black text-light overflow-x-hidden">
          <h4 className='text-center py-4 px-2 fw-bold'>Rental <span style={{ color : "purple"}}>Hub</span></h4>
          <ul className="d-flex flex-column gap-3 mt-3 list-style-none" style={{ cursor : 'pointer', listStyle : 'none'}}>
            { dashboardSidebarMenu.map((menu) => (
                <li className="nav-item mb-3" key={menu.id}>
                  <div className="nav-link rounded ">
                    <Link to={menu.link} className={`text-decoration-none ${ !menu.isActive? 'text-white' : 'text-body-secondary'}`} >
                    <span className={menu.icon}>{" "}{menu.title}</span> 
                    </Link>
                  </div>
                </li>
            ))}
          </ul>
        </div>
  )
}

export default DashboardSidebar