"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchCategories } from "@/hooks/category/useFetchCategories";
import { Category } from "@/interfaces/category/category";

const EditCategoryPage = () => {
    const router = useRouter();
    const { fetchCategoryById, updateCategory, loading, error } = useFetchCategories();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('id');
    const [formData, setFormData] = useState<Category | null>(null);

    useEffect(() => {
        const loadCategory = async () => {
            if (categoryId) {
                const category = await fetchCategoryById(categoryId);
                if (category) {
                    setFormData(category);
                }
            }
        };
        loadCategory();
    }, [categoryId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            const updatedCategory = await updateCategory(formData);
            if (updatedCategory) {
                router.push('/admin/category');
            }
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Edit category</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <Link href="/admin/category" className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </Link>
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
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="description">Description</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the description'
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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

export default EditCategoryPage;
