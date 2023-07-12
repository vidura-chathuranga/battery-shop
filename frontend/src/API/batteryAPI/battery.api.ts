import axios from "axios";

const BASE_URL = "http://localhost:3001";

class BatteryAPI {

    //get all items
    static getAllItems = () => {
        return axios.post(`${BASE_URL}/batteries`, /*requestConfig*/);

    };

    //add battery
    static addBattery = (values: {

        quantity: string;
        added_date: Date;
        warranty: string;
        sellingPrice: Number;
        actualPrice: Number;
        batteryBrand: string;
        batteryDescription: string;
    }) => {
        return axios.post(`${BASE_URL}/batteries`, values, /*requestConfig*/);

    };

    //delete battery
    static declareBattery = (stock_id: string) => {
        return axios.delete(`${BASE_URL}/batteries/delete/${stock_id}`,/*requestConfig*/);
    };

    //update battery details
    static updateBattery = (values: {
        _id: string,
        stock_id: string;
        quantity: string;
        added_date: Date;
        warranty: string;
        sellingPrice: Number;
        actualPrice: Number;
        batteryBrand: string;
        batteryDescription: string;
    }) => {

        return axios.put(`${BASE_URL}/batteries/update/${values._id}`,
            values,
           // requestConfig
        );
    };
}

export default BatteryAPI;