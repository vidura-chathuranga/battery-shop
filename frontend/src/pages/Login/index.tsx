import { Group, Paper } from "@mantine/core";
import WorkerLogin from "../../components/workerLogin";
import AdminLogin from "../../components/adminLogin";

const LoginPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Group position="center" mt={250} spacing={100}>
          <AdminLogin />
          <WorkerLogin />
      </Group>
    </div>
  );
};

export default LoginPage;
