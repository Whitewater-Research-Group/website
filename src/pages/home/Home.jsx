// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Calender from "../../assets/calender.png";
import BackgroundImage from "../../assets/hero.png";
import AboutImage from "../../assets/about.png";

function Home() {
  function countdownToNov5() {
    const targetDate = new Date("November 5, 2024 00:00:00").getTime();

    const countdownInterval = setInterval(function () {
      const now = Date.now();

      const timeRemaining = targetDate - now;

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        console.log("Countdown complete!");
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
  }
  countdownToNov5();

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
            <span className="text-white text-lg">5th November 2024</span>
            <a
              href="#contact"
              className="text-white text-base font-medium bg-turquoiseBlue rounded-full px-4 py-2"
            >
              Register
            </a>
          </div>
        </div>
      </section>

      <section>
       <div>
       <div>
          <div>
            <img src={AboutImage} alt="" srcset="" />
          </div>
        </div>
        <div>
          <span>
            ABOUT <br /> MEETING
          </span>

          <p>
            Join us for a One-Health event that brings together stakeholders
            from human, animal, and environmental health sectors to collaborate
            on sustainable solutions for One-health challenges. <br /> <br />
            This event will bring together stakeholders from across the country
            to explore innovative solutions in health surveillance, data
            privacy, and low-tech stakeholder engagement. With expert speakers,
            interactive sessions, and networking opportunities, attendees will
            gain valuable insights and collaborate on driving impactful change
            across sectors. Don't miss this opportunity to be part of the future
            of health surveillance!
          </p>
        </div>
       </div>

       <div>
        <span>Program</span>
        
       </div>
      </section>

      <section>
        <div></div>
        <div></div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
