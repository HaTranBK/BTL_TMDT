import React from 'react';

const labels = [
  { text: 'Tất cả', value: 'Tất cả', responsive: '' },
  { text: 'Chờ xác nhận', value: 'pending', responsive: '' },
  { text: 'Thành công', value: 'success', responsive: 'hidden sm:inline' },
  { text: 'Thất bại', value: 'failed', responsive: 'hidden md:inline' },
];

export default function Tabs({ active, onChange }) {
  return (
    <nav className="flex flex-wrap gap-4 border-b mb-4 pl-4">
      {labels.map(({text, value, responsive}, idx) => (
        <button
          key={idx}
          onClick={() => onChange(value)}
          className={`flex flex-wrap gap-8 border-b mb-4 pl-4 ${responsive}
            ${active === value ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600'}
          `}
        >
          {text}
        </button>
      ))}
    </nav>
  );
}
