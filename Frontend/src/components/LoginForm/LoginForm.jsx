import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
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
        username: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log("values in useformik: ", values);
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate("/");
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
        username: yup.string().required("Username is required"),

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
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
