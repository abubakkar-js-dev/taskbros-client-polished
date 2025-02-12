import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../contexts/authcontext/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Toast from 'react-hot-toast'
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const BookingModal = ({ service }) => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const [startDate, setStartDate] = useState(new Date());
  const addressRef = useRef();
  // console.log(startDate);
  const {
    _id,
    imageUrl,
    name,
    price,
    provider_name,
    provider_email,
  } = service;

  const { displayName: booking_person_name, email: booking_person_email } =
    user;
  // console.log(booking_person_email, booking_person_name);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [openModal]);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const booking_address = addressRef.current.value;
    const bookingInfo = {
      booking_person_email,
      booking_person_name,
      booking_address,
      booking_date: startDate,
    };
    const newBooking = {
      service_id: _id,
      service_name: name,
      service_img: imageUrl,
      service_provider_email: provider_email,
      service_provider_name: provider_name,
      service_price: price,
      bookingInfo,
      service_status: "pending",
    };
    // console.log(newBooking);
    // save into db
    axios.post(`${import.meta.env.VITE_API_URL}/book-service`,newBooking)
    .then(res=>{
        if(res.data.insertedId){
            // console.log('You have booked successfully')
            Toast.success('You have booked successfully');
            setOpenModal(false);
        }
    })
  };

  return (
    <div className="w-72 mx-auto flex items-center justify-center">
    {/* Pay Button */}
    <button
      onClick={() => setOpenModal(true)}
      className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300"
    >
      Book Now
    </button>
    <div
      className={`fixed flex justify-center items-center z-[100] ${openModal ? "visible opacity-1" : "invisible opacity-0"} duration-300 inset-0 w-full h-full`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute overflow-x-hidden overflow-y-scroll w-full h-full flex justify-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} drop-shadow-2xl rounded-lg ${openModal ? "translate-y-0 opacity-1 duration-300" : "translate-y-32 opacity-0 duration-100"}`}
      >
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => { setOpenModal(false); }}
            className="mr-0 mx-auto flex bg-slate-950 text-white px-3 py-2 rounded-lg mb-6"
          >
            Close
          </button>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`rounded-lg border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-card text-card-foreground"} shadow-sm`}>
              <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                <h3 className="text-2xl font-semibold whitespace-nowrap">
                  Service Details
                </h3>
              </div>
              <div className="lg:p-6 p-2">
                {/* Services Details Form */}
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="services_id" className="text-sm font-medium text-left">
                      Service Id
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      defaultValue={_id}
                      type="text"
                      disabled
                      autoComplete="off"
                      name="services_id"
                      id="services_id"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service_name" className="text-sm font-medium">
                      Service Name
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="text"
                      defaultValue={name}
                      name="service_name"
                      id="service_name"
                      disabled
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service_img" className="text-sm font-medium">
                      Service Image URL
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="text"
                      defaultValue={imageUrl}
                      name="service_img"
                      id="service_img"
                      disabled
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service_provider_email" className="text-sm font-medium">
                      Provider Email
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="email"
                      defaultValue={provider_email}
                      name="service_provider_email"
                      id="service_provider_email"
                      disabled
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service_provider_name" className="text-sm font-medium">
                      Provider Name
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="email"
                      defaultValue={provider_name}
                      name="service_provider_name"
                      id="service_provider_name"
                      disabled
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service_price" className="text-sm font-medium">
                      Service Price
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="text"
                      defaultValue={price}
                      disabled
                      autoComplete="off"
                      name="service_price"
                      id="service_price"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className={`rounded-lg border shadow-sm self-start ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
              <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                <h3 className="text-2xl font-semibold whitespace-nowrap">
                  User Information
                </h3>
              </div>
              <div className="lg:p-6 p-2">
                {/* Personal Information Details Form */}
                <form id="personInfo" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="booking_person_email" className="text-sm font-medium leading-none">
                      Current User Email
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      type="email"
                      defaultValue={booking_person_email}
                      disabled
                      autoComplete="off"
                      name="booking_person_email"
                      id="booking_person_email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking_person_name" className="text-sm font-medium leading-none">
                      Current User Name
                    </label>
                    <input
                      className="bg-transparent flex h-10 w-full rounded-md border px-3"
                      defaultValue={booking_person_name}
                      type="text"
                      disabled
                      autoComplete="off"
                      name="booking_person_name"
                      id="booking_person_name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="text-sm font-medium leading-none">
                        Service Taking Date
                      </label>
                      <div>
                        <DatePicker
                          name="startDate"
                          id="startDate"
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="booking_address" className="text-sm font-medium leading-none">
                        Address
                      </label>
                      <input
                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                        placeholder="Enter your address"
                        type="text"
                        ref={addressRef}
                        id="booking_address"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <button
              type="submit"
              onClick={handleConfirmBooking}
              className="mt-4 bg-emerald-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg"
            >
              Confirm Booking
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
  );
};
BookingModal.propTypes = {
  service: PropTypes.object.isRequired,
};

export default BookingModal;
