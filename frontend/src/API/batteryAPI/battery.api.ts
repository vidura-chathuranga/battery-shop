import axios from "axios";

const BASE_URL = "http://localhost:3001";

class BatteryAPI {

    //get all items
    static getAllItems = () => {
        return axios.get(`${BASE_URL}/batteries`,{withCredentials:true});

    };

    //add battery
    static addBattery = (values: {

        quantity: string;
        added_date: string;
        warnty_priod: String;
        sellingPrice: string;
        actualPrice: string;
        batry_brand: string;
        Battery_description: string;

    }) => {
        return axios.post(`${BASE_URL}/batteries/add`, values, {withCredentials:true});

    };

    //delete battery
    static deleteBattery = (values : {_id : string, reason : string,stock_id : string}) => {
        return axios.delete(`${BASE_URL}/batteries/delete/${values._id}/${values.reason}`,{withCredentials:true});
    };

    //update battery details
    static updateBattery = (values: {
        _id: string,
        stock_id: string,
        quantity: string;
        added_date: Date;
        warnty_priod: String;
        sellingPrice: string;
        actualPrice: string;
        batry_brand: string;
        Battery_description: string;
    }) => {

        return axios.put(`${BASE_URL}/batteries/update/${values._id}`,
            values,
            {withCredentials:true}
        );
    };

    // get battery details from database
    static getBatteryDetails = () => {
        return axios.get(`${BASE_URL}/batteries`, { withCredentials: true })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.error("Error fetching battery details:", error);
            throw error;
          });
      };

        //Reject Battery Stock
  static rejectBattery = (values : {_id : string,stock_id : string}) => {
    return axios.delete(`${BASE_URL}/batteries/delete/${values._id}`,{withCredentials:true});
};
      
      

}




export default BatteryAPI;