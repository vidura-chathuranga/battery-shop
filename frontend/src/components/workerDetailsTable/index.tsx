import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons-react';
  
  interface UsersTableProps {
    data: { name: string; nic: string; email: string; gender:string; address: string; phone: string }[];
  }
  

  export function WorkerTable({ data }: UsersTableProps) {
    const theme = useMantineTheme();
   
    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.nic}
          </Anchor>
        </td>

        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>

        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.gender}
            </Text>
          </Group>
        </td>


  
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.address}
            </Text>
          </Group>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.phone}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>

     
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm" >
          <thead>
            <tr>
              <th>Employee</th>
              <th>NIC NO</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  }