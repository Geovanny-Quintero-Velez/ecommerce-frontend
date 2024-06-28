'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFetchProducts } from '@/hooks/product/useFetchProducts';
import { MdModeEdit, MdDelete } from "react-icons/md";


const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { fetchProducts, loading, error } = useFetchProducts();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = await fetchProducts();
            if (fetchedProducts) {
                setProducts(fetchedProducts);
            }
        };
        getProducts();
    }, []);

    // Calcular el índice de los productos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentElement = products.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8">
                    <h2 className="text-lg font-bold">Manage products</h2>
                    <div className="flex space-x-4 h-10">
                        <Link href="/admin/product/new" className="px-4 py-2 rounded bg-primary text-white">
                            + Add product
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-4/6">
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-4/6">
                        <p>Error: {error}</p>
                    </div>
                ) : (
                    <table className="w-full h-4/6 border-collapse">
                        <thead>
                            <tr className="bg-white">
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Stock</th>
                                <th className="px-4 py-2">Discount</th>
                                <th className="px-4 py-2">Images</th>
                                <th className="px-4 py-2">Created at</th>
                                <th className="px-4 py-2">Deleted at</th>
                                <th className="px-4 py-2">Modified by</th>
                                <th className="px-4 py-2">Modified at</th>
                                <th className="px-4 py-2">Keywords</th>
                                <th className="px-4 py-2">Categories</th>
                                <th className="px-4 py-2">Reviews</th>
                                <th className="px-4 py-2">Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentElement.map((product) => (
                                <tr key={product.productid} className="bg-gray-100 hover:bg-gray-200">
                                    <td className="px-4 py-2">{product.productid}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">{product.stock}</td>
                                    <td className="px-4 py-2">{product.discount}%</td>
                                    <td className="px-4 py-2">
                                        {product.images?.map((image: { imageid: string, img:string }) => image.img).join(", ")}
                                    </td>
                                    <td className="px-4 py-2">{new Date(product.createdat).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{product.deletedat ? new Date(product.deletedat).toLocaleDateString() : 'N/A'}</td>
                                    <td className="px-4 py-2">{product.lastmodifiedby}</td>
                                    <td className="px-4 py-2">{new Date(product.lastmodifiedat).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        {product.keywords?.join(", ")}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.categories?.map((category: { category: any; }) => category.category).join(", ")}
                                    </td>
                                    <td className="px-4 py-2">{product.reviewscount}</td>
                                    <td className="px-4 py-2">{product.rating}</td>
                                    <td className="flex justify-between items-center">
                                        <Link href={`/admin/product/[id]?id=${product.productid}`} className="block w-8 h-8 relative">
                                            <MdModeEdit className="text-3xl textWarning"/>
                                        </Link>
                                        <button  className="block w-8 h-8 relative">
                                            <MdDelete className="text-3xl textDelete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="rounded-bl-lg rounded-br-lg bg-primary py-2 pr-10 flex flex-wrap justify-center items-center w-full w-screen">
                    <button
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className="mx-1 px-2 pb-1 text-background text-3xl font-bold"
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {totalPages === 1 && (
                        <button
                            onClick={() => paginate(1)}
                            className={`mx-1 px-3 py-1 border rounded-full bg-background text-primary`}
                        >
                            1
                        </button>
                    )}
                    {totalPages > 1 && totalPages < 5 && Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 border rounded-full ${currentPage === index + 1 ? 'bg-background text-primary' : 'bg-primary text-background'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {totalPages > 4 && (
                        <>
                            {currentPage > 1 && (
                                <button
                                    onClick={() => paginate(1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    1
                                </button>
                            )}
                            {currentPage > 2 && (
                                <span className="mx-1 px-3 py-1 text-background text-3xl font-bold self-center">...</span>
                            )}
                            {currentPage > 2 && (
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    {currentPage - 1}
                                </button>
                            )}
                            <button
                                onClick={() => paginate(currentPage)}
                                className={`mx-1 px-3 py-1 border rounded-full bg-background text-primary`}
                            >
                                {currentPage}
                            </button>
                            {currentPage < totalPages - 1 && (
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    {currentPage + 1}
                                </button>
                            )}
                            {currentPage < totalPages - 1 && (
                                <span className="mx-1 px-3 py-1 text-background text-3xl font-bold self-center">...</span>
                            )}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => paginate(totalPages)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </>
                    )}
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

export default Page;
