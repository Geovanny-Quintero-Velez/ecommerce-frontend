"use client"

import Navbar from "@/components/general/navbar/Navbar";
import GridView from "@/components/general/GridView";
import { useSearchParams } from 'next/navigation';
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useState, useEffect } from 'react';
import {Product} from '@/interfaces/product/product';

export default function ProductSearch(){
    const searchParams = useSearchParams();
    const search_query = searchParams.get("search_query") ?? '';
    const [products, setProducts] = useState<Product []>([]);

    useEffect(() =>{
        async function fetchProductByQuery() {
            const { fetchProductsByQuery } = useFetchProducts();
            const fetchedProducts = await fetchProductsByQuery(search_query);
            setProducts(fetchedProducts);
        }

        fetchProductByQuery();
    }, [search_query]
    )

    return (
        <section>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 textStandard">Search results:</h1>
        </div>
        <GridView products={products}/>
        </section>
    );
}