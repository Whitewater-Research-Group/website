import React, {useState} from 'react';
import research1 from '../assets/onehealth.png';
import research2 from '../assets/onehealth.png';
import research3 from '../assets/onehealth.png';
import research4 from '../assets/onehealth.png';

const researchData = [
  {
    id: 1,
    title: "Smart Grid Optimization with AI",
    description: "Developing AI-driven algorithms to optimize the operation and management of smart grids, enhancing energy distribution efficiency, load balancing, and integration of renewable sources like solar and wind power. ",
    image: research1,
    link: "#",
  },
  {
    id: 2,
    title: "Renewable Energy Forecasting",
    description: "Creating advanced machine learning models that predict renewable energy generation, helping energy providers and grid operators make informed decisions about energy supply and demand, leading to improved grid stability and energy resource allocation.",
    image: research2,
    link: "#",
  },
  {
    id: 3,
    title: "AI-Enhanced Energy Storage",
    description: "Exploring the application of AI techniques to optimize energy storage systems, such as battery management and control strategies, for efficient energy storage and utilization in both residential and industrial settings.",
    image: research3,
    link: "#",
  },
  {
    id: 4,
    title: "Carbon Footprint Tracking and Reduction",
    description: "Developing software tools that allow individuals, organizations, and communities to track and reduce their carbon footprint through real-time monitoring of energy consumption, encouraging sustainable practices and behaviors.",
    image: research4,
    link: "#",
  },
  {
    id: 5,
    title: "Hybrid Renewable Energy Systems",
    description: "Investigating the synergies and optimization strategies between different renewable energy sources, like combining solar and wind energy, to create more reliable and consistent energy generation profiles.",
    image: research4,
    link: "#",
  },
  {
    id: 6,
    title: "One Health Ecosystem Monitoring with AI",
    description: "Integrating data from various sources such as satellite imagery, sensor networks, and health records, to create predictive models that identify potential disease outbreaks, pollution events, or other environmental stressors that could impact both human and animal populations.",
    image: research4,
    link: "#",
  },

];

const Researches = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-4xl font-bold text-gray-800">Our Research</h2>
        </div>
        
        <p className="mt-4 text-center text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the impactful projects we've undertaken to address global challenges
          and shape the future of innovation.
        </p>

        {/* Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {researchData.map((research) => (
            <ResearchCard
              key={research.id}
              research={research}
        
            
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-[#E07A5F] text-white rounded-lg shadow-lg 
            hover:bg-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F] 
            transform transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View More Research
              <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const ResearchCard = ({ research }) => {
    return (
      <div
        className="group relative bg-white rounded-xl shadow-md overflow-hidden 
          transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      >
        <a href={research.link} className="block">
          {/* Image with Hover Zoom and Gradient Overlay */}
          <div className="relative">
            <img
              src={research.image}
              alt={research.title}
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 left-4 z-10">
              <span className="inline-block px-3 py-1 bg-[#E07A5F] text-white text-sm rounded-full shadow-lg">
                {research.category}
              </span>
            </div>
          </div>
  
          {/* Content Section */}
          <div className="p-6">
            {/* Title with Hover Color Transition */}
            <h3
              className="text-xl font-semibold text-gray-800 
              group-hover:text-[#E07A5F] transition-colors duration-300"
            >
              {research.title}
            </h3>
            {/* Description */}
            <p className="mt-3 text-gray-600 line-clamp-3">{research.description}</p>
  
            {/* Author and Date Section */}
        
          </div>
        </a>
      </div>
    );
  };
  

export default Researches;
