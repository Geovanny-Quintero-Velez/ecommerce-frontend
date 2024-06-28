import { Product } from '@/interfaces/product/product';
import { ProductService } from '@/services/product/product.service';

export function useFetchProducts () {
    const productService = new ProductService();

    const fetchProducts = async () => {
        const products = await productService.getProducts();
        return products as Product[];
    }

    const fetchProductById = async (productId: string) => {
        const product = await productService.getProductById(productId);
        return product as Product;
    }

    const fetchProductsByQuery = async (query: string) => {
        const products = await productService.getProductsByQuery(query);
        return products as Product[];
    }

    return { fetchProducts, fetchProductById, fetchProductsByQuery };
}