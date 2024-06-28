import { useState } from 'react';
import { Order } from '@/interfaces/order/order';
import { OrderService } from '@/services/order/order.service';

export const useFetchOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const orderService = new OrderService();

    const fetchOrderById = async (orderId: string): Promise<Order | null> => {
        setLoading(true);
        setError(null);
        try {
            const order = await orderService.getOrderById(orderId);
            return order as Order;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllOrders = async (): Promise<Order[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const orders = await orderService.getAllOrders();
            return orders as Order[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch orders');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (order: Order): Promise<Order | null> => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await orderService.createOrder(order);
            return newOrder as Order;
        } catch (err: any) {
            setError(err.message || 'Failed to create order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateOrder = async (order: Order): Promise<Order | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrder = await orderService.updateOrder(order);
            return updatedOrder as Order;
        } catch (err: any) {
            setError(err.message || 'Failed to update order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderId: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await orderService.deleteOrder(orderId);
        } catch (err: any) {
            setError(err.message || 'Failed to delete order');
        } finally {
            setLoading(false);
        }
    };

    return { deleteOrder, createOrder, updateOrder, fetchAllOrders, fetchOrderById, loading, error };
};
