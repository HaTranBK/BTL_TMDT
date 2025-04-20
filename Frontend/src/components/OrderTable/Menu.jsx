import React from 'react';
import avatar from '../../assets/user-avatar.png'

export default function Menu() {
    return (
      <aside className="w-60 bg-gray-100 px-4 py-8 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="h-18 w-18 rounded-full bg-red-200 overflow-hidden">
            <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-2 font-medium">Sofia Havertz</h2>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li><a href="#" className="block hover:text-green-500">Tài khoản</a></li>
          {/* <div className="border-t border-black/20" /> */}
          <li><a href="#" className="block hover:text-green-500">Địa chỉ</a></li>
          <li><a href="#" className="block hover:text-green-500">Lịch sử mua hàng</a></li>
          <li><a href="#" className="block hover:text-green-500">Đăng xuất</a></li>
        </ul>
      </aside>
    );
  }