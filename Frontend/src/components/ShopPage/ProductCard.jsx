import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon, HeartIcon, SearchIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // let discountPercentage = product.discount;
  // if (!discountPercentage && product.originalPrice && product.price && product.originalPrice > product.price) {
  //   const diff = product.originalPrice - product.price;
  //   discountPercentage = Math.round((diff / product.originalPrice) * 100) + '%';
  // }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); // Chuyển hướng đến trang chi tiết sản phẩm
    console.log(`Navigating to product detail for ${product.name}`);
  };

  const handleActionClick = (e, actionMessage) => {
    e.stopPropagation();
    console.log(`${actionMessage} for ${product.name}`);
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No access token found. Please log in first.');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
      return;
    }
    try {
      toast.success(`Đã thêm vào giỏ hàng!`);
      const response = await fetch(`https://be-tm-t.onrender.com/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          productId: productId,
          quantity: 1, 
        }),
      });

      
      const result = await response.json();
      // Giả lập thêm sản phẩm vào giỏ hàng
      console.log(`Adding product ${productId} to cart`);
      // Thực hiện logic thêm vào giỏ hàng ở đây
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  return (
    // === Card Container ===
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === Image Section & Hover Actions === */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges (New, Discount, Eco) */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-md">MỚI</span>
          )}
          {/* {discountPercentage && (
            <span className="px-2.5 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-md">-{discountPercentage}</span>
          )} */}
        </div>
        {product.ecoBadge && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200 rounded-md shadow-sm z-10">
                {product.ecoBadge}
            </span>
        )}

        {/* Hover Action Buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center space-x-3 bg-black bg-opacity-0 transition-all duration-300 ease-in-out
                      ${isHovered ? 'bg-opacity-40' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <button
            onClick={(e) => handleActionClick(e, "Added to wishlist")}
            className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Thêm vào yêu thích"
          >
            <HeartIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => handleAddToCart(e, product.id)}
            className="p-3 bg-primary-green text-white rounded-full shadow-xl hover:bg-opacity-90 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-green"
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCartIcon className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => handleActionClick(e, "Looking for quick view")}
            className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Xem nhanh"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* === Product Information Section === */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary-green transition-colors duration-200" title={product.name}>
          {product.name}
        </h3>
        {typeof product.rating === 'number' && (
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1.5 text-xs text-gray-500">({product.reviewsCount || 0} đánh giá)</span>
          </div>
        )}
        <div className="flex items-baseline space-x-2">
          <p className="text-xl font-bold text-primary-green">{formatCurrency(product.price)}</p>
          {/* {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-sm text-gray-400 line-through">{formatCurrency(product.originalPrice)}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}