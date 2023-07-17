import WorkerDashboardHeader from "../../components/workerDashboardHeader";
import InvoiceRender from "../../components/Invoices/renderInvoice";
import Invoices from "../../components/Invoices/invoices";

const GenerateInvoicePage = () =>{
    return(
        <div>
            <WorkerDashboardHeader link_id={2}/>
            {/* <InvoiceRender/> */}
            <Invoices/>
        </div>
        

    );
};


export default GenerateInvoicePage;