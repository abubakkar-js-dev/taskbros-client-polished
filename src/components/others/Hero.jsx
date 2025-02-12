import { useState, useEffect, useContext } from "react";
import Loading from "../common/Loading"; // Adjust the path to your Loading component
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const image = new Image();
    image.src =
      "https://i.ibb.co.com/cvxsbbg/photo-1604014237800-1c9102c219da-ixlib-rb-1-2.jpg";
    image.onload = () => setIsImageLoaded(true); // Set to true once the image is loaded
  }, []);

  if (!isImageLoaded) {
    return <Loading />;
  }

  return (
    <div
      className={`section-wrap ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}
    >
      <section
        className={`relative ${
          theme === "dark"
            ? "bg-gray-800"
            : "bg-[url(https://i.ibb.co.com/cvxsbbg/photo-1604014237800-1c9102c219da-ixlib-rb-1-2.jpg)]"
        } bg-cover bg-center bg-no-repeat`}
      >
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-black/50"
              : "bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
          }`}
        ></div>

        <div className="relative mx-auto container px-4 py-32 sm:px-6 lg:flex justify-between lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-2xl mb-20">
            <h1
              data-aos="fade-up"
              className={`text-3xl font-extrabold sm:text-5xl ${
                theme === "dark" ? "text-white" : "text-white"
              }`}
            >
              Find and Share Your Skills,
              <strong className="block font-extrabold text-white">
                Build Your Community.
              </strong>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className={`mt-4 max-w-lg sm:text-xl/relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-200"
              }`}
            >
              Connect with talented individuals and offer your skills, or find
              the perfect help for your projects. Join our growing community of
              skilled professionals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/all-services"
                data-aos="fade-up"
                data-aos-delay="400"
                className={`block w-full rounded bg-secondary px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-500 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto ${
                  theme === "dark" ? "bg-orange-600" : ""
                }`}
              >
                Get Started
              </Link>

              <a
                href="#"
                data-aos="fade-up"
                data-aos-delay="600"
                className={`block w-full rounded bg-white px-12 py-3 text-sm font-medium text-secondary shadow hover:text-orange-500 focus:outline-none focus:ring active:text-orange-500 sm:w-auto ${
                  theme === "dark" ? "!bg-gray-700 text-white" : ""
                }`}
              >
                Learn More
              </a>
            </div>
          </div>

          {theme === "dark" && (
            <img
              data-aos="fade-right"
              data-aos-delay="800"
              className="max-w-[720px] w-full object-cover rounded-2xl"
              src="https://i.ibb.co.com/cvxsbbg/photo-1604014237800-1c9102c219da-ixlib-rb-1-2.jpg"
              alt="Hero"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
