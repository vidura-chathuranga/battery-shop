import axios from "axios";

const BASE_URL = "http://localhost:3001";

class AdminAPI {
    static login (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/admin/login`,values);
    }

    
};

export default AdminAPI;



