import { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import logoNav from "../../assets/images/logo2.png";
import AuthContext from "../../contexts/authcontext/AuthContext";
import toast from "react-hot-toast";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // State and ref for the dashboard dropdown menu
  const [dropDownDashState, setDropDownDashState] = useState(false);
  const dropDownMenuDashRef = useRef();

  // for mobile dashboard dropdown menu
  const [dropDownDashMobileState, setDropDownDashMobileState] = useState(false);
  const mobileDropdwnDashRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!dropDownMenuRef?.current?.contains(e?.target)) {
        setDropDownState(false);
      }
    };
    // document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  useEffect(() => {
    const closeDropDownDash = (e) => {
      if (
        dropDownMenuDashRef.current &&
        !dropDownMenuDashRef.current.contains(e.target)
      ) {
        setDropDownDashState(false);
      }
    };
    document.addEventListener("mousedown", closeDropDownDash);
    return () => {
      document.removeEventListener("mousedown", closeDropDownDash);
    };
  }, []);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        // console.log("User logged out successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <nav className=" flex items-center justify-between bg-primary px-4 py-2 text-white pt-4 z-50 sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo and Website Name */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110 flex items-center gap-2"
          >
            <img
              className="w-10 h-10 bg-white rounded-full object-cover"
              src={logoNav}
              alt="logo img"
            />
            <h2 className="text-2xl">TaskBros</h2>
          </Link>
        </div>

        {/* Center Section: Desktop Menu */}
        <ul className="hidden items-center justify-center gap-10 md:flex">
          <li>
            <NavLink
              to="/"
              className="group flex flex-col cursor-pointer text-white"
            >
              Home
              <span
                className={`mt-[2px] h-[3px] rounded-full bg-secondary/90 transition-all duration-300 ${
                  location.pathname === "/"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-services"
              className="group flex flex-col cursor-pointer text-white"
            >
              All Services
              <span
                className={`mt-[2px] h-[3px] rounded-full bg-secondary/90 transition-all duration-300 ${
                  location.pathname === "/all-services"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className="group flex flex-col cursor-pointer text-white"
            >
              About Us
              <span
                className={`mt-[2px] h-[3px] rounded-full bg-secondary/90 transition-all duration-300 ${
                  location.pathname === "/about-us"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </NavLink>
          </li>
          {/* Dashboard dropdown menu */}
          {user && (
            <li className="relative" ref={dropDownMenuDashRef}>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior
                  setDropDownDashState(!dropDownDashState);
                }}
                className={`group flex items-center gap-2 py-2 px-3 cursor-pointer text-white`}
              >
                <span>Dashboard</span>
                <svg
                  className={`transition-transform duration-300 ${
                    dropDownDashState ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                {/* Hover effect underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                    dropDownDashState ? "w-1/2" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>

              {/* Dropdown Menu */}
              {dropDownDashState && (
                <ul
                  className={`${
                    theme === "dark" ? "bg-gray-400" : "bg-white"
                  } absolute left-0 top-10 z-10 w-56 rounded-lg  shadow-lg p-4 space-y-2 text-black`}
                >
                  <li>
                    <NavLink
                      to="/add-service"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:bg-primary/70 hover:text-white transition-all duration-300 ${
                          isActive ? "bg-primary/80 text-white" : ""
                        }`
                      }
                    >
                      Add Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/manage-services"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:bg-primary/70 hover:text-white transition-all duration-300 ${
                          isActive ? "bg-primary/80 text-white" : ""
                        }`
                      }
                    >
                      Manage Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/booked-services"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:bg-primary/70 hover:text-white transition-all duration-300 ${
                          isActive ? "bg-primary/80 text-white" : ""
                        }`
                      }
                    >
                      Booked Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/service-to-do"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:bg-primary/70  hover:text-white transition-all duration-300 ${
                          isActive ? "bg-primary/80 text-white" : ""
                        }`
                      }
                    >
                      Service To Do
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Right Section: Dark/Light Mode Toggle & Login/Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaMoon className="text-gray-700" />
                  ) : (
                    <FaSun className="text-yellow-500" />
                  )}
                </span>
              </button>
            </div>
          </div>
          {user && user?.email ? (
            <div className="flex items-center gap-4">
              <img
                className="size-10 rounded-full bg-slate-500 object-top hidden md:block"
                src={user?.photoURL}
                alt="User photo"
              />
              <button
                onClick={handleLogOut}
                className="rounded-lg bg-secondary px-4 py-2 text-sm md:text-base font-semibold hover:bg-secondary/90"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-secondary px-4 py-2 text-sm md:text-base font-semibold hover:bg-secondary/90"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          ref={dropDownMenuRef}
          onClick={() => setDropDownState(!dropDownState)}
          className="relative flex md:hidden"
        >
          <FaBars className="cursor-pointer" size={24} />
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute right-0 top-20 w-full overflow-hidden bg-primary text-white transition-all duration-500 ease-in-out ${
            dropDownState ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-2 px-6 py-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-6 py-2 ${
                    isActive ? "bg-secondary text-white" : "hover:bg-sky-600"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-services"
                className={({ isActive }) =>
                  `block px-6 py-2 ${
                    isActive ? "bg-secondary text-white" : "hover:bg-sky-600"
                  }`
                }
              >
                All Services
              </NavLink>
            </li>
            {/* Mobile Dashboard Dropdown */}
            {user && (
              <li className="relative" ref={mobileDropdwnDashRef}>
                <button
                  onClick={() => {
                    // e.stopPropagation()
                    setDropDownDashMobileState(!dropDownDashMobileState);
                  }}
                  className="flex items-center gap-2 px-6 py-2 cursor-pointer text-white"
                >
                  Dashboard
                  <svg
                    className={`transition-transform duration-300 ${
                      dropDownDashMobileState ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>

                {dropDownDashMobileState && (
                  <ul className="flex flex-col px-6 py-2 text-black space-y-2 ">
                    <li>
                      <NavLink
                        to="/add-service"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded hover:bg-secondary/80 transition-all duration-300 text-white ${
                            isActive ? "bg-secondary text-white" : ""
                          }`
                        }
                      >
                        Add Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manage-services"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded hover:bg-secondary/80 transition-all duration-300 text-white ${
                            isActive ? "bg-secondary text-white" : ""
                          }`
                        }
                      >
                        Manage Services
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/booked-services"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded hover:bg-secondary/80 transition-all duration-300 text-white ${
                            isActive ? "bg-secondary text-white" : ""
                          }`
                        }
                      >
                        Booked Services
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/service-to-do"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded hover:bg-secondary/80 transition-all duration-300 text-white ${
                            isActive ? "bg-secondary text-white" : ""
                          }`
                        }
                      >
                        Service To Do
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
