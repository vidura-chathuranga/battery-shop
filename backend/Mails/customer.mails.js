import mailgen from "mailgen";
import { mailConfigs } from "../configs/nodeMailer.config";
import 'dotenv/config';

export const sendInvoiceMail = async(cusName,cusEmail,invoice)=>{

    //import mail configs
    let mailTransporter = mailConfigs.mailConfigs();

    let MailGenerator = new mailgen({
        theme : "cerberus",
        product: {
            name: "Battery shop name",
            link: 'http://localhost:3000/',
            logo: 'https://drive.google.com/file/d/1iediwMBZTLS9fS4vkezgULwzUcTAA0fe/view?usp=drive_link'
        }


    });

    var emaiil = {
        body: {
            name: `${cusName}`,
            intro : `Here your invoice`,
            table : {
                data:[{
                    brand: ``,
                },
                ]
            }
        }
    }
};

module.export = {
    sendInvoiceMail,
}
