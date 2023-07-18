import { createStyles, Text, Card, RingProgress, Group, rem, Image, Badge, Button, LoadingOverlay, Modal } from '@mantine/core';
import AdminDashboardHeader from '../adminDashboardHeader';
import InvoiceAPI from "../../API/InvoiceAPI/Invoice.api"
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import { DateInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';



const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

// title, completed, total, stats
export function StatsProfitCard() {
  const [profit, setProfit] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // use react query and fetch data
  const { data, isLoading, isError } = useQuery(["invoiceData"], () => {
    return InvoiceAPI.getAllInvoice().then((res) => res.data);
  }
  );

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
      const issuedDate = new Date(invoice.issuedDate)

      if (issuedDate.getDate() === date.getDate() && issuedDate.getMonth() === date.getMonth()) {
        setProfit(prev => prev + invoice.totalSoldPrice - invoice.totalActualPrice);
        
        invoice?.items.map((items:any)=>{
          setItemCount(prev=> prev + items.quantity)
        })

      }
    });

  };

  return (

    <>

      <DateInput
        placeholder="Choose Date"
        label="Choose Date to view profit"
        valueFormat="YYYY MMM DD"
        withAsterisk
        onChange={calculateProfit}

      />

      <Group position="apart" mt="md" mb="xs">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={500} size={30}>The profit</Text>
          <Text size={20} color="dimmed">
            Rs.{profit}
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={500} size={30}>The profit</Text>
          <Text size={20} color="dimmed">
            {itemCount}
          </Text>
        </Card>
      </Group>
    </>
  );
}

export default StatsProfitCard;