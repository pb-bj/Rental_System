import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFoundPage,
  Login,
  UserDashboard,
  Register,
  Vehicles,
  SingleVehicle
} from "./pages/index";

import Layout from "./Layout/Layout";
import { AdminDashboard, Bookings, CustomerDetails, DashboardContent, ManageCarsContent } from "./Admin/index";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./contexts/AuthContext";

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
            <Route path="bookings-details" element={<Bookings />} />
            <Route path="customers-details" element={<CustomerDetails />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:carId" element={<SingleVehicle />} />

          {authData?.role === 'user' && <Route path="/user/dashboard" element={<UserDashboard />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
