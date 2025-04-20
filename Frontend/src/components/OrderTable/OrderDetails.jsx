import React from 'react';

export default function OrderDetails({ order, onBack }) {
  if (!order) return null;

  // Tính toán số cột còn lại (không ẩn)
  const visibleColumns = ['Sản phẩm', 'Số lượng', 'Giá'].filter(col => {
    if (col === 'Số lượng') return window.innerWidth >= 640; // ẩn dưới sm
    if (col === 'Giá') return window.innerWidth >= 768; // ẩn dưới md
    return true; // Sản phẩm luôn hiển thị
  }).length;

  return (
    <div className="flex-1 px-4 py-6 bg-white shadow rounded-lg">
      <div className="flex justify-end mb-4">
        <button onClick={onBack} className="text-green-600 hover:underline">
          ← Quay lại
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Mã đơn hàng: {order.id}</h2>

      <table className="min-w-full text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4">Sản phẩm</th>
            <th className="hidden sm:table-cell py-2 px-4">Số lượng</th>
            <th className="hidden md:table-cell py-2 px-4">Giá</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-3 px-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  {item.color && <div className="text-sm text-gray-500">Màu: {item.color}</div>}
                </div>
              </td>
              <td className="hidden sm:table-cell py-3 px-4">{item.quantity}</td>
              <td className="hidden md:table-cell py-3 px-4">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='mt-4 pr-4 md:pr-8 lg:pr-16 flex justify-end'>
        <div className='text-right font-semibold'>
          Tổng giá trị: <span className='text-green-600'>{order.price}</span>
        </div>
      </div>

    </div>
  );
}
