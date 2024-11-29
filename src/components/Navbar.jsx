import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/sft2024", label: "SFT 2024" },

  ];

  return (
    <header
      className={`left-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"}
      ${isOpen ? "bg-white" : ""}`}
    >
      <div className="container mx-auto px-4 max-w-screen-xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to='/'>
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-14 md:h-18 lg:h-24" />
          </div>
          </NavLink>
          

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-base transition-colors duration-200 hover:text-steelBlue
                  ${
                    isActive
                      ? "text-steelBlue font-semibold"
                      : "text-darkCharcoal"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="/contact"
              className="px-6 py-2 bg-[#CD5E49] text-white rounded-full font-medium 
                transition-all duration-200 hover:bg-turquoiseBlue/90 hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-200 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-darkCharcoal" />
            ) : (
              <Menu className="w-6 h-6 text-darkCharcoal" />
            )}
          </button>

          {/* Mobile Menu */}

          <div
            className={`fixed inset-0 bg-white lg:hidden z-30 transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-xl transition-colors duration-200 hover:text-steelBlue
                    ${
                      isActive
                        ? "text-steelBlue font-semibold"
                        : "text-darkCharcoal"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="/contact"
                className="px-8 py-3 bg-[#CD5E49] text-white rounded-full font-medium 
                  transition-all duration-200 hover:bg-turquoiseBlue/90 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Contact Us
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
