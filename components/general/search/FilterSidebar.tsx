import React, { useState } from 'react';

interface FilterSidebarProps {
  categories: string[];
  onFilterChange: (selectedCategories: string[], newPriceRange: { min: number, max: number }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedCategories, priceRange);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Categorías</h2>
      {categories.map(category => (
        <div key={category} className="mb-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            className="mr-2"
          />
          <label className="text-gray-700">{category}</label>
        </div>
      ))}
      <h2 className="text-lg font-semibold mt-6 mb-4">Rango de Precios</h2>
      <div className="mb-4">
        <input
          type="number"
          value={priceRange.min}
          onChange={e => handlePriceRangeChange(Number(e.target.value), priceRange.max)}
          placeholder="Mínimo"
          className="p-2 border rounded mr-2 w-full"
        />
        <input
          type="number"
          value={priceRange.max}
          onChange={e => handlePriceRangeChange(priceRange.min, Number(e.target.value))}
          placeholder="Máximo"
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FilterSidebar;
