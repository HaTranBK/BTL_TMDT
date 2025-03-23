import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

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
      element: <LoginPage />,
    },
  ]);
  return route;
};

export default customRoute;
