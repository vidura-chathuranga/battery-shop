import { showNotification, updateNotification } from "@mantine/notifications";


//add battery
const addBatteries = async (values : {
    quantity: string;
    added_date : Date;
    warranty : string;
    sellingPrice : Number;
    actualPrice : Number;
    batteryBrand : string;
    batteryDescription : string;

}) => {
    showNotification({
        id: "add-Battery-details",
        loading: true,
        title: "Adding Batteries record",
        message: "Please wait while we add Batteries record..",
        autoClose: false,
      });
}