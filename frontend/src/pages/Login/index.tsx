import { Group, Paper } from "@mantine/core";
import WorkerLogin from "../../components/workerLogin";
import AdminLogin from "../../components/adminLogin";
import backgroundimg from "../../assets/backgroundimg.jpg"

const LoginPage = () => {
  return (
    <div style={{ height: "100vh" , backgroundImage:`url(${backgroundimg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
      <Group position="center"  spacing={100}>
          <AdminLogin />
          <WorkerLogin />
      </Group>
    </div>
  );
};

export default LoginPage;
