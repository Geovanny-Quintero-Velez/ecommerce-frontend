import { ProductImage } from '@/interfaces/product-image/product.image';
import { useState } from 'react';
import { ProductImageService } from '@/services/product-image/product.image.service';

export const useFetchProductImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const imageCategoryService = new ProductImageService();

    const createProductImage = async (imageCategory: ProductImage): Promise<ProductImage | null> => {
        setLoading(true);
        setError(null);
        try {
            const category = await imageCategoryService.createProductImage(imageCategory);
            return category as ProductImage;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch image category');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateProductImage = async (toDelete: ProductImage, toCreate: ProductImage): Promise<ProductImage | null> => {
        setLoading(true);
        setError(null);
        try {
            const category = await imageCategoryService.updateProductImage(toDelete, toCreate);
            return category as ProductImage;
        } catch (err: any) {
            setError(err.message || 'Failed to update image category');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { updateProductImage, createProductImage, loading, error };
    
}