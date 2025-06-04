import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import ProductCard from '../components/ShopPage/ProductCard';
import FilterSidebar from '../components/ShopPage/FilterSidebar';
import ShopControlsBar from '../components/ShopPage/ShopControlsBar';
import Newsletter from '../components/Common/Newsletter'; 
import { mockProducts } from '../data/mockProducts';
import heroImageFromFile from '../assets/Hero.png';

export default function ShopPage() {
  //const productsToDisplay = mockProducts;
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({}); //categories, priceRange
  const [sort, setSort] = useState('default'); // default, price_asc, price_desc, newest, rating_desc
  const [viewType, setViewType] = useState('grid'); // 'grid' hoặc 'list'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // if (!token) {
    //   setError("Bạn cần đăng nhập để xem sản phẩm.");
    //   setLoading(false);
    //   return;
    // }

    fetch('/api/Products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Lỗi khi fetch sản phẩm");
        // console.log(response);
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalProducts = products.length;

  return (
    // === Khung Chính Của Trang ===
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      {/* === Phần Hero === */}
      <div className="relative bg-green-50 py-32"> 
        <div className="absolute inset-0 overflow-hidden opacity-70"> 
          <img 
            src={heroImageFromFile} 
            alt="Cửa hàng sản phẩm thân thiện môi trường" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl font-bold text-primary-green tracking-tight">
              Cửa Hàng Greeniez
          </h1>
          <p className="mt-5 text-lg leading-7 text-gray-700 max-w-2xl mx-auto">
              Khám phá các sản phẩm học tập thân thiện với môi trường, chung tay vì một tương lai xanh và bền vững hơn cho tất cả chúng ta!
          </p>
        </div>
      </div>

      {/* === Khu vực nội dung chính === */}
      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="flex flex-row gap-8 items-start">
          
          {/* Thanh Lọc Sản Phẩm */}
          <div className="w-72 sticky top-8 self-start">
            <FilterSidebar />
          </div>
          
          {/* Khu Vực Chính Hiển Thị Sản Phẩm và Điều Khiển */}
          <div className="flex-1">
            <ShopControlsBar totalProducts={totalProducts} />

            {loading ? (
              <p className='text-center text-gray-500'> Đang tải sản phẩm...  </p>
            ) : error ? (
              <p className='text-center text-red-500'>Lỗi: {error}</p>
            )  : (
                <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                {products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 text-lg py-10">
                    Không tìm thấy sản phẩm nào phù hợp.
                  </p>
                )}
              </div>
            )}

            {products.length > 0 && !loading && (
              <div className="text-center mt-10 pt-6 border-t border-gray-200">
                <button 
                    type="button"
                    className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green active:scale-95"
                    onClick={() => console.log("Xử lý logic Xem Thêm...")}
                >
                    Xem Thêm Sản Phẩm
                </button>
              </div>
              
            )}

            {/* <div className="grid grid-cols-3 gap-x-6 gap-y-8">
              {productsToDisplay.length > 0 ? (
                productsToDisplay.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 text-lg py-10">
                  Không tìm thấy sản phẩm nào phù hợp.
                </p>
              )}
            </div>

            {productsToDisplay.length > 0 && (
                 <div className="text-center mt-10 pt-6 border-t border-gray-200">
                    <button 
                        type="button"
                        className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green active:scale-95"
                        onClick={() => console.log("Xử lý logic Xem Thêm...")}
                    >
                        Xem Thêm Sản Phẩm
                    </button>
                </div>
            )} */}
          </div>
        </div>
      </main>
      <Newsletter /> 
      <Footer />
    </div>
  );
}