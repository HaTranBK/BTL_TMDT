import React, { useState } from 'react';
import { ChevronDownIcon, LayoutGridIcon, ListIcon } from 'lucide-react'; 

const sortOptions = [
  { id: 'default', name: 'Mặc định' },
  { id: 'price_asc', name: 'Giá: Tăng dần' },
  { id: 'price_desc', name: 'Giá: Giảm dần' },
  // { id: 'newest', name: 'Mới nhất' },
  // { id: 'rating_desc', name: 'Đánh giá: Cao nhất' },
];

export default function ShopControlsBar({
  totalProducts = 0,
  selectedSort,
  setSelectedSort,

}) {
  const [currentView, setCurrentView] = useState('grid'); // 'grid' hoặc 'list'
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const productsPerPage = 12; 
  const currentPage = 1; 
  const startItem = totalProducts > 0 ? (currentPage - 1) * productsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    // === Thanh Điều Khiển Cửa Hàng ===
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between"> 
      {/* Phần hiển thị số lượng sản phẩm */}
      <div className="text-sm text-gray-600">
        {totalProducts > 0 
          ? `Hiển thị ${startItem}-${endItem} của ${totalProducts} sản phẩm`
          : 'Không có sản phẩm nào'
        }
      </div>

      <div className="flex items-center gap-4">
        {/* Dropdown Sắp xếp */}
        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-green"
            aria-haspopup="true"
            aria-expanded={isSortDropdownOpen}
          >
            {sortOptions.find(opt => opt.id === selectedSort)?.name || 'Sắp xếp'}
            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSortDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {/* Menu dropdown */}
          {isSortDropdownOpen && (
            <div 
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl z-20 py-1 origin-top-right"
                role="menu" 
                aria-orientation="vertical"
                onMouseLeave={() => setIsSortDropdownOpen(false)} 
            >
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedSort(option.id);
                    setIsSortDropdownOpen(false);
                    console.log('Sắp xếp theo:', option.id); 
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                              ${selectedSort === option.id 
                                ? 'bg-green-50 text-primary-green font-semibold' 
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                  role="menuitem"
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nút chuyển đổi Chế độ xem (Grid/List) */}
        <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-md border border-gray-200">
          <button
            onClick={() => {
              setCurrentView('grid');
              console.log('Chế độ xem: Grid');
            }}
            className={`p-1.5 rounded-sm transition-colors duration-150
                        ${currentView === 'grid' 
                            ? 'bg-primary-green text-white shadow' 
                            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                        }`}
            aria-label="Xem dạng lưới"
            title="Xem dạng lưới"
          >
            <LayoutGridIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setCurrentView('list');
              console.log('Chế độ xem: List');
            }}
            className={`p-1.5 rounded-sm transition-colors duration-150
                        ${currentView === 'list' 
                            ? 'bg-primary-green text-white shadow' 
                            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                        }`}
            aria-label="Xem dạng danh sách"
            title="Xem dạng danh sách"
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}