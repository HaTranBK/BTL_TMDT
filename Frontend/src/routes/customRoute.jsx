import { useRoutes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import MyAccount from "../pages/MyAccountPage.jsx"
const customRoute = () => {
  let route = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/myaccount",
      element: <MyAccount />,
    },
  ]);
  return route;
};

export default customRoute;
