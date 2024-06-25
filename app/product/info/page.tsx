"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/general/navbar/Navbar';
import CommentsSection from '@/components/product/CommentsSection';
import CartSummarySection from '@/components/product/CartSummarySection';
import ProductDetails from '@/components/product/ProductDetails';
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useFetchReviews } from '@/hooks/review/useFetchReviews';
import { Product } from '@/interfaces/product/product';
import { Review } from '@/interfaces/review/review';
import ProductSkeleton from '@/components/product/skeleton/ProductSkeleton';


export default function ProductInfo() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productid") ?? '1';
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const { fetchProductById } = useFetchProducts();
      const fetchedProduct = await fetchProductById(productId);
      setProduct(fetchedProduct);
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    async function fetchReviews() {
      const { fetchReviewsByProductId } = useFetchReviews();
      const fetchedReviews = await fetchReviewsByProductId(productId);
      setReviews(fetchedReviews)
    }

    fetchReviews();
  }, [productId]);

  return (
    <section>
      <Navbar />
      <div className="container mx-auto p-4">
        {(product && reviews)? (
          <>
            <div className="lg:flex lg:space-x-4 lg:items-start">
              <div className="lg:w-3/4">
                <ProductDetails product={product} />
              </div>
              <div className="lg:w-1/4">
                <CartSummarySection />
              </div>
            </div>
            <CommentsSection reviews={reviews} />
          </>
        ) : (
          <>
            <ProductSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
