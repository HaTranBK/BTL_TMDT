import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChecked = (e) => {
    const { checked } = e.target;
    setChecked(checked);
  };
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log("values in useformik: ", values);
        toast.success("Sign up successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        // setIsSigningInOn();
        // try {
        //   const result = await axiosInstance.post("/auth/login", values);
        //   console.log("result in signIn useformik: ", result);
        //   handleNotification(result.data.message, "success");
        //   setAuthUser(result.data.user);
        //   connectSocket();
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 2000);
        // } catch (error) {
        //   console.log("error in signin in useformik: ", error);
        //   handleNotification(error.response.data.message, "error");
        // } finally {
        //   setIsSigningInOff();
        // }
      },
      validationSchema: yup.object({
        name: yup.string().required("Name is required"),
        username: yup.string().required("Username is required"),
        email: yup
          .string()
          .required("Email is required") // Bắt buộc nhập
          .email("Invalid email format"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Password must be at least 6 characters"),
      }),
    });
  console.log("error: ", errors);
  return (
    <form
      className="flex flex-col w-full max-w-md gap-6 p-5"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded"
        />
        {errors.name && touched.name && (
          <p className="text-red-500">{errors.name}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded"
        />
        {errors.username && touched.username && (
          <p className="text-red-500">{errors.username}</p>
        )}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded"
        />
        {errors.email && touched.email && (
          <p className="text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded"
          autoComplete="new-password"
        />
        {errors.password && touched.password && (
          <p className="text-red-500">{errors.password}</p>
        )}
        <button
          type="button"
          className="absolute right-2 top-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z94kacNZNkcbc4oy/huge-ico.png"
              alt="toggle password"
              className="w-6 h-6"
            />
          ) : (
            <EyeOff />
          )}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreement"
          checked={checked}
          onChange={handleChecked}
          className="w-4 h-4"
        />
        <label className="text-gray-700">
          I agree with{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Terms of Use
          </a>
        </label>
      </div>
      <button
        className={`w-full max-w-md px-4 py-2 mt-4 text-white  rounded ${
          Object.keys(errors).length > 0 ||
          Object.values(values).some((value) => !value)
            ? "bg-gray-300"
            : "bg-green-600 hover:bg-green-500"
        }`}
        type="submit"
        disabled={
          Object.keys(errors).length > 0 ||
          Object.values(values).some((value) => !value)
        }
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
