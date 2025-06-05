import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from '../components/Common/Newsletter';
import slideSection from "../assets/Slider Section(1).jpg";
import slideSection2 from "../assets/bo-doi-ghi-chep(1).png";
import slideSection3 from "../assets/uong-nuoc(1).png";
import banner from "../assets/Banner.png";
import categoryNotebook from "../assets/so.png";
import categoryPen from "../assets/but.png";
import categoryBag from "../assets/tui.jpg";
import categoryBottle from "../assets/inox.png";
import categoryOther from "../assets/ong-hut.png";
import blogPosts from "../data/mockBlogData.js"; 

const HomePage = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-06-10T23:59:59");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <div>
      <div>
      <Header/>
      <section className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative col-span-12 md:col-span-7 h-[300px] md:h-[500px] overflow-hidden rounded-lg">
            <img src={slideSection} alt="Hero Left" className="w-full h-full object-cover" />
            {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold text-center">Ưu đãi độc quyền</h2>
            </div> */}
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            <div className="relative h-[145px] md:h-[240px] overflow-hidden rounded-lg">
              <img src={slideSection2} alt="Hero Right Top" className="w-full h-full object-cover" />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-xl font-semibold text-center">Mùa tựu trường</h2>
              </div> */}
            </div>
            <div className="relative h-[145px] md:h-[240px] overflow-hidden rounded-lg">
              <img src={slideSection3} alt="Hero Right Bottom" className="w-full h-full object-cover" />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-xl font-semibold text-center">Sản phẩm mới</h2>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Danh mục sản phẩm
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-y-8">
            <div className="flex flex-wrap justify-center gap-x-12 w-full">
              {[{ name: "Vở, sổ tay", image: categoryNotebook }, { name: "Bút", image: categoryPen }, { name: "Túi đựng", image: categoryBag }].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-32 sm:w-40">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-black font-medium text-center">{item.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 w-full">
              {[{ name: "Bình nước", image: categoryBottle }, { name: "Khác", image: categoryOther }].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-32 sm:w-40">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-black font-medium text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Limited Sale Section */}
      <section className="bg-green-600 text-white px-8 py-12">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img 
              src={banner}
              alt="Limited Edition" 
              className="w-full object-cover"
            />
          </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4">PHIÊN BẢN GIỚI HẠN</h3>
          <p className="text-xl mb-4">30% Sale Off</p>
          <p> Kết thúc sau: </p>

          <div className="flex justify-center md:justify-start gap-4 text-lg mb-4">
            {timeUnits.map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-white text-green-700 px-4 py-2 rounded shadow text-xl font-semibold">
                  {unit.value}
                </div>
                <span className="mt-1 text-sm">{unit.label}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 bg-white text-green-700 hover:bg-green-100 px-6 py-2 rounded font-semibold">
            Mua thôi
          </button>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Bộ sưu tập</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: "Hành trang đến trường",
            image: slideSection
          }, {
            title: "Bộ đôi ghi chép",
            image: slideSection2
          }, {
            title: "Bộ dụng cụ uống nước bền vững",
            image: slideSection3
          }].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="relative block overflow-hidden rounded-lg group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition duration-300 group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-3 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white font-semibold text-lg">{item.title}</span>
                <span className="text-white text-xl transform group-hover:translate-x-1 transition duration-300">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Các bài viết gần đây</h2>
            <a href="#" className="text-green-600 hover:underline">Xem thêm →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded shadow overflow-hidden hover:shadow-md transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <a href={post.link} className="text-green-600 mt-2 inline-block hover:underline">Đọc thêm →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />

      </div>
    </div>
  )
};

export default HomePage;
