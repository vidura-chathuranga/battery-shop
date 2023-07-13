import {Group } from "@mantine/core";
import WorkerLogin from "../../components/workerLogin";
import AdminLogin from "../../components/adminLogin";

const LoginPage = () => {
  return (
    <div >
      <Group position="center" m={30} spacing={"lg"}>
        <AdminLogin />
        <WorkerLogin />
      </Group>
    </div>
  );
};

export default LoginPage;
