import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/OrderTable/Menu';
import Tabs from '../components/OrderTable/Tabs';
import Footer from '../components/Footer';
import OrderTableDetails from '../components/OrderTable/OrderTableDetails';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: '#3456_768',
      date: '17/4/2025 10:20 am',
      status: 'Hoàn thành',
      price: '248.000 VND',
      items: [
        { name: 'Bình giữ nhiệt', quantity: 1, color: 'Xanh lá', price: '200.000' },
        { name: 'Túi vải', quantity: 2 , price: '200.000' },
      ],
    },
    {
      id: '#3456_980',
      date: '17/4/2025 10:20 am',
      status: 'Chờ thanh toán',
      price: '248.000 VND',
      items: [{ name: 'Ống hút inox', quantity: 3 }],
    },
    // thêm đơn hàng khác nếu muốn
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Tài khoản</h1>
          <div className="flex gap-6">
            <Menu />
            <div className="flex-1">
              <Tabs active={activeTab} onChange={setActiveTab} />
              <OrderTableDetails
                orders={orders}   // Truyền orders trực tiếp
                filter={activeTab} // Truyền activeTab để lọc
                selectedOrder={selectedOrder}
                onSelectOrder={setSelectedOrder}
                onBack={() => setSelectedOrder(null)}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
