import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logoFooter from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } text-gray-800`}
    >
      <div
        data-aos="fade-in"
        data-aos-duration="1200"
        className={`container max-w-7x mx-auto py-12 px-8 md:px-16 flex flex-col items-center justify-between gap-10 md:flex-row md:gap-20 border-b ${
          theme === "dark" && "bg-gray-800 border-gray-700"
        } border-gray-300 bg-gray-50 rounded-t-3xl`}
      >
        <div className="flex flex-co  items-center gap-6">
          <img
            src={logoFooter}
            alt="TaskBros Logo"
            className="w-16  bg-primary/20 p-2 rounded-full shadow-md"
          />
          <h5 className="text-2xl font-semibold text-primary">TaskBros</h5>
        </div>

        <div className="flex gap-6 justify-center text-lg ">
          <Link
            to="/"
            className="text-base text-gray-500 hover:text-primary transform hover:scale-110 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/all-services"
            className="text-base text-gray-500 hover:text-primary transform hover:scale-110 transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/add-service"
            className="text-base text-gray-500 hover:text-primary transform hover:scale-110 transition duration-200"
          >
            Add service
          </Link>
        </div>

        <nav className="text-lg">
          <ul className="flex gap-6 justify-center">
            <li className="cursor-pointer transform hover:scale-125 transition duration-200">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li className="cursor-pointer transform hover:scale-125 transition duration-200">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                <FaTwitter size={24} />
              </a>
            </li>
            <li className="cursor-pointer transform hover:scale-125 transition duration-200">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                <FaInstagram size={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <aside
        className={`py-6 text-center text-sm ${
          theme === "dark"
            ? "bg-gray-800 text-gray-400"
            : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"
        }`}
      >
        <p
          className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          &copy; 2024 TaskBros. All Rights Reserved.
        </p>
        <p
          className={`${
            theme === "dark" ? "text-gray-500" : "text-gray-500 mt-2"
          }`}
        >
          Your trusted task management platform
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
