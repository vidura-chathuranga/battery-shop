import axios from "axios";

const BASE_URL = "http://localhost:3001";


class CartAPI{

    //get all carts
    static getAllCart =()=>{

        return axios.get(`${BASE_URL}/carts`,{withCredentials:true});

    }


};

export default CartAPI;