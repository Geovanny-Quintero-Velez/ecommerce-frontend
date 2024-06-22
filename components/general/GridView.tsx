"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard"; // Importa el componente de tarjeta de producto
import { Product } from "@/interfaces/product/product";

interface Props {
  products: Product[];
}

const GridView = ({products} : Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.productid} product={product} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <nav className="block">
          <ul className="flex pl-0 list-none rounded my-2">
            {[...Array(Math.ceil(products.length / productsPerPage))].map(
              (_, index) => (
                <li key={index}>
                  <button
                    style={{
                      color: currentPage === index + 1 ? "white" : "var(--color-text-standard)",
                      backgroundColor: currentPage === index + 1 ? "var(--color-secondary)" : "transparent",
                      border: currentPage !== index + 1 ? "2px solid var(--color-secondary)" : "none",
                    }}
                    className={`w-8 h-8 rounded-full mr-2`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GridView;
