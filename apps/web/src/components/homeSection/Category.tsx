'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaCarSide,
  FaFilm,
  FaFutbol,
  FaMusic,
  FaPersonBooth,
  FaUmbrellaBeach,
  FaUsers,
} from 'react-icons/fa';

const categories = [
  { name: 'Music', icon: <FaMusic size={40} /> },
  { name: 'Holidays', icon: <FaUmbrellaBeach size={40} /> },
  { name: 'Football', icon: <FaFutbol size={40} /> },
  { name: 'Seminar', icon: <FaUsers size={40} /> },
  { name: 'Film', icon: <FaFilm size={40} /> },
  { name: 'Automotive', icon: <FaCarSide size={40} /> },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (index: any) => {
    setSelectedCategory(index);
  };
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 justify-around items-center px-8 py-20">
      {categories.map((category, index) => (
        <div key={index} className="hover:font-semibold">
          <div
            className={`w-20 h-20 mb-2 mx-auto border-2 border-secondary rounded-full flex items-center justify-center p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-secondary ${
              selectedCategory === index
                ? 'border-blue-800'
                : 'border-secondary'
            }`}
            onClick={() => handleClick(index)}
          >
            <span className="text-secondary hover:text-white">
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
