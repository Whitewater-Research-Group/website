import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";



const PersonalizedInvitation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-orange-700">
    <div className="max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl font-semibold mb-4">
          White Water Research Group
        </h1>
        <h2 className="text-2xl font-bold text-yellow-400">
          Annual Conference 2024
        </h2>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-black">
            Enter Name & Addresses in the fields below
          </h3>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label 
                htmlFor="addressLine1" 
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Address Line 1
              </label>
              <input
                id="addressLine1"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your primary address"
              />
            </div>

            <div>
              <label 
                htmlFor="addressLine2" 
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Address Line 2
              </label>
              <input
                id="addressLine2"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter additional address details"
              />
            </div>
          </div>

          <button 
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 ease-in-out"
          >
            Download Invitation Letter
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Powered by White Water Digital Solutions
          </p>
        </form>
      </div>
    </div>
  </div>
  );
};

export default PersonalizedInvitation;




const PDFDownloadButton = () => {
  const handleDownload = async () => {
    // Load the iframe
    const iframe = document.createElement('iframe');
    iframe.src = '/pdf/1.html';
    iframe.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 210mm; /* A4 width */
      height: 297mm; /* A4 height */
      border: none;
    `;
    document.body.appendChild(iframe);

    // Wait for the iframe to load
    await new Promise((resolve) => {
      iframe.onload = resolve;
    });

    // Capture the iframe content as an image
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Use `html2canvas` to render the entire iframe body
    const canvas = await html2canvas(iframeDocument.body, {
      scale: 2, // Improves image quality
      useCORS: true, // Ensures cross-origin resources are captured
      logging: false // Optional: suppress logs from html2canvas
    });

    // Convert the canvas to a data URL for the PDF
    const imgData = canvas.toDataURL('image/png');

    // Initialize jsPDF and add the image
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth; // Fit image to page width
    const imgHeight = (canvas.height * pageWidth) / canvas.width; // Maintain aspect ratio

    if (imgHeight <= pageHeight) {
      // If the image fits on one page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // If the image is too tall, split across pages
      let y = 0;
      while (y < imgHeight) {
        pdf.addImage(imgData, 'PNG', 0, -y, imgWidth, imgHeight);
        y += pageHeight;
        if (y < imgHeight) pdf.addPage();
      }
    }

    // Save the PDF
    pdf.save('document.pdf');

    // Clean up the iframe
    document.body.removeChild(iframe);
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        padding: '8px 16px',
        fontSize: '16px',
        cursor: 'pointer'
      }}
    >
      Download PDF
    </button>
  );
};
const PrintButton = () => {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
            .content {
              width: 210mm;
              height: 297mm;
              overflow: hidden;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <div class="content">
            <iframe src="/example.html"></iframe>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <button onClick={handlePrint}>
      Print
    </button>
  );
};


const DownloadPDFButton = () => {
  const handleDownload = () => {
    // Select the content to render into the PDF
    const content = document.querySelector('.content');

    if (content) {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Convert the iframe's content to an image
      html2canvas(document.querySelector('iframe'), {
        onrendered: (canvas) => {
          const imgData = canvas.toDataURL('image/png');

          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 10, 10, 100, 100);

          // Save the PDF after rendering
          pdf.save('document.pdf');
        },
      });
    } else {
      console.error('Content not found for rendering PDF.');
    }
  };

  return (
    <div>
      {/* Example of content to render into the PDF */}
      <div
        className="content"
        style={{
          width: '100%',
          height: '100vh',
          margin: 'start',
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
        }}
      >
          {/* Removed theiframe */}
      </div>

      {/* Button to trigger the download */}
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};