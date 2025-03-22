import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        checked: false,
      },
      onSubmit: async (values) => {
        console.log("values in useformik: ", values);
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
          checked={values.checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-4 h-4"
          value={values.checked}
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
        className="w-full max-w-md px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-500"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
