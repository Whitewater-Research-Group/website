import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaFilePdf, FaEye } from "react-icons/fa";

const publications = [
  {
    title: "Personalized Governance Strategy for Patient Data in a Digital One Health Surveillance System",
    authors: "Edoghogho Olaye, Imonikosaye Omafovbe, Williams O. Aigbe, Daniel Obuh",
    journal: "International Conference on Digital Sovereignty (ICDS)",
    year: 2025,
    link: "/publications/1",
  },
 
];

const PublicationCard = ({ title, authors, journal, year, link }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 italic">{authors}</p>
    <p className="text-gray-500">{journal}, {year}</p>
    <div className="mt-4 flex gap-3">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#CD5E49] text-white px-4 py-2 rounded-lg hover:bg-[#b24a3c] transition"
      >
        <FaEye /> View
      </a>
      {/* <a
        href={link}
        download
        className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        <FaFilePdf /> Download
      </a> */}
    </div>
  </div>
);

const PublicationsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Publications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication, index) => (
            <PublicationCard key={index} {...publication} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicationsPage;
