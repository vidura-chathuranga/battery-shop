import easyinvoice from 'easyinvoice';


const InvoiceRender = () => {
    

    var data = {
        "customize": {
            
            //  fs.readFileSync('template.html', 'base64') ,
            
        },
        "images": {
            // The logo on top of your invoice
            "logo": "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",
            // The invoice background
            "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf"
        },
        // Your own data
        "sender": {
            "company": "Sample Battery Company",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Sri Lanka",
            "custom1": "07xxxxxxxx",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        // Your recipient
        "client": {
            "company": "test name",
            "address": "07xxxxxxxx",
            "zip": "4567 CD",
           //"city": "Clientcity",
            //"country": "Clientcountry"
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "information": {
            // Invoice number
            "number": "2021.0001",
            // Invoice data
            "date": "12-12-2021",
            // Invoice due date
            "due-date": "31-12-2021"
        },
        // The products you would like to see on your invoice
        // Total values are being calculated automatically
        "products": [
            {
                "quantity": "2",
                "description": "Product 1",
                "tax-rate": 0,
                "discount":100,

                "price": 5000,
                
            },
            {
                "quantity": "1",
                "description": "Product 2",
                "tax-rate": 0,
                "price": 2000
            },
            {
                "quantity":" 1",
                "description": "Product 3",
                "tax-rate": 0,
                "price": 6000
            }
            
        ],
        // The message you would like to display on the bottom of your invoice
        "bottom-notice": "Thank You...!!",
        // Settings to customize your invoice
        "settings": {
            "currency": "LKR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
             "locale": "en-US", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
            // "margin-top": 25, // Defaults to '25'
            // "margin-right": 25, // Defaults to '25'
            // "margin-left": 25, // Defaults to '25'
            // "margin-bottom": 25, // Defaults to '25'
            // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
            // "height": "1000px", // allowed units: mm, cm, in, px
            // "width": "500px", // allowed units: mm, cm, in, px
            // "orientation": "landscape", // portrait or landscape, defaults to portrait
        },
        // Translate your invoice to your preferred language
        "translate": {
            // "invoice": "FACTUUR",  // Default to 'INVOICE'
            // "number": "Nummer", // Defaults to 'Number'
            // "date": "Datum", // Default to 'Date'
            // "due-date": "Verloopdatum", // Defaults to 'Due Date'
            // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
            // "products": "Producten", // Defaults to 'Products'
            // "quantity": "Aantal", // Default to 'Quantity'
            // "price": "Prijs", // Defaults to 'Price'
            // "product-total": "Totaal", // Defaults to 'Total'
            // "total": "Totaal", // Defaults to 'Total'
            // "vat": "btw" // Defaults to 'vat'
            
        },
    };
    
    easyinvoice.createInvoice(data, function (result) {
        easyinvoice.print(result.pdf);
    });

    return(
        <div>

            
        </div>
    );
};

export default InvoiceRender;