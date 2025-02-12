import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const BookedService = ({ service }) => {
  const navigate = useNavigate();
  const {
    service_name,
    service_price,
    bookingInfo,
    service_status,
    service_id,
  } = service;
  const { booking_address, booking_date } = bookingInfo;
  const { theme } = useContext(ThemeContext);

  return (
    <tr
      className={
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }
    >
      <td
        className={`border px-4 py-2 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {service_name}
      </td>
      <td
        className={`border px-4 py-2 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        ${service_price}
      </td>
      <td
        className={`border px-4 py-2 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {booking_address || "N/A"}
      </td>
      <td
        className={`border px-4 py-2 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {new Date(booking_date).toLocaleString()}
      </td>
      <td
        className={`border px-4 py-2 capitalize ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {service_status}
      </td>
      <td
        className={`border px-4 py-2 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <button
          className={`${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-500 text-gray-200"
              : "bg-primary hover:bg-blue-500 text-white"
          } px-4 py-2 rounded text-sm`}
          onClick={() => navigate(`/services/${service_id}`)}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

BookedService.propTypes = {
  service: PropTypes.object.isRequired,
};

export default BookedService;
