import React from 'react';
import { ChevronRightIcon } from 'lucide-react'; 

// Các component chung của trang
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Common/Newsletter'; // Component Newsletter

// Các component con dành riêng cho trang Chi Tiết Sản Phẩm
import ProductImageGallery from '../components/ProductPage/ProductImageGallery';
import ProductInfo from '../components/ProductPage/ProductInfo'; // Component thông tin sản phẩm
import ProductTabs from '../components/ProductPage/ProductTabs';   // Component quản lý các tab

// Dữ liệu mẫu cho trang chi tiết sản phẩm
import { productDetailData } from '../data/mockProductDetail'; 

// --- Component Breadcrumbs (Thanh điều hướng phân cấp) ---
const BreadcrumbsComponent = ({ paths }) => {
  if (!paths || paths.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6 md:mb-8">
      <ol className="flex items-center space-x-1 text-gray-500">
        {paths.map((pathItem, index) => (
          <li key={pathItem.name} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-3.5 w-3.5 text-gray-400 mx-0.5" />
            )}
            {index === paths.length - 1 ? (
              <span className="font-medium text-gray-700" aria-current="page">
                {pathItem.name}
              </span>
            ) : (
              <a href={pathItem.path} className="text-gray-500 hover:text-gray-800 hover:underline">
                {pathItem.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default function ProductDetailPage() {
  const product = productDetailData; 

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-gray-600">Không tìm thấy thông tin sản phẩm.</p>
          <a href="/shop" className="mt-6 inline-block px-6 py-2.5 bg-gray-700 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors">
            Quay lại Cửa hàng
          </a>
        </main>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  // Tạo dữ liệu cho Breadcrumbs
  const breadcrumbPaths = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Cửa hàng', path: '/shop' },
    { name: product.name, path: `/product/${product.id}` } 
  ];

  return (
    // === Khung Chính Của Trang Chi Tiết Sản Phẩm ===
    <div className="bg-white min-h-screen flex flex-col"> 
      <Header />

      {/* === Nội dung chính của trang === */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10">
        <BreadcrumbsComponent paths={breadcrumbPaths} />

        {/* Phần trên: Ảnh sản phẩm và Thông tin cơ bản */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-12 md:mb-16">
          
          {/* Cột Trái: Khu vực Ảnh Sản Phẩm */}
          <div className="lg:sticky lg:top-8 self-start"> 
            <ProductImageGallery 
              images={product.images} 
              productName={product.name}
              isNew={product.isNew} 
              discountPercent={product.discountPercent} 
            />
          </div>

          {/* Cột Phải: Khu Vực Thông Tin Sản Phẩm */}
          <div> 
            <ProductInfo product={product} />
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200"> 
          <ProductTabs product={product} /> 
        </div>

      </main>

      <Newsletter /> 
      <Footer />
    </div>
  );
}