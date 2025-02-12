import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Registation from "../pages/Registation";
import AddService from "../pages/AddService";
import PrivaterRoute from "./PrivaterRoute";
import Home from "../pages/Home";
import ServiceDetails from "../pages/ServiceDetails";
import AllServices from "../pages/AllServices";
import ManageServices from "../pages/ManageServices";
import BookedServices from "../pages/BookedServices";
import ErrorPage from '../pages/ErrorPage'
import ServicesToDo from "../pages/ServicesToDo";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Registation />
        },
        {
            path: '/add-service',
            element: <PrivaterRoute><AddService /></PrivaterRoute>
        },
        {
            path: '/services/:id',
            element: <PrivaterRoute><ServiceDetails /></PrivaterRoute>
        },
        {
            path: '/all-services',
            element: <AllServices />
        },
        {
            path: '/manage-services',
            element: <PrivaterRoute><ManageServices /></PrivaterRoute>
        },
        {
            path: '/booked-services',
            element: <PrivaterRoute><BookedServices /></PrivaterRoute>
        },
        {
            path: '/service-to-do',
            element: <PrivaterRoute><ServicesToDo /></PrivaterRoute>
        }
      ]
    },
  ]);

export default router;