import { useState } from 'react';
import { OrderDetail } from '@/interfaces/OrderDetail/OrderDetail';
import { OrderDetailService } from '@/services/orderDetail/orderDetail.service';

export const useFetchOrderDetails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const orderDetailService = new OrderDetailService();

    const fetchOrderDetailById = async (orderDetailId: string): Promise<OrderDetail | null> => {
        setLoading(true);
        setError(null);
        try {
            const orderDetail = await orderDetailService.getOrderDetailById(orderDetailId);
            return orderDetail as OrderDetail;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch order detail');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllOrderDetails = async (): Promise<OrderDetail[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const orderDetails = await orderDetailService.getAllOrderDetails();
            return orderDetails as OrderDetail[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch order details');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createOrderDetail = async (orderDetail: OrderDetail): Promise<OrderDetail | null> => {
        setLoading(true);
        setError(null);
        try {
            const newOrderDetail = await orderDetailService.createOrderDetail(orderDetail);
            return newOrderDetail as OrderDetail;
        } catch (err: any) {
            setError(err.message || 'Failed to create order detail');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateOrderDetail = async (orderDetail: OrderDetail): Promise<OrderDetail | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrderDetail = await orderDetailService.updateOrderDetail(orderDetail);
            return updatedOrderDetail as OrderDetail;
        } catch (err: any) {
            setError(err.message || 'Failed to update order detail');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteOrderDetail = async (orderDetailId: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await orderDetailService.deleteOrderDetail(orderDetailId);
        } catch (err: any) {
            setError(err.message || 'Failed to delete order detail');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetailsbyOrderId = async (orderId: string): Promise<OrderDetail[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const orderDetails = await orderDetailService.getOrderDetailByOrderId(orderId);
            return orderDetails as OrderDetail[];
        } catch (err: any) {
            setError(err.message || 'Failed to fetch order details');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { deleteOrderDetail, createOrderDetail, updateOrderDetail, fetchAllOrderDetails, fetchOrderDetailById, fetchOrderDetailsbyOrderId, loading, error };
};
