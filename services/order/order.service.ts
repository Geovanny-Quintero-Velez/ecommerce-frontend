import { Order } from '@/interfaces/order/order';
import axios, { AxiosInstance } from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';

export class OrderService {
    protected readonly axios: AxiosInstance;

    public constructor() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseURL) {
            throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
        }
        const { Authorization } = getAuthHeader();
        console.log('Authorization', Authorization)
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

    public async getOrderById(orderId: string): Promise<Order | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/order/${orderId}`);
            return response.data as Order;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while capturing the order data');
            }
        }
    }

    public async getAllOrders(): Promise<Order[] | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/order`);
            return response.data as Order[];
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while capturing the order data');
            }
        }
    }

    public async createOrder(order: Order): Promise<Order | undefined> {
        try {
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/order`, order);
            return response.data as Order;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while creating a new order');
            }
        }
    }

    public async updateOrder(order: Order): Promise<Order | undefined> {
        try {
            const response = await this.axios.patch(`${this.axios.defaults.baseURL}/order/${order.orderid}`, order);
            return response.data as Order;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while updating an existing order');
            }
        }
    }

    public async deleteOrder(orderId: string): Promise<void> {
        try {
            await this.axios.delete(`${this.axios.defaults.baseURL}/order/${orderId}`);
            console.log(orderId);
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('An unexpected error occurred while deleting an existing order');
            }
        }
    }
}
