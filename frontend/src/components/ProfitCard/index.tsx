import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  rem,
  Image,
  Badge,
  Button,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import AdminDashboardHeader from "../adminDashboardHeader";
import InvoiceAPI from "../../API/InvoiceAPI/Invoice.api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import profitImage from "../../assets/profit.png"
import BarryImage from "../../assets/BattaryImage.png"


const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1,
    fontSize: rem(50), // Increase the font size of the label
  },

  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl ,
  },
  // Styles for the Card components
  customCard: {
    padding: theme.spacing.xl, // Adjust the padding as needed to increase the card size
    borderRadius: theme.radius.md,
    width: '400px', // Set a fixed width for the cards or adjust as per your requirement
  },

  dateInputContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xs,
  },
  dateInput: {
    maxWidth: 400,
    width: "100%",
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },


  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan("xs")]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

// title, completed, total, stats
export function StatsProfitCard() {
  const { classes } = useStyles();
  const [profit, setProfit] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // use react query and fetch data
  const { data, isLoading, isError } = useQuery(["invoiceData"], () => {
    return InvoiceAPI.getAllInvoice().then((res) => res.data);
  });

  // if data is fetching this overalay will be shows to the user
  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }

  if (isError) {
    showNotification({
      title: "Cannot fetching Profit Data",
      message: "check internet connection",
      color: "red",
      icon: <IconX />,
      autoClose: 1500,
    });
  }

  //calculate profit function
  const calculateProfit = (date: Date) => {
    setProfit(0);
    setItemCount(0);

    data?.map((invoice: any) => {
      const issuedDate = new Date(invoice.issuedDate);

      if (
        issuedDate.getDate() === date.getDate() &&
        issuedDate.getMonth() === date.getMonth()
      ) {
        setProfit(
          (prev) => prev + invoice.totalSoldPrice - invoice.totalActualPrice
        );

        invoice?.items.map((items: any) => {
          setItemCount((prev) => prev + items.quantity);
        });
      }
    });
  };

  return (
    <>
    <div className={classes.dateInputContainer}>
        <DateInput
          className={classes.dateInput}
          placeholder="Choose Date"
          label="Choose Date to view profit"
          valueFormat="YYYY MMM DD"
          withAsterisk
          onChange={calculateProfit}
          style={{
            width: '500px', 
            borderRadius: '25px', 
          }}
        />
      </div>

      <div className={classes.cardsContainer}>
        <Group position="apart">
          {/* Apply the customCard style to the first Card */}
          <Card className={classes.customCard} shadow="sm" radius="md" withBorder>
          <center>
              {/* Add an Image inside the center tags */}
              <Image
                src={profitImage} // Replace with the actual image path
                alt="Profit"
                width={100} // Set the width of the image as per your requirement
                height={100} // Set the height of the image as per your requirement
              />
            </center>
            <Text weight={500} size={30}>
              <center>Profit</center>
            </Text>
            <Text size={20} color="dimmed">
             <center> Rs.{profit}</center>
            </Text>
          </Card>

          {/* Apply the customCard style to the second Card */}
          <Card className={classes.customCard} shadow="sm" radius="md" withBorder>
          <center>
              {/* Add an Image inside the center tags */}
              <Image
                src={BarryImage} // Replace with the actual image path
                alt="Profit"
                width={100} // Set the width of the image as per your requirement
                height={100} // Set the height of the image as per your requirement
              />
            </center>
            <Text weight={500} size={30}>
              <center>Sold Items</center>
            </Text>
            <Text size={20} color="dimmed">
            <center>{itemCount}</center>
            </Text>
          </Card>
        </Group>
      </div>
    </>
  );
}

export default StatsProfitCard;
