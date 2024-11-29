const WhyChooseUs = () => {
    const features = [
      {
        id: 1,
        title: "Focused on Real-World Solutions",
        description:
          "Our research goes beyond theory—every project is designed to address real world problems thereby ensuring our work has both meaningful and practical applications.",
        icon: "🌍", // Replace this with an SVG or custom icon if preferred
      },
      {
        id: 2,
        title: "Interdisciplinary Expertise",
        description:
          "Our diverse team brings together experts from various fields, enabling us to tackle complex problems with innovative and holistic approaches.",
        icon: "🔬", // Replace this with an SVG or custom icon if preferred
      },
      {
        id: 3,
        title: "Commitment to Collaboration",
        description:
          "We believe in the power of partnerships. Whether working with industry leaders, academic institutions, or local communities, we prioritize a collaborative environment in order to achieve shared goals.",
        icon: "🤝", // Replace this with an SVG or custom icon if preferred
      },
    ];
  
    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-center text-gray-600 text-lg">
            At the White Water Research Group, we stand out for our commitment to
            excellence, innovation, and impact. Here’s why partnering with us is
            the right choice:
          </p>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group relative bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-[#f2cabf] text-[#E07A5F] rounded-full text-3xl mb-6 group-hover:bg-[#ffb5a0]">
                  {feature.icon}
                </div>
  
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#E07A5F] transition-colors">
                  {feature.title}
                </h3>
  
                {/* Description */}
                <p className="mt-4 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyChooseUs;
  