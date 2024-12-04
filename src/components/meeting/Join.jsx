import React,{useState, useEffect} from 'react';
import { Video, Calendar, Clock, Users } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Countdown from '../Countdown';
const StakeholderMeeting = () => {


    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      const countdownToNov5 = () => {
        const targetDate = new Date("December 5, 2024 10:00:00").getTime();
        const now = Date.now();
        const timeRemaining = targetDate - now;
    
        if (timeRemaining <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
        return { days, hours, minutes, seconds };
      };
    
      // useEffect to update the countdown every second
      useEffect(() => {
        const updateCountdown = () => {
          const countdownValues = countdownToNov5();
          setCountdown(countdownValues);
        };
    
        updateCountdown(); // Initial call to set countdown
        const interval = setInterval(updateCountdown, 1000); // Update every second
    
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);
    
  const meetingLink = "https://meet.google.com/hdf-kdaw-udm";
  
  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="text-[#CD5E49]" size={24} />
          <h2 className="text-xl font-bold text-gray-900">One-Health
Stakeholders
Engagement
Meeting</h2>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>Thursday, December 5th, 2024</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} />
            <span>10:00 AM (GMT+1)</span>
          </div>
          
          
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#CD5E49]">
          Join us for a One-Health event that brings together stakeholders from human, animal, and environmental health sectors to collaborate on sustainable solutions for One-health challenges.
          </p>
        </div>
        
        <a 
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full bg-[#CD5E49] hover:bg-[#9a3a27] text-white text-center py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Video size={20} />
          Join Meeting Now
        </a>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By joining, you agree to the meeting guidelines and code of conduct
        </p>
      </div>
      
      
    </div>
    <div className="my-10">
            <Countdown timeLeft={countdown} />
          </div>
    <Footer />
    </>
  );
};

export default StakeholderMeeting;