import  axios,  {AxiosInstance} from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';
import {ProductCategory} from '@/interfaces/product-category/product.category';

export class ProductCategoryService {
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

    public async createProductCategory(productCategory: ProductCategory): Promise<ProductCategory> {
        try{
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/product-category`,productCategory)
            console.log("response", response.data)
            return response.data as ProductCategory;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while creating the product-category');
            }
        }

    }
    
    private async deleteProductCategory(productCategory: ProductCategory): Promise<boolean> {
        console.log("delete", productCategory)
        try{
            await this.axios.delete(`${this.axios.defaults.baseURL}/product-category/${productCategory.categoryid}/${productCategory.productid}`)
            return true;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while deleting the product-category');
            }
        }
    }

    public async updateProductCategory(productCategoryToDelete: ProductCategory, productCategoryToCreate: ProductCategory): Promise<ProductCategory> {
        console.log("update (to del)", productCategoryToDelete, "update (to cre)" ,productCategoryToCreate)
        try{
            await this.deleteProductCategory(productCategoryToDelete);
            const createResponse = await this.createProductCategory(productCategoryToCreate);
            console.log("response", createResponse)
            return createResponse;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while updating the product-category');
            }
        }
    }
}