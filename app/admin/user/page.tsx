'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const users = [
    { userId: '1', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '2', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '3', email: 'email3@example.com', name: 'User3', lastname: 'Last3', birthdate: '03-03-1990', role: 'User', username: 'user3', createdat: '2023-01-03', deletedat: '' },
    { userId: '4', email: 'email4@example.com', name: 'User4', lastname: 'Last4', birthdate: '04-04-1990', role: 'Admin', username: 'user4', createdat: '2023-01-04', deletedat: '' },
    { userId: '5', email: 'email5@example.com', name: 'User5', lastname: 'Last5', birthdate: '05-05-1990', role: 'User', username: 'user5', createdat: '2023-01-05', deletedat: '' },
    { userId: '6', email: 'email6@example.com', name: 'User6', lastname: 'Last6', birthdate: '06-06-1990', role: 'User', username: 'user6', createdat: '2023-01-06', deletedat: '' },
    { userId: '7', email: 'email7@example.com', name: 'User7', lastname: 'Last7', birthdate: '07-07-1990', role: 'Admin', username: 'user7', createdat: '2023-01-07', deletedat: '' },
    { userId: '8', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '9', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '10', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '11', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '12', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '13', email: 'email3@example.com', name: 'User3', lastname: 'Last3', birthdate: '03-03-1990', role: 'User', username: 'user3', createdat: '2023-01-03', deletedat: '' },
    { userId: '14', email: 'email4@example.com', name: 'User4', lastname: 'Last4', birthdate: '04-04-1990', role: 'Admin', username: 'user4', createdat: '2023-01-04', deletedat: '' },
    { userId: '15', email: 'email5@example.com', name: 'User5', lastname: 'Last5', birthdate: '05-05-1990', role: 'User', username: 'user5', createdat: '2023-01-05', deletedat: '' },
    { userId: '16', email: 'email6@example.com', name: 'User6', lastname: 'Last6', birthdate: '06-06-1990', role: 'User', username: 'user6', createdat: '2023-01-06', deletedat: '' },
    { userId: '17', email: 'email7@example.com', name: 'User7', lastname: 'Last7', birthdate: '07-07-1990', role: 'Admin', username: 'user7', createdat: '2023-01-07', deletedat: '' },
    { userId: '18', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '19', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '20', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '1', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '2', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '3', email: 'email3@example.com', name: 'User3', lastname: 'Last3', birthdate: '03-03-1990', role: 'User', username: 'user3', createdat: '2023-01-03', deletedat: '' },
    { userId: '4', email: 'email4@example.com', name: 'User4', lastname: 'Last4', birthdate: '04-04-1990', role: 'Admin', username: 'user4', createdat: '2023-01-04', deletedat: '' },
    { userId: '5', email: 'email5@example.com', name: 'User5', lastname: 'Last5', birthdate: '05-05-1990', role: 'User', username: 'user5', createdat: '2023-01-05', deletedat: '' },
    { userId: '6', email: 'email6@example.com', name: 'User6', lastname: 'Last6', birthdate: '06-06-1990', role: 'User', username: 'user6', createdat: '2023-01-06', deletedat: '' },
    { userId: '7', email: 'email7@example.com', name: 'User7', lastname: 'Last7', birthdate: '07-07-1990', role: 'Admin', username: 'user7', createdat: '2023-01-07', deletedat: '' },
    { userId: '8', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '9', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '10', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '11', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '12', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '13', email: 'email3@example.com', name: 'User3', lastname: 'Last3', birthdate: '03-03-1990', role: 'User', username: 'user3', createdat: '2023-01-03', deletedat: '' },
    { userId: '14', email: 'email4@example.com', name: 'User4', lastname: 'Last4', birthdate: '04-04-1990', role: 'Admin', username: 'user4', createdat: '2023-01-04', deletedat: '' },
    { userId: '15', email: 'email5@example.com', name: 'User5', lastname: 'Last5', birthdate: '05-05-1990', role: 'User', username: 'user5', createdat: '2023-01-05', deletedat: '' },
    { userId: '16', email: 'email6@example.com', name: 'User6', lastname: 'Last6', birthdate: '06-06-1990', role: 'User', username: 'user6', createdat: '2023-01-06', deletedat: '' },
    { userId: '17', email: 'email7@example.com', name: 'User7', lastname: 'Last7', birthdate: '07-07-1990', role: 'Admin', username: 'user7', createdat: '2023-01-07', deletedat: '' },
    { userId: '18', email: 'email1@example.com', name: 'User1', lastname: 'Last1', birthdate: '01-01-1990', role: 'Admin', username: 'user1', createdat: '2023-01-01', deletedat: '' },
    { userId: '19', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
    { userId: '20', email: 'email2@example.com', name: 'User2', lastname: 'Last2', birthdate: '02-02-1990', role: 'User', username: 'user2', createdat: '2023-01-02', deletedat: '' },
];

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calcular el índice de los usuarios a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                            <tr key={user.userId} className="bg-gray-100 hover:bg-gray-200">
                                <td className="px-4 py-2">{user.userId}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.lastname}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">{user.username}</td>
                                <td className="px-4 py-2">{user.birthdate}</td>
                                <td className="px-4 py-2">{user.createdat}</td>
                                <td className="px-4 py-2">{user.deletedat}</td>
                                <td className="flex justify-between items-center">
                                <Link href="#" className="block w-8 h-8 relative">
                                    <Image src="/edit.png" alt="edit icon" width={32} height={32} 
                                    />
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
