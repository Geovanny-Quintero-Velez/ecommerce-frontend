"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";
import { useSearchParams } from 'next/navigation';

const EditUserPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id') || '1';
    const { fetchUserById, updateUser, loading, error } = useFetchUsers();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const getUser = async () => {
            const user = await fetchUserById(userId);
            if (user) {
                setFormData({
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username || '',
                    email: user.email,
                    role: user.role || 'user'
                });
            }
        };
        getUser();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = await updateUser({ ...formData, userid: userId } as any);
        if (updatedUser) {
            router.push('/admin/user');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Edit user</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <button onClick={() => router.back()} className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="name">Name</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the name'
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="lastname">Last name</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the last name'
                            type="text"
                            name="lastname"
                            onChange={handleChange}
                            value={formData.lastname}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="username">Username</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the username'
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="email">Email</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the email'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="birthdate">Birthdate</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='(MM/DD/YY)'
                            type="date"
                            name="birthdate"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="role">Role:</label>
                        <select
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            name="role"
                            onChange={handleChange}
                            value={formData.role}
                            required
                        >
                            <option value="" disabled>Select the role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
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

export default EditUserPage;
