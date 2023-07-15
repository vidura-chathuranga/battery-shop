import ManageStocks from "../../components/manageStocks";
import AdminDashboardHeader from "../../components/adminDashboardHeader";
import StockTable from "../../components/stock";

const AdminrDashboaord = () => {
  return (
    <div>
      <AdminDashboardHeader link_id = {0}/>
      <StockTable/>
      
    </div>
  );
};

export default AdminrDashboaord;