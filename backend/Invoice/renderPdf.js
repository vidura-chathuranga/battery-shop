import pdf from "pdfjs";
import TimesRoman from "pdfjs/font/Times-Roman.js";
import HelveticaBold from "pdfjs/font/Helvetica-Bold.js";
import Helvetica from "pdfjs/font/Helvetica.js";
import logo from "./logo.js";

const fonts = {
  TimesRoman,
  HelveticaBold,
  Helvetica,
};

const renderInvoice = async () => {
  const doc = new pdf.Document({ font: fonts.Helvetica });

  const header = doc
    .header()
    .table({ widths: [null, null], paddingBottom: 0.5 * pdf.cm })
    .row();
  header.cell().image(logo, { height: pdf.cm });
  header
    .cell()
    .text({ fontSize: 14, font: fonts.HelveticaBold, textAlign: "right" })
    .add("INVOICE - 002")
    .br()
    .br()
    .add("STORE NAME")
    .br()
    .add("Malabe, Colombo", { fontSize: 14, font: fonts.TimesRoman })
    .br()
    .add("shop@gmail.com", { fontSize: 14, font: fonts.TimesRoman })
    .br()
    .add("0112345678", { fontSize: 14, font: fonts.TimesRoman });

  doc.footer().pageNumber(
    function (curr, total) {
      return curr + " / " + total;
    },
    { textAlign: "center" }
  );

  // customer details
  const customer = doc.cell({ paddingBottom: 1 * pdf.cm });
  customer.text("CUSTOMER NAME", { fontSize: 14, font: fonts.HelveticaBold });
  customer.text("0712906815", { fontSize: 14, font: fonts.TimesRoman });
  customer.text("Customer Address", { fontSize: 14, font: fonts.TimesRoman });
  customer.text("ISSUED DATE", { fontSize: 14, font: fonts.TimesRoman });

  const table = doc.table({
    widths: [5 * pdf.cm, 2.7 * pdf.cm, 2 * pdf.cm, 5 * pdf.cm, 5 * pdf.cm],
    borderHorizontalWidths: function (i) {
      return i < 2 ? 1 : 0.1;
    },
    padding: 5,
    paddingBottom: 0.5 * pdf.cm,
  });

  const tr = table.header({
    font: fonts.HelveticaBold,
    // borderBottomWidth: 1.5,
  });
  tr.cell("Brand");
  tr.cell("Warranty");
  tr.cell("Quantity", { textAlign: "right" });
  tr.cell("Unit Price", { textAlign: "right" });
  tr.cell("Total Price", { textAlign: "right" });

  function addRow(brand, warranty, unitPrice, qty, totalPrice) {
    const tr = table.row();
    tr.cell(brand);
    tr.cell(warranty);
    tr.cell(qty.toString(), { textAlign: "center" });
    tr.cell("Rs. " + unitPrice.toFixed(2), { textAlign: "right" });

    tr.cell("Rs. " + totalPrice.toFixed(2), { textAlign: "right" });
  }

  addRow("ENERGIZER", "2 YEARS", 5000000, 2, 10000000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);
  addRow("ENERGIZER", "2 YEARS", 5000, 2, 10000);

  const discount = 100;

  const cell = doc.cell({
    paddingBottom: 0.5 * pdf.cm,
    paddingTop: 0.5 * pdf.cm,
  });

  if (discount > 0) {
    cell
      .text("Discount :          ", {
        textAlign: "right",
        fontSize: 15,
        font: fonts.HelveticaBold,
      })
      .add("Rs. " + discount.toFixed(2))
      .br()
      .add("_____________________________________", { fontSize: 10 })
      .br();
  } else {
    cell
      .text("Total:           ", {
        textAlign: "right",
        fontSize: 15,
        font: fonts.HelveticaBold,
      })
      .add("Rs. " + discount.toFixed(2))
      .br()
      .add("_____________________________________", { fontSize: 10 });
  }

  const buf = await doc.asBuffer();
  const blob = new Blob([buf], { type: "application/pdf" });
  return blob;
};
export default renderInvoice;
