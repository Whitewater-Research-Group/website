import React from 'react'

const Countdown = ({ timeLeft}) => {
  return (
    <div className="flex space-x-4">
      <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{timeLeft.days}</div>
        <div className="text-sm uppercase">Days</div>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm uppercase">Hours</div>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm uppercase">Minutes</div>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm uppercase">Seconds</div>
      </div>
    </div>
  )
}

export default Countdown