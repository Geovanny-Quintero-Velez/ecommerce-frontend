import { useState } from 'react';

interface SortDropdownProps {
  onSortChange: (sortOption: string) => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState('price-asc');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    onSortChange(option);
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select id="sort" value={selectedOption} onChange={handleSortChange} className="p-2 border rounded">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
