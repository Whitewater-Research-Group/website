import React from 'react';
import { 
  Lightbulb, 
  Target, 
  Users, 
  Shield, 
  Leaf,
  Brain,
  Rocket,
  GraduationCap,
  Globe
} from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-[#E07A5F] font-medium text-sm">
            <span className="w-2 h-2 bg-[#E07A5F] rounded-full mr-2 animate-pulse" />
            About White Water Research Group
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Pioneering Research for
            <span className="text-[#E07A5F]"> Global Impact</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          The White Water Research Group is a rapidly developing team of people involved in research and development, that is focused on solving practical problems with the help of interdisciplinary studies and application of new knowledge.

          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="h-full bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-[#E07A5F] mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
              To be a world class research institution that provides knowledge through the development of ideas that will in turn, impact future generations.              </p>
            </div>
          </div>

          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="h-full bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-[#E07A5F] mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <ul className="space-y-4 text-gray-600">
                {[
                  'Carry out research that seeks to address current issues and questions.',
                  ' Translate findings into practical, scalable solutions',
                  'Engage and motivate key stakeholders worldwide'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#E07A5F] rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: 'Innovation', description: 'Pursuing creative and groundbreaking approaches to problem-solving' },
              { icon: Target, title: 'Impact', description: 'Focusing on research that delivers tangible, positive outcomes' },
              { icon: Users, title: 'Collaboration', description: 'Building strong networks with local and global partners' },
              { icon: Shield, title: 'Integrity', description: 'Upholding ethical practices in all aspects of our work' },
              { icon: Leaf, title: 'Sustainability', description: 'Ensuring our solutions are futuristic and are environmentally friendly' }
            ].map((value, index) => (
              <CoreValue key={index} {...value} index={index} />
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Strategic Goals</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: Brain,
                title: 'Advancing Knowledge',
                description: 'Explore and generate new insights that address the complex issues of our time'
              },
              {
                icon: Rocket,
                title: 'Real-World Applications',
                description: 'Ensure our research leads to practical innovations that solve real-world problems'
              },
              {
                icon: GraduationCap,
                title: 'Capacity Building',
                description: 'Empower young researchers and professionals through mentorship and resources'
              },
              {
                icon: Globe,
                title: 'Global Impact',
                description: 'Contribute to global initiatives aimed at sustainable development and social progress'
              }
            ].map((goal, index) => (
              <GoalCard key={index} {...goal} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreValue = ({ icon: Icon, title, description, index }) => (
  <div 
    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
      hover:transform hover:-translate-y-1 animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 
      text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors mb-4"
    >
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const GoalCard = ({ icon: Icon, title, description, index }) => (
  <div 
    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300
      hover:transform hover:-translate-y-1 animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 
        text-[#E07A5F] group-hover:[#E07A5F] group-hover:text-white transition-colors"
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default AboutSection;
