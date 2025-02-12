import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../components/common/ServiceCard";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";

const AllServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { theme } = useContext(ThemeContext);
  // console.log(search);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/all-services?search=${search}`)
      .then((res) => {
        setAllServices(res.data);
        setIsLoading(false);
        // console.log(res.data,"api response");
      })
      .catch((err) => {
        toast.error(err);
        setIsLoading(false);
      });
  }, [search]);

  // if(isLoading){
  //   return <Loading />
  // }

  // console.log('I am getting data',allServices)

  return (
    <div className="section-wrap p-4 max-w-7xl mx-auto mt-16">
      <Helmet>
        <title>All Services - TaskBros | Browse Services</title>
      </Helmet>
      {/* Title Section */}
      <div className="mb-16 text-center">
        <h4 className="flex items-center justify-center gap-3 mb-2">
          <span className="border-t-2 border-gray-300 w-10"></span>
          <span className="text-gray-500 uppercase tracking-wide text-sm">
            All Services
          </span>
          <span className="border-t-2 border-gray-300 w-10"></span>
        </h4>
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-2xl lg:text-3xl font-semibold leading-snug`}
        >
          Explore Our Available Services
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          About the service and its provider
        </p>
      </div>

      {/* Search Box */}

      <div className="max-w-md mx-auto mb-10">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="default-search"
            className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-50 focus:outline-primary/30 ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                : ""
            }`}
            placeholder="Search Services..."
            required
          />
        </div>
      </div>

      {isLoading && <Loading className="-mt-[200px]" />}


      {/*services Card section */}
      {allServices.length > 0 ? (
        <div className="space-y-10">
          {allServices.map((service, idx) => (
            <ServiceCard key={`${service._id}-${idx}`} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center min-h-48 flex  justify-center items-center">
          <h2 className="text-lg md:text-xl text-secondary/80">
            No Services Found.
          </h2>
        </div>
      )}
    </div>
  );
};

export default AllServices;
