import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/user-avatar.png";

export default function UserProfilePage({ onClose }) {
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
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Password change
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const CLOUD_NAME = "dlyambdhm";
  const UPLOAD_PRESET = "meomeo";

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
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
      if (data.success) setProfile(data.data);
      else setError(data.message || "Lỗi lấy thông tin");
    } catch (err) {
      setError("Lỗi kết nối");
    }
  };

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          setEditData((prev) => ({ ...prev, avatar: data.secure_url }));
          setAvatarPreview(data.secure_url);
        } else {
          alert("Lỗi upload ảnh lên Cloudinary!");
        }
      } catch (err) {
        alert("Lỗi upload ảnh!");
      }
    }
  };

  // Edit profile
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
      setAvatarPreview(profile.avatar || "");
      setAvatarFile(null);
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

      // Tạo object dữ liệu để gửi đi
      const payload = {
        fullname: editData.fullname,
        phone_num: editData.phone_num,
        dob: editData.dob,
        avatar: editData.avatar, // Nếu server chỉ cần URL ảnh
      };

      // Nếu server hỗ trợ upload file thực sự
      let body;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (avatarFile) {
        // Nếu có file ảnh mới, gửi dạng FormData
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        formData.append("fullname", editData.fullname);
        formData.append("phone_num", editData.phone_num);
        formData.append("dob", editData.dob);

        body = formData;
      } else {
        // Nếu không có file ảnh mới, gửi dạng JSON
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
      }

      const res = await fetch("https://be-tm-t.onrender.com/Users/profile", {
        method: "PUT",
        headers: headers,
        body: body,
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
      console.error("Update error:", err);
    }
    setUpdateLoading(false);
  };

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
    <div className="relative">
      <div className="absolute top-0 right-0 p-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Thông tin tài khoản
        </h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {!profile ? (
          <div className="text-center">Đang tải...</div>
        ) : isEditing ? (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <img
                  src={avatarPreview || editData.avatar || defaultAvatar}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover border-2 border-green-500 mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                Nhấn để thay đổi ảnh
              </span>
            </div>

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
              <label className="font-semibold text-gray-700">Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={editData.dob}
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
            <div className="flex flex-col items-center mb-6">
              <img
                src={profile.avatar || defaultAvatar}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover border-2 border-green-500 mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
              <div className="text-xl font-semibold text-gray-800">
                {profile.fullname}
              </div>
              <div className="text-gray-500">{profile.email}</div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <span className="font-semibold text-gray-700">
                  Số điện thoại:
                </span>{" "}
                <span className="text-gray-900">{profile.phone_num}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Ngày sinh:</span>{" "}
                <span className="text-gray-900">
                  {profile.dob && profile.dob.slice(0, 10)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Vai trò:</span>{" "}
                <span className="text-gray-900">{profile.role}</span>
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
                onClick={() => {
                  setShowPasswordForm(true);
                  setPasswordMsg(null);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        )}

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
  );
}
