import { DashboardCard } from "./index"
import './color.css';

import { useFetchCars } from "../contexts/CarContext";
import { useUserCount } from "../hooks/useUserCount";
import { useBookings } from "../hooks/useBookings";

const DashboardContent = () => {
  const { cars } = useFetchCars();
  const { userCounts } = useUserCount();
  const { bookingCounts, activeBookingCounts, cancelledBookingCounts, totalRevenue } = useBookings();
  
  return (
    <div className="container">
      <h2 className="fw-semibold">Your total revenue</h2>
      <span className="fs-2 fw-bold bgGradient">Rs {totalRevenue || 0 }</span>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-4">
        <DashboardCard title="Total Orders" context={bookingCounts || 0} />
        <DashboardCard title="Bookings" context={activeBookingCounts || 0} />
        <DashboardCard title="Bookings Cancellations" context={cancelledBookingCounts || 0} />
        <DashboardCard title="Customers" context={userCounts || 0} />
        <DashboardCard title="Available Cars" context={cars?.length || 0} />
      </div>
    </div>
  )
}

export default DashboardContent