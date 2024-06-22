'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
    {
        productId: '123',
        name:'123',
        description:'123',
        price:'123',
        stock:'123',
        discount:'123',
        img:'132',
        createdAt:'123',
        deletedAt:'123',
        lastModifiedBy:'123',
    },
];

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calcular el índice de los usuarios a mostrar
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
                <table className="w-full h-4/6 border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Created at</th>
                            <th className="px-4 py-2">Deleted at</th>
                            <th className="px-4 py-2">Modified by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentElement.map((product) => (
                            <tr key={product.productId} className="bg-gray-100 hover:bg-gray-200">
                                <td className="px-4 py-2">{product.productId}</td>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.description}</td>
                                <td className="px-4 py-2">{product.price}</td>
                                <td className="px-4 py-2">{product.stock}</td>
                                <td className="px-4 py-2">{product.discount}</td>
                                <td className="px-4 py-2">{product.img}</td>
                                <td className="px-4 py-2">{product.createdAt}</td>
                                <td className="px-4 py-2">{product.deletedAt}</td>
                                <td className="px-4 py-2">{product.lastModifiedBy}</td>
                                <td className="flex justify-between items-center">
                                <Link href="#" className="block w-8 h-8 relative">
                                    <Image src="/edit.png" alt="edit icon" width={32} height={32} />
                                </Link>
                                <Link href="#" className="block w-8 h-8 relative">
                                    <Image src="/trash.png" alt="delete icon" width={32} height={32} />
                                </Link>
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
                    {totalPages == 1 && (
                        <>
                           <button
                                onClick={() => paginate(1)}
                                className={`mx-1 px-3 py-1 border rounded-full bg-background text-primary`}
                            >
                                1
                            </button> 
                        </>
                    )}
                    {totalPages >1 && totalPages < 5 && Array.from({ length: totalPages }, (_, index) => (
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
                            {/* Mostrar primera página si no es la actual */}
                            {currentPage > 1 && (
                                <button
                                    onClick={() => paginate(1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    1
                                </button>
                            )}

                            {/* Mostrar puntos suspensivos si hay más de 3 páginas */}
                            {currentPage > 2 && (
                                <span className="mx-1 px-3 py-1 text-background text-3xl font-bold self-center">...</span>
                            )}

                            {/* Mostrar página anterior si no es la primera */}
                            {currentPage > 2 && (
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    {currentPage - 1}
                                </button>
                            )}

                            {/* Mostrar página actual */}
                            <button
                                onClick={() => paginate(currentPage)}
                                className={`mx-1 px-3 py-1 border rounded-full bg-background text-primary`}
                            >
                                {currentPage}
                            </button>

                            {/* Mostrar página siguiente si no es la última */}
                            {currentPage < totalPages - 1 && (
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    className={`mx-1 px-3 py-1 border rounded-full bg-primary text-background`}
                                >
                                    {currentPage + 1}
                                </button>
                            )}

                            {/* Mostrar puntos suspensivos si hay más de 3 páginas */}
                            {currentPage < totalPages - 1 && (
                                <span className="mx-1 px-3 py-1 text-background text-3xl font-bold self-center">...</span>
                            )}

                            {/* Mostrar última página si no es la actual */}
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
