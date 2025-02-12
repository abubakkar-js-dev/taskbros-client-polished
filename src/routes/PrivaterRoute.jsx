import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../contexts/authcontext/AuthContext";
import Loading from "../components/common/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivaterRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const {pathname} = useLocation();
   
    if(loading){
        return <Loading />
    }

    if(user){
        return children;
    }

    return <Navigate state={{from: pathname}} to="/login" />

}

PrivaterRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivaterRoute;