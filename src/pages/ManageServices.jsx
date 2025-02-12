import { useContext, useEffect, useState } from "react";
import ServiceCard from "../components/common/ServiceCard";
import AuthContext from "../contexts/authcontext/AuthContext";
import MyServicesContext from "../contexts/myservicesContext/MyServicesContext";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/common/Loading";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";

const ManageServices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { myServicesState } = useContext(MyServicesContext);
  const { myServices, setMyServices } = myServicesState;
  const { user } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const axiosInstant = useAxiosSecure();

  useEffect(() => {
    setIsLoading(true);
    axiosInstant.get(`/my-services/${user.email}`).then((res) => {
      setMyServices(res.data);
      setIsLoading(false);
    });
  }, [axiosInstant, setMyServices, user.email]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="section-wrap container mx-auto mt-16">
      <Helmet>
        <title>Manage Services - TaskBros | Admin Panel</title>
      </Helmet>
      {/* Title Section */}
      <div className="mb-16 text-center">
        <h4 className="flex items-center justify-center gap-3 mb-2">
          <span className="border-t-2 border-gray-300 w-10"></span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            Manage Services
          </span>
          <span className="border-t-2 border-gray-300 w-10"></span>
        </h4>
        <h2 className={`${theme === 'dark' ? 'text-white':'text-gray-900'} text-2xl lg:text-3xl font-semibold leading-snug`}>
          Control and Customize Your Services
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Effortlessly manage services and ensure efficiency
        </p>
      </div>

      {/*services Card section */}
      {myServices.length === 0 ? (
        <h2 className={`text-center mt-20 text-xl lg:text-2xl ${theme==="dark"?"text-gray-300":"text-secondary"}`}>
          No Services Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {myServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;
