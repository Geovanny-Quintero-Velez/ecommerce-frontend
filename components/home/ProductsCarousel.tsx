"use client"
import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@/interfaces/product/product';
import CarouselProductCard from './CarouselProductCard';
import { useRouter } from "next/navigation";

interface Props {
  products: Product[];
}

const ProductCarousel = ({ products }: Props) => {
  // Componente para el botón "next"
const NextArrow = ({onClick, currentSlide, slideCount}: any) => {
  const isLastSlide = currentSlide + settings.slidesToShow>= slideCount;

  return (
    <div
      className={`next-arrow absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-20 textPrimary p-2 rounded-full flex items-center justify-center shadow-xl ${isLastSlide ? 'hidden' : ''}`}
      style={{ width: "60px", height: "60px", background: "#fff"}}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} size="2x" />
    </div>
  );
};

// Componente para el botón "prev"
const PrevArrow = ({onClick, currentSlide }: any) => {
  const isFirstSlide = currentSlide <= 0;

  return (
    <div 
      className={`prev-arrow absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-20 textPrimary p-2 rounded-full flex items-center justify-center shadow-xl ${isFirstSlide ? 'hidden' : ''}`}
      style={{ width: "60px", height: "60px", background: "#fff"}}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
    </div>
  );
};

  const settings = {
    dots: false,  // Desactivar los puntos
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,  // Componente para el botón "next"
    prevArrow: <PrevArrow />,  // Componente para el botón "prev"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const router = useRouter();
  const handleProductClick = (productid:string) => {
    router.push(`/product/info?productid=${productid}`);
  }

  return (
    <div className="product-carousel relative px-10 py-10 rounded-lg bg-white shadow-lg mt-16">
      <span className="textStandard font-semibold text-xl">Nombre de sección</span>
      <Slider {...settings}>
        {products.map((product) => (
          <CarouselProductCard key={product.productid} product={product} handleProductClick={handleProductClick}/>
        ))}
      </Slider>
    </div>
  );
};


export default ProductCarousel;
