import {Category} from '@/interfaces/category/category';
import  axios,  {AxiosInstance} from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';

export class CategoryService {
    protected readonly axios: AxiosInstance;
    public constructor() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseURL) {
            throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
        }
        const { Authorization } = getAuthHeader();
        this.axios = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            timeout: 3000,
            timeoutErrorMessage: 'Request timed out'
        });
    }

    public async getCategoryById(categoryId: string): Promise<Category | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/category/${categoryId}`);
            return response.data as Category;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while capturing the category data');
        }
        }
    }

    public async getAllCategories(): Promise<Category[] | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/category`);
            return response.data as Category[];
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while capturing the category data');
        }
        }
    }

    public async createCategory(category: Category): Promise<Category | undefined> {
        try {
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/category`, category);
            return response.data as Category;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while creating the category');
            }
        }
    }

    public async updateCategory(category: Category): Promise<Category | undefined> {
        try {
            const response = await this.axios.patch(`${this.axios.defaults.baseURL}/category/${category.categoryid}`, category);
            return response.data as Category;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while updating the category');
        }
    }
    }

    public async deleteCategory(categoryId: string): Promise<void> {
        try {
            await this.axios.delete(`${this.axios.defaults.baseURL}/category/${categoryId}`);
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while deleting the category');
        }
    }
    }
}