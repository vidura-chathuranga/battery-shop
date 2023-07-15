import axios from "axios";

const BASE_URL = "http://localhost:3001";

class AdminAPI {
    static login (values : {emailOrNic : string, password : string}) {
        
        return axios.post(`${BASE_URL}/admin/login`,values,{withCredentials:true});
    }

    static logout(){
        return axios.get(`${BASE_URL}/admin/logout`,{withCredentials:true});
    }
    
};

export default AdminAPI;