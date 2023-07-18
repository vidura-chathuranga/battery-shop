import axios from "axios";

const BASE_URL = "http://localhost:3001";


class Invoice{


    static submitInvoice = (values : any) =>{
        return axios.post(`${BASE_URL}/invoice/add`,values,{withCredentials:true});
    }

    static getAllInvoice =()=>{

        return axios.get(`${BASE_URL}/invoice/`,{withCredentials:true});

    }

    static generatePdf = () =>{
        return axios.get(`${BASE_URL}/invoice/generate`,{responseType:'blob',withCredentials:true});
    }


};

export default Invoice;