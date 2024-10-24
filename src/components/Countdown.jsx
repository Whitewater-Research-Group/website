import React from 'react';

const Countdown = ({ timeLeft }) => {
  return (
    <div className="flex flex-wrap justify-start space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
      {/* Days */}
      <div className="bg-gray-800 text-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg text-center w-20 sm:w-24 md:w-28 lg:w-32">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-xs sm:text-sm md:text-base uppercase">Days</div>
      </div>

      {/* Hours */}
      <div className="bg-gray-800 text-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg text-center w-20 sm:w-24 md:w-28 lg:w-32">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-xs sm:text-sm md:text-base uppercase">Hours</div>
      </div>

      {/* Minutes */}
      <div className="bg-gray-800 text-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg text-center w-20 sm:w-24 md:w-28 lg:w-32">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-xs sm:text-sm md:text-base uppercase">Minutes</div>
      </div>

      {/* Seconds */}
      <div className="bg-gray-800 text-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg text-center w-20 sm:w-24 md:w-28 lg:w-32">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{timeLeft.seconds}</div>
        <div className="text-xs sm:text-sm md:text-base uppercase">Seconds</div>
      </div>
    </div>
  );
}

export default Countdown;
