import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/authcontext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const axiosInstant = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstant.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => {
              toast.error(err.code);
            });
        }
        return Promise.reject(error);
      }
    );
  }, [logOutUser, navigate]);

  return axiosInstant;
};

export default useAxiosSecure;
