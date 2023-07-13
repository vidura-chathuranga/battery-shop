import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminLoginPage from '../pages/Login/adminLogin';
import WorkerLoginPage from '../pages/Login/workerLogin';
import Workerregister from '../pages/WorkerRegister';
import ADashboard from '../pages/AdminDashboard';


const AllRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/login/admin' element={<AdminLoginPage/>}/>
                <Route path='/login/worker' element={<WorkerLoginPage/>}/>
                <Route path='/login/register' element={<Workerregister/>}/>
                <Route path='/login/adminDashboard' element={<ADashboard/>}/>

            </Routes>
        </Router>        
    );
};

export default AllRoutes;