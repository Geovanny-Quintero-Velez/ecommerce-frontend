"use client"

import Navbar from "@/components/general/navbar/Navbar";
import ProductCarousel from "@/components/home/ProductsCarousel";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useEffect, useState } from "react";
import ProductCarouselSkeleton from '@/components/skeletons/ProductCarouselSkeleton';
import { useAuth }  from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
    const { fetchProducts, loading, error } = useFetchProducts();
    const [products, setProducts] = useState<any | null>(null);
    const { fetchCart } = useCart();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchCart();
      }, [currentUser]); 

    useEffect(() => {
        async function fetchProductData() {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        }

        fetchProductData();
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
