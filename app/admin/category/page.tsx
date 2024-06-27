'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCategories } from '@/hooks/category/useFetchCategories';
import { Category } from '@/interfaces/category/category';
import { MdModeEdit, MdDelete } from "react-icons/md";

const AdminCategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Estados para categorías y sus datos
    const [productCategories, setProductCategories] = useState<Category[]>([]);
    const { fetchAllCategories, loading, error, deleteCategory } = useFetchCategories();

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchAllCategories();
            if (fetchedCategories) {
                setProductCategories(fetchedCategories);
            }
        };
        getCategories();
    }, []);

    const handleDeleteButton = async (categoryId: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteCategory(categoryId);
            // Después de eliminar, actualizar la lista de usuarios
            const updatedCategories = await fetchAllCategories();
            if (updatedCategories) {
                setProductCategories(updatedCategories);
            }
        }
    }

    // Calcular el índice de las categorías a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = productCategories.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(productCategories.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8">
                    <h2 className="text-lg font-bold">Manage categories</h2>
                    <div className="flex space-x-4 h-10">
                        <Link href="/admin/category/new" className="px-4 py-2 rounded bg-primary text-white">
                            + Add category
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <table className="w-full h-4/6 border-collapse">
                        <thead>
                            <tr className="bg-white">
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Created at</th>
                                <th className="px-4 py-2">Deleted at</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.map((category) => (
                                <tr key={category.categoryid} className="bg-gray-100 hover:bg-gray-200">
                                    <td className="px-4 py-2">{category.categoryid}</td>
                                    <td className="px-4 py-2">{category.name}</td>
                                    <td className="px-4 py-2">{category.description}</td>
                                    <td className="px-4 py-2">{category.createdat ? new Date(category.createdat).toLocaleDateString() : ''}</td>
                                    <td className="px-4 py-2">{category.deletedat ? new Date(category.deletedat).toLocaleDateString() : ''}</td>
                                    <td className="flex justify-between items-center">
                                        <Link href={`/admin/category/[id]?id=${category.categoryid}`}  className="block w-8 h-8 relative">
                                            <MdModeEdit className="text-3xl textWarning"/>
                                        </Link>
                                        <button onClick={() => {handleDeleteButton(category.categoryid)}} className="block w-8 h-8 relative">
                                            <MdDelete className="text-3xl textDelete"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="rounded-bl-lg rounded-br-lg bg-primary py-2 pr-10 flex justify-end items-center">
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

export default AdminCategoryPage;
