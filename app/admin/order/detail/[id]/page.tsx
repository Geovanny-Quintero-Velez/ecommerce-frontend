'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useFetchOrderDetails } from '@/hooks/orderDetail/useFetchOrderDetails';
import { OrderDetail } from '@/interfaces/OrderDetail/OrderDetail';
import Link from 'next/link';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

const AdminOrderDetailPage = () => {
    const { 
        fetchAllOrderDetails, 
        fetchOrderDetailById, 
        createOrderDetail, 
        updateOrderDetail, 
        deleteOrderDetail, 
        fetchOrderDetailsbyOrderId,
        loading, 
        error 
    } = useFetchOrderDetails();
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id') || '1';


    const [orderDetails, setOrderDetails] = useState<OrderDetail[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = orderDetails ? Math.ceil(orderDetails.length / itemsPerPage) : 1;

    useEffect(() => {
        const loadOrderDetails = async () => {
            const data = await fetchOrderDetailsbyOrderId(orderId);
            setOrderDetails(data);
        };

        loadOrderDetails();
    }, []);

    const handleDeleteButton = async (orderDetailId: string) => {
        await deleteOrderDetail(orderDetailId);
        const data = await fetchAllOrderDetails();
        setOrderDetails(data);
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrderDetails = orderDetails ? orderDetails.slice(indexOfFirstItem, indexOfLastItem) : [];

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Manage Order Details</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <button onClick={() => router.back()} className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </button>
                    </div>
                </div>
                <table className="w-full h-4/6 border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">Order Id</th>
                            <th className="px-4 py-2">Product Id</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Deleted At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrderDetails.map((orderDetail) => (
                            <tr key={orderDetail.orderdetailid} className="bg-gray-100 hover:bg-gray-200">
                                <td className="px-4 py-2">{orderDetail.orderdetailid}</td>
                                <td className="px-4 py-2">{orderDetail.orderid}</td>
                                <td className="px-4 py-2">{orderDetail.productid}</td>
                                <td className="px-4 py-2">{orderDetail.quantity}</td>
                                <td className="px-4 py-2">${orderDetail.price}</td>
                                <td className="px-4 py-2">{orderDetail.createdat ? new Date(orderDetail.createdat).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-2">{orderDetail.deletedat ? new Date(orderDetail.deletedat).toLocaleDateString() : ''}</td>
                                <td className="flex justify-between items-center">
                                    <Link href={`/admin/order/detail/${orderId}/[detailId]?detailId=${orderDetail.orderdetailid}`} className="block w-8 h-8 relative">
                                        <MdModeEdit className="text-3xl textWarning"/>
                                    </Link>
                                    <button onClick={() => handleDeleteButton(orderDetail.orderdetailid!)} className="block w-8 h-8 relative">
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

export default AdminOrderDetailPage;
