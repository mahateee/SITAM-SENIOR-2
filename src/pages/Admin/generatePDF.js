import jsPDF from 'jspdf';

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

  // Save the PDF and trigger download
  doc.save('Asset Information.pdf');
}

export default generatePDF;

