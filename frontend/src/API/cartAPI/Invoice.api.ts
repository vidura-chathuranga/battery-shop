import axios from "axios";

const BASE_URL = "http://localhost:3001";


class Invoice{

    //get all carts
    static getAllInvoice =()=>{

        return axios.get(`${BASE_URL}/invoices`,{withCredentials:true});

    }


};

export default Invoice;