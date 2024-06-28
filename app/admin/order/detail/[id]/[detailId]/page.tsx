'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchOrderDetails } from "@/hooks/orderDetail/useFetchOrderDetails";
import { useSearchParams } from 'next/navigation';
import { OrderDetail } from '@/interfaces/OrderDetail/OrderDetail';

const EditOrderDetailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderDetailId = searchParams.get('detailId') || '';
    const { fetchOrderDetailById, updateOrderDetail, loading, error } = useFetchOrderDetails();
    const [formData, setFormData] = useState<OrderDetail>({
        orderdetailid: '',
        orderid: '',
        productid: '',
        quantity: 0,
        price: 0,
        createdat: undefined,
        deletedat: undefined
    });

    useEffect(() => {
        const getOrderDetail = async () => {
            const orderDetail = await fetchOrderDetailById(orderDetailId);
            console.log(orderDetailId);
            if (orderDetail) {
                setFormData(orderDetail);
            }
        };
        getOrderDetail();
    }, [orderDetailId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedOrderDetail = await updateOrderDetail(formData);
        if (updatedOrderDetail) {
            router.push('/admin/orderdetail');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Edit Order Detail</h2>
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
                        <label className="text-black font-bold" htmlFor="productid">Product ID</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the product ID'
                            type="text"
                            name="productid"
                            onChange={handleChange}
                            value={formData.productid}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="quantity">Quantity</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the quantity'
                            type="number"
                            name="quantity"
                            onChange={handleChange}
                            value={formData.quantity}
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

export default EditOrderDetailPage;
