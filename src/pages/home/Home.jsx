import React from 'react';
import Navbar from '../../components/Navbar';
import BackgroundImage from "../../assets/office.png";
import Footer from '../../components/Footer';
function Home() {
  return (
    <>
    <Navbar />

    {/* Hero Section */}
    <div className="relative h-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})`}}
      />
      <div className="relative z-10 mt-20 bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">White Water Research Group</h1>
        <p className="mb-6">
          Welcome to White Water Research Group, where innovation meets excellence. We specialize in cutting-edge software development and advanced research to deliver transformative solutions. Our team of experts combines technical expertise with creative problem-solving to help businesses stay ahead.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Contact us</p>
          <a
            href="#"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>


    <Footer />
    
    </>
  )
}

export default Home