"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFetchCategories } from "@/hooks/category/useFetchCategories";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useFetchProductCategory } from "@/hooks/product-category/useFetchProductCategory";
import { Category } from "@/interfaces/category/category";
import { ProductCategory } from "@/interfaces/product-category/product.category";
import { CreateProduct } from "@/interfaces/product/create-product";

const CreateProductPage = () => {
    const router = useRouter();
    const { fetchAllCategories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();
    const { createProduct, loading: productLoading, error: productError } = useFetchProducts();
    const { createProductCategory, loading: productCategoryLoading, error: productCategoryError } = useFetchProductCategory();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        discount: 0,
    });

    useEffect(() => {
        async function loadCategories() {
            const fetchedCategories = await fetchAllCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories);
            }
        }
        loadCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: CreateProduct = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            discount: Number(formData.discount)
        };
        console.log("newProduct", newProduct)
        const createdProduct = await createProduct(newProduct as any);
        if (createdProduct && selectedCategory) {
            const newProductCategory: ProductCategory = {
                productid: createdProduct.productid,
                categoryid: selectedCategory
            };
            console.log("newProductCategory", newProductCategory)
            await createProductCategory(newProductCategory);
            router.push('/admin/product');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Create product</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <Link href="/admin/product" className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </Link>
                    </div>
                </div>
                {categoriesError && <p className="text-red-500">{categoriesError}</p>}
                {productError && <p className="text-red-500">{productError}</p>}
                {productCategoryError && <p className="text-red-500">{productCategoryError}</p>}
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
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="price">Price</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the price'
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="stock">Stock</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the stock'
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="discount">Discount</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Enter the discount'
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="category">Category</label>
                        <select
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.categoryid} value={category.categoryid}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2 bg-primary py-2 pr-10 flex justify-end items-center rounded-bl-lg rounded-br-lg">
                        <button
                            type="submit"
                            className='bg-gray-100 text-black text-lg rounded px-8 py-2'
                            disabled={categoriesLoading || productLoading || productCategoryLoading}
                        >
                            {categoriesLoading || productLoading || productCategoryLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductPage;
