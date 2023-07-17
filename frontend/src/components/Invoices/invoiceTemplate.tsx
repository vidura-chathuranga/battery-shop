import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Box, Group, Text, Button, Table, Image } from "@mantine/core";
import logo from "../../assets/shopLogo.png";

const InvoiceTemplate = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box ref={componentRef} p={30}>
      <Group position="left">
        <Image src={logo} width={170} height={50} />
      </Group>
    
      <Text size="md" weight={500} align="right" mb={-20}>
        Shop Name
      </Text>
      <br />
      <Text size="sm" align="right" mb={-20}>
        Malabe,Colombo
      </Text>
      <br />
      <Text size="sm" align="right" mb={-20}>
        shopname@gmail.com
      </Text>
      <br />
      <Text size="sm" align="right">
        011-1234567
      </Text>
      <br />

      <Text size="md" weight={500} align="left" mb={-20}>
        Customer Name
      </Text>
      <br />
      <Text size="sm" align="left" mb={-20}>
        Cus Phone
      </Text>
      <br />
      <Text size="sm" align="left" mb={-20}>
        Cus Address
      </Text>
      <br />

      <Table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Warranty</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total price</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>

      <Button onClick={handlePrint}>Print</Button>
    </Box>
  );
};

export default InvoiceTemplate;
