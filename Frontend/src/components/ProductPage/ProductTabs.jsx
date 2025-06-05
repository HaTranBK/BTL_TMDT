import React, { useState } from 'react';
import ProductReviews from './ProductReviews'; 

export default function ProductTabs({ product, isLoadingReviews, reviewsError }) {
  const [activeTab, setActiveTab] = useState('descriptionAndSpecs'); 

  if (!product) {
    return null; 
  }


  const tabs = [
    { id: 'descriptionAndSpecs', label: 'Mô tả sản phẩm' }, 
    { id: 'reviews', label: `Đánh Giá (${product.reviewsCount || 0})` },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'descriptionAndSpecs': 
        return (
          <div
            className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: product.longDescription || '<p>Hiện chưa có thông tin chi tiết cho sản phẩm này.</p>' }}
          />
        );
      case 'reviews':
        if (isLoadingReviews) return <p className="text-center text-gray-500 py-4 animate-pulse">Đang tải đánh giá...</p>;
        if (reviewsError) return <p className="text-center text-red-500 py-4">Lỗi: {reviewsError}</p>;
        return <ProductReviews reviews={product.reviews || []} productId={product.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full" id="reviews-section"> 
      <div className="border-b border-gray-300 mb-6 sm:mb-8">
        <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 text-xs sm:text-sm font-medium transition-colors duration-150 focus:outline-none
                          ${activeTab === tab.id
                            ? 'border-gray-700 text-gray-800'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                          }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-1">
        {renderTabContent()}
      </div>
    </div>
  );
}