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
  // const [data, setData] = useState<Data[]>([]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     filterData(data,search);
  //   };

  const data = [
    {
      _id: "001",
      stock_id: "ST001",
      quantity: "4",
      added_data: "test",
      warnty_priod: "test",
      sellingPrice: "test",
      actualPrice: "test",
      batry_brand: "test",
      Battery_description: "test",
    },
    {
      _id: "002",
      stock_id: "ST002",
      quantity: "1",
      added_data: "test",
      warnty_priod: "test",
      sellingPrice: "test",
      actualPrice: "test",
      batry_brand: "test",
      Battery_description: "test",
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
              <Button type="submit"   style={{ width: "90px" }} >
                   Accept
                </Button>

              {/* Reject Button */}
               <Button type="submit" color="red" style={{ width: "90px" }}>
               
                   Reject
               
                </Button>
            </Group>
          </>
        }
      </td>
   
    </tr>
  ));

  // table
  return (
    <div>

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
