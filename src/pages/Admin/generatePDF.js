import jsPDF from 'jspdf';
// import 'jspdf-autotable'; //npm instal jspdf-autotable --force

export function generateInformationPDF(asset, employee) {
  const doc = new jsPDF();
  let yPosition = 10; // Initial Y position

  doc.text(10, yPosition, `Asset Information`);
  yPosition += 10;

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

  doc.text(10, yPosition, `Employee Information`);
  yPosition += 10;

  doc.text(10, yPosition, `Employee: ${employee.name + " " + employee.lastname}`);
  yPosition += 10;

  doc.text(10, yPosition, `Department: ${employee.department}`);
  yPosition += 10;

  doc.text(10, yPosition, `Email Address: ${employee.email}`);
  yPosition += 10;

  // Save the PDF and trigger download
  doc.save('Asset Information.pdf');
}


export function generateHistoryPDF(history) {

  console.log(history); // Add this line to check the content of the history data

  
  const doc = new jsPDF();
  let yPosition = 10; // Initial Y position

  doc.text(10, yPosition, 'Asset History');
  yPosition += 10;

  history.forEach((entry) => {
    doc.text(10, yPosition, `Timestamp: ${entry.formattedDate}`);
    yPosition += 10;

    doc.text(10, yPosition, `Asset Status: ${entry.updatedData.Status}`);
    yPosition += 10;

    doc.text(10, yPosition, `Employee Name: ${entry.accountInfo.name}`);
    yPosition += 10;

    // Add some space between entries
    yPosition += 10;
  });

  // Save the PDF and trigger download
  try {
    doc.save('Asset History.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}




