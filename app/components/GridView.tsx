"use client"

import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Importa el componente de tarjeta de producto
import productImage from '../../public/producto-stock-estandar.png'

// Lista de productos ficticios en formato JSON
const productList = [
  {
    id: 1,
    title: 'Producto 1',
    imageUrl: productImage,
    price: 50,
    discountPrice: 40,
    rating: 4.3,
  },
  {
    id: 2,
    title: 'Producto 2',
    imageUrl: productImage,
    price: 30,
    rating: 3.7,
  },
  {
    id: 3,
    title: 'Producto 3',
    imageUrl: productImage,
    price: 25,
    discountPrice: 20,
    rating: 2.5,
  },
  {
    id: 4,
    title: 'Producto 4',
    imageUrl: productImage,
    price: 70,
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Producto 5',
    imageUrl: productImage,
    price: 60,
    discountPrice: 50,
    rating: 3.2,
  },
  {
    id: 6,
    title: 'Producto 6',
    imageUrl: productImage,
    price: 20,
    rating: 1.4,
  },
  {
    id: 7,
    title: 'Producto 7',
    imageUrl: productImage,
    price: 45,
    discountPrice: 35,
    rating: 4.6,
  },
  {
    id: 8,
    title: 'Producto 8',
    imageUrl: productImage,
    price: 55,
    rating: 3.8,
  },
];

const GridView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <nav className="block">
          <ul className="flex pl-0 list-none rounded my-2">
            {[...Array(Math.ceil(productList.length / productsPerPage))].map((_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-1 rounded mr-2 ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GridView;
