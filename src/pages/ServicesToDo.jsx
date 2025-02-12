import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AuthContext from "../contexts/authcontext/AuthContext";
import axios from "axios";
import Toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/common/Loading";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";

const ServicesToDo = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const axiosInstant = useAxiosSecure();

  useEffect(() => {
    setIsLoading(true);

    axiosInstant.get(`/booked-by-user?email=${user.email}`).then((res) => {
      setBookedServices(res.data);
      setIsLoading(false);
    });
  }, [axiosInstant, user.email]);

  const handleUpdateStatus = (status, id) => {
    // console.log(id, status);
    axios
      .patch(`${import.meta.env.VITE_API_URL}/update-booking-status/${id}`, {
        status,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Toast.success("Successfully updated your service Status!");

          // update in state
          setBookedServices((prevServices) =>
            prevServices.map((service) =>
              service._id === id
                ? { ...service, service_status: status }
                : service
            )
          );
        } else {
          Toast.error("Failed to updated status");
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`mt-16 lg:mt-20 container mx-auto section-wrap ${
        theme === "dark" ? "bg-gray-900 text-white" : ""
      }`}
    >
      <Helmet>
        <title>Services To Do - TaskBros | Manage Your Services</title>
      </Helmet>

      {/* Title Section */}
      <div className="mb-16 text-center">
        <h4 className="flex items-center justify-center gap-3 mb-2">
          <span
            className={`border-t-2 w-10 ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          ></span>
          <span
            className={`uppercase tracking-wide text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Service To Do
          </span>
          <span
            className={`border-t-2 w-10 ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          ></span>
        </h4>
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-2xl lg:text-3xl font-semibold leading-snug`}
        >
          Manage Your Booked Services
        </h2>
      </div>

      {/* Table Section */}
      {bookedServices.length > 0 ? (
        <div className="overflow-x-auto">
          <table
            className={`table-auto w-full border-collapse ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <thead
              className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <tr>
                <th
                  className={`border px-4 py-2 ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Service Name
                </th>
                <th
                  className={`border px-4 py-2 ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Booked By
                </th>
                <th
                  className={`border px-4 py-2 hidden lg:table-cell ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Booking Date
                </th>
                <th
                  className={`border px-4 py-2 hidden lg:table-cell ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Address
                </th>
                <th
                  className={`border px-4 py-2 ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`border px-4 py-2 ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookedServices.map((service) => (
                <tr key={service._id} className="text-center">
                  <td
                    className={`border px-4 py-2 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={service.service_img}
                        alt={service.service_name}
                        className="w-12 h-12 object-cover rounded-md hidden lg:table-cell"
                      />
                      <span>{service.service_name}</span>
                    </div>
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {service.bookingInfo.booking_person_name}
                  </td>
                  <td
                    className={`border px-4 py-2 hidden lg:table-cell ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {new Date(
                      service.bookingInfo.booking_date
                    ).toLocaleDateString()}
                  </td>
                  <td
                    className={`border px-4 py-2 hidden lg:table-cell ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {service.bookingInfo.booking_address || "Unknown"}
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <span
                      className={`${
                        service.service_status === "pending"
                          ? "text-yellow-500"
                          : service.service_status === "working"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {service.service_status}
                    </span>
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <select
                      value={service.service_status}
                      className={`border rounded px-2 py-1 ${
                        theme === "dark"
                          ? "border-gray-700 bg-gray-800 text-gray-300"
                          : "border-gray-300"
                      }`}
                      onChange={(e) =>
                        handleUpdateStatus(e.target.value, service._id)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p
          className={`text-center mt-10 ${
            theme === "dark" ? "text-gray-400" : "text-secondary"
          }`}
        >
          No services booked yet. Start adding your services to get started!
        </p>
      )}
    </div>
  );
};

export default ServicesToDo;
