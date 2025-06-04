import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function ProductImageGallery({ images = [], productName = "Sản phẩm" }) {
  if (!images || images.length === 0) {
    // Hiển thị một ảnh placeholder nếu không có ảnh
    return (
      <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Không có ảnh</span>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const mainImage = images[currentIndex];
  const thumbnails = images; 

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // === Khu Vực Hiển Thị Ảnh Sản Phẩm ===
    <div className="w-full space-y-4">
      {/* Ảnh chính */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img
          src={mainImage}
          alt={`${productName} - ảnh chính ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300 ease-in-out" // Dùng object-contain để thấy toàn bộ ảnh
        />
        {/* Nút qua trái */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-opacity duration-200 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Ảnh trước"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        {/* Nút qua phải */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-opacity duration-200 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Danh sách ảnh thumbnail */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {thumbnails.map((thumbSrc, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ease-in-out
                          ${currentIndex === index 
                            ? 'border-gray-700 shadow-lg' 
                            : 'border-transparent hover:border-gray-400 opacity-70 hover:opacity-100'
                          }`}
              aria-label={`Xem ảnh ${index + 1}`}
            >
              <img src={thumbSrc} alt={`${productName} - thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}