import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Select,
} from "@mantine/core";

const register = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <TextInput label="Phone" placeholder="Enter phone" required mt="md" />

        <TextInput label="NIC" placeholder="Enter phone" required mt="md" />

        <TextInput
          label="Address"
          placeholder="Enter address"
          required
          mt="md"
        />

        <Select
          label="Gender"
          placeholder="Select gender"
          required
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        <Button fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
};

export default register;
