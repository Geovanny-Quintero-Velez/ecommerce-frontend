'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchUsers } from '@/hooks/user/useFetchUsers';
import { User } from '@/interfaces/user/user';
import { MdModeEdit, MdDelete } from "react-icons/md";

const AdminUserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { fetchAllUsers, loading, error, deleteUser } = useFetchUsers();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const fetchedUsers = await fetchAllUsers();
            if (fetchedUsers) {
                setUsers(fetchedUsers);
            }
        };
        getUsers();
    }, []);

    const handleDeleteButton = async (userId: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(userId);
            // Después de eliminar, actualizar la lista de usuarios
            const updatedUsers = await fetchAllUsers();
            if (updatedUsers) {
                setUsers(updatedUsers);
            }
        }
    }
    

    // Calcular el índice de los usuarios a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(users.length / itemsPerPage);

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
                    <h2 className="text-lg font-bold">Manage users</h2>
                    <div className="flex space-x-4 h-10">
                        <Link href="/admin/user/new" className="px-4 py-2 rounded bg-primary text-white">
                            + Add user
                        </Link>
                    </div>
                </div>
                <table className="w-full h-4/6 border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="px-4 py-2">Id</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Last name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Birth date</th>
                            <th className="px-4 py-2">Created at</th>
                            <th className="px-4 py-2">Deleted at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.userid} className="bg-gray-100 hover:bg-gray-200">
                                <td className="px-4 py-2">{user.userid}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.lastname}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">{user.username}</td>
                                <td className="px-4 py-2">{new Date(user.birthdate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{user.createdat ? new Date(user.createdat).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-2">{user.deletedat ? new Date(user.deletedat).toLocaleDateString() : ''}</td>
                                <td className="flex justify-between items-center">
                                    <Link href={`/admin/user/[id]?id=${user.userid}`} className="block w-8 h-8 relative">
                                        <MdModeEdit className="text-3xl textWarning"/>
                                    </Link>
                                    <button onClick={() => handleDeleteButton(user.userid)} className="block w-8 h-8 relative">
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

export default AdminUserPage;
