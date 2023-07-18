import StatsProfitCard from "../../components/ProfitCard";
import AdminDashboardHeader from "../../components/adminDashboardHeader";
import { Grid } from "@mantine/core";

const ProfitPage = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={"content"}>
          <AdminDashboardHeader link_id={1} />
        </Grid.Col>

        <Grid.Col span={"auto"}>
          <center>
            <h1>PROFIT OF THE DAY</h1>
          </center>
            <StatsProfitCard />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProfitPage;
