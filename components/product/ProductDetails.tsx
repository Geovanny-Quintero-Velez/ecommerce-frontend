"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '@/interfaces/product/product';
import { Navigation, Pagination } from 'swiper/modules';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  product?: Product;
}

export default function ProductDetails({ product }: Props) {
  if (!product) return null;

  const [mainImage, setMainImage] = useState(product.imageurls ? product.imageurls[0] : "");

  const filledStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-white shadow rounded-lg">
      <div className="w-full lg:w-2/3 p-4">
        <img 
          src={mainImage} 
          alt="Main product" 
          className="w-full h-96 object-cover rounded-lg" 
        />
        <div className="mt-4">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={4}
          >
            {product.imageurls?.map((src, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={src} 
                  alt={`Product ${index}`} 
                  className="w-full h-20 object-cover rounded-lg cursor-pointer" 
                  onClick={() => setMainImage(src)} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 lg:mt-0 mt-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center mt-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative">
              {index < filledStars ? (
                <FaStar className="text-yellow-500" />
              ) : (
                index === filledStars && hasHalfStar ? (
                  <FaStarHalfAlt className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-300" />
                )
              )}
            </div>
          ))}
          <span className="ml-2 text-gray-600">{product.rating.toFixed(1)} / 5 {`from ${product.reviewscount} reviews` || ""} </span>
        </div>
        </div>
        <p className="mt-4 text-gray-700">
          {product.description?
          (product.description):
          "Explore our selection of nutritious and delicious products designed to enhance your healthy lifestyle. Discover wholesome options that will help you maintain a balanced and satisfying diet."
          }
        </p>
        <div className="mt-4">
          <p className="text-lg font-semibold line-through text-gray-500">$200,000.00</p>
          <p className="text-lg font-semibold text-red-500">34% OFF</p>
          <p className="text-2xl font-bold text-green-600">COP 108,285.23</p>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg">Buy now</button>
          <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">Add to cart</button>
          <p className="mt-4 text-center text-blue-600 cursor-pointer">Return to the store</p>
        </div>
      </div>
    </div>
  );
}
