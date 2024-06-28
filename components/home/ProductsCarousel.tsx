import React from 'react';
import Slider from 'react-slick';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Product } from '@/interfaces/product/product';
import CarouselProductCard from './CarouselProductCard';

interface Props {
  products: Product[];
}

const ProductCarousel = ({ products }: Props) => {

const NextArrow = ({ onClick, currentSlide, slideCount }: any) => {
  const isLastSlide = currentSlide + settings.slidesToShow >= slideCount;

  return (
    <div
      className={`next-arrow absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-20 textPrimary p-2 rounded-full flex items-center justify-center shadow-xl ${isLastSlide ? 'hidden' : ''}`}
      style={{ width: "60px", height: "60px", background: "#fff", marginRight: "-25px"}}
      onClick={onClick}
    >
      <FaChevronRight style={{ fontSize: '2.25rem', marginRight: '-5px'  }}/>
    </div>
  );
};

const PrevArrow = ({ onClick, currentSlide }: any) => {
  const isFirstSlide = currentSlide <= 0;
  return (
    <div 
      className={`prev-arrow absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-20 textPrimary p-2 rounded-full flex items-center justify-center shadow-xl ${isFirstSlide ? 'hidden' : ''}`}
      style={{ width: "60px", height: "60px", background: "#fff", marginLeft: "-25px" }}
      onClick={onClick}
    >
      <FaChevronLeft style={{ fontSize: '2.25rem', marginLeft: '-5px'  }} />
    </div>
  );
};

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, products.length), // Mostrar sólo el número de productos disponibles
    slidesToScroll: Math.min(4, products.length), // Desplazar sólo el número de productos disponibles
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: Math.min(3, products.length),
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: Math.min(2, products.length),
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

  return (
    <div className="flex flex-col justify-start product-carousel relative px-10 py-10 rounded-lg bg-white shadow-lg mt-16 overflow-x-scroll">
      <div className="flex w-full justify-start"><span className="textStandard font-semibold text-xl">Nombre de sección</span></div>
      <Slider {...settings}>
        {products.map((product) => (
          <CarouselProductCard key={product.productid} product={product} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
