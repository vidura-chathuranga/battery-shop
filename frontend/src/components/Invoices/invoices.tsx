import {
    createStyles,
    Table,
    ScrollArea,
    Text,
    TextInput,
    rem,
    LoadingOverlay,

} from "@mantine/core";
import { keys } from "@mantine/utils";
import {

    IconSearch,
    IconX,
} from "@tabler/icons-react";
import { useState } from "react";

import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import InvoiceAPI from "../../API/cartAPI/Invoice.api";
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
    invoice_id: string;
    phone_number: string;
    cusName: string;
    issued_date: string;
    warnty_priod: String;
    sellingPrice: string;
    batry_brand: string;
    quantity: string;
    totalPrice: string;
}

function filterData(data: Data[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}
const Invoices = () => {

    const [search, setSearch] = useState("");
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [sortedData, setSortedData] = useState<Data[]>([]);


    // use react query and fetch data
    const { data, isLoading, isError, refetch } = useQuery(["invoiceData"], () => {
        return InvoiceAPI.getAllInvoice().then((res) => res.data)
    })

    // search filter
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(filterData(data, value)); //store filtered data in the search state
        if (sortedData.length === data.length) {
            setSortedData([]);
        }
    };

    // rows map
    const rows = data?.map((row: any) => (
        <tr key={row._id}>
            <td>
                <Text size={15}>{row.invoice_id}</Text>
            </td>
            <td>
                <Text size={15}>{row.cusName}</Text>
            </td>
            <td>
                <Text size={15}>{row.batry_brand}</Text>
            </td>
            <td>
                <Text size={15}>{row.warnty_priod}</Text>
            </td>
            <td>
                <Text size={15}>{row.sellingPrice}</Text>
            </td>
            <td>
                <Text size={15}>{row.quantity}</Text>
            </td>
            <td>
                <Text size={15}>{row.totalPrice}</Text>
            </td>
            <td>
                <Text size={15}>{row.phone_number}</Text>
            </td>
            <td>
                <Text size={15}>{new Date(row.issued_date).toLocaleDateString('en-GB').split('T')[0]}</Text>
            </td>


        </tr>
    ));

    // if data is fetching this overalay will be shows to the user
    if (isLoading) {
        return <LoadingOverlay visible={isLoading} overlayBlur={2} />
    }

    if (isError) {
        showNotification({
            title: "Cannot fetching Invoice Data",
            message: "check internet connection",
            color: "red",
            icon: <IconX />,
            autoClose: 1500,
        });
    }

    // table
    return (
        <div>

            {/* search bar */}
            <TextInput
                placeholder="Search by any field"
                mt={50}
                mb={50}
                icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                // onChange={handleSearchChange}
                w={800}
                style={{ position: "relative", left: "50%", translate: "-50%" }}
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
                            <th>Invoice Id</th>
                            <th>Customer Name</th>
                            <th>Brand</th>
                            <th>Warranty</th>
                            <th>Unit Price	</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Phone number</th>
                            <th>Issued Date</th>

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
    );

};

export default Invoices;