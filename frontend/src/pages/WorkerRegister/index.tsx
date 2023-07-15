import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import AdminAPI from "../../API/workerAPI/admin.api";


interface Data{
      _id:string,
      worker_id:string;
      name : string; 
      email : string;
      password : string; 
      phone : string;
      nic:string;
      address:string;
      gender:string;
}

const Register = () => {

  const [opened, setOpened] = useState(false);
  const [data, setData] = useState<Data[]>([]);

  const registerWorker = async(values:{
      worker_id:string,
      name : string; 
      email : string;
      password : string; 
      phone : string;
      nic:string;
      address:string;
      gender:string;
    }) => {

      showNotification({
        id: "Add Worker",
        loading: true,
        title: "Adding Worker record",
        message: "Please wait while we add Worker record..",
        autoClose: false,
      });

      AdminAPI.workerRegister(values)
      .then((Response)=>{
        updateNotification({
          id: "Add Worker",
          color: "teal",
          title: "Adding Worker record",
          message: "Please wait while we add Worker record..",
          //icon: <IconCheck />,
          autoClose: 5000,
      });

      registerForm.reset();
      setOpened(false);

      const newData = [
        ...data,
        {
          _id:Response.data._id,
          worker_id:Response.data.worker_id,
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          nic: values.nic,
          address: values.address,
          gender: values.gender,
        },
      ];
      setData(newData);
      
  }).catch((error) => {
    updateNotification({
      id: "Add Worker",
      color: "red",
      title: "Adding Worker record Failed",
      message: "We were unable to add Worker",
      // icon: <IconAlertTriangle />,
      autoClose: 5000,
    });

  })
    }
  const registerForm = useForm({
    validateInputOnChange: true,



    initialValues: {
      worker_id:"",
      name: "",
      email: "",
      password: "",
      phone: "",
      nic: "",
      address: "",
      gender: "",
    },

    //Validate Data in real time

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",

      phone: (value) =>
        /^\d{10}$/.test(value)
          ? null
          : "Phone number must be 10 digits long number",

        nic:(value)=>{
          if(!value){
            return 'This field is Required'
          }
          if (!/^\S+@\S+$/.test(value) && !/^([0-9]{9}[v|V]|[0-9]{12})$/.test(value)) {
            return 'Invalid email or NIC';
          }
          return null;
        }
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={registerForm.onSubmit((values)=>registerWorker(values))}>

        <TextInput label="ID" placeholder="Enter ID" name="worker_id"  required  {...registerForm.getInputProps("worker_id")}/>
        <TextInput label="Name" placeholder="Enter name" name="name"  required  {...registerForm.getInputProps("name")}/>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          name="email"
          required
          {...registerForm.getInputProps("email")}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...registerForm.getInputProps("password")}
        />

        <TextInput
          label="Phone"
          placeholder="Enter phone"
          name="phone"
          required
          mt="md"
          {...registerForm.getInputProps("phone")}
        />

        <TextInput
          label="NIC"
          placeholder="Enter NIC"
          name="nic"
          required
          mt="md"
          {...registerForm.getInputProps("nic")}
        />

        <TextInput
          name="address"
          label="Address"
          placeholder="Enter address"
          required
          mt="md"
          {...registerForm.getInputProps("address")}
        />

        <Select
          name="gender"
          label="Gender"
          placeholder="Select gender"
          required
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          {...registerForm.getInputProps("gender")}
        />


        <Button fullWidth mt="xl" type="submit">
          Sign Up
        </Button>

        </form>
      </Paper>
    </Container>
  );
};

export default Register;
