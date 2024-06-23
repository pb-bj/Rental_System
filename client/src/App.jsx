import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "./contexts/AuthContext";
import BookingDetails from "./Admin/BookingDetails";

const App = () => {
  const { authData } = useAuth();
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
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:carId" element={ authData ? <SingleVehicle /> : <Navigate to='/login' replace />} />
          <Route path="/vehicles/booking" element={ authData && authData?.role === 'user' ? <UserBookingProcess /> : <Navigate to="/login" replace /> } />

          <Route path="/user/dashboard" element={ authData && authData?.role === 'user' ? <UserDashboard /> : <Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
