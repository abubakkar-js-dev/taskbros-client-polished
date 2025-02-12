import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ServiceCard from "../common/ServiceCard";
import Loading from "../common/Loading";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const PopularServices = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error state

    axios
      .get(`${import.meta.env.VITE_API_URL}/popular-services`)
      .then((res) => {
        setPopularServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch popular services:", err);
        setError("Something went wrong while loading services.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`section-wrap container mx-auto p-4`}>
      {/* Title Section */}
      <div className="mb-24" data-aos="fade-right">
        <h4 className="flex items-center gap-3 mb-2">
          <span className="border-t-2 border-gray-300 w-10"></span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            Popular now
          </span>
        </h4>
        <h2 className={`section-title ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Discover the most sought-after services
        </h2>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center max-w-5xl mx-auto">
        {popularServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
