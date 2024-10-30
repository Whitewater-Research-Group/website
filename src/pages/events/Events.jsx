// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Calender from "../../assets/calender.png";
import BackgroundImage from "../../assets/hero.png";
import AboutImage from "../../assets/about.png";
import Countdown from "../../components/Countdown";

function Events() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dealDate, setDealDate] = useState(new Date("December 5, 2024 10:00:00"));


  // Function to calculate time remaining until date (eg December 5, 2024)
  const countdownToDay = () => {
    const targetDate = dealDate.getTime();
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
      const countdownValues = countdownToDay();
      setCountdown(countdownValues);
    };

    updateCountdown(); // Initial call to set countdown
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="">
      <Navbar />
      <section
        className="relative w-full h-screen flex flex-col justify-center p-8 lg:p-16 mt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content container */}
        <div className="relative z-10 space-y-6 text-center lg:text-left">
          <h1 className="text-white font-primary font-extrabold text-4xl lg:text-6xl">
            One-Health <br /> Stakeholders <br /> Engagement <br /> Meeting
          </h1>

          <p className="font-primary text-white text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
            Join us for an engaging conference dedicated to advancing the One
            Health approach, addressing the interconnected challenges of human,
            animal, and environmental health.
          </p>

          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <img src={Calender} alt="Event Calendar" className="h-10 w-10" />
            <span className="text-white text-lg">{dealDate.toDateString()}</span>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdR7yZDcKB87xumPFnOirR8bKJJzDVyEh9d52u6u0K4hCqtcQ/viewform?pli=1"
              className="text-white text-base font-medium bg-turquoiseBlue rounded-full px-4 py-2"
            >
              Register
            </a>
          </div>

          <div className="">
            <Countdown timeLeft={countdown} />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Image section */}
          <div className="w-full lg:w-1/2">
            <img
              src={AboutImage}
              alt="About the Meeting"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Text section */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <span className="font-bold text-4xl lg:text-6xl text-primary">
              ABOUT <br /> MEETING
            </span>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              Join us for a One-Health event that brings together stakeholders
              from human, animal, and environmental health sectors to
              collaborate on sustainable solutions for One-health challenges.
            </p>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              This event will bring together stakeholders from across the
              country to explore innovative solutions in health surveillance,
              data privacy, and low-tech stakeholder engagement. With expert
              speakers, interactive sessions, and networking opportunities,
              attendees will gain valuable insights and collaborate on driving
              impactful change across sectors. Don't miss this opportunity to be
              part of the future of health surveillance!
            </p>
          </div>
        </div>

        {/* Program section */}
        <div className="mt-12 text-center">
          <span className="text-2xl font-semibold text-primary">Program</span>

          <div className="mt-6 bg-cyan-500 p-4 rounded-lg shadow-md flex flex-wrap justify-center gap-2">
            <button className="bg-white text-cyan-700 py-2 px-4  rounded-sm hover:bg-cyan-600 hover:bg-cyan hover:text-white duration-300">
              Opening
            </button>
            <button className="bg-white text-cyan-700 py-2 px-4  rounded-sm hover:bg-cyan-600 hover:bg-cyan hover:text-white transition duration-300">
              Introduction
            </button>
            <button className="bg-white text-cyan-700 py-2 px-4  rounded-sm hover:bg-cyan-600 hover:bg-cyan hover:text-white duration-300">
              Deliberation
            </button>
            <button className="bg-white text-cyan-700 py-2 px-4  rounded-sm hover:bg-cyan-600 hover:bg-cyan hover:text-white transition duration-300">
              AOB
            </button>
            <button className="bg-white text-cyan-700 py-2 px-4  rounded-sm hover:bg-cyan-600 hover:bg-cyan hover:text-white transition duration-300">
              Closing
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="text-2xl font-semibold text-primary">Venue</span>

          <div className="mt-6 bg-cyan-500 p-4 rounded-lg shadow-md flex flex-wrap justify-center gap-2">
            <p>One Health Surveillance AI Laboratory</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.80819268186113!2d5.614516045861614!3d6.402880902334874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10472ce8a5bc1c2d%3A0xfc11d4b91413272b!2sDepartment%20Of%20Electrical%20Engineering%2Fcomputer%20Engineering%2FCivil%20Engineering%20Combined%20Official%20Building!5e0!3m2!1sen!2sng!4v1729801958259!5m2!1sen!2sng"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy=""
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-16 bg-gray-100">
  <div className="text-center">
    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary">Meet the Researchers</h2>
    <p className="text-lg lg:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
      Introducing the dedicated researchers and experts who will be leading the One-Health event.
    </p>
  </div>

  {/* Researchers list */}
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center lg:text-left">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. E. Olaye</h3>
      <p className="text-gray-600">Principal Investigator</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. Omorodion Irowa</h3>
      <p className="text-gray-600">Surgeon</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. O. Dele-Ogbeide</h3>
      <p className="text-gray-600">Data Scientist</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. Prudence Ehizuenlen</h3>
      <p className="text-gray-600">Co-Researcher</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Engr. Moses Omosigho</h3>
      <p className="text-gray-600">Co-Researcher</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. Florence Elei</h3>
      <p className="text-gray-600">Co-Researcher</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Dr. Abraham Zirra</h3>
      <p className="text-gray-600">Co-Researcher</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Mr. Yusuf Mshelia</h3>
      <p className="text-gray-600">Co-Researcher</p>
    </div>
  </div>
</section>
<section className="relative py-16 px-4 lg:px-16 bg-gradient-to-r from-purple-700 to-indigo-900 text-white text-center lg:text-left">
  {/* Decorative overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 max-w-4xl mx-auto">
    <h2 className="text-3xl lg:text-5xl font-extrabold">Don't Miss Out on the One-Health Event!</h2>
    <p className="mt-4 text-lg lg:text-xl">
      Whether you can join us in person or virtually, this is your chance to be part of a groundbreaking event dedicated to solving health challenges across sectors.
    </p>
    <p className="mt-2 text-lg lg:text-xl font-medium">
      Virtual coverage will be available for those who cannot attend physically. Secure your spot now and stay ahead of the curve!
    </p>

    {/* Call to action button */}
    <div className="mt-8">
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdR7yZDcKB87xumPFnOirR8bKJJzDVyEh9d52u6u0K4hCqtcQ/viewform?pli=1" className="bg-turquoiseBlue hover:bg-cyan-500 text-white font-semibold text-lg lg:text-xl rounded-full px-6 py-3 transition duration-300">
        Register Now to Get in Line
      </a>
    </div>
  </div>

  {/* Background Image or decorative element */}
  <div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>
</section>


      <Footer />
    </div>
  );
}

export default Events;
