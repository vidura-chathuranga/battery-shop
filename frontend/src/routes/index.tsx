
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
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { WorkerTable } from "../components/workerDetailsTable";
import ManageWorker from "../components/ManageWorker";
import StatsProfitCard from "../components/ProfitCard";


const AllRoutes = () => {
  const client = new QueryClient();//config query client
  return (
    <div>
    <QueryClientProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/worker" element={<WorkerLoginPage />} />
        <Route path="/login/register" element={<Workerregister />} />
        <Route path="/login/adminDashboard" element={<AdminDashboardHeader />} />

        <Route path = "/admin/stock" element ={<StockTable/>} />

        <Route path = "/admin/workerRegister" element={<ManageWorker/>} />
        <Route path = "/admin/profit" element={<StatsProfitCard/>} />



        {/* <Route path = '/admin/stock' element={<StockTable data ={[ {name : "asdasdasd",email : "adadada" , company : "adasdasdad"}]}/>}/> */}

        <Route path = '/admin/workertable' element={<WorkerTable data = {[{name : "Vinnath", nic : "200126302350" ,email :"vinnath19@gmail.com",gender:"Male", address: "warawala",phone:"0711461016"}]}/>}/>

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
    </QueryClientProvider>
    </div>
  );
};

export default AllRoutes;
