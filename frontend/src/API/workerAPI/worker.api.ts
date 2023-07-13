import axios from "axios";

const BASE_URL = "http://localhost:3001";

class WorkerAPI {
    static login (values : {nic : string, password : string}) {
        return axios.post(`${BASE_URL}/worker/login`,values,{withCredentials:true});
    }

    static logout(){
        return axios.get(`${BASE_URL}/worker/logout`,{withCredentials:true});
    }
    
};

export default WorkerAPI;