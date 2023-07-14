import { Button, Card, Group, Image, Text } from "@mantine/core";
import Admin from "../../assets/admin.png";

const AdminLogin = () => {
  return (
    <Card shadow="lg" withBorder padding={"lg"} radius="md" w={300}>
      <Card.Section withBorder>
        <Group position="center" m={10}>
          <Image src={Admin} alt="Admin photo" height={100} width={100} />
        </Group>
      </Card.Section>
      <Card.Section inheritPadding>
        <Text weight={400} p={20} style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto illum
          nihil animi quisquam minima? Voluptas beatae vero omnis necessitatibus
          culpa numquam animi accusamus rerum similique voluptatum. Laborum
          nobis sequi veniam?
        </Text>
      </Card.Section>
      <Card.Section>
        <Group position="center" grow m={10}>
          <Button color="blue" p={10} component="a" href="/login/admin">
            Admin Login
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default AdminLogin;
