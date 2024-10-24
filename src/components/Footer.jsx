// eslint-disable-next-line no-unused-vars
import React from 'react';
import Facebook from '../assets/facebook_icon.png';
import Instagram from '../assets/instagram_icon.png';
import Twitter from '../assets/twitter_icon.png';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="mt-10 grid grid-cols-2">
                <div className='ml-20'>
                    <h4 className="font-primary text-3xl text-white font-bold mb-4">WWRG</h4>
                    <p className="text-white font-manrope text-sm font-light leading-5">
                        Health care refers to the efforts that medical professionals make <br /> to restore our physical and mental well-being.
                        The term also <br /> includes the provision of services to maintain emotional well- <br />being. We call people and organizations
                        that provide these <br /> services health-care providers.

                    </p>
                </div>

                <div className='-ml-60 grid grid-cols-4 '>
                    <div className=''>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Overview</h4>
                        <ul className='text-white font-manrope text-sm font-light'>
                            <li className="mb-2"><a href="#report">Report Generation</a></li>
                            <li className="mb-2"><a href="#map">Surveillance Map</a></li>
                            <li className="mb-2"><a href="#assistance">AI Assistance</a></li>
                            <li className="mb-2"><a href="#analytics">Analytics</a></li>
                            <li className="mb-2"><a href="#analytics">One Health Articles</a></li>
                            <li className="mb-2"><a href="#analytics">One Health Disease Prevention</a></li>
                            <li className="mb-2"><a href="#analytics">Hotlines</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Company</h4>
                        <ul className='text-white font-manrope text-sm font-light'>
                            <li className="mb-2"><a href="#about">Home</a></li>
                            <li className="mb-2"><a href="#about">About Us</a></li>
                            <li className="mb-2"><a href="#services" >Services</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Explore</h4>
                        <ul className='text-white font-manrope text-sm font-light'>
                            <li className="mb-2"><a href="#blog">Blog & Feeds</a></li>
                            <li className="mb-2"><a href="#privacy">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#cookies">Cookies</a></li>
                        </ul>

                        <h4 className="mt-10 text-xl font-manrope text-turquoiseBlue font-bold mb-4">Contact Us</h4>
                        <ul>
                            <li className="mb-2"><a href="#blog" className="font-bold font-primary text-base">+234 123 456 7890</a></li>
                            <li className="mb-2"><a href="#privacy" className="font-bold font-primary text-base">whitewateresearchgroup@gmail.com</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-manrope text-turquoiseBlue font-bold mb-4">Social Media</h4>
                        <div className='flex space-x-5'>
                            <img src={Facebook} alt="Right arrow" className="w-5 h-5 ml-2" />
                            <img src={Instagram} alt="Right arrow" className="w-5 h-5 ml-2" />
                            <img src={Twitter} alt="Right arrow" className="w-5 h-5 ml-2" />
                        </div>
                    </div>
                </div>


            </div>
            <div className="container mx-auto text-center mt-10">
                <p className='text-lightGray font-manrope font-normal text-sm'>Copyright @ Digital OneHealth Surveillance by WWRG 2024</p>
            </div>
        </footer>
    );
}

export default Footer;