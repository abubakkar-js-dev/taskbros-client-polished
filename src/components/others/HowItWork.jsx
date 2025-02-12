import { useContext } from "react";
import { FaUser, FaSearch, FaHandshake, FaSmile } from "react-icons/fa";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const HowItWork = () => {
  const { theme } = useContext(ThemeContext);
  const steps = [
    {
      icon: <FaUser />,
      title: "Create an Account",
      description: "Sign up and set up your profile to get started.",
    },
    {
      icon: <FaSearch />,
      title: "Search for Services",
      description: "Browse available services or providers in your area.",
    },
    {
      icon: <FaHandshake />,
      title: "Connect & Book",
      description: "Contact providers and book services with ease.",
    },
    {
      icon: <FaSmile />,
      title: "Enjoy the Experience",
      description: "Relax and let our professionals handle the task!",
    },
  ];

  return (
    <div className="section-wrap container mx-auto mb-24 lg:mb-[120px]">
      <div data-aos="fade-down" className="mb-24 mx-auto text-center flex flex-col justify-center items-center">
        {/* title section */}
        <h4 className="flex items-center justify-center gap-3 mb-2">
          <span className="border-t-2 border-gray-300 w-10"></span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            How It Works
          </span>
          <span className="border-t-2 border-gray-300 w-10"></span>
        </h4>
        <h2 className={` section-title ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Simple steps to get started effortlessly
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-6 lg:px-8 py-12 hover:cursor-pointer">
        {steps.map((step, index) => (
          <div
          data-aos="flip-right"
          data-aos-delay="300"
          data-aos-duration="1500"
            key={index}
            className={`flex flex-col items-center rounded-lg border border-gray-200 p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300 ${
              theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""
            }`}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6 text-4xl">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold leading-tight">
              {step.title}
            </h3>
            <p className={`mt-4 text-sm ${theme==='dark'?"text-gray-400":"text-black"} leading-relaxed`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
