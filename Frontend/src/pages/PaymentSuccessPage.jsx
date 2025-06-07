import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentSuccessPage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-black px-4">
        <h1 className="text-4xl font-bold mb-4">Thanh toán thành công!</h1>
        <p className="text-lg mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        <a href="/" className="bg-[#179A4E] text-white px-6 py-2 rounded font-semibold hover:bg-[#e6f1b5] transition">
          Quay về trang chủ
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
