import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminLoginPage from '../pages/Login/adminLogin';
import WorkerLoginPage from '../pages/Login/workerLogin';


const AllRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/login/admin' element={<AdminLoginPage/>}/>
                <Route path='/login/worker' element={<WorkerLoginPage/>}/>
            </Routes>
        </Router>        
    );
};

export default AllRoutes;