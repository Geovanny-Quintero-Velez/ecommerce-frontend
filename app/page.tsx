"use client"

import Navbar from "@/components/general/navbar/Navbar";
import ProductCarousel from "@/components/home/ProductsCarousel";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useEffect, useState } from "react";
import ProductCarouselSkeleton from '@/components/skeletons/ProductCarouselSkeleton';
import { useAuth }  from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
    const { fetchCart } = useCart();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchCart();
      }, [currentUser]); 

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchProducts = async () => {
              try {
                  setLoading(true);
                  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setProducts(data);
              } catch (err:any) {
                  setError(err.message);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchProducts();
      }, []);



    return (
        <section>
            <Navbar />
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-4 mt-6">
                    Bienvenido a Mi Tienda Online
                </h1>
                <p className="text-lg mb-4">Descubre nuestros productos destacados:</p>
                {
                    loading ? (
                        <>
                            <ProductCarouselSkeleton />
                            <ProductCarouselSkeleton />
                        </>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        products && (
                            <>
                                <ProductCarousel products={products} />
                                <ProductCarousel products={products} />
                            </>
                        )
                    )
                }
            </div>
        </section>
    );
}
