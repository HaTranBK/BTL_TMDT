import React, { useState } from 'react';
import { MailIcon } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    console.log('Đăng ký nhận bản tin với email:', email);

    setEmail(''); 
    alert('Cảm ơn bạn đã đăng ký nhận bản tin!');
  };

  const primaryGreenColor = '#179A4E';

  return (
    // === Toàn bộ Section Newsletter ===
    <section className="bg-green-50 py-16 sm:py-20 md:py-24"> 
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-xl shadow-xl text-center">
          
          {/* Tiêu đề */}
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: primaryGreenColor }} 
          >
            Join Our Newsletter
          </h2>
          
          {/* Mô tả */}
          <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Nhận thông tin mới nhất về sản phẩm, mẹo sống xanh và các ưu đãi đặc biệt chỉ dành riêng cho bạn!
          </p>
          
          {/* Form đăng ký */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-grow">
                <MailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ email của bạn..."
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-800 placeholder-gray-500 bg-white shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 active:scale-95 text-base"
              >
                Đăng Ký
              </button>
            </div>
          </form>
          
          {/* Link chính sách bảo mật */}
          <p className="mt-6 text-xs text-gray-500">
            Chúng tôi tôn trọng sự riêng tư của bạn. 
            <a 
              href="/privacy-policy" 
              className="underline hover:text-green-700 ml-1"
              style={{ color: primaryGreenColor }} 
            >
              Đọc Chính sách bảo mật
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}