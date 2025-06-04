import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'; 

// Dữ liệu mẫu cho các mục lọc 
const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: '2', name: 'Bút các loại' }, 
  { id: '1', name: 'Sổ & Vở' },
  { id: '3', name: 'Túi & Balo' },
  { id: '4', name: 'Khác' },
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


export default function FilterSidebar({selectedCategory,selectedPriceRanges,onApply,}) {
  // State để lưu trữ lựa chọn hiện tại 
  const [category, setCategory] = useState(selectedCategory);
  const [priceRangeIds, setPriceRangeIds] = useState(selectedPriceRanges);
  //const [products, setProducts] = useState([]); 
  
  // const getPriceFilter = () => {
  // // Lấy các khoảng giá đã chọn (ngoại trừ 'price_all')
  //   const selectedRanges = priceRanges.filter(
  //     pr => selectedPriceRanges.includes(pr.id) && pr.range !== null
  //   );

  //   if (selectedRanges.length === 0) {
  //     // Không lọc theo giá
  //     return {};
  //   }

  //   // Tính minPrice là min của các min có trong khoảng chọn
  //   const minPrice = selectedRanges.reduce((min, r) => {
  //     if (r.range.min !== undefined && r.range.min < min) return r.range.min;
  //     return min;
  //   }, Infinity);

  //   // Tính maxPrice là max của các max có trong khoảng chọn
  //   const maxPrice = selectedRanges.reduce((max, r) => {
  //     if (r.range.max !== undefined && r.range.max > max) return r.range.max;
  //     return max;
  //   }, -Infinity);

  //   return {
  //     minPrice: minPrice === Infinity ? undefined : minPrice,
  //     maxPrice: maxPrice === -Infinity ? undefined : maxPrice,
  //   };
  // };

  // const fetchFilteredProducts = async () => {
  //   const priceFilter = getPriceFilter();
  //   const params = new URLSearchParams();

  //   if (selectedCategory !== 'all') {
  //     params.append('categoryId', selectedCategory);
  //   }
  //   if (priceFilter.minPrice !== undefined) {
  //     params.append('minPrice', priceFilter.minPrice);
  //   }
  //   if (priceFilter.maxPrice !== undefined) {
  //     params.append('maxPrice', priceFilter.maxPrice);
  //   }

  //   //const url = `https://be-tm-t.onrender.com/Products/filter?${params.toString()}`;

  //   try {
  //     const response = await fetch(`https://be-tm-t.onrender.com/Products/filter?${params.toString()}`);
  //     const data = await response.json();
  //     onFilter?.(data); //callback để truyền dữ liệu sản phẩm đã lọc lên component cha
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    setCategory(selectedCategory);
    setPriceRangeIds(selectedPriceRanges);
  }, [selectedCategory, selectedPriceRanges]);

  const handleCategoryChange = (id) => {
    setCategory(id);
    console.log('Selected category:', id);
  };

  const handlePriceChange = (id) => {
    if (id === 'price_all') {
      setPriceRangeIds(['price_all']);
    } else {
      setPriceRangeIds(prev => {
        const newList = prev.includes(id)
          ? prev.filter(i => i !== id && i !== 'price_all')
          : [...prev.filter(i => i !== 'price_all'), id];
        return newList.length === 0 ? ['price_all'] : newList;
      });
    }
    console.log('Selected price ranges:', selectedPriceRanges);
  };

  const handleApply = () => {
    onApply(category, priceRangeIds);
  };
  
  const primaryGreenColor = '#179A4E';
  return (
    // === Thanh Lọc Sản Phẩm ===
    <aside className="w-72 bg-white p-6 rounded-xl shadow-lg h-fit"> 
      <h2 className="text-xl font-bold text-primary-green mb-6 border-b pb-3">Lọc Sản Phẩm</h2>

      {/* Mục Lọc theo Danh Mục */}
      <FilterSection title="Phân Loại">
        <ul className="space-y-2">
          {categories.map(c => (
            <li key={c.id}>
              <button
                onClick={() => handleCategoryChange(c.id)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-150
                            ${category === c.id 
                                ? 'bg-green-100 text-primary-green font-semibold' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
              >
                {c.name}
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
                checked={priceRangeIds.includes(range.id)}
                onChange={() => handlePriceChange(range.id)}
                className="h-4 w-4 text-primary-green border-gray-300 rounded focus:ring-offset-0 focus:ring-1 focus:ring-primary-green transition-all duration-150"
              />
              <span className={`text-sm ${priceRangeIds.includes(range.id) ? 'text-primary-green font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>
                {range.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="mt-8">
        <button 
            className="w-full px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            onClick={handleApply}
        >
            Áp Dụng Lọc 
        </button>
      </div>
      
      {/* <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kết quả:</h3>
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">Không có sản phẩm phù hợp.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {products.map(product => (
              <li key={product.id} className="text-gray-700">
                • {product.name} ({product.price.toLocaleString('vi-VN')}₫)
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </aside>
  );
}