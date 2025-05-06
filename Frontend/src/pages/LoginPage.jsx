import React from "react";
import LoginForm from "../components/LoginForm/LoginForm.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="max-h-screen ">
      <div className="flex max-w-full bg-white">
        <div className="w-1/2 bg-[#E7F4ED]">
          <div className="flex flex-col items-center justify-center w-full relative">
            <div className="mt-8 absolute top-[-10px]">
              <span className="text-2xl font-medium text-green-600">
                Greeniez
              </span>
            </div>
            <div className="w-2/3 mx-auto">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z94kacNZNkcbc4oy/image-pl.png"
                alt="Background"
                className="h-screen w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 p-5">
          <div className="flex flex-col items-start w-full max-w-md p-5">
            <h1 className="text-4xl font-medium text-gray-900">Sign In</h1>
            <p className="mt-4 text-lg text-gray-700">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
