import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import InvoiceRender from "../../components/InvoiceRender/invoice";

const GenerateInvoicePage = () =>{
    return(
        <div>
            <WorkerDashboardHeader link_id={2}/>
            <InvoiceRender/>
        </div>
        

    );
};


export default GenerateInvoicePage;