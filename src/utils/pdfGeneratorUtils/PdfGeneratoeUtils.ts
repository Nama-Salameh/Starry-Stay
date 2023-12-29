import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
const handleSavePdf = (container: string) => {
  const content = document.getElementById(container);
  if (!content) {
    console.error("Page content element not found");
    return;
  }
  html2pdf(content);
};

const handlePrintPdf = (container: string) => {
  const content = document.getElementById(container);

  if (!content) {
    console.error("Page content element not found");
    return;
  }

  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  pdf.html(content, {
    callback: () => {
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
      console.log('Print function executed');
    },
  });
};

export { handlePrintPdf, handleSavePdf };