import React from 'react';

export default function ProductImageGallery({ 
  images = [], 
  productName = "Sản phẩm" 
}) {

  const mainImage = images && images.length > 0 ? images[0] : null;

  if (!mainImage) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-gray-500">Không có ảnh</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">

      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img
          src={mainImage}
          alt={`${productName} - ảnh chính`}
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
}