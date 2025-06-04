import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Search, User, ShoppingCart, X } from "lucide-react";
import UserProfilePage from '../pages/UserProfilePage';

export default function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <header className="text-white py-3 px-4 flex items-center justify-between md:px-40" style={{ backgroundColor: '#179A4E' }}>
        <div className="flex items-center">
          <img src={logo} alt="Greeniez" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-xl">Greeniez</span>
        </div>
        <nav className="flex space-x-8">
          <a href="/" className="hover:underline">Home</a>
          <a href="/shop" className="hover:underline">Cửa hàng</a>
          <a href="/blog" className="hover:underline hidden md:inline">Blog</a>
          <a href="/contact" className="hover:underline hidden lg:inline">Liên hệ với chúng tôi</a>
        </nav>
        <div className="flex items-center space-x-4 lg:space-x-8">
          <button className="text-lg md:text-base" aria-label="search">
            <Search className="w-5 h-5" />
          </button>
          <button 
            className="text-lg md:text-base" 
            aria-label="profile"
            onClick={() => setShowProfileModal(!showProfileModal)}
          >
            {showProfileModal ? <X className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </button>
          <button className="text-lg md:text-base" aria-label="cart">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </header>

      {showProfileModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setShowProfileModal(false)}
              ></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <UserProfilePage onClose={() => setShowProfileModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}