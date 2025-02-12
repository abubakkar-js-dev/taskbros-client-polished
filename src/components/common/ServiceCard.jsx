import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import UpdateServiceModal from "../others/UpdateServiceModal";
import { useContext, useEffect } from "react";
import MyServicesContext from "../../contexts/myservicesContext/MyServicesContext";
import axios from "axios";
import Swal from "sweetalert2";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

import "aos/dist/aos.css";

import AOS from "aos";

const ServiceCard = ({ service }) => {
  const { myServicesState } = useContext(MyServicesContext);
  const { myServices, setMyServices } = myServicesState;
  const {
    _id,
    description,
    imageUrl,
    name,
    price,
    provider_name,
    provider_img,
    area,
  } = service;
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const handleDeleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to delete this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/delete-service/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your services has been deleted.",
                icon: "success",
              });
              // update in state
              const remainingServices = myServices.filter(
                (service) => service._id !== id
              );
              setMyServices(remainingServices);
            }
          });
      }
    });
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Animation triggers only once
    });
  }, []);

  const aosAttributes = location.pathname !== '/manage-services' ? 
  { 'data-aos': 'zoom-in', 'data-aos-delay': '100', 'data-aos-duration': '1000' } : {};

  return (
    <div
      {...aosAttributes}
      className={`border shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col ${
        theme === "dark"
          ? "bg-card text-white border-gray-600"
          : "bg-white text-gray-800"
      }`}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          className={`w-full object-cover ${
            location.pathname === "/all-services" ? "h-[420px]" : "h-64"
          }`}
          src={imageUrl}
          alt={name}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
        {/* Title and Provider Info */}
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <div
              className={`flex items-center gap-3 ${
                location.pathname === "/manage-services" && "hidden"
              }`}
            >
              <div className="text-right">
                <h3 className="text-sm text-gray-500 italic">From:</h3>
                <h3 className="text-sm">{provider_name}</h3>
              </div>
              <img
                className="rounded-full w-10 h-10 border object-cover"
                src={provider_img}
                alt={`Service provider ${provider_name}`}
              />
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed">
            {description?.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
        </div>

        {/* Price And area */}
        <div className="flex justify-between">
          <div className="text-lg font-medium">
            <span className="text-gray-500">Price:</span> ${price}
          </div>
          {location.pathname === "/all-services" && (
            <div className="text-base font-medium">
              <span className="text-gray-600">Location:</span> {area}
            </div>
          )}
        </div>

        {/* Action btn */}
        <div className="mt-auto">
          {location.pathname === "/manage-services" ? (
            <div className="flex justify-between space-x-2">
              <UpdateServiceModal serviceId={_id} />
              <button
                onClick={() => handleDeleteService(_id)}
                className="bg-secondary hover:bg-orange-300 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                title="Delete Service"
              >
                <BsFillTrash3Fill className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <Link
              to={`/services/${_id}`}
              className="text-center px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-md transition-colors duration-200 inline-block"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceCard;
