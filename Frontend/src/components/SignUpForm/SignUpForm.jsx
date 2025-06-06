import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChecked = (e) => {
    const { checked } = e.target;
    setChecked(checked);
  };

  const navigate = useNavigate();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        password: "",
        phone_num: "",
        dob: "",
      },
      onSubmit: async (values) => {
        setIsSubmitting(true);
        try {
          // 1. Thêm timeout để tránh treo máy khi mạng chậm
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 giây timeout

          const response = await fetch(
            "https://be-tm-t.onrender.com/Users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                ...values,
                role: "customer",
              }),
              signal: controller.signal, // Áp dụng abort controller
            }
          );

          clearTimeout(timeoutId); // Clear timeout nếu request thành công

          // 2. Kiểm tra response theo cách mạnh mẽ hơn
          if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (e) {
              console.error("Failed to parse error response:", e);
            }
            throw new Error(errorMessage);
          }

          // 3. Xử lý response an toàn
          const data = await response.json().catch((e) => {
            console.error("Failed to parse response:", e);
            throw new Error("Invalid server response");
          });

          if (!data.success) {
            throw new Error(data.message || "Registration failed");
          }

          toast.success(data.message || "Đăng ký thành công");
          if (data.data?.token) {
            localStorage.setItem("authToken", data.data.token);
          }
          setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
          console.error("Registration error details:", error);

          // 4. Phân loại lỗi chi tiết
          if (error.name === "AbortError") {
            toast.error("Request timeout. Vui lòng kiểm tra kết nối mạng");
          } else if (error.message.includes("Failed to fetch")) {
            toast.error("Không thể kết nối đến server. Vui lòng thử lại sau");
          } else if (error.message.includes("Email đã được sử dụng")) {
            toast.error("Email đã được sử dụng");
          } else {
            toast.error(error.message || "Có lỗi xảy ra khi đăng ký");
          }
        } finally {
          setIsSubmitting(false);
        }
      },
      validationSchema: yup.object({
        fullname: yup
          .string()
          .required("Họ và tên là bắt buộc")
          .min(2, "Họ tên quá ngắn")
          .max(50, "Họ tên quá dài"),
        email: yup
          .string()
          .required("Email là bắt buộc")
          .email("Email không hợp lệ"),
        password: yup
          .string()
          .required("Mật khẩu là bắt buộc!")
          .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
          .max(20, "Mật khẩu quá dài"),
        phone_num: yup
          .string()
          .required("Số điện thoại là bắt buộc")
          .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
        dob: yup
          .string()
          .required("Ngày sinh là bắt buộc")
          .test("dob", "Bạn phải đủ 18 tuổi", (value) => {
            const dob = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < dob.getDate())
            ) {
              return age - 1 >= 18;
            }
            return age >= 18;
          }),
      }),
    });

  return (
    <form
      className="flex flex-col w-full max-w-md gap-4 p-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Họ và tên *
        </label>
        <input
          type="text"
          name="fullname"
          placeholder="Nhập họ và tên đầy đủ"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.fullname && touched.fullname && (
          <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Mật khẩu *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ít nhất 6 ký tự"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {!showPassword ? (
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z94kacNZNkcbc4oy/huge-ico.png"
                alt="toggle password"
                className="w-5 h-5"
              />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Số điện thoại *
        </label>
        <input
          type="text"
          name="phone_num"
          placeholder="Ví dụ: 0987654321"
          value={values.phone_num}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.phone_num && touched.phone_num && (
          <p className="mt-1 text-sm text-red-600">{errors.phone_num}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Ngày sinh *
        </label>
        <input
          type="date"
          name="dob"
          value={values.dob}
          onChange={handleChange}
          onBlur={handleBlur}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.dob && touched.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
        )}
      </div>

      <div className="flex items-start mt-2">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            name="agreement"
            checked={checked}
            onChange={handleChecked}
            className="w-4 h-4 border border-gray-300 rounded focus:ring-green-500"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="font-medium text-gray-700">
            Tôi đồng ý với{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-500 hover:underline"
            >
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-500 hover:underline"
            >
              Chính sách bảo mật
            </a>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0 || !checked}
        className={`w-full px-4 py-2 mt-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
          isSubmitting || Object.keys(errors).length > 0 || !checked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 -ml-1 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang xử lý...
          </span>
        ) : (
          "Đăng ký"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
