import React from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm.jsx";
import { Link } from "react-router-dom";

const SignUpPage = () => {
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
            <h1 className="text-4xl font-medium text-gray-900">Sign up</h1>
            <p className="mt-4 text-lg text-gray-700">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
