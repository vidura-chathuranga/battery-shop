import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  Center,
  TextInput,
  rem,
  ActionIcon,
  Tooltip,
  Container,
  Grid,
  PasswordInput,
  Select,
  
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { showNotification,updateNotification } from "@mantine/notifications";

import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import WorkerAPI from "../../API/workerAPI/worker.api";
import { useQuery } from '@tanstack/react-query';

import { useForm } from "@mantine/form";

import AdminAPI from "../../API/adminAPI/admin.api";



const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
  header: {
    position: "sticky",
    zIndex: 100,
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface Data {
  worker_id: string;
  name: string;
  email: string;
  phone: string;
  nic: string;
  address: String;
  gender: string;
}

function filterData(data: Data[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

const ManageWorker = () => {

  const [search, setSearch] = useState("");
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [opened, setOpened] = useState(false);

   // use react query and fetch data
     const { data } = useQuery(["workerData"], () => {
      return WorkerAPI.getAllWorkerDetails().then((res) => res.data)
    });

    
  const registerForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      worker_id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      nic: "",
      address: "",
      gender: "",
    },

     // Validate Data in real time

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

      nic: (value) => {
        if (!value) {
          return "This field is Required";
        }
        if (
          !/^\S+@\S+$/.test(value) &&
          !/^([0-9]{9}[v|V]|[0-9]{12})$/.test(value)
        ) {
          return "Invalid email or NIC";
        }
        return null;
      },
    },
  });

  

  const registerWorker = async (values: {
    worker_id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    nic: string;
    address: string;
    gender: string;
  }) => {
    showNotification({
      id: "Add Worker",
      loading: true,
      title: "Adding Worker record",
      message: "Please wait while we add Worker record..",
      autoClose: false,
    });

    AdminAPI.workerRegister(values)
      .then((Response) => {
        updateNotification({
          id: "Add Worker",
          color: "teal",
          title: "Adding Worker record",
          message: "Please wait while we add Worker record..",
          icon: <IconCheck />,
          autoClose: 5000,
        });

        registerForm.reset();
        setOpened(false);

        const newData = [
          ...data,
          {
            _id: Response.data._id,
            worker_id: Response.data.worker_id,
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            nic: values.nic,
            address: values.address,
            gender: values.gender,
          },
        ];
      //  setData(newData);
      })
      .catch((error) => {
        updateNotification({
          id: "Add Worker",
          color: "teal",
          title: "Adding Worker record",
          message: "Please wait while we add Worker record..",
          icon: <IconCheck />,
          autoClose: 5000,
        });
      });
  };
  

  const getWorkerDetails = async () => {
    showNotification({
      id: "get-worker-details",
      loading: true,
      title: "Fetching Worker Details",
      message: "Please wait while we fetch worker details..",
      autoClose: false,
    });
  
    try {
      const workerDetails = await WorkerAPI.getAllWorkerDetails();
  
      updateNotification({
        id: "get-worker-details",
        color: "teal",
        icon: <IconCheck />,
        title: "Worker Details Fetched",
        message: "Successfully fetched worker details.",
        autoClose: 5000,
      });
  
      return workerDetails;
    } catch (error) {
      updateNotification({
        id: "get-worker-details",
        color: "red",
        icon: <IconX />,
        title: "Failed to Fetch Worker Details",
        message: "We were unable to fetch worker details.",
        autoClose: 5000,
      });
  
      throw error;
    }
  };

  // const data =[
  //   {
  //     worker_id : 1,
  //     name : "vidura",
  //     email : "vidurachatrhuranga@gmail.com",
  //     phone : '0712906815',
  //     address : "colombo,Ruwanwella",
  //     gender : "male"
  //   },
  //   {
  //     worker_id : 2,
  //     name : "vidura",
  //     email : "vidurachatrhuranga@gmail.com",
  //     phone : '0712906815',
  //     address : "colombo,Ruwanwella",
  //     gender : "male"
  //   },
  //   {
  //     worker_id : 3,
  //     name : "vidura",
  //     email : "vidurachatrhuranga@gmail.com",
  //     phone : '0712906815',
  //     address : "colombo,Ruwanwella",
  //     gender : "male"
  //   }
  // ]

  const rows = data?.map((row:any) => (
    <tr key={row.worker_id}>
      <td>
        <Text size={15}>{row.name}</Text>
      </td>
      <td>
        <Text size={15}>{row.email}</Text>
      </td>
      <td>
        <Text size={15}>{row.phone}</Text>
      </td>
      <td>
        <Text size={15}>{row.nic}</Text>
      </td>
      <td>
        <Text size={15}>{row.address}</Text>
      </td>
      <td>
        <Text size={15}>{row.gender}</Text>
      </td>
      <td>
        {
          <>
            <Group spacing={"sm"}>
              {/* edit button */}
              <Tooltip label="Edit worker">
                <ActionIcon color="teal">
                  <IconEdit size={30} />
                </ActionIcon>
              </Tooltip>

              {/* delete button */}
              <Tooltip label="Delete worker">
                <ActionIcon color="red">
                  <IconTrash size={30} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </>
        }
      </td>
    </tr>
  ));

 

 


  return(

    <div>
      {/* {showRegistrationForm && <WorkerRegister />} */}
      

    <div>
   
    </div>

    <Modal
          opened={opened}
          onClose={() => {
            registerForm.reset();
            setOpened(false);
          }}
          title="Add Items Record"
        >
          <form
            onSubmit={registerForm.onSubmit((values) => registerWorker(values))}
          >
            <TextInput
              label="ID"
              placeholder="Enter ID"
              name="worker_id"
              required
              {...registerForm.getInputProps("worker_id")}
            />
            <TextInput
              label="Name"
              placeholder="Enter name"
              name="name"
              required
              {...registerForm.getInputProps("name")}
            />
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
              Add Worker
            </Button>
          </form>
        </Modal>

    

  {/* search bar */}
  <div style={{ alignItems: "center" }}>
  <TextInput
    placeholder="Search by any field"
    mt={50}
    mb={20}
    icon={<IconSearch size="0.9rem" stroke={1.5} />}
    // value={search}
    // onChange={handleSearchChange}
    w={500}
    style={{ position: "relative", left: "25%", translate: "-50%" }}
  />
   <Button leftIcon={<IconPlus size={20}/>} style={{position:"relative",left:1000}} onClick={() => setOpened(true)}>
      Add New Worker
    </Button>
  </div>

  <ScrollArea
    w={"100mw"}
    h={600}
    onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
  >
    <Table
      highlightOnHover
      horizontalSpacing={70}
      verticalSpacing="lg"
      miw={700}
      sx={{ tableLayout: "fixed" }}
    >
      <thead
        className={cx(classes.header, { [classes.scrolled]: scrolled })}
      >
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>NIC</th>
          <th>Gender</th>
        </tr>
      </thead>
      {/* <tbody>
        {rows.length > 0 ? (
          rows
        ) : (
          <tr>
            <td colSpan={Object.keys(data[0]).length}>
              <Text weight={500} align="center">
                Nothing found
              </Text>
            </td>
          </tr>
        )}
      </tbody> */}
    </Table>
  </ScrollArea>
</div> 
  )



}

export default ManageWorker;
