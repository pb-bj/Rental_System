import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFoundPage,
  Login,
  AdminDashboard,
  UserDashboard,
  Register,
  Vehicles,
  SingleVehicle
} from "./pages/index";
import Layout from "./Layout/Layout";
// import { useLoginContext } from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

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
