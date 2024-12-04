import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Users, Mail, Link2, Twitter } from 'lucide-react';
import PersonalizedInvitation from "../../components/Invitation";

function About() {

    const [hoveredId, setHoveredId] = useState(null);

    const researchers = [
      {
        id: 1,
        name: "Dr. E. Olaye",
        role: "Principal Investigator",
        specialty: "Research Leadership",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Leading research initiatives in healthcare innovation with over 15 years of experience.",
        email: "e.olaye@example.com",
        twitter: "@DrOlaye",
        website: "/researchers/eddie"
      },
      {
        id: 2,
        name: "Dr. Omorodion Irowa",
        role: "Surgeon",
        specialty: "Surgical Sciences",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Specializing in advanced surgical procedures and medical research.",
        email: "o.irowa@example.com",
        twitter: "@DrIrowa",
        website: "example.com/dr-irowa"
      },
      {
        id: 3,
        name: "Dr. O. Dele-Ogbeide",
        role: "Data Scientist",
        specialty: "Healthcare Analytics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Expertise in applying data science to improve healthcare outcomes.",
        email: "o.dele@example.com",
        twitter: "@DrDele",
        website: "example.com/dr-dele"
      },
      {
        id: 4,
        name: "Dr. Prudence Ehizuenlen",
        role: "Co-Researcher",
        specialty: "Clinical Research",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Focused on bridging clinical practice and research methodologies.",
        email: "p.ehizuenlen@example.com",
        twitter: "@DrPrudence",
        website: "example.com/dr-prudence"
      },
      {
        id: 5,
        name: "Engr. Moses Omosigho",
        role: "Co-Researcher",
        specialty: "Biomedical Engineering",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Bringing engineering expertise to medical research applications.",
        email: "m.omosigho@example.com",
        twitter: "@EngrMoses",
        website: "example.com/engr-moses"
      },
      {
        id: 6,
        name: "Dr. Florence Elei",
        role: "Co-Researcher",
        specialty: "Public Health",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Dedicated to improving public health through research and practice.",
        email: "f.elei@example.com",
        twitter: "@DrElei",
        website: "example.com/dr-elei"
      },
      {
        id: 7,
        name: "Dr. Abraham Zirra",
        role: "Co-Researcher",
        specialty: "Epidemiology",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Studying disease patterns and healthcare interventions.",
        email: "a.zirra@example.com",
        twitter: "@DrZirra",
        website: "example.com/dr-zirra"
      },
      {
        id: 8,
        name: "Mr. Yusuf Mshelia",
        role: "Co-Researcher",
        specialty: "Research Methodology",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s",
        bio: "Expert in research design and implementation strategies.",
        email: "y.mshelia@example.com",
        twitter: "@YusufMshelia",
        website: "example.com/y-mshelia"
      }
    ];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-[#E07A5F]" />
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E07A5F] to-[#ee4415]">
              Meet the Researchers
            </h2>
          </div>
          <p className="text-lg lg:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Introducing the dedicated researchers and experts under the White Water Research Group
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {researchers.map((researcher) => (
            <div
              key={researcher.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden 
                transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(researcher.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
           
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={researcher.image}
                  alt={researcher.name}
                  className="w-full h-64 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <span className="inline-block px-3 py-1 bg-[#E07A5F] text-white text-sm rounded-full mb-2">
                    {researcher.specialty}
                  </span>
                </div> */}
              </div>

              <div className="p-6">

                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#E07A5F] 
                  transition-colors duration-300">
                  {researcher.name}
                </h3>
                <p className="text-[#E07A5F] font-medium mt-1">{researcher.role}</p>
                <p className="mt-3 text-gray-600 text-sm line-clamp-2">{researcher.bio}</p>

                <div className="mt-6 flex items-center gap-4">
                  <a href={`mailto:${researcher.email}`} 
                     className="text-gray-600 hover:text-[#E07A5F] transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href={`https://twitter.com/${researcher.twitter}`} 
                     className="text-gray-600 hover:text-[#E07A5F] transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={`${researcher.website}`} 
                     className="text-gray-600 hover:text-[#E07A5F] transition-colors">
                    <Link2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


      <Footer />
    </div>
  );
}

export default About;
