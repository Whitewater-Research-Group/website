import React from "react";
import { BiRightArrow } from "react-icons/bi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackgroundImage from "../../assets/office.png";
import PersonalizedInvitation from "../../components/Invitation";
import { ArrowRight, ArrowRightCircle } from 'lucide-react';
import AboutSection from "../../components/About";
import Researches from "../../components/Researches";
import WhyChooseUs from "../../components/Why";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="relative min-h-screen flex items-center py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-subtle-zoom"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:pr-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 font-medium text-sm animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse" />
                  Research & Innovation Hub
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up [animation-delay:200ms]">
                Driving Innovation and Impact
                <span className="block text-orange-400">
                  Nigeria to the World
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
                The White Water Research Group is a Nigerian-based collective of
                passionate innovators and problem-solvers dedicated to addressing
                real-world challenges across various aspects of life.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up [animation-delay:600ms]">
                <a
                  href="/contact"
                  className="group inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg 
                    hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  <span className="font-medium">Get in Touch</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="/events"
                  className="group inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg 
                    hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="font-medium">Learn More</span>
                  <ArrowRightCircle className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats/Features Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 animate-fade-in-up [animation-delay:800ms]">
            {[
              { number: '10+', label: 'Research Projects' },
              { number: '50+', label: 'Team Members' },
              { number: '15+', label: 'Publications' },
              { number: '3+', label: 'Global Partners' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute -bottom-8 left-0 w-full">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 30L60 25C120 20 240 10 360 15C480 20 600 40 720 45C840 50 960 40 1080 35C1200 30 1320 30 1380 30L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V30Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>

    <AboutSection/>
    <Researches/>
    <WhyChooseUs/>
    <div className="bg-gradient-to-r from-[#CD5E49] to-[#E07A5F] text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">📢 Don't Miss Out on Our Upcoming Conference!</h2>
    <p className="text-lg mb-6">Join thought leaders, innovators, and experts as we explore groundbreaking solutions to today's challenges.</p>
    <a
                  href="/events"
                  className="group inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg 
                    hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="font-medium">Register Now</span>
                  <ArrowRightCircle className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
    </div>
</div>



      <Footer />
    </div>
  );
}



export default Home;
