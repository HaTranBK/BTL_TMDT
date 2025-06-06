import React, { useState } from 'react';
import { StarIcon, ThumbsUpIcon, MessageSquareIcon } from 'lucide-react';

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
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800">{review.author || "Người dùng ẩn danh"}</h4>
              <div className="flex items-center mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1 sm:mt-0">{review.date || "Không rõ ngày"}</p>
          </div>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{review.text || "Không có nội dung đánh giá."}</p>
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

const starFilterOptions = [
  { id: 'all', name: 'Tất cả' },
  { id: 5, name: '5 Sao' },
  { id: 4, name: '4 Sao' },
  { id: 3, name: '3 Sao' },
  { id: 2, name: '2 Sao' },
  { id: 1, name: '1 Sao' },
];

export default function ProductReviews({ reviews = [], selectedStar, onStarFilterChange }) {
  const [visibleReviews, setVisibleReviews] = useState(5);

  const handleLoadMore = () => setVisibleReviews(prev => prev + 5);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-0">
          {reviews.length > 0 ? `${reviews.length} Đánh Giá` : 'Chưa có đánh giá'}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium mr-2">Lọc theo:</span>
          {starFilterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => onStarFilterChange(option.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-colors
                          ${selectedStar === option.id 
                            ? 'bg-gray-800 text-white border-gray-800' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                          }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-0">
          {reviews.slice(0, visibleReviews).map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-4 text-center">Không có đánh giá nào phù hợp với bộ lọc này.</p>
      )}

      {visibleReviews < reviews.length && (
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