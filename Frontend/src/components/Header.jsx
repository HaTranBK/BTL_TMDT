import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Search, User, ShoppingCart, X } from "lucide-react";
import UserProfilePage from '../pages/UserProfilePage';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchKeyword)}`);
      setSearchActive(false);
      setSearchKeyword('');
    }
  };

  // Khi bật searchActive, tự focus vào input
  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);

  // Ẩn input khi click ngoài (nếu muốn)
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    }
    if (searchActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchActive]);

  return (
    <>
      <header className="text-white py-3 px-4 flex items-center justify-between md:px-40" style={{ backgroundColor: '#179A4E' }}>
        <div className="flex items-center">
          <img src={logo} alt="Greeniez" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-xl">Greeniez</span>
        </div>
        <nav className="flex space-x-8">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/shop" className="hover:underline">Cửa hàng</Link>
          <Link to="/blog" className="hover:underline hidden md:inline">Blog</Link>
          <Link to="/contact" className="hover:underline hidden lg:inline">Liên hệ với chúng tôi</Link>
        </nav>

        <div className="flex items-center space-x-4 lg:space-x-8">

          {!searchActive && (
            <button 
              aria-label="Mở thanh tìm kiếm"
              onClick={() => setSearchActive(true)}
              className="p-1 hover:bg-green-700 rounded"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {searchActive && (
            <div className="flex items-center space-x-2 border rounded bg-white px-2">
              <input
                ref={inputRef}
                type="text"
                className="text-gray-900 px-2 py-1 outline-none w-48"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Tìm kiếm sản phẩm..."
              />
              <button
                onClick={handleSearch}
                className="text-green-700 font-semibold px-3 py-1 hover:bg-green-100 rounded"
              >
                Tìm
              </button>
              <button
                onClick={() => { setSearchActive(false); setSearchKeyword(''); }}
                aria-label="Đóng thanh tìm kiếm"
                className="text-gray-500 hover:text-gray-700 px-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            className="text-lg md:text-base"
            aria-label="profile"
            onClick={() => navigate("/myaccount")}
          >
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/checkout')}
            className="text-lg md:text-base" aria-label="cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {/* <span className="ml-1">2</span> */}
          </button>
        </div>
      </header>

    </>
  );
}
