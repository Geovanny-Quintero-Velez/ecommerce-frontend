"use client"
import Navbar from "@/components/general/navbar/Navbar";
import ProductCarousel from "@/components/home/ProductsCarousel";
import { useFetchProducts } from "@/hooks/product/useFetchAllProducts";
import { useEffect, useState } from "react";
import  ProductCarouselSkeleton from '@/components/skeletons/ProductCarouselSkeleton';


export default function HomePage() {
  const [products, setProducts] = useState<any | null>(null);
  
  useEffect(() => {
    async function fetchProduct() {
      const { fetchProducts } = useFetchProducts();
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }

    fetchProduct();
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
          products?(
            <>
              <ProductCarousel products={products} />
              <ProductCarousel products={products} />
            </>
          ):(
            <>
            <ProductCarouselSkeleton />
            <ProductCarouselSkeleton />
            </>
            
          )
        }
        
      </div>
    </section>
  );
}
