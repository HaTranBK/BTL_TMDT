import React from "react";
import logo from "../assets/logo.png";
import { Search, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="text-white py-3 px-4 flex items-center justify-between md:px-40"
      style={{ backgroundColor: "#179A4E" }}
    >
      <div className="flex items-center">
        <img src={logo} alt="Greeniez" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl">Greeniez</span>
      </div>
      <nav className="flex space-x-8">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/shop" className="hover:underline">
          Cửa hàng
        </a>
        <a href="/blog" className="hover:underline hidden md:inline">
          Blog
        </a>
        <a href="/contact" className="hover:underline hidden lg:inline">
          Liên hệ với chúng tôi
        </a>
      </nav>
      <div className="flex items-center space-x-4 lg:space-x-8">
        <button className="text-lg md:text-base" aria-label="search">
          <Search className="w-5 h-5" />
        </button>
        <button
          className="text-lg md:text-base"
          aria-label="profile"
          onClick={() => navigate("/myaccount")}
        >
          <User className="w-5 h-5" />
        </button>
        <button className="text-lg md:text-base" aria-label="cart">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
