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

const Register = () => {
  const registerForm = useForm({
    validateInputOnChange: true,

    initialValues: {
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
        <form onSubmit={registerForm.onSubmit((values:any)=>{})}>

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
