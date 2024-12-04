import React from 'react';

const Countdown = ({ timeLeft }) => {
  return (
    <div className="grid-cols-2 lg: flex lg:flex-wrap justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 mt-8">
      {/* Time Box */}
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="relative bg-gradient-to-b from-[#663b32] to-[#34110a] text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg text-center w-24 sm:w-28 md:w-32 lg:w-36 shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          {/* Animated SVG */}
          <svg
            className="absolute top-[10px] left-1 transform -translate-x-1/2 w-10 h-10 opacity-75 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" stroke="white" />
            <path d="M12 6v6l4 2" stroke="white" />
          </svg>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">{value}</div>
          <div className="text-sm sm:text-base md:text-lg uppercase tracking-wide mt-1">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
