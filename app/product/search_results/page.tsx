"use client"
import Navbar from "@/components/general/navbar/Navbar";
import GridView from "@/components/general/search/GridView";
import FilterSidebar from "@/components/general/search/FilterSidebar";
import Tags from "@/components/general/search/Tags";
import SortDropdown from "@/components/general/search/SortDropdown";
import { useSearchParams } from 'next/navigation';
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useFetchCategories } from "@/hooks/category/useFetchCategories";
import { useEffect, useState } from "react";
import { Product } from '@/interfaces/product/product';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search_query") ?? '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [products, setProducts] = useState<Product[] | null>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([`Text: ${initialSearchQuery}`]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOption, setSortOption] = useState('price-asc');

  const { fetchProductsByQuery } = useFetchProducts();
  const { fetchAllCategories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
    setTags([`Text: ${initialSearchQuery}`]);
  }, [initialSearchQuery]);

  useEffect(() => {
    async function fetchProductByQuery() {
      const fetchedProducts = await fetchProductsByQuery(searchQuery);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    }
    fetchProductByQuery();
  }, [searchQuery]);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await fetchAllCategories();
      if (fetchedCategories) {
        setCategories(fetchedCategories.map(category => category.name));
      }
    }
    fetchCategories();
  }, [fetchAllCategories]);

  useEffect(() => {
    filterProducts();
  }, [tags, priceRange, sortOption, products]);

  const filterProducts = () => {
    let tempProducts = products;

    tempProducts = products?.filter(product => product.price >= priceRange.min && product.price <= priceRange.max) || null;

    if (tags.length > 0) {
      const categoryTags = tags.filter(tag => categories.includes(tag));
      if (categoryTags.length > 0) {
        tempProducts = tempProducts?.filter(product => categoryTags.includes(product.categories[0].category || "")) || null;
      }
    }

    if (tempProducts) {
      if (sortOption === 'price-asc') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      setFilteredProducts(tempProducts);
    }
  };

  const handleFilterChange = (selectedCategories: string[], newPriceRange: { min: number, max: number }) => {
    setTags(prevTags => [...prevTags.filter(tag => !categories.includes(tag)), ...selectedCategories]);
    setPriceRange(newPriceRange);
  };

  const handleRemoveTag = (tag: string) => {
    if (tag.startsWith('Text:')) {
      setSearchQuery("");
    }
    setTags(prevTags => prevTags.filter(t => t !== tag));
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  return (
    <section>
      <Navbar />
      <div className="container mx-auto p-4 flex">
        <div className="w-1/4 p-4 border-r">
          <FilterSidebar categories={categories} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1 ml-4">
          <div className="mb-4 flex justify-between items-center">
            <Tags tags={tags} onRemoveTag={handleRemoveTag} />
            <SortDropdown onSortChange={handleSortChange} />
          </div>
          {
            filteredProducts &&
            <GridView products={filteredProducts} />
          }
        </div>
      </div>
    </section>
  );
}
