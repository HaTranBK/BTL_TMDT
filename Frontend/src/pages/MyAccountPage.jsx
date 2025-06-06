import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/OrderTable/Menu";
import Tabs from "../components/OrderTable/Tabs";
import Footer from "../components/Footer";
import OrderTableDetails from "../components/OrderTable/OrderTableDetails";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "https://be-tm-t.onrender.com/Orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const transformedOrders = data.data.map((order) => ({
          id: `#${order.id}`,
          orderId: order.id,
          date: new Date(order.date).toLocaleString("vi-VN"),
          status:
            order.status === "cancelled"
              ? "Đã hủy"
              : order.status === "completed"
              ? "Hoàn thành"
              : order.status === "pending"
              ? "Chờ thanh toán"
              : order.status,
          originalStatus: order.status,
          price: `${order.total_price.toLocaleString("vi-VN")} VND`,
          items: order.Products.map((product) => ({
            name: product.name,
            quantity: product.OrderProduct.quantity,
            price: `${product.OrderProduct.price.toLocaleString("vi-VN")} VND`,
          })),
        }));
        setOrders(transformedOrders);
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdateLoading(true);
      const token  = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `https://be-tm-t.onrender.com/Orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await fetchOrders();
      } else {
        throw new Error(data.message || "Failed to update order status");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelOrder = async (order) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      await updateOrderStatus(order.orderId, "cancelled");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
              {loading ? (
                <div className="text-center py-4">Đang tải...</div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : (
                <OrderTableDetails
                  orders={orders}
                  filter={activeTab}
                  selectedOrder={selectedOrder}
                  onSelectOrder={setSelectedOrder}
                  onBack={() => setSelectedOrder(null)}
                  onCancelOrder={handleCancelOrder}
                  updateLoading={updateLoading}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
