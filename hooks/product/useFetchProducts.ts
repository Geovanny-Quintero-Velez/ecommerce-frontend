import { useState } from 'react';
import { Product } from '@/interfaces/product/product';
import { ProductService } from '@/services/product/product.service';

export function useFetchProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const productService = new ProductService();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const products = await productService.getAllProducts();
            return products as Product[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const createProduct = async (product: Product) => {
        setLoading(true);
        setError(null);
        try {
            const newProduct = await productService.createProduct(product);
            return newProduct as Product;
        } catch (err: any) {
            setError(err.message || 'Failed to create product');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { createProduct, loading, error, fetchProducts };
}