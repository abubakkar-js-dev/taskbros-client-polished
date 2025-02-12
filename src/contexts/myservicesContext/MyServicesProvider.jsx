import PropTypes from "prop-types";

import { useState } from "react";
import MyServicesContext from "./MyServicesContext";

const MyServicesProvider = ({ children }) => {
  const [myServices, setMyServices] = useState([]);

  // for specific services

  const handleMyServicesState = (updatedService) => {
    setMyServices((prevServices) =>
      prevServices.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
  };

  const info = {
    myServicesState: { myServices, setMyServices },
    handleMyServicesState,
  };
  return (
    <MyServicesContext.Provider value={info}>
      {children}
    </MyServicesContext.Provider>
  );
};

MyServicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyServicesProvider;
