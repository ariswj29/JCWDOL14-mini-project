'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaCarSide,
  FaFilm,
  FaFutbol,
  FaMusic,
  FaUmbrellaBeach,
  FaUsers,
} from 'react-icons/fa';

const categories = [
  { id: 1, name: 'Music', icon: <FaMusic size={40} /> },
  { id: 2, name: 'Holidays', icon: <FaUmbrellaBeach size={40} /> },
  { id: 3, name: 'Football', icon: <FaFutbol size={40} /> },
  { id: 4, name: 'Seminar', icon: <FaUsers size={40} /> },
  { id: 5, name: 'Film', icon: <FaFilm size={40} /> },
  { id: 6, name: 'Automotive', icon: <FaCarSide size={40} /> },
];

interface SortButtonsProps {
  onSortChange: (sortConfig: string) => void;
}

const Category: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  let category = '';

  const handleSort = (sortBy: Number) => {
    switch (sortBy) {
      case 1:
        category = 'music';
        break;
      case 2:
        category = 'holidays';
        break;
      case 3:
        category = 'football';
        break;
      case 4:
        category = 'seminar';
        break;
      case 5:
        category = 'film';
        break;
      case 6:
        category = 'automotive';
        break;
      default:
        break;
    }
    onSortChange(category);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 justify-around items-center px-8 py-12">
      {categories.map((category, index) => (
        <div key={index} className="hover:font-semibold">
          <div
            className="w-20 h-20 mb-2 mx-auto border-2 border-secondary rounded-full flex items-center justify-center p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-secondary"
            onClick={() => handleSort(category.id)}
          >
            <span className="p-5 text-secondary hover:text-white">
              {' '}
              {category.icon}
            </span>
          </div>
          <div className="text-sm text-center m-2 ">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
