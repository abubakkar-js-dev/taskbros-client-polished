import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/others/BookingModal";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";
import Loading from "../components/common/Loading";

const ServiceDetails = () => {
  const [service, setService] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const axiosInstant = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
  const {
    description,
    imageUrl,
    name,
    price,
    provider_name,
    provider_img,
    area,
  } = service;

  useEffect(() => {
    setIsLoading(true);
    axiosInstant.get(`/all-services/${id}`).then((res) => {
      setService(res.data);
      // console.log(res);
      setIsLoading(false);
    });
  }, [axiosInstant, id]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Helmet>
        <title>{name || "Service Details"} - TaskBros | Explore More</title>
      </Helmet>
      {/* Title Section */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-16 text-center">
            <h4 className="flex items-center justify-center gap-3 mb-2">
              <span className="border-t-2 border-gray-300 w-10"></span>
              <span className="text-gray-500 uppercase tracking-wide text-sm">
                Service Details
              </span>
              <span className="border-t-2 border-gray-300 w-10"></span>
            </h4>
            <h2
              className={`${
                theme === "dark" ? "text-white" : "text-gray-900"
              } text-4xl font-semibold leading-snug`}
            >
              Discover Comprehensive Information
            </h2>
            <p
              className={`text-lg mt-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              About the service and its provider
            </p>
          </div>

          {/* Service Card */}
          <div
            className={`flex flex-col md:flex-row ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg overflow-hidden`}
          >
            {/* Service Image */}
            <img
              className="w-full md:w-1/2 h-96 object-cover"
              src={imageUrl}
              alt={name}
            />

            {/* Service Information */}
            <div className="p-6 flex-1">
              {/* Service Name */}
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {name}
              </h2>

              {/* Description */}
              <p
                className={`mb-6 leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>

              {/* Price */}
              <h3
                className={`text-xl font-semibold mb-6 ${
                  theme === "dark" ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Price: ${price}
              </h3>

              {/* Service Location */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Location:
                </span>
                <span
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {area}
                </span>
              </div>

              {/* Service Provider Information */}
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full border object-cover"
                  src={provider_img}
                  alt={`Provider ${provider_name}`}
                />
                <div>
                  <h4
                    className={`font-semibold ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {provider_name}
                  </h4>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Service Provider
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="text-center pb-20">
            {/* book now modal */}
            <BookingModal service={service} />
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceDetails;
