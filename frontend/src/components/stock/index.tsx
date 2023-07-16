import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Modal,
  ActionIcon,
  Tooltip,
  Button,
  Container,
  Grid,
  Box,
  LoadingOverlay,
  Textarea,
  CloseButton,
  Paper,
} from "@mantine/core";
import AdminAPI from '../../API/adminAPI/admin.api';
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

import { useForm } from "@mantine/form";
import { showNotification,updateNotification } from "@mantine/notifications";
import BatteryAPI from "../../API/batteryAPI/battery.api";
import { useQuery } from '@tanstack/react-query';
import { DateInput } from '@mantine/dates';
import AdminDashboardHeader from "../adminDashboardHeader";

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
  _id: string;
  stock_id: string;
  quantity: string;
  added_data: string;
  warnty_priod: String;
  sellingPrice: string;
  actualPrice: string;
  batry_brand: string;
  Battery_description: string;
}

function filterData(data: Data[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

const StockTable = () => {
  const [search, setSearch] = useState("");
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [opened, setOpened] = useState(false);


    // use react query and fetch data
    const { data, isLoading, isError, refetch } = useQuery(["stockData"], () => {
      return BatteryAPI.getAllItems().then((res) => res.data)
    })

     //declare add form
  const addForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      quantity: "",
      added_date: "",
      warnty_priod: "",
      sellingPrice: "",
      actualPrice: "",
      batry_brand: "",
      Battery_description: "",
    },
  });



     //add Items
  const addItems = async (values: {
    quantity: string;
    added_date: string;
    warnty_priod: String;
    sellingPrice: string;
    actualPrice: string;
    batry_brand: string;
    Battery_description: string;
  }) => {
    showNotification({
      id: "add-items",
      loading: true,
      title: "Adding Items record",
      message: "Please wait while we add Items record..",
      autoClose: false,
    });
    BatteryAPI.addBattery(values)
      .then((response) => {
        updateNotification({
          id: "add-items",
          color: "teal",
          icon: <IconCheck />,
          title: "Items added successfully",
          message: "Items data added successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        addForm.reset();
        setOpened(false);

        // refetch data from the database
        refetch();
      })
      .catch((error) => {
        updateNotification({
          id: "add-items",
          color: "red",
          title: "Items Adding failed",
          icon: <IconX />,
          message: "We were unable to add the Items",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });
  };

    // delete Stock function
    const deleteSpecificStock = (values: {
      _id: string;
      stock_id: string;
    }) => {
      BatteryAPI.rejectBattery(values)
        .then((res) => {
          showNotification({
            title: `${values.stock_id} was deleted`,
            message: "Stock was deleted successfully",
            autoClose: 1500,
            icon: <IconCheck />,
            color: "teal",
          });
  
          // after successing the deletion refetch the data from the database
          refetch();
  
          // clear all the fields
          deleteForm.reset();
  
          // then close the delete modal
          setDeleteOpen(false);
        })
        .catch((err) => {
          showNotification({
            title: `${values.stock_id} was not deleted`,
            message: "Stock was not deleted",
            autoClose: 1500,
            icon: <IconX />,
            color: "red",
          });
        });
    };

    
 
  // const [data, setData] = useState<Data[]>([]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     filterData(data,search);
  //   };



  const getBatteryDetails = async () => {
    showNotification({
      id: "get-battery-details",
      loading: true,
      title: "Fetching Battery Details",
      message: "Please wait while we fetch battery details..",
      autoClose: false,
    });
  
    try {
      const batteryDetails = await BatteryAPI.getBatteryDetails();
  
      updateNotification({
        id: "get-battery-details",
        color: "teal",
        icon: <IconCheck />,
        title: "Battery Details Fetched",
        message: "Successfully fetched battery details.",
        autoClose: 5000,
      });
  
      return batteryDetails;
    } catch (error) {
      updateNotification({
        id: "get-battery-details",
        color: "red",
        icon: <IconX />,
        title: "Failed to Fetch Battery Details",
        message: "We were unable to fetch battery details.",
        autoClose: 5000,
      });
  
      throw error;
    }
  };

    // form for deletion
    const deleteForm = useForm({
      validateInputOnChange: true,
  
      initialValues: {
        stock_id: "",
        _id: "",
      },
  
    });
  

  // rows map
  const rows = data?.map((row:any) => (
    <tr key={row._id}>
      <td>
        <Text size={15}>{row.stock_id}</Text>
      </td>
      <td>
        <Text size={15}>{row.batteryBrand}</Text>
      </td>
      <td>
        <Text size={15}>{row.batteryDescription}</Text>
      </td>
      <td>
        <Text size={15}>{row.quantity}</Text>
      </td>
      <td>
        <Text size={15}>{row.sellingPrice}</Text>
      </td>
      <td>
        <Text size={15}>{new Date(row.added_date).toLocaleDateString('en-GB').split('T')[0]}</Text>
      </td>
      <td>
        <Text size={15}>{row.warranty}</Text>
      </td>
      <td>
        {
          <>
            <Group spacing={"sm"}>
              {/* Accept button */}
              <Button type="submit"   style={{ width: "90px"}}  onClick={() => {
                    addForm.setValues({
                    //   _id: row._id,
                    //   stock_id: row.stock_id,
                    //   Battery_description: row.batteryDescription,
                    //   batry_brand : row.batteryBrand,
                    //   actualPrice: row.actualPrice,
                    //   sellingPrice: row.sellingPrice,
                    //   quantity: row.quantity,
                    //  // added_date: new Date(row.added_date),
                    //   warnty_priod: row.warranty,
                    });
                    setOpened(true);
                  }}
               >
                   Accept
                </Button>

              {/* Reject Button */}
               <Button type="submit" color="red" style={{ width: "90px" }}
                onClick={() => {
                  deleteForm.setValues({
                   _id:row._id,
                   stock_id: row.stock_id,
                  });
                  setDeleteOpen(true);
                }} 
                >
               
                   Reject
               
                </Button>
            </Group>
          </>
        }
      </td>
   
    </tr>
  ));

    // if data is fetching this overalay will be shows to the user
    if (isLoading) {
      return <LoadingOverlay visible={isLoading} overlayBlur={2} />
    }
  
    if (isError) {
      showNotification({
        title: "Cannot fetching Stock Data",
        message: "check internet connection",
        color: "red",
        icon: <IconX />,
        autoClose: 1500,
      });
    }

  // table
  return (
    <div>
       {/* stock add Modal */}
       <Modal
        opened={opened}
        onClose={() => {
         // addForm.reset();
          setOpened(false);
        }}
        title="Accept Battery Stocks"
      >
        <form onSubmit={addForm.onSubmit((values) => addItems(values))}>
      <Paper withBorder p="lg" radius="md" shadow="md">

     
      <Group position="center" mt="md">
        <Button variant="outline" size="xs" color="red">
          Cancel
        </Button>
        <Button variant="outline" size="xs">
          Accept all
        </Button>
      </Group>
    </Paper>
    </form>
      </Modal>



      {/* // delete modal */}
      <Modal
        opened={deleteOpen}
        centered
        onClose={() => {
          //addForm.reset();
          setDeleteOpen(false);
        }}
        title="Reject Stock"
      >
        <Box>
          <Text size={"sm"} mb={10}>
            Are you sure you want to Reject this stock? This action cannot be
            undone!
          </Text>
          <form
            onSubmit={deleteForm.onSubmit((values) => {
              deleteSpecificStock(values)
            })}
          >
            <TextInput
              withAsterisk
              label="Stock ID"
              required
              disabled
              {...deleteForm.getInputProps("stock_id")}
              mb={10}
            />
            

            <Group position="right" spacing={"md"} mt={20}>
              <Button
                color="gray"
                variant="outline"
                onClick={() => {
                  deleteForm.reset();
                  setDeleteOpen(false);
                }}
              >
                No I don't Reject it
              </Button>
              <Button color="red" type="submit" leftIcon={<IconTrash size={16} />}>
                Reject it
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

        {/* <Button leftIcon={<IconPlus size={20}/>} style={{position:"fixed",left:1400}}>
          Add new Stock
        </Button> */}

      {/* search bar */}
      <TextInput
        placeholder="Search by any field"
         mt={50}
        // mb={50}
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        // value={search}
        // onChange={handleSearchChange}
        w={800}
        // style={{ position: "relative", left: "50%", translate: "-50%" }}
      />

      <ScrollArea
        w={"100mw"}
        h={800}
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
              <th>Stock_id</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Added_Date</th>
              <th>Warranty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </Table>
      </ScrollArea>
      
    </div>
  );
};

export default StockTable;
