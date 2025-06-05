import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/user-avatar.png";

export default function Menu() {
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullname: "",
    phone_num: "",
    dob: "",
    avatar: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
    setShowAccountPopup(true);
    setShowAddressPopup(false);
  };

  const handleAddressClick = () => {
    fetchProfile();
    setShowAddressPopup(true);
    setShowAccountPopup(false);
  };

  const closePopup = () => {
    setShowAccountPopup(false);
    setShowAddressPopup(false);
    setError(null);
  };

  const handleEditClick = () => {
    if (profile) {
      setEditData({
        fullname: profile.fullname || "",
        phone_num: profile.phone_num || "",
        dob: profile.dob ? profile.dob.slice(0, 10) : "",
        avatar: profile.avatar || "",
      });
      setIsEditing(true);
      setUpdateMsg(null);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMsg(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://be-tm-t.onrender.com/Users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setIsEditing(false);
        setUpdateMsg("Cập nhật thành công!");
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
      } else {
        setUpdateMsg(data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      setUpdateMsg("Lỗi kết nối");
    }
    setUpdateLoading(false);
  };

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
          <h2 className="mt-2 font-medium">Sofia Havertz</h2>
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

      {/* Popup Thông tin tài khoản */}
      {showAccountPopup && (
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
              Thông tin tài khoản
            </h1>

            {error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : !profile ? (
              <div className="text-center py-4">Đang tải thông tin...</div>
            ) : isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">Họ tên:</label>
                  <input
                    type="text"
                    name="fullname"
                    value={editData.fullname}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    name="phone_num"
                    value={editData.phone_num}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">
                    Ngày sinh:
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={editData.dob}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">
                    Avatar (URL):
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    value={editData.avatar}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                {updateMsg && (
                  <div
                    className={`text-center ${
                      updateMsg.includes("thành công")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {updateMsg}
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    {updateLoading ? "Đang lưu..." : "Lưu"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-gray-700">Họ tên:</span>{" "}
                    <span className="text-gray-900">{profile.fullname}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Số điện thoại:
                    </span>{" "}
                    <span className="text-gray-900">{profile.phone_num}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Ngày sinh:
                    </span>{" "}
                    <span className="text-gray-900">
                      {profile.dob && profile.dob.slice(0, 10)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Vai trò:
                    </span>{" "}
                    <span className="text-gray-900">{profile.role}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            )}
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

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-xl font-semibold animate-bounce">
            Đã chỉnh sửa thông tin thành công!
          </div>
        </div>
      )}
    </div>
  );
}
