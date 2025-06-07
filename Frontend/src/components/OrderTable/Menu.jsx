import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/user-avatar.png";
import UserProfilePage from "../../pages/UserProfilePage";

export default function Menu() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://be-tm-t.onrender.com/Users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) setProfile(data.data);
      else setError(data.message || "Lỗi lấy thông tin");
    } catch (err) {
      setError("Lỗi kết nối");
    }
  };

  const handleAccountClick = () => {
    fetchProfile();
    setShowProfileModal(true);
    setShowAddressPopup(false);
  };

  const handleAddressClick = () => {
    fetchProfile();
    setShowAddressPopup(true);
    setShowProfileModal(false);
  };

  const closePopup = () => {
    setShowProfileModal(false);
    setShowAddressPopup(false);
    setError(null);
  };
  useEffect(() => {
    fetchProfile(); // Tự động gọi khi component mount
  }, []);


  return (
    <div className="relative">
      <aside className="w-60 bg-gray-100 px-4 py-8 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="h-18 w-18 rounded-full bg-red-200 overflow-hidden">
            <img
              src={avatar}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-2 font-medium">{profile?.fullname || "Người dùng"}</h2>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li>
            <button
              onClick={handleAccountClick}
              className="block hover:text-green-500 w-full text-left"
            >
              Tài khoản
            </button>
          </li>
          <li>
            <button
              onClick={handleAddressClick}
              className="block hover:text-green-500 w-full text-left"
            >
              Địa chỉ
            </button>
          </li>
          <li>
            <a href="#" className="block hover:text-green-500">
              Lịch sử mua hàng
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-green-500">
              Đăng xuất
            </a>
          </li>
        </ul>
      </aside>

      {/* Modal UserProfilePage */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={closePopup}
              ></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <UserProfilePage onClose={closePopup} />
            </div>
          </div>
        </div>
      )}

      {/* Popup Thông tin địa chỉ */}
      {showAddressPopup && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-20 backdrop-blur-md z-50">
          <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8 backdrop-blur-sm border border-white border-opacity-30 relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
              Thông tin địa chỉ
            </h1>

            {error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : !profile ? (
              <div className="text-center py-4">Đang tải thông tin...</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-700">Địa chỉ:</span>{" "}
                  <span className="text-gray-900">
                    {profile.address || "Chưa cập nhật"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Số điện thoại:
                  </span>{" "}
                  <span className="text-gray-900">{profile.phone_num}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
