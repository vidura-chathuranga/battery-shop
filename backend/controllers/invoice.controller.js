import Invoice from "../models/invoice.model.js";

//generate Invoice Id
const generateInvoiceId = async () => {
  //get last stock object, if there is a battery, then return that battery object, otherwise return empty array
  const lastInvoiceDetails = await Invoice.find().sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first invoice ID
  if (lastInvoiceDetails.length == 0) {
    return "INVC-1";
  }

  //if array is not null, last get last invoice Id
  const invoiceId = lastInvoiceDetails.map((data) => {
    return data.invoice_id;
  });

  //then we get the Integer value from the last part of the ID
  const oldInvoiceId = parseInt(invoiceId[0].split("-")[1]);

  const newInvoiceId = oldInvoiceId + 1; //then we add 1 to the past value

  return `INVC-${newInvoiceId}`; //return new invoice ID
};

export const addInvoice = async (req, res) => {
  // generate the custom Invoice Id
  const customInvoiceID = await generateInvoiceId();
  try {
    // create the Invoice Object
    const invoice = new Invoice({
      issuedDate: req.body.issuedDate,
      invoice_id: customInvoiceID,
      cusName: req.body.cusName,
      cusPhone: req.body.cusPhone,
      cusAddress: req.body.cusAddress,
      items: req.body.items,
      discount: req.body.discount,
      totalActualPrice: req.body.totalActualPrice,
      totalSoldPrice: req.body.totalSoldPrice,
    });

    // store the invoice Object in the datasase
    const savedInvoice = await invoice.save();

    // send The success status to the frontend
    res.status(201).json(savedInvoice);

  } catch (error) {
    res.status(500).json({error: error,message : "Invoice saved failed!"});//if anything went wrong this error response will forwarded
  }
};