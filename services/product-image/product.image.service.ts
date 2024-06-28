import  axios,  {AxiosInstance} from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';
import {ProductImage} from '@/interfaces/product-image/product.image';

export class ProductImageService {
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

    public async createProductImage(productImage: ProductImage): Promise<ProductImage> {
        try{
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/product-image`,productImage)
            console.log("response", response.data)
            return response.data as ProductImage;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while creating the product-image');
            }
        }

    }

    public async deleteProductImage(productImage: ProductImage): Promise<boolean> {
        try{
            await this.axios.delete(`${this.axios.defaults.baseURL}/product-image/${productImage.productid}/${productImage.img}`)
            return true;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while deleting the product-image');
            }
        }
    }

    public async updateProductImage(productImageToDelete: ProductImage, productImageToCreate: ProductImage): Promise<ProductImage> {
        try{
            await this.deleteProductImage(productImageToDelete);
            const createResponse = await this.createProductImage(productImageToCreate);
            console.log("response", createResponse)
            return createResponse;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while updating the product-image');
            }
        }
    }

}