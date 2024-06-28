import { OrderDetail } from '@/interfaces/OrderDetail/OrderDetail';
import axios, { AxiosInstance } from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';

export class OrderDetailService {
    protected readonly axios: AxiosInstance;

    public constructor() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseURL) {
            throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
        }
        const { Authorization } = getAuthHeader();
        console.log('Authorization', Authorization);
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

    public async getOrderDetailById(orderDetailId: string): Promise<OrderDetail | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/order-detail/${orderDetailId}`);
            return response.data as OrderDetail;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while capturing the order detail data');
            }
        }
    }

    public async getAllOrderDetails(): Promise<OrderDetail[] | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/order-detail`);
            return response.data as OrderDetail[];
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while capturing the order detail data');
            }
        }
    }

    public async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail | undefined> {
        try {
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/order-detail`, orderDetail);
            return response.data as OrderDetail;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while creating a new order detail');
            }
        }
    }

    public async updateOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail | undefined> {
        try {
            const response = await this.axios.patch(`${this.axios.defaults.baseURL}/order-detail/${orderDetail.orderdetailid}`, orderDetail);
            return response.data as OrderDetail;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while updating an existing order detail');
            }
        }
    }

    public async deleteOrderDetail(orderDetailId: string): Promise<void> {
        try {
            await this.axios.delete(`${this.axios.defaults.baseURL}/order-detail/${orderDetailId}`);
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while deleting an existing order detail');
            }
        }
    }

    public async getOrderDetailByOrderId(orderId: string): Promise<OrderDetail[] | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/order-detail/order/${orderId}`);
            return response.data as OrderDetail[];
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while capturing the order detail data');
            }
        }
    }
}
