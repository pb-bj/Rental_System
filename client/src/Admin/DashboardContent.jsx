import { DashboardCard } from "./index"
import './color.css';

import { useFetchCars } from "../contexts/CarContext";

const DashboardContent = () => {
  const {cars } = useFetchCars();
  let totalcars;
  return (
    <div className="container">
      <h2 className="fw-semibold">Your total revenue</h2>
      <span className="fs-2 fw-bold bgGradient">Rs 50,000</span>
         <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-4">
          <DashboardCard title="New Orders"  context="11" />
          <DashboardCard title="Bookings" context="28" />
          <DashboardCard title="Customers"  context="8"/>
          <DashboardCard title="Available Cars"  context={cars.length}/>
     
    </div>
    </div>
  )
}

export default DashboardContent