import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'; 

// Dữ liệu mẫu cho các mục lọc 
const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'but', name: 'Bút các loại' }, 
  { id: 'so-vo', name: 'Sổ & Vở' },
  { id: 'tui-balo', name: 'Túi & Balo' },
  { id: 'dung-cu', name: 'Dụng cụ học tập' },
  { id: 'khac', name: 'Khác' },
];

const priceRanges = [
  { id: 'price_all', name: 'Tất cả giá', range: null },
  { id: 'price_1', name: 'Dưới 50.000đ', range: { max: 50000 } },
  { id: 'price_2', name: '50.000đ - 200.000đ', range: { min: 50000, max: 200000 } },
  { id: 'price_3', name: 'Trên 200.000đ', range: { min: 200000 } },
];


function FilterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <div className="py-5 border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-4 space-y-3 pr-2">{children}</div>}
    </div>
  );
}


export default function FilterSidebar() {
  // State để lưu trữ lựa chọn hiện tại 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(['price_all']);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
  };

  const handlePriceChange = (priceRangeId) => {
    if (priceRangeId === 'price_all') {
      setSelectedPriceRanges(['price_all']);
    } else {
      setSelectedPriceRanges(prev => {
        const newRanges = prev.includes(priceRangeId)
          ? prev.filter(id => id !== priceRangeId && id !== 'price_all') 
          : [...prev.filter(id => id !== 'price_all'), priceRangeId]; 
        
        if (newRanges.length === 0) return ['price_all']; 
        return newRanges;
      });
    }
    console.log('Selected price ranges:', selectedPriceRanges);

  };

 const primaryGreenColor = '#179A4E';
  return (
    // === Thanh Lọc Sản Phẩm ===
    <aside className="w-72 bg-white p-6 rounded-xl shadow-lg h-fit"> 
      <h2 className="text-xl font-bold text-primary-green mb-6 border-b pb-3">Lọc Sản Phẩm</h2>

      {/* Mục Lọc theo Danh Mục */}
      <FilterSection title="Phân Loại">
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-150
                            ${selectedCategory === category.id 
                                ? 'bg-green-100 text-primary-green font-semibold' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Mục Lọc theo Giá */}
      <FilterSection title="Giá">
        <div className="space-y-3">
          {priceRanges.map(range => (
            <label key={range.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.id)}
                onChange={() => handlePriceChange(range.id)}
                className="h-4 w-4 text-primary-green border-gray-300 rounded focus:ring-offset-0 focus:ring-1 focus:ring-primary-green transition-all duration-150"
              />
              <span className={`text-sm ${selectedPriceRanges.includes(range.id) ? 'text-primary-green font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>
                {range.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="mt-8">
        <button 
            className="w-full px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            onClick={() => console.log("Apply all filters logic here...")}
        >
            Áp Dụng Lọc 
        </button>
      </div>
    </aside>
  );
}