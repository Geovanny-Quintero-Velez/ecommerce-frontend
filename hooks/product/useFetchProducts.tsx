import { Product } from '@/interfaces/product/product';
import { ProductService } from '@/services/product/product.service';

export const useFetchProducts = () => {
    const fetchProducts = async () => {
        const productService = new ProductService();
        const products = await productService.getProducts();
        return products as Product[];
    }

    return { fetchProducts };
}