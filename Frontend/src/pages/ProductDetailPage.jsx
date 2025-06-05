
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { ChevronRightIcon } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Common/Newsletter';
import ProductImageGallery from '../components/ProductPage/ProductImageGallery';
import ProductInfo from '../components/ProductPage/ProductInfo';
import ProductTabs from '../components/ProductPage/ProductTabs';

const BreadcrumbsComponent = ({ paths }) => {
  if (!paths || paths.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6 md:mb-8">
      <ol className="flex items-center space-x-1 text-gray-500">
        {paths.map((pathItem, index) => (
          <li key={index} className="flex items-center"> 
            {index > 0 && (
              <ChevronRightIcon className="h-3.5 w-3.5 text-gray-400 mx-0.5" />
            )}
            {index === paths.length - 1 ? (
              <span className="font-medium text-gray-700" aria-current="page">
                {pathItem.name}
              </span>
            ) : (
              <Link to={pathItem.path} className="text-gray-500 hover:text-gray-800 hover:underline">
                {pathItem.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  console.log("PAGE RENDER - Product ID from URL:", productId); // LOG 1

  // State cho dữ liệu sản phẩm
  const [product, setProduct] = useState(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [productError, setProductError] = useState(null);

  // State cho danh sách đánh giá
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);

  // ---- 1. Fetch chi tiết sản phẩm ----
  const fetchProductDetail = useCallback(async () => {

    if (!productId) {
      setIsLoadingProduct(false);
      setProductError("Không có ID sản phẩm."); 
      return;
    }

    setIsLoadingProduct(true);
    setProductError(null);
    setProduct(null); 

    const apiUrl = `https://be-tm-t.onrender.com/Products/${productId}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }));
        throw new Error(errorData.message || `Không thể tải sản phẩm (mã ${response.status})`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setProduct(data[0]); 
      } else if (!Array.isArray(data) && typeof data === 'object' && data !== null && Object.keys(data).length > 0) {
        setProduct(data);
        console.log("fetchProductDetail: Product state SET TO (direct object):", data);
      } else {
        console.error("fetchProductDetail: Dữ liệu sản phẩm không hợp lệ hoặc không tìm thấy.", data);
        throw new Error("Không tìm thấy thông tin sản phẩm hoặc dữ liệu không hợp lệ.");
      }
    } catch (error) {
      setProductError(error.message);
      setProduct(null); 
    } finally {
      setIsLoadingProduct(false);
    }
  }, [productId]);

  // ---- 2. Fetch danh sách đánh giá ----
  const fetchReviews = useCallback(async () => {
    if (!productId) {
      console.log("fetchReviews: ProductId is MISSING. Aborting fetch reviews.");
      return;
    }
    
    console.log("fetchReviews: Function CALLED. ProductId:", productId);
    setIsLoadingReviews(true);
    setReviewsError(null);
    setReviews([]); 
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("fetchReviews: Không tìm thấy accessToken.");
    }

    const reviewsApiUrl = `https://be-tm-t.onrender.com/Feedbacks/product?productId=${productId}`;
    console.log("fetchReviews: Attempting to FETCH URL:", reviewsApiUrl);

    try {
      const response = await fetch(reviewsApiUrl, {
        headers: token ? { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : {
          'Content-Type': 'application/json'
        }
      });
      console.log(`fetchReviews: Response received for ${reviewsApiUrl}. Status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }));
        if (response.status === 401 && !token) {
           setReviewsError("Bạn cần đăng nhập để xem đánh giá."); 
        } else if (response.status === 401) {
           setReviewsError("Token không hợp lệ hoặc đã hết hạn để xem đánh giá.");
        } else {
           throw new Error(errorData.message || `Không thể tải đánh giá (mã ${response.status})`);
        }
      } else {
        const data = await response.json();
        console.log("fetchReviews: Reviews data RECEIVED (raw from API):", data);
        if (data && Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          console.warn("fetchReviews: Dữ liệu reviews không có trường 'data' là mảng như mong đợi.", data);
          setReviews([]);
        }
      }
    } catch (error) {
      console.error("fetchReviews: CATCH block error:", error.message, error);
      setReviewsError(error.message);
    } finally {
      setIsLoadingReviews(false);
      console.log("fetchReviews: FINALLY block. isLoadingReviews set to false.");
    }
  }, [productId]); 

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]); 

  useEffect(() => {
    console.log("useEffect for fetchReviews: RUNNING. ProductId:", productId);
    if (productId) { 
        fetchReviews();
    }
  }, [fetchReviews, productId]);


  // --- Xử lý trạng thái Loading ---
  if (isLoadingProduct) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-gray-600 animate-pulse">Đang tải thông tin sản phẩm...</p>
        </main>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  // --- Xử lý trạng thái Lỗi khi fetch sản phẩm ---
  if (productError) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-red-500">{productError}</p>
          <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-gray-700 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors">
            Quay lại Cửa hàng
          </Link>
        </main>
        <Newsletter />
        <Footer />
      </div>
    );
  }
  
  // --- Xử lý trường hợp không tìm thấy sản phẩm sau khi fetch ---
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-gray-600">Không tìm thấy thông tin sản phẩm.</p>
          <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-gray-700 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors">
            Quay lại Cửa hàng
          </Link>
        </main>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  const breadcrumbPaths = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Cửa hàng', path: '/shop' },
    { name: product.name || "Chi tiết sản phẩm", path: `/product/${product.id}` }
  ];
  
  
  const galleryImages = product.image ? [product.image] : []; 

  let displayPrice = product.price; 
  let displayOriginalPrice = null; 

  if (typeof product.cost === 'number' && product.cost < product.price) {
    displayPrice = product.cost;        
    displayOriginalPrice = product.price; 
  }

  const calculatedRating = reviews.length > 0 
    ? parseFloat((reviews.reduce((acc, rev) => acc + rev.rate_star, 0) / reviews.length).toFixed(1))
    : 0;
  const reviewsCountFromAPI = reviews.length;

  const createShortDescription = (fullDescription) => {
    if (!fullDescription || typeof fullDescription !== 'string') {
      return null;
    }
    const words = fullDescription.split(' ');
    if (words.length <= 20) {
      return fullDescription;
    }
    return words.slice(0, 20).join(' ') + '...';
  };


  const productForInfo = {
    id: product.id,
    name: product.name,
    // TẠO MÔ TẢ NGẮN TỪ product.description CỦA API
    shortDescription: createShortDescription(product.description),
    price: displayPrice,
    originalPrice: displayOriginalPrice,
    rating: calculatedRating,
    reviewsCount: reviewsCountFromAPI,
    categoryName: product.categoryName,
    materialName: product.materialName,
    stock: product.total, 
  };
  
  const mappedReviewsForTabs = reviews.map(review => ({
    id: review.feedbackId.toString(),
    author: review.fullname || "Người dùng",
    avatar: review.avatar || '/images/avatars/default-avatar.png',
    rating: review.rate_star,

    date: new Date(review.createdAt).toLocaleString('vi-VN', { 
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    text: review.comment,
  }));

  const productForTabs = {
    id: product.id,
    longDescription: product.description 
      ? `<p>${product.description.replace(/\n\s*\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>` 
      : '<p>Không có mô tả chi tiết cho sản phẩm này.</p>',
    specifications: (product.categoryName || product.materialName) ? [ 
      ...(product.ten_truong_categoryName ? [{ label: 'Phân loại', value: product.ten_truong_categoryName }] : []),
      ...(product.ten_truong_materialName ? [{ label: 'Chất liệu', value: product.ten_truong_materialName }] : []),
    ] : [],
    reviews: mappedReviewsForTabs,
    reviewsCount: reviewsCountFromAPI,
  };

  console.log("RENDER CYCLE - Reviews state for UI:", reviews);
  console.log("RENDER CYCLE - isLoadingReviews:", isLoadingReviews);
  console.log("RENDER CYCLE - reviewsError:", reviewsError);
  console.log("RENDER CYCLE - productForInfo:", productForInfo);
  console.log("RENDER CYCLE - productForTabs:", productForTabs);
  console.log("RENDER CYCLE - galleryImages:", galleryImages);


  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10">
        <BreadcrumbsComponent paths={breadcrumbPaths} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:sticky lg:top-8 self-start">
            <ProductImageGallery
              images={galleryImages} 
              productName={product.name || "Sản phẩm"}
            />
          </div>
          <div>
            <ProductInfo product={productForInfo} />
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200">
          <ProductTabs 
            product={productForTabs} 
            isLoadingReviews={isLoadingReviews}
            reviewsError={reviewsError}
          />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}