import {Group } from "@mantine/core";
import WorkerLogin from "../../components/workerLogin";
import AdminLogin from "../../components/adminLogin";
import backgroundimg from "../../assets/backgroundimg.jpg"

const LoginPage = () => {
  return (
    <div >
       <img src={backgroundimg} alt="Background" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      <Group position="center" m={30} spacing={"lg"}>
        <AdminLogin />
        <WorkerLogin />
      </Group>
    </div>
  );
};

export default LoginPage;
