import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaFilePdf,
  FaShareAlt,
  FaQuoteRight,
  FaTimes,
  FaLink,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const publication = {
  title:
    "Personalized Governance Strategy for Patient Data in a Digital One Health Surveillance System",
  authors: [
    { name: "Edoghoho Olaye", profile: "/researchers/eddie" },
    { name: "Imonikosaye Omafohve", profile: "#" },
    { name: "Williams O. Aigbe", profile: "#" },
    { name: "Daniel Obuh", profile: "#" },
  ],
  journal: "Procedia Computer Science",
  volume: 254,
  pages: "20-29",
  year: 2025,
  publicationDate: "March 5, 2025",
  doi: "https://doi.org/10.1016/j.procs.2025.02.060",
  abstract: `The integration of personal devices in health surveillance has introduced significant patient data risks. In this research, we developed a Patients’ Personal Data Sovereignty System (PPDSS) to intelligently mask the patient's personal and sensitive data that should not be part of the data for analysis, ensuring these sensitive records do not find its way into machine learning models or to the Local Storage of the Capture Device. The approach presented in this paper is to ensure a high level of privacy and confidentiality for patients’ private health information (such as name, address, age and phone number) from the process of data collection, transmission, and storage to data analysis. The PPDSS is an android application built using new Flutter-based Cross Platform Technology which allows us to target other devices in future with same code base is designed to handle the data masking and elimination of Personal Identifiable Patients Data captured using the device camera before sending to the Machine Learning Models as texts. Records were captured from paper records using the camera on a smartphone installed with PPDSS. The image captured by PPDSS was obfuscated and then converted to text using AI-powered optical character recognition (OCR). The result is a personalized governance strategy of patient data, which ensures personal data privacy, confidentiality, and ethical use while maximizing the benefits of data-driven insights. The paper contributes to data governance by proposing a way of solving the problems at the point of data collection, rather than after the data have been collected.`,
  pdfLink:
    "https://www.sciencedirect.com/science/article/pii/S1877050925004107/pdf?md5=a929c6022fc336dbff8006749e2bb331&pid=1-s2.0-S1877050925004107-main.pdf",
  keywords: [
    "digital sovereignty",
    "data privacy",
    "machine learning",
    "data obfuscation",
    "digital health surveillance",
    "healthcare records",
  ],
 
};

const PublicationDetails = () => {
  const [showCiteModal, setShowCiteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeCitation, setActiveCitation] = useState("apa");

  const citationFormats = {
    apa: `${publication.authors
      .map(
        (a) => a.name.split(" ").pop() + ", " + a.name.split(" ")[0][0] + "."
      )
      .join(", ")} (${publication.year}). ${publication.title}. ${
      publication.journal
    }, ${publication.volume}, ${publication.pages}. ${publication.doi}`,
    mla: `${publication.authors
      .map((a) => a.name.split(" ").pop() + ", " + a.name.split(" ")[0])
      .join(", ")}. "${publication.title}." ${publication.journal}, vol. ${
      publication.volume
    }, ${publication.year}, pp. ${publication.pages}. ${publication.doi.replace(
      "https://doi.org/",
      "DOI: "
    )}`,
    chicago: `${publication.authors
      .map((a) => a.name.split(" ").pop() + ", " + a.name.split(" ")[0])
      .join(", ")}. "${publication.title}." ${publication.journal} ${
      publication.volume
    } (${publication.year}): ${publication.pages}. ${publication.doi}.`,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* SEO Metadata */}
      <head>
        <title>{publication.title} - Research Publications</title>
        <meta
          name="description"
          content={`${publication.title} by ${publication.authors
            .map((a) => a.name)
            .join(", ")} in ${publication.journal}, ${
            publication.year
          }. Read full abstract and access PDF.`}
        />
        <meta property="og:title" content={publication.title} />
        <meta
          property="og:description"
          content={publication.abstract.substring(0, 150) + "..."}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={publication.doi} />
      </head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top sticky navigation for quick access on mobile */}
        <div className="md:hidden sticky top-0 z-10 bg-white shadow-md p-3 -mx-4 mb-6 flex justify-between items-center">
          <div className="flex-1 truncate">
            <h2 className="text-sm font-medium text-gray-900">
              {publication.title}
            </h2>
          </div>
          <div className="flex space-x-2">
            <a
              href={publication.pdfLink}
              className="p-2 bg-red-50 text-red-600 rounded-full"
            >
              <FaFilePdf />
            </a>
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 bg-gray-100 text-gray-600 rounded-full"
            >
              <FaShareAlt />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-full">
              <HiDotsHorizontal />
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8">
           
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {publication.title}
            </h1>

            {/* Authors */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {publication.authors.map((author, index) => (
                <a
                  key={index}
                  href={author.profile}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 transition"
                >
                  {author.name}
                </a>
              ))}
            </div>

            {/* Journal info */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-sm text-gray-600">
              <span className="font-medium text-gray-700">
                {publication.journal}
              </span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>Volume {publication.volume}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>Pages {publication.pages}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>{publication.year}</span>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Published:</span>{" "}
                {publication.publicationDate}
              </div>
              <div className="mt-1">
                <span className="font-medium">DOI:</span>{" "}
                <a
                  href={publication.doi}
                  className="text-blue-600 hover:underline break-words"
                >
                  {publication.doi}
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={publication.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
              >
                <FaFilePdf /> View PDF
              </a>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <FaShareAlt /> Share
              </button>
              <button
                onClick={() => setShowCiteModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                <FaQuoteRight /> Cite
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Content Sections */}
          <div className="p-6 sm:p-8">
            {/* Abstract */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {publication.abstract}
              </p>
            </div>

            {/* Keywords Section */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Citation Modal */}
      {showCiteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Citation</h3>
                <button
                  onClick={() => setShowCiteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex border-b border-gray-200">
                  {Object.keys(citationFormats).map((format) => (
                    <button
                      key={format}
                      className={`px-4 py-2 font-medium text-sm ${
                        activeCitation === format
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveCitation(format)}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">
                    {citationFormats[activeCitation]}
                  </p>
                </div>

                <button
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      citationFormats[activeCitation]
                    );
                    alert("Citation copied to clipboard!");
                  }}
                >
                  Copy Citation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Share</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex space-x-4 justify-center">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      publication.doi
                    )}&text=${encodeURIComponent(publication.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      publication.doi
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Direct Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={publication.doi}
                      readOnly
                      className="flex-1 block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(publication.doi);
                        alert("Link copied to clipboard!");
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaLink className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PublicationDetails;
