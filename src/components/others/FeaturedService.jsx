import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const FeaturedServices = () => {
  const { theme } = useContext(ThemeContext);
  const services = [
    {
      id: 1,
      name: "Plumbing Assistance",
      description: "Expert plumbing at your doorstep.",
      price: "$50/hour",
    },
    {
      id: 2,
      name: "Electrician On-Demand",
      description: "Get your electrical issues fixed.",
      price: "$60/hour",
    },
    {
      id: 3,
      name: "Home Cleaning",
      description: "Affordable and professional cleaning services.",
      price: "$40/hour",
    },
  ];

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mb-16 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div data-aos="fade-up" className="mb-24 mx-auto text-center flex flex-col justify-center items-center">
        {/* Title section */}
        <h4
          className={`flex items-center justify-center gap-3 mb-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span
            className={`border-t-2 ${
              theme === "dark" ? "border-gray-600" : "border-gray-300"
            } w-10`}
          ></span>
          <span className="uppercase tracking-wide text-sm">Featured Services</span>
          <span
            className={`border-t-2 ${
              theme === "dark" ? "border-gray-600" : "border-gray-300"
            } w-10`}
          ></span>
        </h4>
        <h2 className={`section-title ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Find the most in-demand services
        </h2>
      </div>

      <div data-aos="fade-down" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center max-w-5xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-lg border ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            } p-6 shadow-sm hover:shadow-lg flex flex-col ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold">
              {service.name}
            </h3>
            <p className="mt-2 text-sm">{service.description}</p>
            <p className="mt-4 text-lg font-bold flex-1 text-secondary">{service.price}</p>
            {/* <button
              className={`mt-4 inline-block w-full rounded px-4 py-2 text-white ${
                theme === "dark" ? "bg-orange-500 hover:bg-orange-400" : "bg-orange-600 hover:bg-orange-500"
              }`}
            >
              Explore More
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedServices;
