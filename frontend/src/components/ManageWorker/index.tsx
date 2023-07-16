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
import WorkerRegister from "../../pages/WorkerRegister";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import WorkerAPI from "../../API/workerAPI/worker.api";
import { useQuery } from '@tanstack/react-query';



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
  

  // const data = [
  //   {
  //     worker_id: "asdadada",
  //     name: "asdadada",
  //     email: "asdadada",
  //     phone: "asdadada",
  //    nic: "asdadada",
  //     address: "asdadada",
  //     gender: "asdadada",
  //   },
  //   {
  //     worker_id: "asdadada",
  //     name: "asdadada",
  //     email: "asdadada",
  //     phone: "asdadada",
  //    nic: "asdadada",
  //     address: "asdadada",
  //     gender: "asdadada",
  //   },
   
  // ];

   // use react query and fetch data
   const { data, isLoading, isError, refetch } = useQuery(["stockData"], () => {
    return WorkerAPI.getAllWorkerDetails().then((res) => res.data)
  })

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
      {showRegistrationForm && <WorkerRegister />}
      

    <Button leftIcon={<IconPlus size={20}/>} style={{position:"fixed",left:1200}} onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
      Add New Worker
    </Button>
    

  {/* search bar */}
  <TextInput
    placeholder="Search by any field"
    mt={50}
    mb={50}
    icon={<IconSearch size="0.9rem" stroke={1.5} />}
    // value={search}
    // onChange={handleSearchChange}
    w={800}
    style={{ position: "relative", left: "50%", translate: "-50%" }}
  />

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
