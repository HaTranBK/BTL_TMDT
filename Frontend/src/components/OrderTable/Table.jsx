import React from 'react';

export default function Table({ data, onSelect }) {
  return (
    <table className="min-w-full text-left">
      <thead className="text-gray-500">
        <tr>
          <th className="py-2">Mã đơn hàng</th>
          <th className="hidden sm:table-cell">Ngày</th>
          <th className="hidden md:table-cell">Tình trạng</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        {data.map((o) => (
          <tr
            key={o.id}
            className="border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(o)}
          >
            <td className="py-3 text-green-600 underline">{o.id}</td>
            <td className="hidden sm:table-cell">{o.date}</td>
            <td className="hidden md:table-cell">{o.status}</td>
            <td>{o.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
