
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AdminLoginPage from "../pages/Login/adminLogin";
import WorkerLoginPage from "../pages/Login/workerLogin";
import Workerregister from "../pages/WorkerRegister";
import ADashboard from "../pages/AdminDashboard";
import WorkerOwnerPrivateRoute from "./workerOwnerPrivateRoute";
import WorkerDashboard from "../pages/WorkerDashboard";
import Logout from "../components/logout/logout";
import WorkerDashboardHeader from "../components/workerDashboardHeader";
import WorkerNotifications from "../pages/WorkerNotifications";
import StockTable from "../components/stock";
import AdminDashboardHeader from "../components/adminDashboardHeader";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/worker" element={<WorkerLoginPage />} />
        <Route path="/login/register" element={<Workerregister />} />
        <Route path="/login/adminDashboard" element={<AdminDashboardHeader />} />

        <Route path = "/admin/stock" element ={<StockTable/>} />

        // {/* <Route path = '/admin/stock' element={<StockTable data ={[ {name : "asdasdasd",email : "adadada" , company : "adasdasdad"}]}/>}/> */}

        <Route path="/worker" element={<WorkerOwnerPrivateRoute />}>
          <Route path="/worker/managestock" element={<WorkerDashboard />} />
          <Route
            path="/worker/notifications"
            element={<WorkerNotifications />}
          />
          <Route path="/worker/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
