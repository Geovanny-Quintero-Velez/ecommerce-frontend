import { ProductCategory } from '@/interfaces/product-category/product.category';
import { useState } from 'react';
import { ProductCategoryService } from '@/services/product-category/product.category.service';

export const useFetchProductCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const productCategoryService = new ProductCategoryService();

    const createProductCategory = async (productCategory: ProductCategory): Promise<ProductCategory | null> => {
        setLoading(true);
        setError(null);
        try {
            const category = await productCategoryService.createProductCategory(productCategory);
            return category as ProductCategory;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch product category');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createProductCategory, loading, error };
    
}
