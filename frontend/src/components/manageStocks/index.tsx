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
  ActionIcon,
  Tooltip,
  Button,
  Container,
  Grid,
  Modal,
  Box,
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
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
//import {IconCheck, IconAlertTriangle} from '@tabler/icons';

import BatteryAPI from "../../API/batteryAPI/battery.api"


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
      borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark"
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

const ManageStocks = () => {
  const [search, setSearch] = useState("");
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const [opened, setOpened] = useState(false);
  const [adata, setData] = useState<Data[]>([]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     filterData(data,search);
  //   };

  //Get all Items records from the database
  const getAllItems = async () => {
    const response = await BatteryAPI.getAllItems();
    const data = await response.data;
    return data;
  };

  //declare add form
  const addForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      stock_id: "",
      quantity: "",
      added_data: "",
      warnty_priod: "",
      sellingPrice: "",
      actualPrice: "",
      batry_brand: "",
      Battery_description: "",
    },

  });

  //add Items
  const addItems = async (values: {
    stock_id: string;
    quantity: string;
    added_data: string;
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
          title: "Items added successfully",
          message: "Items data added successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        addForm.reset();
        setOpened(false);
        const newData = [
          ...data,
          {
            _id: response.data._id,
            stock_id: response.data.stock_id,
            batry_brand: values.batry_brand,
            actualPrice: values.actualPrice,
            sellingPrice: values.sellingPrice,
            Battery_description: values.Battery_description,
            quantity: values.quantity,
            warnty_priod: values.warnty_priod,
            added_data: values.added_data,
          },
        ];
        setData(newData);

      })
      .catch((error) => {
        updateNotification({
          id: "add-items",
          color: "red",
          title: "Items Adding failed",
          message: "We were unable to add the Items",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });

      })
  }

  const data = [
    {
      _id: "1",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "asdadada",
    },
    {
      _id: "2",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "3",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "4",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "5",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "6",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "7",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "8",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "9",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "0",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "11",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "12",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "13",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "14",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
    {
      _id: "15",
      stock_id: "asdadada",
      quantity: "asdadada",
      added_data: "asdadada",
      warnty_priod: "asdadada",
      sellingPrice: "asdadada",
      actualPrice: "asdadada",
      batry_brand: "asdadada",
      Battery_description: "adasdasda",
    },
  ];
  // rows map
  const rows = data?.map((row) => (
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
        <Text size={15}>{row.actualPrice}</Text>
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
              {/* edit button */}
              <Tooltip label="Edit stock">
                <ActionIcon color="teal">
                  <IconEdit size={30} />
                </ActionIcon>
              </Tooltip>

              {/* delete button */}
              <Tooltip label="Delete stock">
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

  // table
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Modal
        opened={opened}
        onClose={() => {
          addForm.reset();
          setOpened(false);
        }}
        title="Add Items Record"
      >
        <form onSubmit={addForm.onSubmit((values) => addItems(values))}>
          <TextInput
            label="Enter ID"
            placeholder="Enter ID"
            {...addForm.getInputProps("stock_id")}
            required
          />
          <TextInput
            label="batry_brand"
            placeholder="Enter Brand name"
            {...addForm.getInputProps("batry_brand")}
            required
          />
          <TextInput
            label="Battery_description"
            placeholder="Enter Battery Description"
            {...addForm.getInputProps("Battery_description")}
            required
          />
          <TextInput
            label="quantity"
            placeholder="Enter Battery quantity"
            {...addForm.getInputProps("quantity")}
            required
          />
          <TextInput
            label="actualPrice"
            placeholder="Enter actualPrice of a Battery"
            {...addForm.getInputProps("actualPrice")}
            required
          />
          <TextInput
            label="sellingPrice"
            placeholder="Enter sellingPrice of a battery"
            {...addForm.getInputProps("sellingPrice")}
            required
          />
          <TextInput
            label="added_data"
            placeholder="Enter added date"
            {...addForm.getInputProps("added_data")}
            required
          />
          <TextInput
            label="warnty_priod"
            placeholder="Enter warnty priod"
            {...addForm.getInputProps("warnty_priod")}
            required
          />
          <Button
            color="blue"
            sx={{ marginTop: "10px", width: "100%" }}
            type="submit"
          >
            Add
          </Button>
        </form>
      </Modal>


      <div>
        <Button leftIcon={<IconPlus size={20} />} style={{ position: "fixed", left: 1400 }} onClick={() => setOpened(true)}>
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
                <th>Actual Price</th>
                <th>Selling Price</th>
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
    </Box>
  );
};

export default ManageStocks;
