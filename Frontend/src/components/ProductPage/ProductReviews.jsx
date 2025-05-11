import React, { useState } from 'react';
import { StarIcon, ThumbsUpIcon, MessageSquareIcon, ChevronDownIcon } from 'lucide-react';

// Component con cho một mục đánh giá
const ReviewItem = ({ review }) => {
  return (
    <div className="py-5 border-b border-gray-200 last:border-b-0"> 
      <div className="flex items-start space-x-3 sm:space-x-4">
        <img 
          src={review.avatar || '/images/avatars/default-avatar.png'}
          alt={`Avatar của ${review.author}`} 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" 
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800">{review.author}</h4>
              <div className="flex items-center mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1 sm:mt-0">{review.date}</p>
          </div>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.text}</p>
          <div className="mt-2.5 flex items-center space-x-3 text-xs">
            <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
              <ThumbsUpIcon className="w-3.5 h-3.5 mr-1" />
              Thích
            </button>
            <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
              <MessageSquareIcon className="w-3.5 h-3.5 mr-1" />
              Trả lời
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function ProductReviews({ reviews = [], productId }) {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const reviewSortOptions = [ /* ... giữ nguyên ... */ ];

  const handleLoadMore = () => setVisibleReviews(prev => prev + 3);
  
  const sortedReviews = [...reviews]; 

  return (
    <div className="w-full">
      {/* Thanh điều khiển của phần Reviews */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          {reviews.length > 0 ? `${reviews.length} Đánh Giá` : 'Chưa có đánh giá'}
        </h3>
        {reviews.length > 0 && ( // Chỉ hiển thị dropdown sắp xếp nếu có review
            <div className="relative">
            <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
                aria-haspopup="true"
                aria-expanded={isSortDropdownOpen}
            >
                Sắp xếp: {reviewSortOptions.find(opt => opt.id === sortOrder)?.name || 'Mới nhất'}
                <ChevronDownIcon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 transition-transform duration-200 ${isSortDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isSortDropdownOpen && (
                <div 
                    className="absolute right-0 mt-1 w-44 sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 origin-top-right"
                    role="menu" 
                    aria-orientation="vertical"
                    onMouseLeave={() => setIsSortDropdownOpen(false)}
                >
                {reviewSortOptions.map(option => (
                    <button
                    key={option.id}
                    onClick={() => { /* ... */ }}
                    className={`block w-full text-left px-3 py-1.5 text-xs sm:text-sm 
                                ${sortOrder === option.id 
                                    ? 'bg-gray-100 text-gray-900 font-medium' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                    role="menuitem"
                    >
                    {option.name}
                    </button>
                ))}
                </div>
            )}
            </div>
        )}
      </div>

      {/* Danh sách các đánh giá */}
      {sortedReviews.length > 0 ? (
        <div className="space-y-0"> 
          {sortedReviews.slice(0, visibleReviews).map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-4 text-center">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
      )}

      {/* Nút Tải thêm đánh giá */}
      {visibleReviews < sortedReviews.length && (
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-5 py-2.5 border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
          >
            Xem thêm đánh giá
          </button>
        </div>
      )}
    </div>
  );
}