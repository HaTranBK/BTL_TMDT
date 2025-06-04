import React, { useState } from 'react';
import { StarIcon, HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from 'lucide-react';


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1); // State cho số lượng sản phẩm

  if (!product) {
    return null; 
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) { 
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Thêm vào giỏ hàng: ${product.name}, Số lượng: ${quantity}`);
  };

  const handleAddToWishlist = () => {
    console.log(`Thêm vào yêu thích: ${product.name}`);
  };

  return (
    // === Khu Vực Thông Tin Chi Tiết Sản Phẩm ===
    <div className="space-y-5"> 
      
      {/* Đánh giá sao và số lượng reviews */}
      {typeof product.rating === 'number' && product.reviewsCount > 0 && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 hover:underline cursor-pointer">
            ({product.reviewsCount} đánh giá) 
          </span>
        </div>
      )}

      {/* Tên sản phẩm */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Mô tả ngắn */}
      {product.shortDescription && (
        <p className="text-gray-600 text-base leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      {/* Giá sản phẩm */}
      <div className="mt-2"> 
        <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {formatCurrency(product.price)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="ml-3 text-lg text-gray-400 line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        )}
      </div>

      {/* Kích thước sản phẩm */}
      {product.size && (
        <div className="pt-2"> 
          <h3 className="text-sm font-medium text-gray-800 mb-1">Kích thước:</h3>
          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 shadow-sm">
            {product.size}
          </span>
        </div>
      )}
      
      {/* Bộ chọn số lượng */}
      <div className="pt-3">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-800 mb-1.5">Số lượng:</label>
        <div className="flex items-center border border-gray-300 rounded-lg w-fit shadow-sm"> 
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500"
            aria-label="Giảm số lượng"
            disabled={quantity <= 1} 
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) handleQuantityChange(val);
            }}
            min="1" // Số lượng tối thiểu
            className="w-12 h-10 text-center font-medium text-gray-700 border-l border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none [-moz-appearance:textfield]" 
            aria-label="Số lượng sản phẩm"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500"
            aria-label="Tăng số lượng"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Các nút hành động */}
      <div className="pt-4 space-y-3 sm:space-y-0 sm:flex sm:gap-4">
        {/* Nút Thêm vào yêu thích */}
        <button 
          type="button"
          onClick={handleAddToWishlist}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-gray-400 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 hover:border-gray-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
        >
          <HeartIcon className="w-5 h-5" />
          Thêm vào yêu thích
        </button>

        {/* Nút Thêm vào giỏ hàng */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full sm:flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 active:scale-95 text-base"
        >
          <ShoppingCartIcon className="inline-block w-5 h-5 mr-2 -mt-0.5" /> {/* Icon cùng dòng với text */}
          Thêm vào giỏ hàng
        </button>
      </div>

    </div>
  );
}