"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchOrders } from "@/hooks/order/useFetchOrders";
import { useSearchParams } from 'next/navigation';
import { Order } from '@/interfaces/order/order';

const EditOrderPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id') || '';
    const { fetchOrderById, updateOrder, loading, error } = useFetchOrders();
    const [formData, setFormData] = useState<Order>({
        orderid: '',
        userid: '',
        price: 0,
        status: '',
        createdat: undefined,
        deletedat: undefined
    });

    useEffect(() => {
        const getOrder = async () => {
            const order = await fetchOrderById(orderId);
            if (order) {
                setFormData(order);
            }
        };
        getOrder();
    }, [orderId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedOrder = await updateOrder(formData);
        if (updatedOrder) {
            router.push('/admin/order');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Edit Order</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <button onClick={() => router.back()} className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="orderid">Order ID</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the order ID'
                            type="text"
                            name="orderid"
                            onChange={handleChange}
                            value={formData.orderid}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="userid">User ID</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the user ID'
                            type="text"
                            name="userid"
                            onChange={handleChange}
                            value={formData.userid}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="price">Price</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the price'
                            type="number"
                            step="0.01"
                            name="price"
                            onChange={handleChange}
                            value={formData.price}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="status">Status</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the status'
                            type="text"
                            name="status"
                            onChange={handleChange}
                            value={formData.status}
                            required
                        />
                    </div>
                    <div className="col-span-2 bg-primary py-2 pr-10 flex justify-end items-center rounded-bl-lg rounded-br-lg">
                        <button type="submit" className='bg-gray-100 text-black text-lg rounded px-8 py-2' disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditOrderPage;
