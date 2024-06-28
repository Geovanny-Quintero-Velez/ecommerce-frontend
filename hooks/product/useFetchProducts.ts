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
    };

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
    };

    const updateProduct = async (product: Product) => {
        setLoading(true);
        setError(null);
        try {
            const updatedProduct = await productService.updateProduct(product);
            return updatedProduct as Product;
        } catch (err: any) {
            setError(err.message || 'Failed to update product');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (productId: string) => {
        setLoading(true);
        setError(null);
        try {
            const product = await productService.fetchProductById(productId);
            return product as Product;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch product');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsByQuery = async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const products = await productService.fetchProductsByQuery(query);
            return products as Product[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { fetchProductsByQuery, fetchProductById, updateProduct, createProduct, loading, error, fetchProducts };
}
