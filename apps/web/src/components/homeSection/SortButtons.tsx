// components/SortButtons.tsx
import React, { useState } from 'react';

interface SortButtonsProps {
  onSortChange: (sortConfig: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  // const [sortConfig, setSortConfig] = useState<string>('');
  let sort = '';

  const handleSort = (sortBy: string) => {
    switch (sortBy) {
      case 'lowerPrice':
        sort = 'lowerprice';
        break;
      case 'highestPrice':
        sort = 'highestprice';
        break;
      case 'location':
        sort = 'location';
        break;
      case 'newest':
        sort = 'newest';
        break;
      default:
        break;
    }
    onSortChange(sort);
  };

  return (
    <div className="flex space-x-2 px-8">
      <button
        className="py-1 px-2 bg-secondary hover:font-bold  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs w-28"
        onClick={() => handleSort('lowerPrice')}
      >
        Lower Price
      </button>
      <button
        className="py-1 px-2 bg-secondary hover:font-bold  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs w-28"
        onClick={() => handleSort('highestPrice')}
      >
        Highest Price
      </button>
      <button
        className="py-1 px-2 bg-secondary hover:font-bold  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs w-28"
        onClick={() => handleSort('location')}
      >
        Location
      </button>
      <button
        className="py-1 px-2 bg-secondary hover:font-bold  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs w-28"
        onClick={() => handleSort('newest')}
      >
        Nearest Date
      </button>
    </div>
  );
};

export default SortButtons;
