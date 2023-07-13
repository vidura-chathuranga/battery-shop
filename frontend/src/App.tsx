import { MantineProvider } from "@mantine/core";
import AllRoutes from "./routes";
import { Notifications } from "@mantine/notifications";

const App = () => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications position="top-center" zIndex={2077}/>
        <AllRoutes />
    </MantineProvider>
  );
};

export default App;
