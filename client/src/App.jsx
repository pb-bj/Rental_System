import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFoundPage,
  Login,
  UserDashboard,
  Register,
  Vehicles,
  SingleVehicle,
  UserBookingProcess
} from "./pages/index";

import Layout from "./Layout/Layout";
import { AdminDashboard, Bookings, CustomerBookingDetails, DashboardContent, ManageCarsContent } from "./Admin/index";
import PrivateRoute from "./PrivateRoute";
import BookingDetails from "./Admin/BookingDetails";
import UserPrivateRoute from "./UserPrivateRoute";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin-panel/dashboard" element={<AdminDashboard />}>
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="cars-details" element={<ManageCarsContent />} />
            <Route path="bookings-details" element={<Bookings />} >
              <Route path=":bookingId" element={<BookingDetails />} />
            </Route>
              <Route path="customers-details" element={<CustomerBookingDetails />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
          <Route element={<UserPrivateRoute />}>
            <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:carId" element={<SingleVehicle />} />
              <Route path="/vehicles/booking" element={<UserBookingProcess />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
