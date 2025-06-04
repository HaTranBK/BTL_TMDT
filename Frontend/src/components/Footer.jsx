// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <<< THÊM IMPORT NÀY
import { Instagram, Facebook, Youtube, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'; // Thêm icon nếu cần

export default function Footer() {
  const primaryGreenColor = '#179A4E'; // Giữ màu chủ đạo của bạn

  return (
    <footer className="text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: primaryGreenColor }}>
      <div className="max-w-7xl mx-auto">
        {/* Phần trên: Giới thiệu và các cột link */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Cột 1: Giới thiệu Greeniez */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Greeniez</h2> {/* Tăng kích thước font */}
            <p className="text-sm text-white/90 leading-relaxed"> {/* Tăng độ rõ của text và leading */}
              Cửa hàng cung cấp các sản phẩm học tập chất lượng, thiết kế đẹp mắt và đặc biệt thân thiện với môi trường, dành cho học sinh, sinh viên.
            </p>
            {/* Có thể thêm thông tin liên hệ ở đây */}
            <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-center">
                    <MailIcon className="w-4 h-4 mr-2 opacity-80" /> contact@greeniez.vn
                </p>
                <p className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2 opacity-80" /> (028) 1234 5678
                </p>
                {/* <p className="flex items-start"> 
                    <MapPinIcon className="w-4 h-4 mr-2 mt-1 opacity-80" /> 
                    123 Đường Xanh, Phường Y, Quận Z, TP. HCM (Ví dụ)
                </p> */}
            </div>
          </div>

          {/* Cột 2: Về Chúng Tôi */}
          <div className="md:col-start-2 lg:col-start-auto"> {/* Điều chỉnh vị trí cột trên các màn hình */}
            <h3 className="text-base font-semibold text-white mb-4 tracking-wider uppercase">Về Greeniez</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/about" className="block text-white/80 hover:text-white hover:underline">Câu chuyện Greeniez</Link>
              <Link to="/blog" className="block text-white/80 hover:text-white hover:underline">Blog & Tin tức</Link>
              <Link to="/careers" className="block text-white/80 hover:text-white hover:underline">Cơ hội nghề nghiệp</Link>
            </nav>
          </div>

          {/* Cột 3: Hỗ Trợ Khách Hàng */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 tracking-wider uppercase">Hỗ Trợ</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/faq" className="block text-white/80 hover:text-white hover:underline">Câu hỏi thường gặp</Link>
              <Link to="/shipping" className="block text-white/80 hover:text-white hover:underline">Chính sách giao hàng</Link>
              <Link to="/returns" className="block text-white/80 hover:text-white hover:underline">Chính sách đổi trả</Link>
              <Link to="/contact-us" className="block text-white/80 hover:text-white hover:underline">Liên hệ</Link>
            </nav>
          </div>

          {/* Cột 4: Mạng xã hội (giữ nguyên hoặc điều chỉnh) */}
          <div>
             <h3 className="text-base font-semibold text-white mb-4 tracking-wider uppercase">Kết Nối Với Chúng Tôi</h3>
             <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"> {/* Sửa lại link Youtube nếu cần */}
                  <Youtube className="w-6 h-6" />
                </a>
             </div>
             {/* Có thể thêm các link "Home", "Cửa hàng" ở đây nếu bạn muốn bỏ ở phần trên cùng của footer cũ */}
             <nav className="mt-6 space-y-2 text-sm">
                <Link to="/" className="block text-white/80 hover:text-white hover:underline">Trang chủ</Link>
                <Link to="/shop" className="block text-white/80 hover:text-white hover:underline">Cửa hàng</Link>
             </nav>
          </div>
        </div>

        {/* Đường kẻ ngang */}
        <div className="border-t border-white/20 my-8" />

        {/* Phần dưới: Copyright và các link chính sách */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Greeniez. All rights reserved.</p>
          <nav className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy-policy" className="hover:text-white hover:underline">Chính sách bảo mật</Link>
            <Link to="/terms-of-service" className="hover:text-white hover:underline">Điều khoản sử dụng</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}