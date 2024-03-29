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
// import { useLoginContext } from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/admin-panel" element={<AdminDashboard />}>
            <Route path="dashboard" element={<DashboardContent/>}/>
            <Route path="cars-details" element={<ManageCarsContent />}/>
            <Route path="bookings-details" element={<Bookings/>}/>
            <Route path="customers-details" element={<CustomerDetails />}/>
          </Route>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:carId" element={<SingleVehicle />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
