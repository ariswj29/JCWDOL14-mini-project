// components/SortButtons.tsx
import React, { useState } from 'react';

interface SortButtonsProps {
  onSortChange: (sortConfig: { key: string; direction: string }) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (sortBy: string) => {
    let direction = 'asc';
    switch (sortBy) {
      case 'lowerPrice':
        setSortConfig({ key: 'price', direction: 'asc' });
        direction = 'asc';
        break;
      case 'highestPrice':
        setSortConfig({ key: 'price', direction: 'desc' });
        direction = 'desc';
        break;
      case 'location':
        setSortConfig({ key: 'location', direction: 'asc' });
        direction = 'asc';
        break;
      case 'newest':
        setSortConfig({ key: 'date', direction: 'desc' });
        direction = 'desc';
        break;
      default:
        break;
    }
    onSortChange({ key: sortBy, direction });
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
        Newest
      </button>
    </div>
  );
};

export default SortButtons;
