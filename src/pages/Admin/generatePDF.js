import jsPDF from 'jspdf';
// import 'jspdf-autotable'; //npm instal jspdf-autotable --force

function generatePDF(asset, employee) {
  const doc = new jsPDF();
  let yPosition = 10; // Initial Y position

  // Add content to the PDF using doc.text()
  doc.text(10, yPosition, `Asset Name: ${asset.name}`);
  yPosition += 10; // Increment Y position for the next line

  doc.text(10, yPosition, `Asset ID: ${asset.AssetID}`);
  yPosition += 10;

  doc.text(10, yPosition, `Asset Status: ${asset.Status}`);
  yPosition += 10;

  doc.text(10, yPosition, `Asset Serial Number: ${asset.SerialNumber}`);
  yPosition += 10;

  doc.text(10, yPosition, `Asset Model: ${asset.Model}`);
  yPosition += 10;

  doc.text(10, yPosition, `Insertion Date: ${asset.date}`);
  yPosition += 10;

  doc.text(10, yPosition, `Asset Brand: ${asset.Brand}`);
  yPosition += 10;

  doc.text(10, yPosition, `Operating System: ${asset.os}`);
  yPosition += 10;

  doc.text(10, yPosition, `Description: ${asset.description}`);
  yPosition += 10;

  // let yPosition = 20; // Initial Y position for the top of the page

  // // Set up some styling options
  // doc.setFont('helvetica');
  // doc.setFontSize(12);

  // // Calculate the center position for the title
  // const titleWidth = doc.getStringUnitWidth('Asset Information') * 12; // 12 is the font size
  // const pageWidth = doc.internal.pageSize.getWidth();
  // const titleX = (pageWidth - titleWidth) / 2;

  // // Title
  // doc.text(titleX, yPosition, 'Asset Information');
  // yPosition += 20; // Increase Y position for the title

  // // Asset Details
  // const assetDetails = [
  //   { label: 'Asset Name', value: asset.name },
  //   { label: 'Asset ID', value: asset.AssetID },
  //   { label: 'Asset Status', value: asset.Status },
  //   { label: 'Asset Serial Number', value: asset.SerialNumber },
  //   { label: 'Asset Model', value: asset.Model },
  //   { label: 'Insertion Date', value: asset.date },
  //   { label: 'Asset Brand', value: asset.Brand },
  //   { label: 'Operating System', value: asset.os },
  //   { label: 'Description', value: asset.description },
  // ];

  // // Create a table for asset details
  // doc.autoTable({
  //   startY: yPosition,
  //   head: [['Label', 'Value']],
  //   body: assetDetails.map(detail => [detail.label, detail.value]),
  //   margin: { left: 20 },
  //   theme: 'plain',
  // });

  // Save the PDF and trigger download
  doc.save('Asset Information.pdf');
}
export default generatePDF;

