// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackgroundImage from "../../assets/Pics/1.jpg";

const EventCard = ({ date, title, location, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center justify-center bg-[#CD5E49] text-white rounded-lg p-3 min-w-[80px]">
        <span className="text-2xl font-bold">{date.day}</span>
        <span className="text-sm uppercase">{date.month}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);



function Events() {

  const upcomingEvents = [
    {
      date: { day: "05", month: "Dec" },
      title: "One-Health Stakeholders Engagement Meeting",
      location: "WWRG AI-LAB( Live + Virtual)",
      description: "Join us for an engaging conference dedicated to advancing the One Health approach"
    }
   
   
  ];

 
  return (
    <>

    <Navbar />
    <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
        <a href="/conference">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        </a>
        
        
      </div>
      
      <div className=" relative bg-gradient-to-b from-[#dd6952] to-[#CD5E49] py-16">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transform "
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#dd6952]/70 via-[#CD5E49]/60 to-[#CD5E49]/90" />
      </div>
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Event Info */}
            <div className="text-white">
              <h1 className="text-5xl font-extrabold mb-6">White Water Research Group Events</h1>
              <p className="text-xl mb-8">Join us for groundbreaking research presentations, workshops, and networking opportunities.</p>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4">Why Attend?</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Network with industry experts
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Learn about latest research
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Participate in workshops
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-green-600 mb-6">
                Register for Upcoming Events
              </h3>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 text-lg font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine1" className="block text-gray-700 text-lg font-medium mb-2">
                      Address Line 1
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition-all"
                      placeholder="Enter your primary address"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className="block text-gray-700 text-lg font-medium mb-2">
                      Address Line 2
                    </label>
                    <input
                      id="addressLine2"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition-all"
                      placeholder="Enter additional address details"
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  className="w-full bg-[#E07A5F] hover:bg-[#CD5E49] text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 ease-in-out"
                >
                  Download Invitation Letter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

   
    </div>
    <Footer/>
    </>
  );
}

export default Events;
