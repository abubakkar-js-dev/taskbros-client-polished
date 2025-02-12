import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/authcontext/AuthContext";
import BookedService from "../components/common/BookedService";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/common/Loading";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";

const BookedServices = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const axiosInstant = useAxiosSecure();

  useEffect(() => {
    setIsLoading(true);
    axiosInstant.get(`/booked-services?email=${user.email}`).then((res) => {
      setBookedServices(res.data);
      setIsLoading(false);
    });
  }, [axiosInstant, user.email]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="section-wrap container mx-auto mt-20">
      <Helmet>
        <title>Booked Services - TaskBros | Your Bookings</title>
      </Helmet>
      {/* Title Section */}
      <div className="mb-16 text-center">
        <h4 className="flex items-center justify-center gap-3 mb-2">
          <span className="border-t-2 border-gray-300 w-10"></span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            Booked Services
          </span>
          <span className="border-t-2 border-gray-300 w-10"></span>
        </h4>

        <h2 className={`${theme ==='dark'? 'text-white':'text-gray-900'} text-2xl lg:text-3xl font-semibold leading-snug`}>
          Your Booked Services
        </h2>
      </div>

      {/* booked information table */}
      <div
        className={`container mx-auto ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="overflow-x-auto">
          {bookedServices.length === 0 || bookedServices.length < 0 ? (
            <h2
              className={`text-center mt-20 text-xl lg:text-2xl ${
                theme === "dark" ? "text-gray-300" : "text-secondary"
              }`}
            >
              No Services Booked
            </h2>
          ) : (
            <table
              className={`table-auto w-full border-collapse ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } text-center`}
            >
              <thead>
                <tr
                  className={`${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
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
                    Price
                  </th>
                  <th
                    className={`border px-4 py-2 ${
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
                    Date
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
                  <BookedService
                    key={service._id}
                    service={service}
                    theme={theme}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedServices;
