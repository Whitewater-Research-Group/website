import React from 'react';
import { Mail, Building, BookOpen, Award, ChevronRight } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Eddie from '../../assets/eddie.png';
const AcademicProfile = () => {
  return (
    <>
  
    
    <Navbar />
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-48">
          <img 
            src={Eddie}
            alt="Profile"
            className="rounded-lg w-48 h-48 object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">Dr. Edoghogho Olaye</h1>
          <p className="text-lg mb-4">
            Senior Lecturer - <a href="#" className="text-[#CD5E49]  hover:underline">Department of Computer Engineering</a>
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Building size={16} />
              <span>University of Benin</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Team Lead - Whitewater Research Group (WWRG)</span>
            </div>
          </div>
        </div>

        {/* Research Areas Section */}
        <div className="md:w-72">
          <h2 className="font-bold mb-3">Research Areas</h2>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center gap-1">
                <ChevronRight size={16} />
                Embedded Systems
              </div>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <ChevronRight size={16} />
                Intelligent Systems
              </div>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <ChevronRight size={16} />
                Software Engineering
              </div>
            </li>
            <li>
              <div className="flex items-center gap-1">
                <ChevronRight size={16} />
                Digital Technology Transition
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Research Grants Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Research Grants</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-2">
              <Award className="mt-1 text-[#CD5E49] " size={20} />
              <div>
                <h3 className="font-semibold">TETFund National Research Fund (NRF) Intervention</h3>
                <p className="text-gray-700">Co-Design of AI-Driven Digital One-Health Surveillance (DOHS) System for Enhanced Epidemic Intelligence and Outbreak Response</p>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-2">
              <Award className="mt-1 text-[#CD5E49] " size={20} />
              <div>
                <h3 className="font-semibold">Nigeria Communications Commission (NCC) Research Grant</h3>
                <p className="text-gray-700">Intelligent Test Mechanism and Management System for Quality of Service (QoS)/Quality of Experience (QoE) in Mobile Communication Networks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Courses Taught</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>• Computer Programming for Engineers</p>
            <p>• Software Engineering</p>
            <p>• Microcomputer Technology</p>
            <p>• Artificial Intelligence</p>
          </div>
          <div className="space-y-2">
            <p>• Digital System Design</p>
            <p>• Simulation and Synthesis</p>
            <p>• Advanced Numerical and Computational Methods</p>
            <p>• Advanced Experimentation/Design</p>
          </div>
        </div>
      </section>

      {/* Research Profile Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Research Profile</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Dr. E. Olaye's research expertise lies in leveraging technology for transitioning manual or analog processes to digital technologies, with a specific focus on embedded systems, intelligent systems, and software engineering.
          </p>
          <p>
            In addition to his teaching roles, Dr. E. Olaye has been actively involved in postgraduate student supervision, mentoring several PhD and Master's students in Computer Engineering. His commitment to education and research is reflected not only in contributions presented in conferences and publications but also in impactful industry collaborations.
          </p>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AcademicProfile;