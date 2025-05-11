import React, { useState } from 'react';
import ProductReviews from './ProductReviews'; 

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description'); 

  if (!product) return null;

  // Danh sách các tab
  const tabs = [
    { id: 'description', label: 'Mô Tả Sản Phẩm' },
    { id: 'specifications', label: 'Thông Số Kỹ Thuật' },
    { id: 'reviews', label: `Đánh Giá (${product.reviewsCount || 0})` },
  ];

  // Hàm để render nội dung của tab đang được chọn
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div 
            className="text-sm text-gray-700 leading-relaxed space-y-3" 
            dangerouslySetInnerHTML={{ __html: product.longDescription || '<p>Không có mô tả chi tiết cho sản phẩm này.</p>' }} 
          />
        );
      case 'specifications':
        return (
          <div className="text-sm text-gray-700">
            {product.specifications && product.specifications.length > 0 ? (
              <ul className="space-y-2"> 
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex border-b border-gray-100 py-2 last:border-b-0"> 
                    <span className="font-medium text-gray-800 w-1/3 sm:w-1/4">{spec.label}:</span>
                    <span className="text-gray-600 w-2/3 sm:w-3/4">{spec.value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Hiện chưa có thông số kỹ thuật cho sản phẩm này.</p>
            )}
          </div>
        );
      case 'reviews':
        // Render component ProductReviews, truyền dữ liệu reviews và productId
        return <ProductReviews reviews={product.reviews || []} productId={product.id} />;
      default:
        return null;
    }
  };

  return (
    // === Khu Vực Tabs Thông Tin Sản Phẩm ===
    <div className="w-full">
      {/* Thanh chứa các nút Tab */}
      <div className="border-b border-gray-300 mb-6"> 
        <nav className="-mb-px flex space-x-4 sm:space-x-6" aria-label="Tabs"> 
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 text-xs sm:text-sm font-medium transition-colors duration-150 focus:outline-none
                ${activeTab === tab.id
                  ? 'border-gray-700 text-gray-800' // Tab đang active: viền và chữ xám đậm
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400' // Tab không active
                }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Nội dung của Tab đang active */}
      <div className="py-1"> 
        {renderTabContent()}
      </div>
    </div>
  );
}