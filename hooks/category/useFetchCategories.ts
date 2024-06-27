import { Category } from '@/interfaces/category/category';
import { useState } from 'react';
import { CategoryService } from '@/services/category/category.service';

export const useFetchCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const categoryService = new CategoryService();

    const fetchCategoryById = async (categoryId: string): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const category = await categoryService.getCategoryById(categoryId);
            return category as Category;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch category');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCategories = async (): Promise<Category[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const categories = await categoryService.getAllCategories();
            return categories as Category[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch categories');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (category: Category): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const newCategory = await categoryService.createCategory(category);
            return newCategory as Category;
        } catch (err: any) {
            setError(err.message || 'Failed to create category');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (category: Category): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedCategory = await categoryService.updateCategory(category);
            return updatedCategory as Category;
        } catch (err: any) {
            setError(err.message || 'Failed to update category');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await categoryService.deleteCategory(categoryId);
        } catch (err: any) {
            setError(err.message || 'Failed to delete category');
        } finally {
            setLoading(false);
        }
    };

    return { fetchCategoryById, fetchAllCategories, createCategory, updateCategory, deleteCategory, loading, error };
}
