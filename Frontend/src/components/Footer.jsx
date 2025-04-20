// import React from 'react';

// export default function Footer() {
//     return (
//       <footer className="text-white p-4 mt-auto" style={{backgroundColor: '#179A4E'}}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="font-semibold">Greeniez</div>
//           <div>Cửa hàng vật dụng thân thiện với môi trường</div>
//           <nav className="flex justify-center space-x-6 mb-6">
//             <a href="/" className="hover:underline">Home</a>
//             <a href="/shop" className="hover:underline">Cửa hàng</a>
//           </nav>

//           <p className="text-center text-gray-400">© 2025 Greeniez. All rights reserved.</p>
//           <nav className="flex justify-center space-x-4 mb-2 text-gray-500">
//             <a href="/privacy" className="hover:underline">Chính sách bảo mật</a>
//             <a href="/terms" className="hover:underline">Điều khoản sử dụng</a>

//             <button>instagram</button>
//             <button>face</button>
//             <button>youtube</button>
//           </nav>
//         </div>
//       </footer>
//     );
//   }
  
import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white py-10 px-4 mt-auto md:px-40" style={{ backgroundColor: '#179A4E' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Greeniez</h2>
            <p className="text-sm text-white/80">Cửa hàng vật dụng thân thiện với môi trường</p>
          </div>

          <nav className="flex space-x-6">
            <a href="/" className="hover:underline">Home</a>
            <a href="/shop" className="hover:underline">Cửa hàng</a>
          </nav>
        </div>

        <div className="border-t border-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white/80">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 space-x-4">
            <p>Copyright© 2025 Greeniez. All rights reserved.</p>
            <a href="/privacy" className="hover:underline ">Chính sách bảo mật</a>
            <a href="/terms" className="hover:underline">Điều khoản sử dụng</a>
          </div>

          {/* Bên phải: icon mạng xã hội */}
          <div className="flex space-x-4 text-white">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-gray-200" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-gray-200" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-gray-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

