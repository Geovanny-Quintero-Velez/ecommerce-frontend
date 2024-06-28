"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useFetchCategories } from "@/hooks/category/useFetchCategories";
import { useFetchProductCategory } from "@/hooks/product-category/useFetchProductCategory";
import { ProductCategory } from "@/interfaces/product-category/product.category";

const EditProductPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id') || '1';

    const { fetchProductById, updateProduct, loading: productLoading, error: productError } = useFetchProducts();
    const { fetchAllCategories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();
    const { updateProductCategory } = useFetchProductCategory();

    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        discount: 0,
        category: ""
    });
    const [originalCategory, setOriginalCategory] = useState<string>("");

    useEffect(() => {
        const fetchProductData = async () => {
            const product = await fetchProductById(productId);
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    discount: product.discount || 0,
                    category: product.categories[0]?.categoryid || ""
                });
                setOriginalCategory(product.categories[0]?.categoryid || "");
            }
        };
        fetchProductData();

        const fetchCategories = async () => {
            const categoriesData = await fetchAllCategories();
            if (categoriesData) {
                setCategories(categoriesData);
            }
        };
        fetchCategories();
    }, [productId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, description, price, stock, discount, category } = formData;

        const productData = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            discount: Number(discount)
        };

        const updatedProduct = await updateProduct({ ...productData, productid: productId } as any);

        if (updatedProduct && originalCategory !== category) {
            const productCategoryToDelete: ProductCategory = { productid: productId, categoryid: originalCategory };
            const productCategoryToCreate: ProductCategory = { productid: productId, categoryid: category };
            await updateProductCategory(productCategoryToDelete, productCategoryToCreate);

            alert("Product updated successfully!");
            router.push('/admin/product');
        } else if (updatedProduct) {
            alert("Product updated successfully!");
            router.push('/admin/product');
        } else {
            alert("Failed to update product.");
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="rounded-tl-lg rounded-tr-lg w-11/12 h-5/6 overflow-x-auto">
                <div className="flex justify-between items-center bg-white h-16 p-8 pl-5">
                    <h2 className="text-lg font-bold">Edit product</h2>
                    <div className="flex space-x-4 h-10 mr-5">
                        <button onClick={() => router.back()} className="block px-4 py-2 rounded bg-red-600 text-white">
                            Return
                        </button>
                    </div>
                </div>
                {productError && <p className="text-red-500">{productError}</p>}
                {categoriesError && <p className="text-red-500">{categoriesError}</p>}
                <form className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="name">Name</label>
                        <input
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            placeholder='Type the name'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col m-1 ml-4">
                        <label className="text-black font-bold" htmlFor="category">Category</label>
                        <select
                            className="h-10 w-full md:w-11/12 bg-background pl-2"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select the category</option>
                            {categories.map((category) => (
                                <option key={category.categoryid} value={category.categoryid}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2 bg-primary py-2 pr-10 flex justify-end items-center rounded-bl-lg rounded-br-lg">
                        <button type="submit" className='bg-gray-100 text-black text-lg rounded px-8 py-2' disabled={productLoading}>
                            {productLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductPage;
