import mailgen from "mailgen";
import { mailConfigs } from "../configs/nodeMailer.config.js";
import 'dotenv/config';
import { table } from "console";

export const sendInvoiceMail = async (invoice) => {

    //import mail configs
    let mailTransporter = mailConfigs();

    let MailGenerator = new mailgen({
        theme: "cerberus",
        product: {
            name: "Battery shop name",
            link: 'http://localhost:3000/',
            logo: 'https://drive.google.com/file/d/1iediwMBZTLS9fS4vkezgULwzUcTAA0fe/view?usp=drive_link'
        }


    });



    var email = {
        
        body: {
            name: `${invoice.cusName}`,
            intro: `Here your invoice`,
            table: {

                data: [{

                    brand: `${invoice.items.brand}`,
                    warranty: `${invoice.items.warranty}`,
                    price_of_unit: `${invoice.items.price}`,
                    Quantity: `${invoice.items.quantity}`,
                    total_price: `${invoice.items.totalPrice}`,
                    discount: `${invoice.discount}`,
                    amount_to_be_pay: `${invoice.totalSoldPrice}`,

                },
                ]
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    };

    //convert mailgen body into HTML
    let mail = MailGenerator.generate(email);


    //sending credentials
    let details = {
        from: process.env.CLIENT_EMAIL,
        to: `${invoice.cusEmail}`,
        subject: `Invoice`,
        html: mail
    }

    //send mail through nodemailer
    await mailTransporter.sendMail(details).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    })
};

