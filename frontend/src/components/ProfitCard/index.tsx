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
  Center,
} from "@mantine/core";
import AdminDashboardHeader from "../adminDashboardHeader";
import InvoiceAPI from "../../API/InvoiceAPI/Invoice.api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import profitImage from "../../assets/profit.png";
import BarryImage from "../../assets/BattaryImage.png";
import Chart from "../profitChart/chart";
import { MonthPickerInput } from "@mantine/dates";
import WeekProfitChart from "../Charts/weekProfitChart";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 9,
    fontSize: rem(50), // Increase the font size of the label
  },

  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  // Styles for the Card components
  customCard: {
    padding: theme.spacing.xl, // Adjust the padding as needed to increase the card size
    borderRadius: theme.radius.md,
    width: "500px", // Set a fixed width for the cards or adjust as per your requirement
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

  monthInput: {
    maxWidth: 200,
    width: "100%",
    justifyContent: "center",
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

// Helper function to check if a date is within the last 7 days from the selected date
function isWithinLast7Days(selectedDate: any, targetDate: any) {
  const sevenDaysAgo = new Date(selectedDate);
  sevenDaysAgo.setDate(selectedDate.getDate() - 7);
  return targetDate >= sevenDaysAgo && targetDate <= selectedDate;
}

function isWithinMonth(selectedDate: any, targetDate: any) {
  const startOfMonth = new Date(selectedDate);
  startOfMonth.setDate(1); // Set the date to the 1st day of the month
  const endOfMonth = new Date(selectedDate);
  endOfMonth.setMonth(selectedDate.getMonth() + 1, 0); // Set the date to the last day of the month
  return targetDate >= startOfMonth && targetDate <= endOfMonth;
}

// generate random colors for charts not too close to white
const getRandomRGBColor = () => {
  const r = Math.floor(Math.random() * 206) + 50; // Random value between 50 and 255 for red
  const g = Math.floor(Math.random() * 206) + 50; // Random value between 50 and 255 for green
  const b = Math.floor(Math.random() * 206) + 50; // Random value between 50 and 255 for blue
  return `rgb(${r}, ${g}, ${b})`;
};

// title, completed, total, stats
export function StatsProfitCard() {
  const { classes } = useStyles();
  const [profit, setProfit] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [weekProfit, setWeekProfit] = useState(0);
  const [weekItemCount, setWeekItemCount] = useState(0);
  const [monthItemCount, setMonthItemCount] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);
  const [value, setValue] = useState<Date | null>(null);
  const [weekProfitData, setWeekProfitData] = useState({
    labels: [""],
    datasets: [
      {
        label: "Weekly Profit(Rs)",
        data: [0],
        borderColor: getRandomRGBColor(),
        backgroundColor: getRandomRGBColor(),
      },
    ],
  });

  // format number to SL rupee
  let rupee = new Intl.NumberFormat("ta-LK", {
    style: "currency",
    currency: "LKR",
  });

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

  const generateChartData = (selectedDate: any) => {
    //generating the labels
    const currrentDate = new Date(selectedDate); //convert selected date into date object
    let lastDay = new Date();

    lastDay.setDate(currrentDate.getDate() - 7); // set lastday date as 7 day ago date

    let chartData: any = []; // defining the chart data array
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // looping 8 times to generate the structure of the chart data and generate the chart labels
    for (let i = 0; i < 8; i++) {
      chartData.push({
        label: `${weekDays[lastDay.getDay()]}-${lastDay.getDate()}`,
        profit: 0,
      });
      lastDay.setDate(lastDay.getDate() + 1);
    }

    // again reset the lastDay value
    lastDay.setDate(currrentDate.getDate() - 7);

    // looping through the invoice data and calculating total profit for each day
    data?.map((invoice: any) => {
      const issuedDate = new Date(invoice.issuedDate); //converting the invoice issued date into date object

      if (issuedDate >= lastDay && issuedDate <= currrentDate) {
        // comparing the issued date inbetween the selected week

        // if YES, then calculate the total profit of the particular date
        const updateChartData = chartData.map((dayData: any) => {
          const labelDate = dayData.label.split("-")[1];
          if (labelDate === issuedDate.getDate().toString()) {
            return {
              ...dayData,
              profit:
                dayData.profit +
                (parseFloat(invoice.totalSoldPrice) -
                  parseFloat(invoice.totalActualPrice)),
            };
          } else {
            return dayData;
          }
        });
        chartData = updateChartData; // then reassign the updated data into the chartData variable
      }
    });

    const newChartData = {
      ...weekProfitData,
      labels: chartData.map((day: any) => day.label),
      datasets: [
        {
          ...weekProfitData.datasets[0],
          data: chartData.map((day: any) => day.profit),
          borderColor: getRandomRGBColor(),
          backgroundColor: getRandomRGBColor(),
        },
      ],
    };

    // console.log(newChartData);
    setWeekProfitData(newChartData);
  };

  // Calculate last 7 days profit and item count
  const calculateLast7DaysProfitAndItemCount = (selectedDate: any) => {
    setWeekProfit(0);
    setWeekItemCount(0);

    data?.forEach((invoice: any) => {
      const issuedDate = new Date(invoice.issuedDate);

      if (isWithinLast7Days(selectedDate, issuedDate)) {
        setWeekProfit(
          (prev) => prev + invoice.totalSoldPrice - invoice.totalActualPrice
        );

        invoice.items.forEach((items: any) => {
          setWeekItemCount((prev) => prev + items.quantity);
        });
      }
    });

    // generateChartData
    generateChartData(selectedDate);
  };

  // Calculate Monthly Profit
  const calculateMonthlyProfitAndItemCount = (date: Date) => {
    setMonthProfit(0);
    setMonthItemCount(0);

    data?.forEach((invoice: any) => {
      const issuedDate = new Date(invoice.issuedDate);

      if (isWithinMonth(date, issuedDate)) {
        setMonthProfit(
          (prev) => prev + invoice.totalSoldPrice - invoice.totalActualPrice
        );

        invoice.items.forEach((items: any) => {
          setMonthItemCount((prev) => prev + items.quantity);
        });
      }
    });
  };

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
            width: "500px",
            borderRadius: "25px",
          }}
        />
      </div>

      <div className={classes.cardsContainer}>
        <Group position="center" spacing={"lg"}>
          {/* Apply the customCard style to the first Card */}
          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
          >
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
            <Text weight={600} size={20} color="blue">
              <center> Rs.{profit}</center>
            </Text>
          </Card>

          {/* Apply the customCard style to the second Card */}
          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
          >
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
            <Text weight={600} size={20} color="blue">
              <center>{itemCount}</center>
            </Text>
          </Card>

          {/* Apply the customCard style to the Third Card */}
          {/* Calculate weekly profit and item count */}
          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
            style={{ height: "430px" }}
          >
            <Text weight={500} size={30}>
              <center>WEEKLY PROFIT & ITEM COUNT</center>
            </Text>
            <div className={classes.dateInputContainer}>
              <DateInput
                className={classes.dateInput}
                placeholder="Choose Date"
                label="Choose Date to view profit"
                valueFormat="YYYY MMM DD"
                withAsterisk
                size="xs"
                onChange={calculateLast7DaysProfitAndItemCount} // Update the onChange function to the new one
                style={{
                  width: "500px",
                  borderRadius: "25px",
                }}
              />
            </div>

            {weekItemCount === 0 && weekProfit === 0 ? (
              <Text weight={600} size={20} color="red">
                <center>No data</center>
              </Text>
            ) : (
              <Text weight={600} size={20} color="blue">
                <center>Item Count - {weekItemCount}</center>
                <center> Rs.{weekProfit}</center>
              </Text>
            )}
          </Card>

          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
            style={{ height: "430px" }}
          >
            <Text weight={500} size={30} mb={40}>
              <center>WEEKLY PROFIT</center>
            </Text>
            <WeekProfitChart profitData={weekProfitData} />
          </Card>
          {/* Apply the customCard style to the Third Card */}
          {/* Calculate weekly profit and item count */}
          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
            style={{ height: "430px" }}
          >
            <div className={classes.dateInputContainer}>
              <MonthPickerInput
                className={classes.dateInput}
                placeholder="Choose a Month"
                label="Choose a Month to view profit"
                valueFormat="YYYY MMM DD"
                withAsterisk
                onChange={calculateMonthlyProfitAndItemCount} // Update the onChange function to the new one
                style={{
                  width: "500px",
                  borderRadius: "25px",
                }}
              />
            </div>

            <Text weight={500} size={30}>
              <center>MONTHLY PROFIT & ITEM COUNT</center>
            </Text>

            {monthItemCount === 0 && monthProfit === 0 ? (
              <Text weight={600} size={20} color="red">
                <center>No data</center>
              </Text>
            ) : (
              <Text weight={600} size={20} color="blue">
                <center>Item Count - {monthItemCount}</center>
                <center> Rs.{monthProfit}</center>
              </Text>
            )}
          </Card>
          <Card
            className={classes.customCard}
            shadow="sm"
            radius="md"
            withBorder
            style={{ height: "430px" }}
          >
            <Text weight={500} size={30} mb={40}>
              <center>WEEKLY PROFIT</center>
            </Text>
            <WeekProfitChart profitData={weekProfitData} />
          </Card>
        </Group>
      </div>
    </>
  );
}

export default StatsProfitCard;
