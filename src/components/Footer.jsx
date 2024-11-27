import React from 'react';

import { Send, CheckCircle, MapPin, Phone, Mail, Clock, Waves } from 'lucide-react';

const Footer = () => {
  const brandColor = '#CD5E49';
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      {/* Decorative SVG Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {/* Circular Pattern Top Right */}
        <svg className="absolute -top-20 -right-20 w-64 h-64 transform rotate-45" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke={brandColor} strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke={brandColor} strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={brandColor} strokeWidth="0.5" />
        </svg>
        
        {/* Wavy Lines Bottom Left */}
        <svg className="absolute -bottom-10 -left-10 w-72 h-72" viewBox="0 0 100 100">
          <path
            d="M10,30 Q30,5 50,30 T90,30"
            fill="none"
            stroke={brandColor}
            strokeWidth="0.5"
          />
          <path
            d="M10,40 Q30,15 50,40 T90,40"
            fill="none"
            stroke={brandColor}
            strokeWidth="0.5"
          />
          <path
            d="M10,50 Q30,25 50,50 T90,50"
            fill="none"
            stroke={brandColor}
            strokeWidth="0.5"
          />
        </svg>

        {/* Dots Pattern Center */}
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={brandColor} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-28s">
          {/* Company Info - Spans 4 columns on large screens */}
          <div className="lg:col-span-4">
            <div className="relative">
              <h4 className="font-primary text-4xl font-bold mb-6 relative" style={{ color: brandColor }}>
                WWRG
                {/* Underline SVG */}
                <svg className="absolute -bottom-2 left-0 w-20 h-2">
                  <path
                    d="M0,1 Q5,0 10,1 T20,1 T30,1 T40,1"
                    fill="none"
                    stroke={brandColor}
                    strokeWidth="2"
                  />
                </svg>
              </h4>
            </div>
            <p className="text-gray-300 font-manrope text-sm leading-relaxed mb-6">
              White Water Research Group (WWRG) is a multidisciplinary research organization
              dedicated to advancing health surveillance, data privacy, and low-tech stakeholder engagement. 
              Our mission is to develop innovative solutions that address the challenges faced by human, 
              animal, and environmental health sectors.
            </p>
            
            {/* Social Media Icons with Hover Effects */}
            <div className="flex items-center space-x-4 mt-6">
              {['facebook', 'instagram', 'twitter'].map((platform) => (
                <a
                  key={platform}
                  href={`#${platform}`}
                  className="group relative"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: brandColor }}
                  >
                    {platform === 'facebook' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    )}
                    {platform === 'instagram' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {platform === 'twitter' && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                      </svg>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Spans 8 columns on large screens */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
       
            {/* Company Section */}
            <div className="relative">
              <h4 className="text-xl font-manrope font-bold mb-6 flex items-center gap-2" style={{ color: brandColor }}>
                Company
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </h4>
              <ul className="text-gray-300 font-manrope text-sm space-y-2">
                <li>
                  <a href="#about" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }}></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }}></span>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }}></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="relative">
              <h4 className="text-xl font-manrope font-bold mb-6 flex items-center gap-2" style={{ color: brandColor }}>
                Contact Us
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </h4>
              <div className="text-gray-300 font-manrope text-sm space-y-4">
                <a href="tel:+2341234567890" className="block hover:text-white transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    
                  <Phone className="text-[#CD5E49] mt-1" />
                    <span>+234 802 291 8109</span>
                  </div>
                </a>
                <a href="mailto:info@wwrg.org" className="block hover:text-white transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    
                  <Mail className="text-[#CD5E49] mt-1" />
                    <span>eddie.olaye@gmail.com</span>
                  </div>
                </a>
                <p className="flex items-center gap-2">
                  
                  <MapPin className="text-[#CD5E49] mt-1" />
                  Department Of Computer Engineering<br />
                      University of Benin Ugbowo<br />
                      Edo State, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} White Water Research Group. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/terms" className="text-gray-500 text-sm hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
