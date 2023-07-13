import { showNotification, updateNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { IconCheck, IconAlertTriangle } from "@tabler/icons";
import { useState } from "react"

import BatteryAPI from "../../API/batteryAPI/battery.api"

//Interface for Battery data - (Raw data)
interface RowData {
  _id: string;
  stockId: string;
  quantity: string;
  added_date: Date;
  warranty: string;
  sellingPrice: Number;
  actualPrice: Number;
  batteryBrand: string;
  batteryDescription: string;
}


const BatteryManage = () => {
  // const [opened, setOpened] = useState(false);
  // const [data, setData] = useState<RowData[]>([]);



  // //declare add form
  // const addForm = useForm({
  //   validateInputOnChange: true,
  //   initialValues: {
  //     batteryBrand: "",
  //     actualPrice: "",
  //     sellingPrice: "",
  //     batteryDescription: "",
  //     quantity: "",
  //     warranty: "",
  //     added_date: "",
  //   },

  // });

  // //Get all Items records from the database
  // const getAllItems = async () => {
  //   const response = await BatteryAPI.getAllItems();
  //   const data = await response.data;
  //   return data;
  // };

  // //add battery
  // const addBatteries = async (values: {
  //   quantity: string;
  //   added_date: Date;
  //   warranty: string;
  //   sellingPrice: Number;
  //   actualPrice: Number;
  //   batteryBrand: string;
  //   batteryDescription: string;

  // }) => {
  //   showNotification({
  //     id: "add-items",
  //     loading: true,
  //     title: "Adding Items record",
  //     message: "Please wait while we add Items record..",
  //     autoClose: false,
  //   });
  //   BatteryAPI.addBattery(values)
  //     .then((response) => {
  //       updateNotification({
  //         id: "add-items",
  //         color: "teal",
  //         title: "Items added successfully",
  //         message: "Items data added successfully.",
  //         icon: <IconCheck />,
  //         autoClose: 5000,
  //       });
  //       addForm.reset();
  //       setOpened(false);
  //       const newData = [
  //         ...data,
  //         {
  //           _id: response.data._id,
  //           stockId: response.data.stockId,
  //           batteryBrand: values.batteryBrand,
  //           actualPrice: values.actualPrice,
  //           sellingPrice: values.sellingPrice,
  //           batteryDescription: values.batteryDescription,
  //           quantity: values.quantity,
  //           warranty: values.warranty,
  //           added_date: values.added_date,
  //         },
  //       ];
        

  //     })
  //     .catch((error) => {
  //       updateNotification({
  //         id: "add-items",
  //         color: "red",
  //         title: "Items Adding failed",
  //         message: "We were unable to add the Items to the database",
  //         icon: <IconAlertTriangle/>,
  //         autoClose: 5000,
  //       });

  //     })
  // }
};


export default BatteryManage;

