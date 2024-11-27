import React, { useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock, Waves } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    }, 1500);
  };

  return (

    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-[#dd6952] to-[#CD5E49]">
      {/* Hero Section */}
      <div className="bg-[#CD5E49] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-2 mb-4">
            <Waves size={32} />
            <h1 className="text-4xl font-bold">Get in Touch</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Have questions about our White Water Research Group? We'd love to hear from you. 
            Our team of experts is ready to assist with your inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-50 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#CD5E49] mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Our Location</h3>
                    <p className="text-white">
                      Department Of Computer Engineering<br />
                      University of Benin Ugbowo<br />
                      Edo State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-[#CD5E49] mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Phone</h3>
                    <p className="text-white">+234(0) 802 291 8109</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-[#CD5E49] mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Email</h3>
                    <p className="text-white">eddie.olaye@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
              <ul className="space-y-2 mx-10">
                <li>
                  <a href="/about" className="text-black">About </a>
                </li>
                
                <li>
                  <a href="/events" className="text-black">Events</a>
                </li>
               
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d74a2e] focus:border-[#d74a2e]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d74a2e] focus:border-[#d74a2e]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d74a2e] focus:border-[#d74a2e]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d74a2e] focus:border-[#d74a2e]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#CD5E49] text-white py-3 px-6 rounded-md hover:bg-[#d74a2e] focus:outline-none focus:ring-2 focus:ring-[#d74a2e] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
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
};

export default ContactPage;