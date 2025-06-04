import { useRoutes } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MyAccount from "../pages/MyAccountPage.jsx"; 
import ShopPage from "../pages/ShopPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx"; 
import Checkout from "../pages/Checkout.jsx";

const CustomRoute = () => { 
  let routeElements = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/shop", 
      element: <ShopPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />, 
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/myaccount",
      element: <MyAccount />, 
    },
  
    {
      path: "/product/:productId", 
      element: <ProductDetailPage />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]);
  return routeElements;
};

export default CustomRoute;