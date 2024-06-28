'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFetchOrders } from '@/hooks/order/useFetchOrders';
import { Order } from '@/interfaces/order/order';
import { MdModeEdit, MdDelete, MdInfoOutline } from "react-icons/md";

const AdminOrderPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { fetchAllOrders, loading, error, deleteOrder } = useFetchOrders();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchAllOrders();
            if (fetchedOrders) {
                setOrders(fetchedOrders);
            }
        };
        getOrders();
    }, []);

    const handleDeleteButton = async (orderId: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            await deleteOrder(orderId);
            // Después de eliminar, actualizar la lista de órdenes
            const updatedOrders = await fetchAllOrders();
            if (updatedOrders) {
                setOrders(updatedOrders);
            }
        }
    }

    // Calcular el índice de los usuarios a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8">
                    <h2 className="text-lg font-bold">Manage orders</h2>
                </div>
                <table className="w-full h-4/6 border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">User id</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Created at</th>
                            <th className="px-4 py-2">Deleted at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.orderid} className="bg-gray-100 hover:bg-gray-200">
                                <td className="px-4 py-2">{order.orderid}</td>
                                <td className="px-4 py-2">{order.userid}</td>
                                <td className="px-4 py-2">{order.price}</td>
                                <td className="px-4 py-2">{order.status}</td>
                                <td className="px-4 py-2">{order.createdat ? new Date(order.createdat).toLocaleDateString(): ''}</td>
                                <td className="px-4 py-2">{order.deletedat ? new Date(order.deletedat).toLocaleDateString() : ''}</td>
                                <td className="flex justify-between items-center three-icons">

                                    <Link href={`/admin/order/detail/[id]?id=${order.orderid}`} className="block w-8 h-8 relative">
                                        <MdInfoOutline className="text-3xl infoStandard"/>
                                    </Link>
                                    <Link href={`/admin/order/[id]?id=${order.orderid}`} className="block w-8 h-8 relative">
                                        <MdModeEdit className="text-3xl textWarning"/>
                                    </Link>
                                    <button onClick={() => handleDeleteButton(order.orderid)} className="block w-8 h-8 relative">
                                        <MdDelete className="text-3xl textDelete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="rounded-bl-lg rounded-br-lg bg-primary py-2 pr-10 flex justify-end items-center">
                    <button
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className="mx-1 px-2 pb-1 text-background text-3xl font-bold"
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 border rounded-full ${currentPage === index + 1 ? 'bg-background text-primary' : 'bg-primary text-background'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        className="mx-1 px-2 pb-1 text-background text-3xl font-bold"
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderPage;
