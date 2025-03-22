import { useRoutes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import HomePage from "../pages/HomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

const customRoute = () => {
  let route = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return route;
};

export default customRoute;
