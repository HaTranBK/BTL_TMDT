import React from 'react';

const labels = [
  { text: 'Tất cả', responsive: '' },
  { text: 'Chờ thanh toán', responsive: '' },
  { text: 'Vận chuyển', responsive: 'hidden sm:inline' },
  { text: 'Giao hàng', responsive: 'hidden md:inline' },
  { text: 'Hoàn thành', responsive: 'hidden md:inline' },
  { text: 'Đã huỷ', responsive: 'hidden lg:inline' },
  { text: 'Trả hàng', responsive: 'hidden lg:inline' },
];

export default function Tabs({ active, onChange }) {
  return (
    <nav className="flex flex-wrap gap-4 border-b mb-4 pl-4">
      {labels.map(({text, responsive}, idx) => (
        <button
          key={idx}
          onClick={() => onChange(text)}
          className={`
            pb-2 ${responsive} 
            ${active === text ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600'}
          `}
        >
          {text}
        </button>
      ))}
    </nav>
  );
}
