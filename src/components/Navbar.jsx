import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = (isActive, baseClasses) =>
        `${baseClasses} ${isActive ? 'text-steelBlue font-semibold' : ''}`;

    return (
        <header className="bg-white shadow font-primary fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-center max-w-screen-xl sm:flex-row">
                <h1 className="text-3xl font-bold text-darkCharcoal mb-4 md:mb-0">WWRG</h1>
                
                {/* Hamburger Icon */}
                <button
                    className="block md:hidden text-darkCharcoal focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                
                {/* Menu */}
                <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                        <li><NavLink to="/" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>About</NavLink></li>
                        

                        


                        <li><a href="/conference" className="text-darkCharcoal text-base">Conference</a></li>
                        <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdR7yZDcKB87xumPFnOirR8bKJJzDVyEh9d52u6u0K4hCqtcQ/viewform?pli=1" className="text-white text-base font-medium bg-turquoiseBlue rounded-full px-4 py-2">Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
