import React, { useState } from 'react';
import { StarIcon, HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from 'lucide-react';

const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'N/A';
  }
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false); 

  if (!product) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2 mt-4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      if (typeof product.stock === 'number' && newQuantity > product.stock && product.stock > 0) {
        setQuantity(product.stock);
      } else {
        setQuantity(newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    console.log(`Thêm vào giỏ hàng: ID ${product.id}, Tên ${product.name}, Số lượng: ${quantity}`);
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted); 
    console.log(`Thay đổi trạng thái yêu thích cho: ID ${product.id}, Tên ${product.name}. Hiện tại: ${!isWishlisted ? 'Đã yêu thích' : 'Bỏ yêu thích'}`);
  };

  const currentPrice = product.price;
  const originalPriceToShow = product.originalPrice;

  return (
    <div className="space-y-5">
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
          <a href="#reviews-section" className="text-sm text-gray-500 hover:underline cursor-pointer">
            ({product.reviewsCount} đánh giá)
          </a>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {product.name || "Tên sản phẩm"}
      </h1>

      {/* Hiển thị mô tả ngắn đã được cắt ngắn từ props */}
      {product.shortDescription && (
        <p className="text-gray-600 text-base leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      <div className="mt-2">
        <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {formatCurrency(currentPrice)}
        </span>
        {originalPriceToShow && originalPriceToShow > currentPrice && (
          <span className="ml-3 text-lg text-gray-400 line-through">
            {formatCurrency(originalPriceToShow)}
          </span>
        )}
      </div>

      {product.categoryName && <p className="text-sm text-gray-500 pt-2"><strong>Phân loại:</strong> {product.categoryName}</p>}
      {product.materialName && <p className="text-sm text-gray-500"><strong>Chất liệu:</strong> {product.materialName}</p>}
      {typeof product.stock === 'number' && <p className="text-sm text-gray-500"><strong>Tồn kho:</strong> {product.stock}</p>}
      
      <div className="pt-3">
        <label htmlFor={`quantity-${product.id}`} className="block text-sm font-medium text-gray-800 mb-1.5">Số lượng:</label>
        <div className="flex items-center border border-gray-300 rounded-lg w-fit shadow-sm">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500"
            aria-label="Giảm số lượng"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <input
            type="number"
            id={`quantity-${product.id}`}
            name="quantity"
            value={quantity}
            onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1) handleQuantityChange(val);
                else if (e.target.value === "") setQuantity(1); 
            }}
            min="1"
            className="w-12 h-10 text-center font-medium text-gray-700 border-l border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none [-moz-appearance:textfield]"
            aria-label="Số lượng sản phẩm"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={typeof product.stock === 'number' && quantity >= product.stock && product.stock > 0}
            className="px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors focus:outline-none focus:ring-1 focus:ring-gray-500"
            aria-label="Tăng số lượng"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        {typeof product.stock === 'number' && product.stock > 0 && quantity > product.stock && (
            <p className="text-xs text-red-500 mt-1">Số lượng vượt quá số lượng tồn kho ({product.stock}).</p>
        )}
         {typeof product.stock === 'number' && product.stock === 0 && (
            <p className="text-sm text-red-500 mt-1 font-medium">Sản phẩm hiện đã hết hàng.</p>
        )}
      </div>

      <div className="pt-4 space-y-3 sm:space-y-0 sm:flex sm:gap-4">
        <button
          type="button"
          onClick={handleAddToWishlist}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1
                      ${isWishlisted 
                        ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500' 
                        : 'border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 focus:ring-gray-500'
                      }`}
        >
          <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          {isWishlisted ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
        </button>
        
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={typeof product.stock === 'number' && product.stock === 0}
          className="w-full sm:flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCartIcon className="inline-block w-5 h-5 mr-2 -mt-0.5" />
          {typeof product.stock === 'number' && product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
        </button>
      </div>
    </div>
  );
}