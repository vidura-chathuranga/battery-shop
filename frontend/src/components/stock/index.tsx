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
 
  // const [data, setData] = useState<Data[]>([]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     filterData(data,search);
  //   };

  // const data = [
  //   {
  //     _id: "001",
  //     stock_id: "ST001",
  //     quantity: "4",
  //     added_data: "test",
  //     warnty_priod: "test",
  //     sellingPrice: "test",
  //     actualPrice: "test",
  //     batry_brand: "test",
  //     Battery_description: "test",
  //   },
  //   {
  //     _id: "002",
  //     stock_id: "ST002",
  //     quantity: "1",
  //     added_data: "test",
  //     warnty_priod: "test",
  //     sellingPrice: "test",
  //     actualPrice: "test",
  //     batry_brand: "test",
  //     Battery_description: "test",
  //   },
  // ];

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
        reason: "",
        stock_id: "",
        _id: "",
      },
  
      validate: {
        reason: (values) => (values.length > 5 ? null : "Please enter reason"),
      },
    });
  



  // rows map
  const rows = data?.map((row:any) => (
    <tr key={row._id}>
      <td>
        <Text size={15}>{row.stock_id}</Text>
      </td>
      <td>
        <Text size={15}>{row.batry_brand}</Text>
      </td>
      <td>
        <Text size={15}>{row.Battery_description}</Text>
      </td>
      <td>
        <Text size={15}>{row.quantity}</Text>
      </td>
      <td>
        <Text size={15}>{row.sellingPrice}</Text>
      </td>
      <td>
        <Text size={15}>{row.added_data}</Text>
      </td>
      <td>
        <Text size={15}>{row.warnty_priod}</Text>
      </td>
      <td>
        {
          <>
            <Group spacing={"sm"}>
              {/* Accept button */}
              <Button type="submit"   style={{ width: "90px" }}
              
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
              //deleteSpecificStock(values)
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
            <Textarea
              placeholder="This was added mistakenly"
              label="Reason"
              withAsterisk
              required
              autosize
              minRows={3}
              {...deleteForm.getInputProps("reason")}
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

        <Button leftIcon={<IconPlus size={20}/>} style={{position:"fixed",left:1400}}>
          Add new Stock
        </Button>

      {/* search bar */}
      <TextInput
        placeholder="Search by any field"
        mt={-50}
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
