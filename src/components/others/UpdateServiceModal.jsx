import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import MyServicesContext from "../../contexts/myservicesContext/MyServicesContext";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const UpdateServiceModal = ({ serviceId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { handleMyServicesState } = useContext(MyServicesContext);
  const {theme} = useContext(ThemeContext);
  const { description, imageUrl, name, price, area, _id } = formData;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/all-services/${serviceId}`, {
      withCredentials: true
    })
      .then(res => {
        setFormData(res.data);
      });
  }, [serviceId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedService = {
      description: formData.description,
      imageUrl: formData.imageUrl,
      name: formData.name,
      price: parseFloat(formData.price),
      area: formData.area,
    };

    axios
      .patch(`${import.meta.env.VITE_API_URL}/update-service/${_id}`, updatedService)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Your Service Updated Successfully!");
          closeModal();
          handleMyServicesState({ _id, ...updatedService });
        } else {
          toast.error("Failed to Update your Service.");
        }
      });
  };

  const modalClasses = theme === "dark" 
    ? "fixed inset-0 bg-black/80 z-50 flex items-center justify-center" 
    : "fixed inset-0 bg-black/50 z-50 flex items-center justify-center";
  
  const modalContentClasses = theme === "dark"
    ? "bg-gray-800 w-full max-w-lg rounded-lg shadow-lg p-6"
    : "bg-white w-full max-w-lg rounded-lg shadow-lg p-6";
  
  const textClasses = theme === "dark" ? "text-white" : "text-gray-800";
  const inputClasses = theme === "dark" 
    ? "w-full px-4 py-2 border border-gray-700 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const buttonClasses = theme === "dark"
    ? "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    : "px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-blue-600 transition";

  return (
    <div>
      {/* Edit Button */}
      <button
        onClick={openModal}
        className="bg-[#4A90E2] hover:bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
        title="Edit Service"
      >
        <FaRegEdit className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className={modalClasses} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Modal Content */}
          <div className={modalContentClasses}>
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 id="modal-title" className={`text-lg font-semibold ${textClasses}`}>
                Update Service
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="py-4">
              <div className="mb-4">
                <label htmlFor="imageUrl" className={`block ${textClasses} font-medium mb-2`}>Service Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={imageUrl || ""}
                  onChange={handleChange}
                  placeholder="Enter service image URL"
                  className={inputClasses}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className={`block ${textClasses} font-medium mb-2`}>Service Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={name || ""}
                  onChange={handleChange}
                  placeholder="Enter service name"
                  className={inputClasses}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className={`block ${textClasses} font-medium mb-2`}>Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={price || ""}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className={inputClasses}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="area" className={`block ${textClasses} font-medium mb-2`}>Area</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  defaultValue={area || ""}
                  onChange={handleChange}
                  placeholder="Enter area"
                  className={inputClasses}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className={`block ${textClasses} font-medium mb-2`}>Description</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={description || ""}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className={`${inputClasses} resize-none`}
                  rows="4"
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={buttonClasses}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

UpdateServiceModal.propTypes = {
  serviceId: PropTypes.string.isRequired,
};

export default UpdateServiceModal;
