import jsPDF from 'jspdf';
import logoImage from '../../images/logoNew.png'; // Replace with the actual path to your logo image
export function generateInformationPDF(asset, employee) {
  const doc = new jsPDF();
  let yPosition = 10; // Initial Y position
  doc.addImage(logoImage, 'PNG', 100, 10, 10, 10); 
  yPosition += 20; 

  // Set smaller font sizen
  doc.setFontSize(13);

  // Add header
  doc.setFont('TimesRoman', 'bold');
  doc.text(93, yPosition, 'Asset Report');
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('TimesRoman', 'normal');

  const paragraph = `We are pleased to present the comprehensive Asset Report for {currentdate}. This report serves as an in-depth overview of the assets managed by SITAM, providing valuable insights into the status, utilization, and maintenance history of our valuable resources.`;
  doc.text(30, yPosition, paragraph, { align: 'justify', maxWidth: 150 });
  yPosition += doc.splitTextToSize(paragraph, 150).length * 10; 
  
  // General Asset Information
  doc.setFontSize(12);
  doc.setFont('TimesRoman', 'bold');
  doc.text(10, yPosition, ' General Asset Information:');
  yPosition += 10;
  doc.setFont('TimesRoman', 'normal');
  doc.setFontSize(12);
  doc.text(10, yPosition, `Asset Name: ${asset.name}`);
  yPosition += 10;

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

  // Employee Information
  yPosition += 10; // Add space between sections
  doc.setFont('TimesRoman', 'bold');
  doc.setFontSize(12);
  doc.text(10, yPosition, 'Employee Information');
  yPosition += 10;
  doc.setFont('TimesRoman', 'normal');
  doc.setFontSize(12);
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
  const doc = new jsPDF();
  let yPosition = 10; // Initial Y position

  // Add header
  doc.text(10, yPosition, 'Asset History');
  yPosition += 10;

  // Asset History Entries
  history.forEach((entry) => {
    doc.text(10, yPosition, `Timestamp: ${entry.formattedDate}`);
    yPosition += 10;

    doc.text(10, yPosition, `Asset Status: ${entry.updatedData.Status}`);
    yPosition += 10;

    doc.text(10, yPosition, `Employee Name: ${entry.accountInfo.name}`);
    yPosition += 10;

    // Add space between entries
    yPosition += 10;
  });

  // Save the PDF and trigger download
  try {
    doc.save('Asset History.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}
