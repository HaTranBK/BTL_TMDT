import React, { useEffect, useState, useRef } from "react";
import { User, X } from "lucide-react";

export default function UserProfileModal({ onClose }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullname: "",
    phone_num: "",
    dob: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);

  // Password change
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://be-tm-t.onrender.com/Users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setAvatarPreview(data.data.avatar || "");
      } else {
        setError(data.message || "Lỗi lấy thông tin");
      }
    } catch (err) {
      setError("Lỗi kết nối");
    }
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setEditData({ ...editData, avatar: file });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMsg(null);
    
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      formData.append("fullname", editData.fullname);
      formData.append("phone_num", editData.phone_num);
      formData.append("dob", editData.dob);
      if (editData.avatar instanceof File) {
        formData.append("avatar", editData.avatar);
      }

      const res = await fetch("https://be-tm-t.onrender.com/Users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setIsEditing(false);
        setUpdateMsg("Cập nhật thành công!");
        setTimeout(() => setUpdateMsg(null), 3000);
      } else {
        setUpdateMsg(data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      setUpdateMsg("Lỗi kết nối");
    }
    setUpdateLoading(false);
  };

  // Password change handlers (giữ nguyên như cũ)
  // Password change
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://be-tm-t.onrender.com/Users/change-password",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );
      const data = await res.json();
      if (data.success) {
        setPasswordMsg("Đổi mật khẩu thành công!");
        setShowPasswordForm(false);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
      } else {
        setPasswordMsg(data.message || "Đổi mật khẩu thất bại");
      }
    } catch (err) {
      setPasswordMsg("Lỗi kết nối");
    }
    setPasswordLoading(false);
    setPasswordData({ currentPassword: "", newPassword: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-green-700">Thông tin tài khoản</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : !profile ? (
            <div className="text-center py-4">Đang tải thông tin...</div>
          ) : isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={avatarPreview || "/default-avatar.png"}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover border-2 border-green-500 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Họ tên:</label>
                <input
                  type="text"
                  name="fullname"
                  value={editData.fullname}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Số điện thoại:</label>
                <input
                  type="text"
                  name="phone_num"
                  value={editData.phone_num}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Ngày sinh:</label>
                <input
                  type="date"
                  name="dob"
                  value={editData.dob}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {updateMsg && (
                <div className={`text-center ${updateMsg.includes("thành công") ? "text-green-600" : "text-red-500"}`}>
                  {updateMsg}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
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
                  {updateLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profile.avatar || "/default-avatar.png"}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover border-2 border-green-500 mb-3"
                />
                <h3 className="text-xl font-semibold">{profile.fullname}</h3>
                <p className="text-gray-600">{profile.email}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Số điện thoại:</span>
                  <p className="text-gray-900">{profile.phone_num || "Chưa cập nhật"}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ngày sinh:</span>
                  <p className="text-gray-900">
                    {profile.dob ? profile.dob.slice(0, 10) : "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Chỉnh sửa thông tin
                </button>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          )}

          {/* Password Form Modal (giữ nguyên như cũ) */}
           {/* Đổi mật khẩu */}
        {showPasswordForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                onClick={() => setShowPasswordForm(false)}
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
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
                Đổi mật khẩu
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">
                    Mật khẩu hiện tại:
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">
                    Mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  />
                </div>
                {passwordMsg && (
                  <div
                    className={`text-center ${
                      passwordMsg.includes("thành công")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordMsg}
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    {passwordLoading ? "Đang lưu..." : "Lưu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Popup thành công */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-xl font-semibold animate-bounce">
              Thao tác thành công!
            </div>
          </div>
        )}
      
        </div>
      </div>
    </div>
  );
}