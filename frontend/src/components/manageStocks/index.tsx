import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  rem,
  ActionIcon,
  Tooltip,
  Button,
  Textarea,
  Box,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconX, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { DateInput } from '@mantine/dates';

import BatteryAPI from "../../API/batteryAPI/battery.api";
import { useQuery } from '@tanstack/react-query';


// styles
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
  added_date: string;
  warnty_period: string;
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
  // const [adata, setData] = useState<Data[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [date, setDate] = useState<Date | null>(null);


  // use react query and fetch data
  const { data, isLoading, isError, refetch } = useQuery(["stockData"], () => {
    return BatteryAPI.getAllItems().then((res) => res.data)
  })



  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     filterData(data,search);
  //   };



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


  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      _id: "",
      stock_id: "",
      quantity: "",
      added_date: new Date(),
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

  //update Item  function
  const updateItem = async (values: {
    _id: string,
    stock_id: string,
    quantity: string;
    added_date: Date;
    warnty_priod: String;
    sellingPrice: string;
    actualPrice: string;
    batry_brand: string;
    Battery_description: string;

  }) => {
    showNotification({
      id: "update-items",
      loading: true,
      title: "Updating Items record",
      message: "Please wait while we update Items record..",
      autoClose: false,
    });
    BatteryAPI.updateBattery(values)
      .then((response) => {
        updateNotification({
          id: "update-items",
          color: "teal",
          icon: <IconCheck />,
          title: "Items updated successfully",
          message: "Items data updated successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        editForm.reset();
        setEditOpened(false);

        //getting updated items from database
        refetch();

      }).catch((error) => {
        updateNotification({
          id: "update-items",
          color: "red",
          title: "Items updatimg failed",
          icon: <IconX />,
          message: "We were unable to update the Items",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });


  }

  // delete Stock function
  const deleteSpecificStock = (stockId: string, reason: string) => {
    console.log(stockId, reason);
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
  const rows = data?.map((row: any) => (
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
              {/* edit button */}
              <Tooltip label="Edit stock">
                <ActionIcon
                  color="teal"
                  onClick={() => {
                    editForm.setValues({
                      _id: row._id,
                      stock_id: row.stock_id,
                      Battery_description: row.batteryDescription,
                      batry_brand : row.batteryBrand,
                      actualPrice: row.actualPrice,
                      sellingPrice: row.sellingPrice,
                      quantity: row.quantity,
                      added_date: new Date(row.added_date),
                      warnty_priod: row.warranty,
                    });
                    setEditOpened(true);
                  }}
                >
                  <IconEdit size={30} />
                </ActionIcon>
              </Tooltip>

              {/* delete button */}
              <Tooltip label="Delete stock">
                <ActionIcon
                  color="red"
                  onClick={() => {
                    deleteForm.setValues({
                      _id: row._id,
                      stock_id: row.stock_id,
                    });
                    setDeleteOpen(true);
                  }}
                >
                  <IconTrash size={30} />
                </ActionIcon>
              </Tooltip>
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
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

      {/* // delete modal */}
      <Modal
        opened={deleteOpen}
        centered
        onClose={() => {
          addForm.reset();
          setDeleteOpen(false);
        }}
        title="Delete Stock"
      >
        <Box>
          <Text size={"sm"} mb={10}>
            Are you sure you want to delete this stock? This action cannot be
            undone!
          </Text>
          <form
            onSubmit={deleteForm.onSubmit((values) => {
              console.log(values);
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
                No I don't delete it
              </Button>
              <Button color="red" type="submit" leftIcon={<IconTrash size={16} />}>
                Delete it
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

      {/* stock add Modal */}
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
            label="Battery brand"
            placeholder="Enter Brand name"
            {...addForm.getInputProps("batry_brand")}
            required
          />
          <TextInput
            label="Battery description"
            placeholder="Enter Battery Description"
            {...addForm.getInputProps("Battery_description")}
            required
          />
          <TextInput
            label="Quantity"
            placeholder="Enter Battery quantity"
            {...addForm.getInputProps("quantity")}
            required
          />
          <TextInput
            label="Actual Price"
            placeholder="Enter Actual Price of a Battery"
            {...addForm.getInputProps("actualPrice")}
            required
          />
          <TextInput
            label="Selling Price"
            placeholder="Enter Selling Price of a battery"
            {...addForm.getInputProps("sellingPrice")}
            required
          />
          <DateInput
            placeholder="Adding date"
            label="Adding date"
            valueFormat="YYYY MMM DD"
            withAsterisk
            {...addForm.getInputProps("added_date")}
          />
          <TextInput
            label="Warnty priod(In years)"
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

      {/* items update model */}
      <Modal
        opened={editOpened}
        onClose={() => {
          editForm.reset();
          setEditOpened(false);
        }}
        title="Update Item Record"

      >
        <form onSubmit={editForm.onSubmit((values) => updateItem(values))}>
          <TextInput
            withAsterisk
            label="Stock ID"
            required
            disabled
            {...editForm.getInputProps("stock_id")}
          />
          <TextInput
            label="Battery brand"
            placeholder="Enter Brand name"
            {...editForm.getInputProps("batry_brand")}
            required
          />
          <TextInput
            label="Battery description"
            placeholder="Enter Battery Description"
            {...editForm.getInputProps("Battery_description")}
            required
          />
          <TextInput
            label="Quantity"
            placeholder="Enter Battery quantity"
            {...editForm.getInputProps("quantity")}
            required
          />
          <TextInput
            label="Actual Price"
            placeholder="Enter actual Price of a Battery"
            {...editForm.getInputProps("actualPrice")}
            required
          />
          <TextInput
            label="Selling Price"
            placeholder="Enter selling Price of a battery"
            {...editForm.getInputProps("sellingPrice")}
            required
          />
           <DateInput
            placeholder="Added date"
            label="Added date"
            valueFormat="YYYY MMM DD"
            withAsterisk
            {...editForm.getInputProps("added_date")}

          />
          <TextInput
            label="warnty priod"
            placeholder="Enter warnty priod"
            {...editForm.getInputProps("warnty_priod")}
            required
          />
          <Button
            color="blue"
            sx={{ marginTop: "10px", width: "100%" }}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Modal>
      <div>
        <Button
          leftIcon={<IconPlus size={20} />}
          style={{ position: "fixed", left: 1400, top: "130px" }}
          onClick={() => setOpened(true)}
        >
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
                <th>Selling Price</th>
                <th>Added_Date</th>
                <th>Warranty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows?.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td>
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
