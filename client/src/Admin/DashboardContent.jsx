import { DashboardCard } from "./index"
import './color.css';

import { useFetchCars } from "../contexts/CarContext";
import { useUserCount } from "../hooks/useUserCount";
import { useBookings } from "../hooks/useBookings";

const DashboardContent = () => {
  const { cars } = useFetchCars();
  const { userCounts } = useUserCount();
  const { bookingCounts, activeBookingCounts, cancelledBookingCounts, totalAmount } = useBookings();
  
  const availableCars = cars.filter((car) => car.isAvailable);
  
  return (
    <div className="container">
      <div className="d-flex justify-space-between gap-5 ">
        <div>
          <h2 className="fw-semibold">Your total revenue</h2>
          <span className="fs-2 fw-bold bgGradient">Rs {totalAmount?.totalRevenue }</span>
        </div>
         <div>
          <h2>Refunded Amount</h2>
          <span className="fs-2 fw-bold text-danger">Rs { totalAmount?.totalRefunded }</span>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-4">
        <DashboardCard title="Total Orders" context={bookingCounts || 0} />
        <DashboardCard title="Bookings" context={activeBookingCounts || 0} />
        <DashboardCard title="Bookings Cancellations" context={cancelledBookingCounts || 0} />
        <DashboardCard title="Customers" context={userCounts || 0} />
        <DashboardCard title="Available Cars" context={availableCars.length} />
      </div>
    </div>
  )
}

export default DashboardContent