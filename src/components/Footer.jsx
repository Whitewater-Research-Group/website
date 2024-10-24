
import React from 'react';
import Facebook from '../assets/facebook_icon.png';
import Instagram from '../assets/instagram_icon.png';
import Twitter from '../assets/twitter_icon.png';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 lg:px-20">
                {/* Left Column - Company Info */}
                <div>
                    <h4 className="font-primary text-3xl text-white font-bold mb-4">WWRG</h4>
                    <p className="text-white font-manrope text-sm font-light leading-5">
                        White Water Research Group (WWRG) is a multidisciplinary research organization
                        dedicated to advancing health surveillance, data privacy, and low-tech stakeholder engagement. 
                        Our mission is to develop innovative solutions that address the challenges faced by human, 
                        animal, and environmental health sectors, ultimately driving impactful change across sectors.
                    </p>
                </div>

                {/* Right Column - Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Overview */}
                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Overview</h4>
                        <ul className="text-white font-manrope text-sm font-light">
                            <li className="mb-2"><a href="#report">Report Generation</a></li>
                            <li className="mb-2"><a href="#map">Surveillance Map</a></li>
                            <li className="mb-2"><a href="#assistance">AI Assistance</a></li>
                            <li className="mb-2"><a href="#analytics">Analytics</a></li>
                            <li className="mb-2"><a href="#articles">One Health Articles</a></li>
                            <li className="mb-2"><a href="#prevention">One Health Disease Prevention</a></li>
                            <li className="mb-2"><a href="#hotlines">Hotlines</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Company</h4>
                        <ul className="text-white font-manrope text-sm font-light">
                            <li className="mb-2"><a href="#home">Home</a></li>
                            <li className="mb-2"><a href="#about">About Us</a></li>
                            <li className="mb-2"><a href="#services">Services</a></li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Explore</h4>
                        <ul className="text-white font-manrope text-sm font-light">
                            <li className="mb-2"><a href="#blog">Blog & Feeds</a></li>
                            <li className="mb-2"><a href="#privacy">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#cookies">Cookies</a></li>
                        </ul>

                        <h4 className="mt-10 text-xl font-manrope text-turquoiseBlue font-bold mb-4">Contact Us</h4>
                        <ul>
                            <li className="mb-2"><a href="#contact" className="font-bold font-primary text-base">+234 123 456 7890</a></li>
                            <li className="mb-2"><a href="mailto:whitewaterresearchgroup@gmail.com" className="font-bold font-primary text-base">whitewateresearchgroup@gmail.com</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Social Media</h4>
                        <div className="flex space-x-5">
                            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
                            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                            <img src={Twitter} alt="Twitter" className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container mx-auto text-center mt-10">
                <p className="text-lightGray font-manrope font-normal text-sm">
                    Copyright © WWRG 2024
                </p>
            </div>
        </footer>
    );
}

export default Footer;
