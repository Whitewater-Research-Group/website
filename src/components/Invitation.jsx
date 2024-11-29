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

      {/* Form Card
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
      </div> */}

      {/* Download Button */}
      <PDFDownloadButton/>
      <DownloadPDFButton/>
      <PrintButton2/>
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


export const PrintButton2 = ({name, address, greeting}) => {


   const handleDownloadPDF = async () => {
    // Prepare the HTML you want to convert
    const htmlContent = `
      
<!DOCTYPE html>
<html>
<head>
<title>WWRG Letter</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<style>
body {padding:0; margin:0; text-align:center; background-color:#777}
.page {margin:5px 0}
.page svg {background-color:#fff}
</style>
</head>
<body>

<div class="page">
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   version="1.1"
   id="svg2"
   width="816"
   height="1056"
   viewBox="0 0 816 1056"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs6">
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath20">
      <path
         d="M 33,36 H 87.75 V 90.75 H 33 Z"
         clip-rule="evenodd"
         id="path18" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath32">
      <path
         d="m 63,657.04657 h 87.75 v 72 H 63 Z"
         clip-rule="evenodd"
         id="path30" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath974">
      <path
         d="M 498,36 H 604.5 V 82.5 H 498 Z"
         clip-rule="evenodd"
         id="path972" />
    </clipPath>
    <mask
       maskUnits="userSpaceOnUse"
       x="0"
       y="0"
       width="1"
       height="1"
       id="mask978">
      <image
         width="1"
         height="1"
         style="image-rendering:optimizeSpeed"
         preserveAspectRatio="none"
         xlink:href="data:image/png;base64,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"
         id="image980" />
    </mask>
  </defs>
  <g
     id="g8"
     transform="matrix(1.3333333,0,0,1.3333333,0,2.64e-5)">
    <g
       id="g10"
       transform="scale(0.75)">
      <path
         d="M 0,0 H 816 V 1056 H 0 Z"
         style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="path12" />
    </g>
    <g
       id="g14">
      <g
         id="g16"
         clip-path="url(#clipPath20)">
        <g
           id="g22"
           transform="matrix(54.75,0,0,-54.75,33,90.75)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,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"
             id="image24" />
        </g>
      </g>
    </g>
    <g
       id="g26">
      <g
         id="g28"
         clip-path="url(#clipPath32)">
        <g
           id="g34"
           transform="matrix(146.0504,0,0,-72,63.000015,729.04657)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAACbCAYAAAD/ayfkAAAABHNCSVQICAgIfAhkiAAACEJJREFUeJzt3Ut2nDoUheGTrDujTMBdjzjdTMBjqtvIIlERARJIOq//a9pJGfTYCCRU316v10sAIIHv2gcAAKsQeADSIPAApEHgAUiDwAOQBoEHIA0CD0AaBB6ANAg8AGkQeADSIPAApEHgAUiDwAOQxn/aB/DUx+dX9ee/fv5YfCQArHMdeB+fX4fBdvY7ADmFvaX99fPH4egPQE5uA69lBEfoASi5DbxWhB6ATfjAEyH0APyWIvBECD0AiQIPAFIFHqM8ILdUgQc8xQXTNwIP6MBidt8IPABppAs8nuMBeaULPAB5EXgA0iDwAKSRLvDYNgrIK13gAciLwAOQBoEHIA3XW7wf2dbZ7Z/V8fwuh3KdJfWNUpjAqzVyGn5cZ4vHy7o+uvghJ9eBdxVoteCDb70Bxps1KLkMPK7a+Typ8y30aC9wFXj7Rk8jzmFEPRN6EHEUeE8aK43dL+oNI7EsBWYRdhjNReDR8POhzjGD+cCj4edDnWMW04FHw8+HOsdMJictRi87YR2WfbOXGhGkEDEYeDTMfKhznzzWm6lb2t4CbFlFzyJl2zx2GvhlJvBo+JiFtjWe1zI1E3jIx2ungV8mAm9Ww+d21i7Czi/PdWci8JDLyg7juXNiPPXAm90gaewANuqB99TRTC1r72xidOeb9zJ1H3hnPFcMIMKFezTVwJs9WQFbGN1BW9gRHo0dGCvCRSRs4MEWRnf9opyHJeECj9tZYLwo4Rsi8PYztREqJhJGd7AiROBtGN0BOBMq8EQY3VmjObrjAjhGpFGzauDxJckYpeyUH59f7jup9+O3ytwGoMBdPMfFlRC3tIwSc9vvikPY4Yh64I26raWR2zT7scV268eXrc8RrUy5pcV0ZeiN7DzbZ7LvIVqZCLwnHSLaFSiqckKh9vMe0Z/V0abnMRF4Iu8dgsqOa1+3d253uX3FXWYCb9PTmJms8K8ntLZ2QditEbGc1SctanoedEerENRF7HxYz2TgiVyHXu13LGSOab+omODDXWYDT4QAQ76wy3COmsw9w9urPbNhGUIcZzOu5TO72u+BXuYDT+Q99PadAPrujEpqIVb+jAkKXVHL3fQtbYmQi6N8O6K0v3WN2umgx03glbx1BIL6r54lR57qGD64C7yjFfsWRdim6MrI84v+BsWV6G3FAjeBt28M2y2PxeArg44G3MbCxITFtqQhcvC6mLQQqXeE/WhPu5KsHMcqT14Lq/18+8ws5Yf13ATeptYh9sG3utNkC7rSnXPez8xmLDfocBd4Z2rLVmZ2psxBN4KlsNM+Fu2/n0WowBP5d6HyjAfhBB0dNKro9Rou8PZGv6ERvUG0GPFwv1aOlC1mczNLK/K8Q5RbgaPfqGU2mcKOtmZL+BFezd1nfNk75Yxz13w8MLM+e84raruyKGXgidhb0qLl7nuwd8vL0u4nM47Dc3vSro8V0gbeZubkRmnEdzlEEq1zeQ66TNIH3mbW9lNHn2Whw2usV4y2KQBB5wuBV3F2u9v7fRvROsLTsIoSdlHrNzoC70Qt+Frf373qCNojHa3RnXejg85KuVg5jtkIvAbRJjgIu35R6j47Aq/D6OBbPcp7etwWg2vlOVk79zMEdB2Bd0N5a+utQa0+3tlldLQ/4si/ab2ez3afwTtXgaf93Kt2LKM+p3ZOI5fKaJTbyr9ZmwU/+30rK+3trK15bBtaXAWeJSMbyVnoPV0nqHVro92JjgLQy5s1rNucw13gWRjlzfj7V+dVWyfY+rkjaJf5U7UR+dk5aZ+v57K2zF3gieiF3uzRUnlereFnkXZYHLFwsYQul4Ensrbxrr4tZIeN+VpHdxaenc3e5CDTBcBt4Ikc73oyKgw1nn95b3yWO1DPsV09M111UbJcnh65DjyR8WvjZm8i4FG0Tnd1PpHOFe/cB96mdgvS0lGZDcvB48YFs4/VU1mMEibwNmXwtayVy1bhGRF2441ag7pauMDbs9xoPLDe8VpFOY9RnpbHyEdHK7n6TgvYN+oNlFG2jm3tVTPNNYDa9aN58SHwnNBupN54fdd5xTF7K5ORwt/SRpG5kfZglv2a5sVT+yLECA+H7jbO1be122iuPF6PYbd6s4XVwacddiKM8DDJ0aLwkY624LfOQscXWf+2koVzJvAwzdOdXmpaPstCx7pj1UVC6x10Cwg8VI3e/qr83LPfn/27o3+7//3M0FixoenKCZfZozxrOy8TeFiqNdyerhHbQuPuMWnaL55f8fdWLYXRLmsCD+pmdIKeTQKsdMY9b2+H1OyPXXsWncDDP7x3sh4az7N6/ubIW/SrPRZXrwHUuNCwLAVopHUhWLnn40oaZRk28Ky94gQ8saI9a4X5yn4aNvAA9MkwQCDwgEW0vwWtZdPTntltjwg8vMk0YYF35a4yUYOPWVoAb45CL8KFkMADHIg6i7r6joLAAxo9Wat25/+NGl3xmOIvAg/owFd2+sakBf5gJICVNNobgQcgDQIPIsLobibL6++yIfAALKcVxAQeGAVMRNnaQuABQVkNW76XFgjIauBo0i6TFIEX8Z3AUbQbIOawVq9Wvhg9/MJjC4WMfJiZ/c3a9vmhA89KIVtlqWMgDssbDoQOPCCbFV+5KHL+1ZvWQq5E4AGDRR05H4Wcp3Ml8JKK2imxhte2k2KWFsiAi9g1Ag8YiNCxjcBLiE4ZD3XahsBLjAXZYxE69hF4SdE5kRGBlxRhFwcXr3YEXkJ0jjkoV/u+vV6vl/ZBAMAKjPAApEHgAUiDwAOQBoEHIA0CD0AaBB6ANAg8AGkQeADSIPAApEHgAUiDwAOQBoEHII3/AVUtnGpxQCEsAAAAAElFTkSuQmCC"
             id="image36" />
        </g>
      </g>
    </g>
    <g
       id="g38"
       transform="matrix(0.75,0,0,0.75,72,36)">
      <text
         xml:space="preserve"
         transform="translate(48.644531,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text42"><tspan
           x="0 17.332031 34.664062 41.332031 57.339844 73.347656 90.679688 106.6875 113.35547 128.01562"
           y="0"
           id="tspan40">UNIVERSITY</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(199.33594,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text46"><tspan
           x="0 18.667969"
           y="0"
           id="tspan44">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(239.33203,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text50"><tspan
           x="0 17.332031 33.339844 50.671875 57.339844 74.671875"
           y="0"
           id="tspan48">BENIN,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(327.33984,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text54"><tspan
           x="0 17.332031 33.339844 50.671875 57.339844 74.671875 82.664062 99.996094 106.66406 121.32422 134.67188"
           y="0"
           id="tspan52">BENIN-CITY,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(475.34766,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text58"><tspan
           x="0 17.332031 24 42.667969 58.675781 76.007812 82.675781"
           y="0"
           id="tspan56">NIGERIA</tspan></text>
    </g>
    <g
       id="g60"
       transform="matrix(0.75,0,0,0.75,72,70.839996)">
      <text
         xml:space="preserve"
         transform="translate(142.42261,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text64"><tspan
           x="0 11.760361 20.860748 29.523178 40.828064 51.149017 60.386047 76.692047 85.792435 98.081146"
           y="0"
           id="tspan62">DEPARTMENT</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(253.95847,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text68"><tspan
           x="0 12.616653"
           y="0"
           id="tspan66">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(279.35574,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text72"><tspan
           x="0 9.7379761 22.35463 38.660629 48.589981 60.769379 70.006409 79.106796"
           y="0"
           id="tspan70">COMPUTER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(373.1835,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text76"><tspan
           x="0 9.1003876 21.389099 33.276993 38.250778 50.53949 59.639877 68.740265 79.243515 84.2173 96.506012"
           y="0"
           id="tspan74">ENGINEERING</tspan></text>
    </g>
    <g
       id="g78"
       transform="matrix(0.75,0,0,0.75,72,87.92984)">
      <text
         xml:space="preserve"
         transform="translate(185.74777,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text82"><tspan
           x="0 16.907227 28.676697 33.650482 42.887512 51.9879 68.020126 77.866684 87.103714 96.204102"
           y="0"
           id="tspan80">WHITEWATER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(296.67282,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text86"><tspan
           x="0 10.50325 19.421341 28.239334 37.111862 48.416748 58.783279 68.657974"
           y="0"
           id="tspan84">RESEARCH</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(381.31796,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text90"><tspan
           x="0 11.887894 22.208847 34.8255 47.004898"
           y="0"
           id="tspan88">GROUP</tspan></text>
    </g>
    <g
       id="g92"
       transform="matrix(0.75,0,0,0.75,72,105.01968)">
      <text
         xml:space="preserve"
         transform="translate(41.247307,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text96"><tspan
           x="0 10.534225 21.068451 30.607224 33.820084 44.297012 51.997269 55.360764 60.112488 67.333221 77.645432 84.52977 89.281494 96.573837 101.68349 106.59978 113.89212 119.62437 126.91672 133.93712 138.83192 145.02934 152.7296 159.62834 164.50166 172.23055 179.9308 187.63106 191.3309 197.40657 205.13545 216.84328"
           y="0"
           id="tspan94">www.whitewaterresearchgroup.com;</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(265.32568,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text100"><tspan
           x="0 10.476929 18.177185 21.54068 26.292404 33.513138 43.825348 50.709686 55.461411 62.753754 67.863403 72.779694 80.072037 85.804291 93.096634 100.11703 105.01184 111.20926 118.90952 125.80826 130.68158 138.41046 146.11072 153.81097 166.91429 173.81303 185.52086 192.54126 195.90475 199.26825 202.96809 209.04376 216.77264 228.48047"
           y="0"
           id="tspan98">whitewaterresearchgroup@gmail.com;</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(501.04123,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text104"><tspan
           x="0 7.4283142 14.856628 22.284943 29.713257 37.141571 44.569885 51.998199 59.426514 66.854828 74.283142"
           y="0"
           id="tspan102">08022918109</tspan></text>
    </g>
    <g
       id="g106"
       transform="matrix(0.75,0,0,0.75,72,130.46158)">
      <text
         xml:space="preserve"
         transform="translate(480,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text110"><tspan
           x="0 8"
           y="0"
           id="tspan108">20</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(496,8.8660154)"
         style="font-variant:normal;font-weight:normal;font-size:9.6px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text114"><tspan
           x="0 2.665451"
           y="0"
           id="tspan112">th</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(507.46234,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text118"><tspan
           x="0 11.554688 19.554688 27.554688 34.65625 47.101562 55.101562 62.203125"
           y="0"
           id="tspan116">November</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.99359,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text122"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan120">2024</tspan></text>
    </g>
    <g
       id="g124"
       transform="matrix(0.75,0,0,0.75,72,156.33023)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text128"><tspan
           x="0 11.554688 18.65625 31.101562"
           y="0"
           id="tspan126">${name}</tspan></text>
    </g>
    <g
       id="g130"
       transform="matrix(0.75,0,0,0.75,72,182.19888)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text134"><tspan
           x="0 11.554688 19.554688 27.554688 32.882812 39.984375 46.210938"
           y="0"
           id="tspan132">${address}</tspan></text>
    </g>
    <g
       id="g136"
       transform="matrix(0.75,0,0,0.75,72,208.06754)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text140"><tspan
           x="0 11.554688 18.65625 25.757812"
           y="0"
           id="tspan138">Dear</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(35.085938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text144"><tspan
           x="0 8.8984375 13.34375 18.671875 23.117188 37.34375 44.445312"
           y="0"
           id="tspan142">${greeting},</tspan></text>
    </g>
    <g
       id="g146"
       transform="matrix(0.75,0,0,0.75,72,233.93619)">
      <text
         xml:space="preserve"
         transform="translate(10.019531,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text150"><tspan
           x="0 10.671875 21.34375 32.015625 42.6875 53.359375"
           y="0"
           id="tspan148">LETTER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(78.933594,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text154"><tspan
           x="0 12.445312"
           y="0"
           id="tspan152">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(105.15234,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text158"><tspan
           x="0 6.2265625 17.78125 29.335938 35.5625 45.046875 55.414062 66.085938 72.3125 84.757812"
           y="0"
           id="tspan156">INVITATION</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(205.46484,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text162"><tspan
           x="0 10.382812"
           y="0"
           id="tspan160">TO</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(232.29297,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text166"><tspan
           x="0 10.367188 21.039062 31.710938 42.382812 53.9375"
           y="0"
           id="tspan164">ATTEND</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(301.78516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text170"><tspan
           x="0 10.671875 23.117188"
           y="0"
           id="tspan168">THE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(339.57422,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text174"><tspan
           x="0 15.101562 26.65625 32.882812 44.4375 55.109375"
           y="0"
           id="tspan172">MAIDEN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(410.23828,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text178"><tspan
           x="0 8.8984375 18.382812 29.9375 42.382812 53.054688 65.5 77.945312 88.617188 100.17188 110.84375"
           y="0"
           id="tspan176">STAKEHOLDER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(536.63672,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text182"><tspan
           x="0 15.101562 25.773438 36.445312 47.117188 53.34375 64.898438"
           y="0"
           id="tspan180">MEETING</tspan></text>
    </g>
    <g
       id="g184"
       transform="matrix(0.75,0,0,0.75,72,249.80484)">
      <text
         xml:space="preserve"
         transform="translate(36.472656,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text188"><tspan
           x="0 9.7734375 22.21875"
           y="0"
           id="tspan186">FOR</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(74.246094,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text192"><tspan
           x="0 10.671875 23.117188"
           y="0"
           id="tspan190">THE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(112.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text196"><tspan
           x="0 11.554688 22.226562 31.125 41.796875 53.351562 64.90625 76.460938"
           y="0"
           id="tspan194">RESEARCH</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(204.94141,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text200"><tspan
           x="0 10.671875 16.898438 27.570312 38.242188 48.914062"
           y="0"
           id="tspan198">TITLED</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(269.41016,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text204"><tspan
           x="0 11.554688 24 29.328125 40.882812 51.554688 60.453125 66.679688 79.125"
           y="0"
           id="tspan202">CO-DESIGN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(364.08984,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text208"><tspan
           x="0 12.445312"
           y="0"
           id="tspan206">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(390.30859,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text212"><tspan
           x="0 11.554688 17.78125 23.109375 34.664062 46.21875 52.445312 64 74.671875"
           y="0"
           id="tspan210">AI-DRIVEN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(480.53516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text216"><tspan
           x="0 12.445312 24 34.671875 40 52.445312 63.117188 74.671875 83.875 94.546875"
           y="0"
           id="tspan214">ONE-HEALTH</tspan></text>
    </g>
    <g
       id="g218"
       transform="matrix(0.75,0,0,0.75,72,265.67349)">
      <text
         xml:space="preserve"
         transform="translate(10.457031,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text222"><tspan
           x="0 8.8984375 20.453125 31.445312 43 53.671875 59.898438 70.570312 81.242188 92.796875 104.35156 115.90625"
           y="0"
           id="tspan220">SURVEILLANCE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(141.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text226"><tspan
           x="0 5.328125 16.882812 29.328125 41.773438 50.671875"
           y="0"
           id="tspan224">(DOHS)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(201.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text230"><tspan
           x="0 8.8984375 20.453125 29.351562 40.023438 50.695312"
           y="0"
           id="tspan228">SYSTEM</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(270.83203,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text234"><tspan
           x="0 9.7734375 22.21875"
           y="0"
           id="tspan232">FOR</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(308.60547,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text238"><tspan
           x="0 10.671875 22.226562 34.671875 46.226562 57.78125 69.335938 80.007812"
           y="0"
           id="tspan236">ENHANCED</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(404.16797,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text242"><tspan
           x="0 10.671875 20.445312 26.671875 38.226562 48.898438 64 70.226562"
           y="0"
           id="tspan240">EPIDEMIC</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(489.94922,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text246"><tspan
           x="0 6.2265625 17.78125 28.453125 39.125 49.796875 60.46875 66.695312 79.140625 89.8125 101.36719 112.92188"
           y="0"
           id="tspan244">INTELLIGENCE</tspan></text>
    </g>
    <g
       id="g248"
       transform="matrix(0.75,0,0,0.75,72,281.54214)">
      <text
         xml:space="preserve"
         transform="translate(202.64844,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text252"><tspan
           x="0 11.554688 23.109375"
           y="0"
           id="tspan250">AND</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(241.3125,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text256"><tspan
           x="0 12.445312 24 34.671875 45.34375 56.898438 67.570312 79.125"
           y="0"
           id="tspan254">OUTBREAK</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(336.88281,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text260"><tspan
           x="0 11.554688 22.226562 31.125 40.898438 53.34375 64.898438 73.796875"
           y="0"
           id="tspan258">RESPONSE</tspan></text>
    </g>
    <g
       id="g262"
       transform="matrix(0.75,0,0,0.75,72,307.4108)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text266"><tspan
           x="0 9.7734375 17.773438 22.21875"
           y="0"
           id="tspan264">This</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(34.445313,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text270"><tspan
           x="0 4.4453125 11.546875 15.992188 20.4375 27.539062"
           y="0"
           id="tspan268">letter</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(73.3125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text274"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan272">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(88.984375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text278"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan276">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(106.42969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text282"><tspan
           x="0 5.328125 13.328125 18.65625 31.101562 38.203125 42.648438 47.09375"
           y="0"
           id="tspan280">formally</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(166.52344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text286"><tspan
           x="0 4.4453125 12.445312 20.445312 24.890625 29.335938"
           y="0"
           id="tspan284">invite</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(207.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text290"><tspan
           x="0 8 16"
           y="0"
           id="tspan288">you</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(236.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text294"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan292">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(254.40625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text298"><tspan
           x="0"
           y="0"
           id="tspan296">a</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(266.50781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text302"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875"
           y="0"
           id="tspan300">stakeholder</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(345.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text306"><tspan
           x="0 12.445312 19.546875 26.648438 31.09375 35.539062 43.539062"
           y="0"
           id="tspan304">meeting</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(401.79688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text310"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan308">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(419.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text314"><tspan
           x="0 5.328125 13.328125 18.65625 23.101562 31.101562 38.203125 43.53125 50.632812 58.632812 65.734375"
           y="0"
           id="tspan312">furtherance</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(497.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text318"><tspan
           x="0 8"
           y="0"
           id="tspan316">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(515.40625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text322"><tspan
           x="0"
           y="0"
           id="tspan320">a</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(527.50781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text326"><tspan
           x="0 5.328125 12.429688 18.65625 25.757812 32.859375 38.1875 45.289062"
           y="0"
           id="tspan324">research</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(585.79688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text330"><tspan
           x="0 4.4453125 8.890625 13.335938 17.78125 24.882812 32.882812"
           y="0"
           id="tspan328">titled:</tspan></text>
    </g>
    <g
       id="g332"
       transform="matrix(0.75,0,0,0.75,72,323.27945)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text336"><tspan
           x="0 7.1015625 17.773438 25.773438 31.101562 42.65625 49.757812 55.984375 60.429688 68.429688"
           y="0"
           id="tspan334">“Co-Design</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(84.429688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text340"><tspan
           x="0 8"
           y="0"
           id="tspan338">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(105.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text344"><tspan
           x="0 11.554688 16.882812 22.210938 33.765625 39.09375 43.539062 51.539062 58.640625"
           y="0"
           id="tspan342">AI-Driven</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(180.39844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text348"><tspan
           x="0 11.554688 19.554688 26.65625 31.984375 43.539062 50.640625 57.742188 62.1875 66.632812"
           y="0"
           id="tspan346">One-Health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(263.03125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text352"><tspan
           x="0 8.8984375 16.898438 22.226562 30.226562 37.328125 41.773438 46.21875 50.664062 57.765625 65.765625 72.867188"
           y="0"
           id="tspan350">Surveillance</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(351,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text356"><tspan
           x="0 5.328125 16.882812 28.4375 39.992188 48.890625"
           y="0"
           id="tspan354">(DOHS)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(412.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text360"><tspan
           x="0 8.8984375 16.898438 23.125 27.570312 34.671875"
           y="0"
           id="tspan358">System</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(466.33594,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text364"><tspan
           x="0 5.328125 13.328125"
           y="0"
           id="tspan362">for</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(491.99219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text368"><tspan
           x="0 9.7734375 17.773438 25.773438 32.875 40.875 47.976562 55.078125"
           y="0"
           id="tspan366">Enhanced</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(562.07031,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text372"><tspan
           x="0 9.7734375 17.773438 22.21875 30.21875 37.320312 49.765625 54.210938"
           y="0"
           id="tspan370">Epidemic</tspan></text>
    </g>
    <g
       id="g374"
       transform="matrix(0.75,0,0,0.75,72,339.1481)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text378"><tspan
           x="0 5.328125 13.328125 17.773438 24.875 29.320312 33.765625 38.210938 46.210938 53.3125 61.3125 68.414062"
           y="0"
           id="tspan376">Intelligence</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(81.515625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text382"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan380">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(110.61719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text386"><tspan
           x="0 11.554688 19.554688 24 32 37.328125 44.429688 51.53125"
           y="0"
           id="tspan384">Outbreak</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(176.14844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text390"><tspan
           x="0 10.671875 17.773438 24 32 40 48 54.226562 61.328125 68.429688"
           y="0"
           id="tspan388">Response”.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(260.57813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text394"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan392">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(291.45313,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text398"><tspan
           x="0 5.328125 12.429688 18.65625 25.757812 32.859375 38.1875 45.289062"
           y="0"
           id="tspan396">research</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(350.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text402"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan400">which</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(394.84375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text406"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan404">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(410.51563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text410"><tspan
           x="0 9.7734375 19.546875 29.320312 38.21875 46.21875 54.21875"
           y="0"
           id="tspan408">TETFund</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(477.73438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text414"><tspan
           x="0 6.2265625 14.226562 22.226562 30.226562 36.453125 44.453125 49.78125 56.882812"
           y="0"
           id="tspan412">sponsored</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(547.61719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text418"><tspan
           x="0 5.328125 12.429688 20.429688 28.429688 32.875 38.203125 45.304688"
           y="0"
           id="tspan416">requires</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(604.14844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text422"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan420">the</tspan></text>
    </g>
    <g
       id="g424"
       transform="matrix(0.75,0,0,0.75,72,355.01675)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text428"><tspan
           x="0 4.4453125 12.445312 20.445312 28.445312"
           y="0"
           id="tspan426">input</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(39.890625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text432"><tspan
           x="0 8"
           y="0"
           id="tspan430">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(60.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text436"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875 73.75"
           y="0"
           id="tspan434">stakeholders</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(147.19531,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text440"><tspan
           x="0 4.4453125 12.445312 20.445312 28.445312 32.890625 40.890625 47.992188"
           y="0"
           id="tspan438">involved</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(210.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text444"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan442">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(229.63281,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text448"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan446">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(256.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text452"><tspan
           x="0 11.554688 19.554688 26.65625 31.984375 43.539062 50.640625 57.742188 62.1875 66.632812"
           y="0"
           id="tspan450">One-Health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(337.8125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text456"><tspan
           x="0 4.4453125 16.890625 24.890625 29.335938 36.4375 48.882812 55.984375 63.984375 68.429688 75.53125 79.976562 84.421875 92.421875"
           y="0"
           id="tspan454">implementation</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(445.23438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text460"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan458">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(464.67969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text464"><tspan
           x="0 11.554688 16 24 31.101562 36.429688 40.875"
           y="0"
           id="tspan462">Nigeria</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(519.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text468"><tspan
           x="0 8 13.328125 20.429688 31.984375"
           y="0"
           id="tspan466">drawn</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(566.64063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text472"><tspan
           x="0 5.328125 10.65625 18.65625"
           y="0"
           id="tspan470">from</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(603.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text476"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan474">the</tspan></text>
    </g>
    <g
       id="g478"
       transform="matrix(0.75,0,0,0.75,72,370.88541)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text482"><tspan
           x="0 8 16 28.445312 35.546875 43.546875"
           y="0"
           id="tspan480">human,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(51.546875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text486"><tspan
           x="0 7.1015625 15.101562 19.546875 31.992188 39.09375"
           y="0"
           id="tspan484">animal</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(99.085938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text490"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan488">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(126.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text494"><tspan
           x="0 7.1015625 15.101562 23.101562 27.546875 32.875 40.875 48.875 61.320312 68.421875 76.421875 80.867188 87.96875"
           y="0"
           id="tspan492">environmental</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(222.60156,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text498"><tspan
           x="0 8 15.101562 22.203125 26.648438 31.09375"
           y="0"
           id="tspan496">health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(265.69531,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text502"><tspan
           x="0 6.2265625 13.328125 20.429688 24.875 32.875 38.203125 44.429688"
           y="0"
           id="tspan500">sectors.</tspan></text>
    </g>
    <g
       id="g504"
       transform="matrix(0.75,0,0,0.75,72,396.75409)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text508"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan506">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(29.875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text512"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875"
           y="0"
           id="tspan510">stakeholder</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(108.625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text516"><tspan
           x="0 12.445312 19.546875 26.648438 31.09375 35.539062 43.539062"
           y="0"
           id="tspan514">meeting</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(165.16406,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text520"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan518">which</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(209.26563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text524"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan522">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(239.15625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text528"><tspan
           x="0 8"
           y="0"
           id="tspan526">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(259.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text532"><tspan
           x="0 8 16 24 29.328125 33.773438"
           y="0"
           id="tspan530">hybrid</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(306.03125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text536"><tspan
           x="0 5.328125 9.7734375 17.773438 23.101562 31.101562 38.203125 43.53125 49.757812 57.757812"
           y="0"
           id="tspan534">(in-person</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(376.78906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text540"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan538">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(404.89063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text544"><tspan
           x="0 8 12.445312 17.773438 22.21875 30.21875 37.320312 41.765625"
           y="0"
           id="tspan542">virtual)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(456.98438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text548"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan546">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(472.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text552"><tspan
           x="0 6.2265625 13.328125 21.328125 28.429688 36.429688 44.429688 48.875 55.976562"
           y="0"
           id="tspan550">scheduled</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(541.63281,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text556"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan554">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(559.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text560"><tspan
           x="0 8"
           y="0"
           id="tspan558">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text564"><tspan
           x="0 8 15.101562 19.546875"
           y="0"
           id="tspan562">held</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(609.72656,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text568"><tspan
           x="0 7.1015625"
           y="0"
           id="tspan566">as</tspan></text>
    </g>
    <g
       id="g570"
       transform="matrix(0.75,0,0,0.75,72,412.62274)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text574"><tspan
           x="0 5.328125 13.328125 17.773438 22.21875 30.21875 41.773438 48"
           y="0"
           id="tspan572">follows:</tspan></text>
    </g>
    <g
       id="g576"
       transform="matrix(0.75,0,0,0.75,72,438.49136)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text580"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan578">Date:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text584"><tspan
           x="0"
           y="0"
           id="tspan582">5</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(152,8.8660154)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:9.6px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text588"><tspan
           x="0 2.665451"
           y="0"
           id="tspan586">th</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(164.00104,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text592"><tspan
           x="0 11.554688 18.65625 25.757812 32.859375 45.304688 53.304688 60.40625 65.75"
           y="0"
           id="tspan590">December,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(237.75104,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text596"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan594">2024</tspan></text>
    </g>
    <g
       id="g598"
       transform="matrix(0.75,0,0,0.75,72,454.36002)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text602"><tspan
           x="0 8.8984375 16 24.898438 33.796875"
           y="0"
           id="tspan600">Venue</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(44.898438,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text606"><tspan
           x="0 5.328125 15.101562 24 31.101562 37.328125 41.773438 48.875 56.875 61.320312 66.648438"
           y="0"
           id="tspan604">(Physical):</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text610"><tspan
           x="0 10.671875 16.898438 21.34375 25.789062 31.117188 35.5625 42.664062 47.109375 55.109375"
           y="0"
           id="tspan608">Artificial</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(215.55469,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text614"><tspan
           x="0 6.2265625 15.125 19.570312 26.671875 31.117188 35.5625 40.007812 48.007812 55.109375 64.007812 71.109375"
           y="0"
           id="tspan612">Intelligence</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(305.76563,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text618"><tspan
           x="0 9.7734375 17.773438 25.773438"
           y="0"
           id="tspan616">Lab,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(346.53906,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text622"><tspan
           x="0 11.554688 18.65625 26.65625 34.65625 40.882812 45.328125 57.773438 64.875 73.773438"
           y="0"
           id="tspan620">Department</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(435.75781,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text626"><tspan
           x="0 8"
           y="0"
           id="tspan624">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(460.08594,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text630"><tspan
           x="0 10.671875 18.671875 31.117188 39.117188 48.015625 52.460938 59.5625"
           y="0"
           id="tspan628">Computer</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(536.875,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text634"><tspan
           x="0 10.671875 19.570312 27.570312 32.015625 40.914062 48.015625 55.117188 61.34375 65.789062 74.6875 82.6875"
           y="0"
           id="tspan632">Engineering,</tspan></text>
    </g>
    <g
       id="g636"
       transform="matrix(0.75,0,0,0.75,72,470.22867)">
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text640"><tspan
           x="0 10.671875 18.671875 25.773438 34.671875 39.117188 43.5625"
           y="0"
           id="tspan638">Faculty</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(201.66406,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text644"><tspan
           x="0 8"
           y="0"
           id="tspan642">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(221.99219,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text648"><tspan
           x="0 10.671875 19.570312 27.570312 32.015625 40.914062 48.015625 55.117188 61.34375 65.789062 74.6875 82.6875"
           y="0"
           id="tspan646">Engineering,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(315.67969,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text652"><tspan
           x="0 11.554688 20.453125 24.898438 32 39.101562 45.328125 51.554688 56 60.445312"
           y="0"
           id="tspan650">University</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(389.22656,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text656"><tspan
           x="0 8"
           y="0"
           id="tspan654">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(408.55469,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text660"><tspan
           x="0 10.671875 17.773438 26.671875 31.117188 40.015625"
           y="0"
           id="tspan658">Benin,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(458.57031,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text664"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 46.226562"
           y="0"
           id="tspan662">Ugbowo</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(518.79688,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text668"><tspan
           x="0 10.671875 18.671875 31.117188 39.117188 48.015625 54.242188"
           y="0"
           id="tspan666">Campus,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(583.03906,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text672"><tspan
           x="0 10.671875 17.773438 26.671875 31.117188"
           y="0"
           id="tspan670">Benin</tspan></text>
    </g>
    <g
       id="g674"
       transform="matrix(0.75,0,0,0.75,72,486.09732)">
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text678"><tspan
           x="0 10.671875 15.117188 19.5625 26.070312"
           y="0"
           id="tspan676">City,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.07031,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text682"><tspan
           x="0 10.671875 18.671875"
           y="0"
           id="tspan680">Edo</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(208.74219,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text686"><tspan
           x="0 8.8984375 13.34375 21.34375 25.789062 32.890625"
           y="0"
           id="tspan684">State.</tspan></text>
    </g>
    <g
       id="g688"
       transform="matrix(0.75,0,0,0.75,72,501.96597)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text692"><tspan
           x="0 8.8984375 16 24.898438 33.796875"
           y="0"
           id="tspan690">Venue</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(44.898438,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text696"><tspan
           x="0 5.328125 15.117188 19.5625 25.789062 30.234375 39.132812 47.132812 51.578125 56.90625"
           y="0"
           id="tspan694">(Virtual):</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text700"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 40"
           y="0"
           id="tspan698">Google</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(195.10156,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text704"><tspan
           x="0 14.226562 21.328125 28.429688"
           y="0"
           id="tspan702">Meet</tspan></text>
    </g>
    <g
       id="g706"
       transform="matrix(0.75,0,0,0.75,72,517.83459)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text710"><tspan
           x="0 9.1796875 13.625 26.070312 33.171875"
           y="0"
           id="tspan708">Time:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text714"><tspan
           x="0 8"
           y="0"
           id="tspan712">10</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(164,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text718"><tspan
           x="0 8"
           y="0"
           id="tspan716">am</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(188.44531,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text722"><tspan
           x="0 8 14.226562 22.226562 34.671875 42.671875 47.117188"
           y="0"
           id="tspan720">prompt.</tspan></text>
    </g>
    <g
       id="g724"
       transform="matrix(0.75,0,0,0.75,72,533.70325)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text728"><tspan
           x="0 10.671875 17.773438 25.773438 30.21875 36.445312 40.890625 47.117188 55.117188 59.5625 64.007812 72.007812 80.90625"
           y="0"
           id="tspan726">Registration:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text732"><tspan
           x="0 8.8984375 13.34375 17.789062 25.789062 32.015625 37.34375 41.789062 46.234375 56.90625 67.578125 77.65625 81.65625 92.328125 101.22656 105.67188 110.11719 117.21875 127.89062 135.89062 140.33594 147.4375 153.66406 159.89062 166.99219 173.21875 180.32031 188.32031 194.54688 201.64844 210.54688 218.54688 224.77344 232.77344 241.67188 249.67188 253.67188 260.77344 268.77344 281.21875 285.66406 291.89062 297.21875 301.66406 309.66406 317.66406 325.66406"
           y="0"
           id="tspan730">https://www.whitewaterresearchgroup.com/sft2024</tspan></text>
    </g>
    <g
       id="g734"
       transform="matrix(0.75,0,0,0.75,72,575.44055)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text738"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan736">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(32.875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text742"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 40"
           y="0"
           id="tspan740">Google</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(86.976563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text746"><tspan
           x="0 14.226562 21.328125 28.429688"
           y="0"
           id="tspan744">Meet</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(126.85156,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text750"><tspan
           x="0 4.4453125 8.890625 16.890625"
           y="0"
           id="tspan748">link</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(158.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text754"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan752">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text758"><tspan
           x="0 4.4453125 12.445312 16.890625"
           y="0"
           id="tspan756">join</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(210.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text762"><tspan
           x="0 8 12.445312 17.773438 22.21875 30.21875 37.320312 41.765625 46.210938"
           y="0"
           id="tspan760">virtually</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(271.28906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text766"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan764">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(303.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text770"><tspan
           x="0 8"
           y="0"
           id="tspan768">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(325.28125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text774"><tspan
           x="0 7.1015625 15.101562 22.203125 26.648438 31.09375 38.195312 46.195312 50.640625"
           y="0"
           id="tspan772">available</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(390.02344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text778"><tspan
           x="0 8"
           y="0"
           id="tspan776">on</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(413.02344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text782"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan780">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(439.57031,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text786"><tspan
           x="0 5.328125 12.429688 20.429688 24.875 31.101562 35.546875 40.875 47.976562 52.421875 56.867188 64.867188"
           y="0"
           id="tspan784">registration</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(519.4375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text790"><tspan
           x="0 6.2265625 10.671875 15.117188"
           y="0"
           id="tspan788">site</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(548.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text794"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan792">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text798"><tspan
           x="0 6.2265625 13.328125 21.328125"
           y="0"
           id="tspan796">sent</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(611.53125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text802"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan800">to</tspan></text>
    </g>
    <g
       id="g804"
       transform="matrix(0.75,0,0,0.75,72,591.3092)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text808"><tspan
           x="0 5.328125 12.429688 20.429688 24.875 31.101562 35.546875 42.648438 47.976562 55.078125"
           y="0"
           id="tspan806">registered</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(70.078125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text812"><tspan
           x="0 8 15.101562 20.429688 24.875 29.320312 36.421875 40.867188 48.867188 55.96875 63.96875 68.414062"
           y="0"
           id="tspan810">participants</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(151.71875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text816"><tspan
           x="0 8 12.445312"
           y="0"
           id="tspan814">via</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.26563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text820"><tspan
           x="0 7.1015625 19.546875 26.648438 31.09375"
           y="0"
           id="tspan818">email</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(220.80469,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text824"><tspan
           x="0 4.4453125 16"
           y="0"
           id="tspan822">two</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(251.80469,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text828"><tspan
           x="0 5.328125 13.328125"
           y="0"
           id="tspan826">(2)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(277.46094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text832"><tspan
           x="0 11.554688 19.554688 24.882812 32.882812 37.328125 45.328125"
           y="0"
           id="tspan830">working</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(337.78906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text836"><tspan
           x="0 8 15.101562 23.101562"
           y="0"
           id="tspan834">days</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(374.11719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text840"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan838">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(393.5625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text844"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan842">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(419.10938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text848"><tspan
           x="0 7.1015625 15.101562 22.203125 30.203125 34.648438"
           y="0"
           id="tspan846">event.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(469.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text852"><tspan
           x="0 9.953125 17.953125 25.953125"
           y="0"
           id="tspan850">Your</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(507.03906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text856"><tspan
           x="0 7.1015625 11.546875 15.992188 23.09375 31.09375 39.09375 46.195312 54.195312 61.296875 68.398438"
           y="0"
           id="tspan854">attendance,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(585.4375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text860"><tspan
           x="0 7.1015625 14.203125 18.648438 23.09375 31.09375"
           y="0"
           id="tspan858">active</tspan></text>
    </g>
    <g
       id="g862"
       transform="matrix(0.75,0,0,0.75,72,607.17786)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text866"><tspan
           x="0 8 15.101562 20.429688 24.875 29.320312 36.421875 40.867188 48.867188 55.96875 60.414062 64.859375 72.859375"
           y="0"
           id="tspan864">participation</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(84.859375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text870"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan868">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(111.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text874"><tspan
           x="0 7.1015625 15.101562 23.101562 27.546875 32.875 37.320312 45.320312 53.320312 57.765625 62.210938 70.210938 78.210938"
           y="0"
           id="tspan872">contributions</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(200.39844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text878"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan876">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(229.28906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text882"><tspan
           x="0 8"
           y="0"
           id="tspan880">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(248.39063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text886"><tspan
           x="0 8 12.445312 20.445312 28.445312 32.890625"
           y="0"
           id="tspan884">highly</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(293.28125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text890"><tspan
           x="0 7.1015625 15.101562 23.101562 28.429688 35.53125 42.632812 47.078125 54.179688 58.625 65.726562 73.726562"
           y="0"
           id="tspan888">appreciated.</tspan></text>
    </g>
    <g
       id="g892"
       transform="matrix(0.75,0,0,0.75,72,633.04657)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text896"><tspan
           x="0"
           y="0"
           id="tspan894">I</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(9.328125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text900"><tspan
           x="0 6.2265625 10.671875 18.671875 25.773438 32.875 38.203125 45.304688 49.75"
           y="0"
           id="tspan898">sincerely</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(71.078125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text904"><tspan
           x="0 7.1015625 15.101562 19.546875 23.992188 31.09375 35.539062 43.539062 50.640625 55.085938"
           y="0"
           id="tspan902">anticipate</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(137.26562,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text908"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan906">your</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(170.59375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text912"><tspan
           x="0 8 16 22.226562 26.671875 31.117188 35.5625 43.5625"
           y="0"
           id="tspan910">positive</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(225.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text916"><tspan
           x="0 5.328125 12.429688 18.65625 26.65625 34.65625 42.65625 48.882812"
           y="0"
           id="tspan914">response</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(285.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text920"><tspan
           x="0 8"
           y="0"
           id="tspan918">on</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(305.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text924"><tspan
           x="0 4.4453125 12.445312 16.890625"
           y="0"
           id="tspan922">this</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(332.35938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text928"><tspan
           x="0 12.445312 19.546875 23.992188 28.4375 35.539062 39.984375"
           y="0"
           id="tspan926">matter.</tspan></text>
    </g>
    <g
       id="g930"
       transform="matrix(0.75,0,0,0.75,72,658.91516)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text934"><tspan
           x="0 9.953125 17.953125 25.953125 31.28125"
           y="0"
           id="tspan932">Yours</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(41.507813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text938"><tspan
           x="0 8.8984375 13.34375 21.34375 28.445312 35.546875 40.875 47.976562 52.421875 59.382812"
           y="0"
           id="tspan936">Sincerely,</tspan></text>
    </g>
    <g
       id="g940"
       transform="matrix(0.75,0,0,0.75,72,700.65247)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text944"><tspan
           x="0 9.7734375 17.773438 25.773438 30.21875"
           y="0"
           id="tspan942">Engr.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(38.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text948"><tspan
           x="0 11.554688 16"
           y="0"
           id="tspan946">Dr.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(62.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text952"><tspan
           x="0 9.7734375 17.773438 25.773438 33.773438 41.773438 49.773438 57.773438 65.773438"
           y="0"
           id="tspan950">Edoghogho</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(139.99219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text956"><tspan
           x="0 11.554688 21.328125 31.414062 42.96875"
           y="0"
           id="tspan954">OLAYE</tspan></text>
    </g>
    <g
       id="g958"
       transform="matrix(0.75,0,0,0.75,72,716.52112)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text962"><tspan
           x="0 9.7734375 16.875 21.320312 30.21875 37.320312 41.765625 50.664062 58.664062"
           y="0"
           id="tspan960">Principal</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(67.109375,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text966"><tspan
           x="0 6.2265625 15.125 23.125 30.226562 36.453125 41.78125 46.226562 54.226562 62.226562 67.554688 75.554688"
           y="0"
           id="tspan964">Investigator</tspan></text>
    </g>
    <g
       id="g968">
      <g
         id="g970"
         clip-path="url(#clipPath974)">
        <g
           id="g976"
           transform="matrix(106.50001,0,0,-46.5,498,82.5)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,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"
             mask="url(#mask978)"
             id="image982" />
        </g>
      </g>
    </g>
  </g>
</svg>

</div>
</body>
</html>

    `;

    // Create a temporary container for the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-10000px'; // Move it off-screen
    document.body.appendChild(tempDiv);

    try {
      // Convert the HTML content to a canvas
      const canvas = await html2canvas(tempDiv, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save('document.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Clean up the temporary container
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <button onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};

export const handleDownloadPDF = async ({name, address, greeting}) => {
    // Prepare the HTML you want to convert
    const htmlContent = `
      
<!DOCTYPE html>
<html>
<head>
<title>WWRG Letter</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<style>
body {padding:0; margin:0; text-align:center; background-color:#777}
.page {margin:5px 0}
.page svg {background-color:#fff}
</style>
</head>
<body>

<div class="page">
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   version="1.1"
   id="svg2"
   width="816"
   height="1056"
   viewBox="0 0 816 1056"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs6">
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath20">
      <path
         d="M 33,36 H 87.75 V 90.75 H 33 Z"
         clip-rule="evenodd"
         id="path18" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath32">
      <path
         d="m 63,657.04657 h 87.75 v 72 H 63 Z"
         clip-rule="evenodd"
         id="path30" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath974">
      <path
         d="M 498,36 H 604.5 V 82.5 H 498 Z"
         clip-rule="evenodd"
         id="path972" />
    </clipPath>
    <mask
       maskUnits="userSpaceOnUse"
       x="0"
       y="0"
       width="1"
       height="1"
       id="mask978">
      <image
         width="1"
         height="1"
         style="image-rendering:optimizeSpeed"
         preserveAspectRatio="none"
         xlink:href="data:image/png;base64,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"
         id="image980" />
    </mask>
  </defs>
  <g
     id="g8"
     transform="matrix(1.3333333,0,0,1.3333333,0,2.64e-5)">
    <g
       id="g10"
       transform="scale(0.75)">
      <path
         d="M 0,0 H 816 V 1056 H 0 Z"
         style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="path12" />
    </g>
    <g
       id="g14">
      <g
         id="g16"
         clip-path="url(#clipPath20)">
        <g
           id="g22"
           transform="matrix(54.75,0,0,-54.75,33,90.75)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,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"
             id="image24" />
        </g>
      </g>
    </g>
    <g
       id="g26">
      <g
         id="g28"
         clip-path="url(#clipPath32)">
        <g
           id="g34"
           transform="matrix(146.0504,0,0,-72,63.000015,729.04657)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,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"
             id="image36" />
        </g>
      </g>
    </g>
    <g
       id="g38"
       transform="matrix(0.75,0,0,0.75,72,36)">
      <text
         xml:space="preserve"
         transform="translate(48.644531,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text42"><tspan
           x="0 17.332031 34.664062 41.332031 57.339844 73.347656 90.679688 106.6875 113.35547 128.01562"
           y="0"
           id="tspan40">UNIVERSITY</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(199.33594,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text46"><tspan
           x="0 18.667969"
           y="0"
           id="tspan44">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(239.33203,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text50"><tspan
           x="0 17.332031 33.339844 50.671875 57.339844 74.671875"
           y="0"
           id="tspan48">BENIN,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(327.33984,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text54"><tspan
           x="0 17.332031 33.339844 50.671875 57.339844 74.671875 82.664062 99.996094 106.66406 121.32422 134.67188"
           y="0"
           id="tspan52">BENIN-CITY,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(475.34766,23.040001)"
         style="font-variant:normal;font-weight:bold;font-size:24px;font-family:Arial;-inkscape-font-specification:Arial-BoldMT;writing-mode:lr-tb;fill:#7030a0;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text58"><tspan
           x="0 17.332031 24 42.667969 58.675781 76.007812 82.675781"
           y="0"
           id="tspan56">NIGERIA</tspan></text>
    </g>
    <g
       id="g60"
       transform="matrix(0.75,0,0,0.75,72,70.839996)">
      <text
         xml:space="preserve"
         transform="translate(142.42261,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text64"><tspan
           x="0 11.760361 20.860748 29.523178 40.828064 51.149017 60.386047 76.692047 85.792435 98.081146"
           y="0"
           id="tspan62">DEPARTMENT</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(253.95847,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text68"><tspan
           x="0 12.616653"
           y="0"
           id="tspan66">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(279.35574,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text72"><tspan
           x="0 9.7379761 22.35463 38.660629 48.589981 60.769379 70.006409 79.106796"
           y="0"
           id="tspan70">COMPUTER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(373.1835,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text76"><tspan
           x="0 9.1003876 21.389099 33.276993 38.250778 50.53949 59.639877 68.740265 79.243515 84.2173 96.506012"
           y="0"
           id="tspan74">ENGINEERING</tspan></text>
    </g>
    <g
       id="g78"
       transform="matrix(0.75,0,0,0.75,72,87.92984)">
      <text
         xml:space="preserve"
         transform="translate(185.74777,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text82"><tspan
           x="0 16.907227 28.676697 33.650482 42.887512 51.9879 68.020126 77.866684 87.103714 96.204102"
           y="0"
           id="tspan80">WHITEWATER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(296.67282,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text86"><tspan
           x="0 10.50325 19.421341 28.239334 37.111862 48.416748 58.783279 68.657974"
           y="0"
           id="tspan84">RESEARCH</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(381.31796,18.119791)"
         style="font-variant:normal;font-weight:bold;font-size:18.6667px;font-family:Calibri;-inkscape-font-specification:Calibri-Bold;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text90"><tspan
           x="0 11.887894 22.208847 34.8255 47.004898"
           y="0"
           id="tspan88">GROUP</tspan></text>
    </g>
    <g
       id="g92"
       transform="matrix(0.75,0,0,0.75,72,105.01968)">
      <text
         xml:space="preserve"
         transform="translate(41.247307,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text96"><tspan
           x="0 10.534225 21.068451 30.607224 33.820084 44.297012 51.997269 55.360764 60.112488 67.333221 77.645432 84.52977 89.281494 96.573837 101.68349 106.59978 113.89212 119.62437 126.91672 133.93712 138.83192 145.02934 152.7296 159.62834 164.50166 172.23055 179.9308 187.63106 191.3309 197.40657 205.13545 216.84328"
           y="0"
           id="tspan94">www.whitewaterresearchgroup.com;</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(265.32568,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text100"><tspan
           x="0 10.476929 18.177185 21.54068 26.292404 33.513138 43.825348 50.709686 55.461411 62.753754 67.863403 72.779694 80.072037 85.804291 93.096634 100.11703 105.01184 111.20926 118.90952 125.80826 130.68158 138.41046 146.11072 153.81097 166.91429 173.81303 185.52086 192.54126 195.90475 199.26825 202.96809 209.04376 216.77264 228.48047"
           y="0"
           id="tspan98">whitewaterresearchgroup@gmail.com;</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(501.04123,14.23698)"
         style="font-variant:normal;font-weight:normal;font-size:14.6667px;font-family:Calibri;-inkscape-font-specification:Calibri;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text104"><tspan
           x="0 7.4283142 14.856628 22.284943 29.713257 37.141571 44.569885 51.998199 59.426514 66.854828 74.283142"
           y="0"
           id="tspan102">08022918109</tspan></text>
    </g>
    <g
       id="g106"
       transform="matrix(0.75,0,0,0.75,72,130.46158)">
      <text
         xml:space="preserve"
         transform="translate(480,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text110"><tspan
           x="0 8"
           y="0"
           id="tspan108">20</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(496,8.8660154)"
         style="font-variant:normal;font-weight:normal;font-size:9.6px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text114"><tspan
           x="0 2.665451"
           y="0"
           id="tspan112">th</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(507.46234,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text118"><tspan
           x="0 11.554688 19.554688 27.554688 34.65625 47.101562 55.101562 62.203125"
           y="0"
           id="tspan116">November</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.99359,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text122"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan120">2024</tspan></text>
    </g>
    <g
       id="g124"
       transform="matrix(0.75,0,0,0.75,72,156.33023)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text128"><tspan
           x="0 11.554688 18.65625 31.101562"
           y="0"
           id="tspan126">${name}</tspan></text>
    </g>
    <g
       id="g130"
       transform="matrix(0.75,0,0,0.75,72,182.19888)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text134"><tspan
           x="0 11.554688 19.554688 27.554688 32.882812 39.984375 46.210938"
           y="0"
           id="tspan132">${address}</tspan></text>
    </g>
    <g
       id="g136"
       transform="matrix(0.75,0,0,0.75,72,208.06754)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text140"><tspan
           x="0 11.554688 18.65625 25.757812"
           y="0"
           id="tspan138">Dear</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(35.085938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text144"><tspan
           x="0 8.8984375 13.34375 18.671875 23.117188 37.34375 44.445312"
           y="0"
           id="tspan142">${greeting},</tspan></text>
    </g>
    <g
       id="g146"
       transform="matrix(0.75,0,0,0.75,72,233.93619)">
      <text
         xml:space="preserve"
         transform="translate(10.019531,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text150"><tspan
           x="0 10.671875 21.34375 32.015625 42.6875 53.359375"
           y="0"
           id="tspan148">LETTER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(78.933594,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text154"><tspan
           x="0 12.445312"
           y="0"
           id="tspan152">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(105.15234,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text158"><tspan
           x="0 6.2265625 17.78125 29.335938 35.5625 45.046875 55.414062 66.085938 72.3125 84.757812"
           y="0"
           id="tspan156">INVITATION</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(205.46484,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text162"><tspan
           x="0 10.382812"
           y="0"
           id="tspan160">TO</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(232.29297,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text166"><tspan
           x="0 10.367188 21.039062 31.710938 42.382812 53.9375"
           y="0"
           id="tspan164">ATTEND</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(301.78516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text170"><tspan
           x="0 10.671875 23.117188"
           y="0"
           id="tspan168">THE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(339.57422,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text174"><tspan
           x="0 15.101562 26.65625 32.882812 44.4375 55.109375"
           y="0"
           id="tspan172">MAIDEN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(410.23828,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text178"><tspan
           x="0 8.8984375 18.382812 29.9375 42.382812 53.054688 65.5 77.945312 88.617188 100.17188 110.84375"
           y="0"
           id="tspan176">STAKEHOLDER</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(536.63672,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text182"><tspan
           x="0 15.101562 25.773438 36.445312 47.117188 53.34375 64.898438"
           y="0"
           id="tspan180">MEETING</tspan></text>
    </g>
    <g
       id="g184"
       transform="matrix(0.75,0,0,0.75,72,249.80484)">
      <text
         xml:space="preserve"
         transform="translate(36.472656,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text188"><tspan
           x="0 9.7734375 22.21875"
           y="0"
           id="tspan186">FOR</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(74.246094,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text192"><tspan
           x="0 10.671875 23.117188"
           y="0"
           id="tspan190">THE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(112.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text196"><tspan
           x="0 11.554688 22.226562 31.125 41.796875 53.351562 64.90625 76.460938"
           y="0"
           id="tspan194">RESEARCH</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(204.94141,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text200"><tspan
           x="0 10.671875 16.898438 27.570312 38.242188 48.914062"
           y="0"
           id="tspan198">TITLED</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(269.41016,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text204"><tspan
           x="0 11.554688 24 29.328125 40.882812 51.554688 60.453125 66.679688 79.125"
           y="0"
           id="tspan202">CO-DESIGN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(364.08984,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text208"><tspan
           x="0 12.445312"
           y="0"
           id="tspan206">OF</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(390.30859,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text212"><tspan
           x="0 11.554688 17.78125 23.109375 34.664062 46.21875 52.445312 64 74.671875"
           y="0"
           id="tspan210">AI-DRIVEN</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(480.53516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text216"><tspan
           x="0 12.445312 24 34.671875 40 52.445312 63.117188 74.671875 83.875 94.546875"
           y="0"
           id="tspan214">ONE-HEALTH</tspan></text>
    </g>
    <g
       id="g218"
       transform="matrix(0.75,0,0,0.75,72,265.67349)">
      <text
         xml:space="preserve"
         transform="translate(10.457031,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text222"><tspan
           x="0 8.8984375 20.453125 31.445312 43 53.671875 59.898438 70.570312 81.242188 92.796875 104.35156 115.90625"
           y="0"
           id="tspan220">SURVEILLANCE</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(141.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text226"><tspan
           x="0 5.328125 16.882812 29.328125 41.773438 50.671875"
           y="0"
           id="tspan224">(DOHS)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(201.03516,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text230"><tspan
           x="0 8.8984375 20.453125 29.351562 40.023438 50.695312"
           y="0"
           id="tspan228">SYSTEM</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(270.83203,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text234"><tspan
           x="0 9.7734375 22.21875"
           y="0"
           id="tspan232">FOR</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(308.60547,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text238"><tspan
           x="0 10.671875 22.226562 34.671875 46.226562 57.78125 69.335938 80.007812"
           y="0"
           id="tspan236">ENHANCED</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(404.16797,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text242"><tspan
           x="0 10.671875 20.445312 26.671875 38.226562 48.898438 64 70.226562"
           y="0"
           id="tspan240">EPIDEMIC</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(489.94922,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text246"><tspan
           x="0 6.2265625 17.78125 28.453125 39.125 49.796875 60.46875 66.695312 79.140625 89.8125 101.36719 112.92188"
           y="0"
           id="tspan244">INTELLIGENCE</tspan></text>
    </g>
    <g
       id="g248"
       transform="matrix(0.75,0,0,0.75,72,281.54214)">
      <text
         xml:space="preserve"
         transform="translate(202.64844,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text252"><tspan
           x="0 11.554688 23.109375"
           y="0"
           id="tspan250">AND</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(241.3125,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text256"><tspan
           x="0 12.445312 24 34.671875 45.34375 56.898438 67.570312 79.125"
           y="0"
           id="tspan254">OUTBREAK</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(336.88281,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text260"><tspan
           x="0 11.554688 22.226562 31.125 40.898438 53.34375 64.898438 73.796875"
           y="0"
           id="tspan258">RESPONSE</tspan></text>
    </g>
    <g
       id="g262"
       transform="matrix(0.75,0,0,0.75,72,307.4108)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text266"><tspan
           x="0 9.7734375 17.773438 22.21875"
           y="0"
           id="tspan264">This</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(34.445313,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text270"><tspan
           x="0 4.4453125 11.546875 15.992188 20.4375 27.539062"
           y="0"
           id="tspan268">letter</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(73.3125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text274"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan272">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(88.984375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text278"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan276">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(106.42969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text282"><tspan
           x="0 5.328125 13.328125 18.65625 31.101562 38.203125 42.648438 47.09375"
           y="0"
           id="tspan280">formally</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(166.52344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text286"><tspan
           x="0 4.4453125 12.445312 20.445312 24.890625 29.335938"
           y="0"
           id="tspan284">invite</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(207.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text290"><tspan
           x="0 8 16"
           y="0"
           id="tspan288">you</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(236.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text294"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan292">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(254.40625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text298"><tspan
           x="0"
           y="0"
           id="tspan296">a</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(266.50781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text302"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875"
           y="0"
           id="tspan300">stakeholder</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(345.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text306"><tspan
           x="0 12.445312 19.546875 26.648438 31.09375 35.539062 43.539062"
           y="0"
           id="tspan304">meeting</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(401.79688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text310"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan308">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(419.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text314"><tspan
           x="0 5.328125 13.328125 18.65625 23.101562 31.101562 38.203125 43.53125 50.632812 58.632812 65.734375"
           y="0"
           id="tspan312">furtherance</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(497.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text318"><tspan
           x="0 8"
           y="0"
           id="tspan316">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(515.40625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text322"><tspan
           x="0"
           y="0"
           id="tspan320">a</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(527.50781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text326"><tspan
           x="0 5.328125 12.429688 18.65625 25.757812 32.859375 38.1875 45.289062"
           y="0"
           id="tspan324">research</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(585.79688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text330"><tspan
           x="0 4.4453125 8.890625 13.335938 17.78125 24.882812 32.882812"
           y="0"
           id="tspan328">titled:</tspan></text>
    </g>
    <g
       id="g332"
       transform="matrix(0.75,0,0,0.75,72,323.27945)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text336"><tspan
           x="0 7.1015625 17.773438 25.773438 31.101562 42.65625 49.757812 55.984375 60.429688 68.429688"
           y="0"
           id="tspan334">“Co-Design</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(84.429688,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text340"><tspan
           x="0 8"
           y="0"
           id="tspan338">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(105.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text344"><tspan
           x="0 11.554688 16.882812 22.210938 33.765625 39.09375 43.539062 51.539062 58.640625"
           y="0"
           id="tspan342">AI-Driven</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(180.39844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text348"><tspan
           x="0 11.554688 19.554688 26.65625 31.984375 43.539062 50.640625 57.742188 62.1875 66.632812"
           y="0"
           id="tspan346">One-Health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(263.03125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text352"><tspan
           x="0 8.8984375 16.898438 22.226562 30.226562 37.328125 41.773438 46.21875 50.664062 57.765625 65.765625 72.867188"
           y="0"
           id="tspan350">Surveillance</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(351,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text356"><tspan
           x="0 5.328125 16.882812 28.4375 39.992188 48.890625"
           y="0"
           id="tspan354">(DOHS)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(412.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text360"><tspan
           x="0 8.8984375 16.898438 23.125 27.570312 34.671875"
           y="0"
           id="tspan358">System</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(466.33594,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text364"><tspan
           x="0 5.328125 13.328125"
           y="0"
           id="tspan362">for</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(491.99219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text368"><tspan
           x="0 9.7734375 17.773438 25.773438 32.875 40.875 47.976562 55.078125"
           y="0"
           id="tspan366">Enhanced</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(562.07031,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text372"><tspan
           x="0 9.7734375 17.773438 22.21875 30.21875 37.320312 49.765625 54.210938"
           y="0"
           id="tspan370">Epidemic</tspan></text>
    </g>
    <g
       id="g374"
       transform="matrix(0.75,0,0,0.75,72,339.1481)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text378"><tspan
           x="0 5.328125 13.328125 17.773438 24.875 29.320312 33.765625 38.210938 46.210938 53.3125 61.3125 68.414062"
           y="0"
           id="tspan376">Intelligence</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(81.515625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text382"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan380">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(110.61719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text386"><tspan
           x="0 11.554688 19.554688 24 32 37.328125 44.429688 51.53125"
           y="0"
           id="tspan384">Outbreak</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(176.14844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text390"><tspan
           x="0 10.671875 17.773438 24 32 40 48 54.226562 61.328125 68.429688"
           y="0"
           id="tspan388">Response”.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(260.57813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text394"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan392">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(291.45313,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text398"><tspan
           x="0 5.328125 12.429688 18.65625 25.757812 32.859375 38.1875 45.289062"
           y="0"
           id="tspan396">research</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(350.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text402"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan400">which</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(394.84375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text406"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan404">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(410.51563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text410"><tspan
           x="0 9.7734375 19.546875 29.320312 38.21875 46.21875 54.21875"
           y="0"
           id="tspan408">TETFund</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(477.73438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text414"><tspan
           x="0 6.2265625 14.226562 22.226562 30.226562 36.453125 44.453125 49.78125 56.882812"
           y="0"
           id="tspan412">sponsored</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(547.61719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text418"><tspan
           x="0 5.328125 12.429688 20.429688 28.429688 32.875 38.203125 45.304688"
           y="0"
           id="tspan416">requires</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(604.14844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text422"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan420">the</tspan></text>
    </g>
    <g
       id="g424"
       transform="matrix(0.75,0,0,0.75,72,355.01675)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text428"><tspan
           x="0 4.4453125 12.445312 20.445312 28.445312"
           y="0"
           id="tspan426">input</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(39.890625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text432"><tspan
           x="0 8"
           y="0"
           id="tspan430">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(60.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text436"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875 73.75"
           y="0"
           id="tspan434">stakeholders</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(147.19531,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text440"><tspan
           x="0 4.4453125 12.445312 20.445312 28.445312 32.890625 40.890625 47.992188"
           y="0"
           id="tspan438">involved</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(210.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text444"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan442">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(229.63281,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text448"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan446">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(256.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text452"><tspan
           x="0 11.554688 19.554688 26.65625 31.984375 43.539062 50.640625 57.742188 62.1875 66.632812"
           y="0"
           id="tspan450">One-Health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(337.8125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text456"><tspan
           x="0 4.4453125 16.890625 24.890625 29.335938 36.4375 48.882812 55.984375 63.984375 68.429688 75.53125 79.976562 84.421875 92.421875"
           y="0"
           id="tspan454">implementation</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(445.23438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text460"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan458">in</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(464.67969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text464"><tspan
           x="0 11.554688 16 24 31.101562 36.429688 40.875"
           y="0"
           id="tspan462">Nigeria</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(519.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text468"><tspan
           x="0 8 13.328125 20.429688 31.984375"
           y="0"
           id="tspan466">drawn</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(566.64063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text472"><tspan
           x="0 5.328125 10.65625 18.65625"
           y="0"
           id="tspan470">from</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(603.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text476"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan474">the</tspan></text>
    </g>
    <g
       id="g478"
       transform="matrix(0.75,0,0,0.75,72,370.88541)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text482"><tspan
           x="0 8 16 28.445312 35.546875 43.546875"
           y="0"
           id="tspan480">human,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(51.546875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text486"><tspan
           x="0 7.1015625 15.101562 19.546875 31.992188 39.09375"
           y="0"
           id="tspan484">animal</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(99.085938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text490"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan488">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(126.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text494"><tspan
           x="0 7.1015625 15.101562 23.101562 27.546875 32.875 40.875 48.875 61.320312 68.421875 76.421875 80.867188 87.96875"
           y="0"
           id="tspan492">environmental</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(222.60156,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text498"><tspan
           x="0 8 15.101562 22.203125 26.648438 31.09375"
           y="0"
           id="tspan496">health</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(265.69531,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text502"><tspan
           x="0 6.2265625 13.328125 20.429688 24.875 32.875 38.203125 44.429688"
           y="0"
           id="tspan500">sectors.</tspan></text>
    </g>
    <g
       id="g504"
       transform="matrix(0.75,0,0,0.75,72,396.75409)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text508"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan506">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(29.875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text512"><tspan
           x="0 6.2265625 10.671875 17.773438 25.773438 32.875 40.875 48.875 53.320312 61.320312 68.421875"
           y="0"
           id="tspan510">stakeholder</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(108.625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text516"><tspan
           x="0 12.445312 19.546875 26.648438 31.09375 35.539062 43.539062"
           y="0"
           id="tspan514">meeting</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(165.16406,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text520"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan518">which</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(209.26563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text524"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan522">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(239.15625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text528"><tspan
           x="0 8"
           y="0"
           id="tspan526">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(259.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text532"><tspan
           x="0 8 16 24 29.328125 33.773438"
           y="0"
           id="tspan530">hybrid</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(306.03125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text536"><tspan
           x="0 5.328125 9.7734375 17.773438 23.101562 31.101562 38.203125 43.53125 49.757812 57.757812"
           y="0"
           id="tspan534">(in-person</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(376.78906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text540"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan538">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(404.89063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text544"><tspan
           x="0 8 12.445312 17.773438 22.21875 30.21875 37.320312 41.765625"
           y="0"
           id="tspan542">virtual)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(456.98438,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text548"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan546">is</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(472.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text552"><tspan
           x="0 6.2265625 13.328125 21.328125 28.429688 36.429688 44.429688 48.875 55.976562"
           y="0"
           id="tspan550">scheduled</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(541.63281,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text556"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan554">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(559.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text560"><tspan
           x="0 8"
           y="0"
           id="tspan558">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text564"><tspan
           x="0 8 15.101562 19.546875"
           y="0"
           id="tspan562">held</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(609.72656,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text568"><tspan
           x="0 7.1015625"
           y="0"
           id="tspan566">as</tspan></text>
    </g>
    <g
       id="g570"
       transform="matrix(0.75,0,0,0.75,72,412.62274)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text574"><tspan
           x="0 5.328125 13.328125 17.773438 22.21875 30.21875 41.773438 48"
           y="0"
           id="tspan572">follows:</tspan></text>
    </g>
    <g
       id="g576"
       transform="matrix(0.75,0,0,0.75,72,438.49136)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text580"><tspan
           x="0 11.554688 19.554688 24 31.101562"
           y="0"
           id="tspan578">Date:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text584"><tspan
           x="0"
           y="0"
           id="tspan582">5</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(152,8.8660154)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:9.6px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text588"><tspan
           x="0 2.665451"
           y="0"
           id="tspan586">th</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(164.00104,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text592"><tspan
           x="0 11.554688 18.65625 25.757812 32.859375 45.304688 53.304688 60.40625 65.75"
           y="0"
           id="tspan590">December,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(237.75104,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text596"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan594">2024</tspan></text>
    </g>
    <g
       id="g598"
       transform="matrix(0.75,0,0,0.75,72,454.36002)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text602"><tspan
           x="0 8.8984375 16 24.898438 33.796875"
           y="0"
           id="tspan600">Venue</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(44.898438,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text606"><tspan
           x="0 5.328125 15.101562 24 31.101562 37.328125 41.773438 48.875 56.875 61.320312 66.648438"
           y="0"
           id="tspan604">(Physical):</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text610"><tspan
           x="0 10.671875 16.898438 21.34375 25.789062 31.117188 35.5625 42.664062 47.109375 55.109375"
           y="0"
           id="tspan608">Artificial</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(215.55469,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text614"><tspan
           x="0 6.2265625 15.125 19.570312 26.671875 31.117188 35.5625 40.007812 48.007812 55.109375 64.007812 71.109375"
           y="0"
           id="tspan612">Intelligence</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(305.76563,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text618"><tspan
           x="0 9.7734375 17.773438 25.773438"
           y="0"
           id="tspan616">Lab,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(346.53906,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text622"><tspan
           x="0 11.554688 18.65625 26.65625 34.65625 40.882812 45.328125 57.773438 64.875 73.773438"
           y="0"
           id="tspan620">Department</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(435.75781,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text626"><tspan
           x="0 8"
           y="0"
           id="tspan624">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(460.08594,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text630"><tspan
           x="0 10.671875 18.671875 31.117188 39.117188 48.015625 52.460938 59.5625"
           y="0"
           id="tspan628">Computer</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(536.875,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text634"><tspan
           x="0 10.671875 19.570312 27.570312 32.015625 40.914062 48.015625 55.117188 61.34375 65.789062 74.6875 82.6875"
           y="0"
           id="tspan632">Engineering,</tspan></text>
    </g>
    <g
       id="g636"
       transform="matrix(0.75,0,0,0.75,72,470.22867)">
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text640"><tspan
           x="0 10.671875 18.671875 25.773438 34.671875 39.117188 43.5625"
           y="0"
           id="tspan638">Faculty</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(201.66406,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text644"><tspan
           x="0 8"
           y="0"
           id="tspan642">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(221.99219,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text648"><tspan
           x="0 10.671875 19.570312 27.570312 32.015625 40.914062 48.015625 55.117188 61.34375 65.789062 74.6875 82.6875"
           y="0"
           id="tspan646">Engineering,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(315.67969,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text652"><tspan
           x="0 11.554688 20.453125 24.898438 32 39.101562 45.328125 51.554688 56 60.445312"
           y="0"
           id="tspan650">University</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(389.22656,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text656"><tspan
           x="0 8"
           y="0"
           id="tspan654">of</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(408.55469,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text660"><tspan
           x="0 10.671875 17.773438 26.671875 31.117188 40.015625"
           y="0"
           id="tspan658">Benin,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(458.57031,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text664"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 46.226562"
           y="0"
           id="tspan662">Ugbowo</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(518.79688,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text668"><tspan
           x="0 10.671875 18.671875 31.117188 39.117188 48.015625 54.242188"
           y="0"
           id="tspan666">Campus,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(583.03906,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text672"><tspan
           x="0 10.671875 17.773438 26.671875 31.117188"
           y="0"
           id="tspan670">Benin</tspan></text>
    </g>
    <g
       id="g674"
       transform="matrix(0.75,0,0,0.75,72,486.09732)">
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text678"><tspan
           x="0 10.671875 15.117188 19.5625 26.070312"
           y="0"
           id="tspan676">City,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.07031,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text682"><tspan
           x="0 10.671875 18.671875"
           y="0"
           id="tspan680">Edo</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(208.74219,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text686"><tspan
           x="0 8.8984375 13.34375 21.34375 25.789062 32.890625"
           y="0"
           id="tspan684">State.</tspan></text>
    </g>
    <g
       id="g688"
       transform="matrix(0.75,0,0,0.75,72,501.96597)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text692"><tspan
           x="0 8.8984375 16 24.898438 33.796875"
           y="0"
           id="tspan690">Venue</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(44.898438,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text696"><tspan
           x="0 5.328125 15.117188 19.5625 25.789062 30.234375 39.132812 47.132812 51.578125 56.90625"
           y="0"
           id="tspan694">(Virtual):</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text700"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 40"
           y="0"
           id="tspan698">Google</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(195.10156,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text704"><tspan
           x="0 14.226562 21.328125 28.429688"
           y="0"
           id="tspan702">Meet</tspan></text>
    </g>
    <g
       id="g706"
       transform="matrix(0.75,0,0,0.75,72,517.83459)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text710"><tspan
           x="0 9.1796875 13.625 26.070312 33.171875"
           y="0"
           id="tspan708">Time:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text714"><tspan
           x="0 8"
           y="0"
           id="tspan712">10</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(164,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text718"><tspan
           x="0 8"
           y="0"
           id="tspan716">am</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(188.44531,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text722"><tspan
           x="0 8 14.226562 22.226562 34.671875 42.671875 47.117188"
           y="0"
           id="tspan720">prompt.</tspan></text>
    </g>
    <g
       id="g724"
       transform="matrix(0.75,0,0,0.75,72,533.70325)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text728"><tspan
           x="0 10.671875 17.773438 25.773438 30.21875 36.445312 40.890625 47.117188 55.117188 59.5625 64.007812 72.007812 80.90625"
           y="0"
           id="tspan726">Registration:</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(144,14.9375)"
         style="font-style:italic;font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldItalicMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text732"><tspan
           x="0 8.8984375 13.34375 17.789062 25.789062 32.015625 37.34375 41.789062 46.234375 56.90625 67.578125 77.65625 81.65625 92.328125 101.22656 105.67188 110.11719 117.21875 127.89062 135.89062 140.33594 147.4375 153.66406 159.89062 166.99219 173.21875 180.32031 188.32031 194.54688 201.64844 210.54688 218.54688 224.77344 232.77344 241.67188 249.67188 253.67188 260.77344 268.77344 281.21875 285.66406 291.89062 297.21875 301.66406 309.66406 317.66406 325.66406"
           y="0"
           id="tspan730">https://www.whitewaterresearchgroup.com/sft2024</tspan></text>
    </g>
    <g
       id="g734"
       transform="matrix(0.75,0,0,0.75,72,575.44055)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text738"><tspan
           x="0 9.7734375 17.773438"
           y="0"
           id="tspan736">The</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(32.875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text742"><tspan
           x="0 11.554688 19.554688 27.554688 35.554688 40"
           y="0"
           id="tspan740">Google</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(86.976563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text746"><tspan
           x="0 14.226562 21.328125 28.429688"
           y="0"
           id="tspan744">Meet</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(126.85156,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text750"><tspan
           x="0 4.4453125 8.890625 16.890625"
           y="0"
           id="tspan748">link</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(158.74219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text754"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan752">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.1875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text758"><tspan
           x="0 4.4453125 12.445312 16.890625"
           y="0"
           id="tspan756">join</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(210.07813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text762"><tspan
           x="0 8 12.445312 17.773438 22.21875 30.21875 37.320312 41.765625 46.210938"
           y="0"
           id="tspan760">virtually</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(271.28906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text766"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan764">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(303.17969,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text770"><tspan
           x="0 8"
           y="0"
           id="tspan768">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(325.28125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text774"><tspan
           x="0 7.1015625 15.101562 22.203125 26.648438 31.09375 38.195312 46.195312 50.640625"
           y="0"
           id="tspan772">available</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(390.02344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text778"><tspan
           x="0 8"
           y="0"
           id="tspan776">on</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(413.02344,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text782"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan780">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(439.57031,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text786"><tspan
           x="0 5.328125 12.429688 20.429688 24.875 31.101562 35.546875 40.875 47.976562 52.421875 56.867188 64.867188"
           y="0"
           id="tspan784">registration</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(519.4375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text790"><tspan
           x="0 6.2265625 10.671875 15.117188"
           y="0"
           id="tspan788">site</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(548.65625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text794"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan792">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(578.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text798"><tspan
           x="0 6.2265625 13.328125 21.328125"
           y="0"
           id="tspan796">sent</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(611.53125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text802"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan800">to</tspan></text>
    </g>
    <g
       id="g804"
       transform="matrix(0.75,0,0,0.75,72,591.3092)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text808"><tspan
           x="0 5.328125 12.429688 20.429688 24.875 31.101562 35.546875 42.648438 47.976562 55.078125"
           y="0"
           id="tspan806">registered</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(70.078125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text812"><tspan
           x="0 8 15.101562 20.429688 24.875 29.320312 36.421875 40.867188 48.867188 55.96875 63.96875 68.414062"
           y="0"
           id="tspan810">participants</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(151.71875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text816"><tspan
           x="0 8 12.445312"
           y="0"
           id="tspan814">via</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(178.26563,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text820"><tspan
           x="0 7.1015625 19.546875 26.648438 31.09375"
           y="0"
           id="tspan818">email</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(220.80469,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text824"><tspan
           x="0 4.4453125 16"
           y="0"
           id="tspan822">two</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(251.80469,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text828"><tspan
           x="0 5.328125 13.328125"
           y="0"
           id="tspan826">(2)</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(277.46094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text832"><tspan
           x="0 11.554688 19.554688 24.882812 32.882812 37.328125 45.328125"
           y="0"
           id="tspan830">working</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(337.78906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text836"><tspan
           x="0 8 15.101562 23.101562"
           y="0"
           id="tspan834">days</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(374.11719,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text840"><tspan
           x="0 4.4453125"
           y="0"
           id="tspan838">to</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(393.5625,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text844"><tspan
           x="0 4.4453125 12.445312"
           y="0"
           id="tspan842">the</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(419.10938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text848"><tspan
           x="0 7.1015625 15.101562 22.203125 30.203125 34.648438"
           y="0"
           id="tspan846">event.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(469.75781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text852"><tspan
           x="0 9.953125 17.953125 25.953125"
           y="0"
           id="tspan850">Your</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(507.03906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text856"><tspan
           x="0 7.1015625 11.546875 15.992188 23.09375 31.09375 39.09375 46.195312 54.195312 61.296875 68.398438"
           y="0"
           id="tspan854">attendance,</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(585.4375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text860"><tspan
           x="0 7.1015625 14.203125 18.648438 23.09375 31.09375"
           y="0"
           id="tspan858">active</tspan></text>
    </g>
    <g
       id="g862"
       transform="matrix(0.75,0,0,0.75,72,607.17786)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text866"><tspan
           x="0 8 15.101562 20.429688 24.875 29.320312 36.421875 40.867188 48.867188 55.96875 60.414062 64.859375 72.859375"
           y="0"
           id="tspan864">participation</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(84.859375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text870"><tspan
           x="0 7.1015625 15.101562"
           y="0"
           id="tspan868">and</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(111.96094,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text874"><tspan
           x="0 7.1015625 15.101562 23.101562 27.546875 32.875 37.320312 45.320312 53.320312 57.765625 62.210938 70.210938 78.210938"
           y="0"
           id="tspan872">contributions</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(200.39844,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text878"><tspan
           x="0 11.554688 16 20.445312"
           y="0"
           id="tspan876">will</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(229.28906,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text882"><tspan
           x="0 8"
           y="0"
           id="tspan880">be</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(248.39063,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text886"><tspan
           x="0 8 12.445312 20.445312 28.445312 32.890625"
           y="0"
           id="tspan884">highly</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(293.28125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text890"><tspan
           x="0 7.1015625 15.101562 23.101562 28.429688 35.53125 42.632812 47.078125 54.179688 58.625 65.726562 73.726562"
           y="0"
           id="tspan888">appreciated.</tspan></text>
    </g>
    <g
       id="g892"
       transform="matrix(0.75,0,0,0.75,72,633.04657)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text896"><tspan
           x="0"
           y="0"
           id="tspan894">I</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(9.328125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text900"><tspan
           x="0 6.2265625 10.671875 18.671875 25.773438 32.875 38.203125 45.304688 49.75"
           y="0"
           id="tspan898">sincerely</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(71.078125,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text904"><tspan
           x="0 7.1015625 15.101562 19.546875 23.992188 31.09375 35.539062 43.539062 50.640625 55.085938"
           y="0"
           id="tspan902">anticipate</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(137.26562,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text908"><tspan
           x="0 8 16 24"
           y="0"
           id="tspan906">your</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(170.59375,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text912"><tspan
           x="0 8 16 22.226562 26.671875 31.117188 35.5625 43.5625"
           y="0"
           id="tspan910">positive</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(225.25781,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text916"><tspan
           x="0 5.328125 12.429688 18.65625 26.65625 34.65625 42.65625 48.882812"
           y="0"
           id="tspan914">response</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(285.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text920"><tspan
           x="0 8"
           y="0"
           id="tspan918">on</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(305.24219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text924"><tspan
           x="0 4.4453125 12.445312 16.890625"
           y="0"
           id="tspan922">this</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(332.35938,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text928"><tspan
           x="0 12.445312 19.546875 23.992188 28.4375 35.539062 39.984375"
           y="0"
           id="tspan926">matter.</tspan></text>
    </g>
    <g
       id="g930"
       transform="matrix(0.75,0,0,0.75,72,658.91516)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text934"><tspan
           x="0 9.953125 17.953125 25.953125 31.28125"
           y="0"
           id="tspan932">Yours</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(41.507813,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text938"><tspan
           x="0 8.8984375 13.34375 21.34375 28.445312 35.546875 40.875 47.976562 52.421875 59.382812"
           y="0"
           id="tspan936">Sincerely,</tspan></text>
    </g>
    <g
       id="g940"
       transform="matrix(0.75,0,0,0.75,72,700.65247)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text944"><tspan
           x="0 9.7734375 17.773438 25.773438 30.21875"
           y="0"
           id="tspan942">Engr.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(38.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text948"><tspan
           x="0 11.554688 16"
           y="0"
           id="tspan946">Dr.</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(62.21875,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text952"><tspan
           x="0 9.7734375 17.773438 25.773438 33.773438 41.773438 49.773438 57.773438 65.773438"
           y="0"
           id="tspan950">Edoghogho</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(139.99219,14.9375)"
         style="font-variant:normal;font-weight:normal;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPSMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text956"><tspan
           x="0 11.554688 21.328125 31.414062 42.96875"
           y="0"
           id="tspan954">OLAYE</tspan></text>
    </g>
    <g
       id="g958"
       transform="matrix(0.75,0,0,0.75,72,716.52112)">
      <text
         xml:space="preserve"
         transform="translate(0,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text962"><tspan
           x="0 9.7734375 16.875 21.320312 30.21875 37.320312 41.765625 50.664062 58.664062"
           y="0"
           id="tspan960">Principal</tspan></text>
      <text
         xml:space="preserve"
         transform="translate(67.109375,14.9375)"
         style="font-variant:normal;font-weight:bold;font-size:16px;font-family:'Times New Roman';-inkscape-font-specification:TimesNewRomanPS-BoldMT;writing-mode:lr-tb;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
         id="text966"><tspan
           x="0 6.2265625 15.125 23.125 30.226562 36.453125 41.78125 46.226562 54.226562 62.226562 67.554688 75.554688"
           y="0"
           id="tspan964">Investigator</tspan></text>
    </g>
    <g
       id="g968">
      <g
         id="g970"
         clip-path="url(#clipPath974)">
        <g
           id="g976"
           transform="matrix(106.50001,0,0,-46.5,498,82.5)">
          <image
             width="1"
             height="1"
             style="image-rendering:optimizeSpeed"
             preserveAspectRatio="none"
             transform="matrix(1,0,0,-1,0,1)"
             xlink:href="data:image/png;base64,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"
             mask="url(#mask978)"
             id="image982" />
        </g>
      </g>
    </g>
  </g>
</svg>

</div>
</body>
</html>

    `;

    // Create a temporary container for the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-10000px'; // Move it off-screen
    document.body.appendChild(tempDiv);

    try {
      // Convert the HTML content to a canvas
      const canvas = await html2canvas(tempDiv, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save('document.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } 
  
};
