'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const categories = [
  { name: 'Music', icon: '/cat-music.png' },
  { name: 'Holidays', icon: '/cat-holidays.png' },
  { name: 'Football', icon: '/cat-football.png' },
  { name: 'Seminar', icon: '/cat-seminar.png' },
  { name: 'Film', icon: '/cat-film.png' },
  { name: 'Automotive', icon: '/cat-automotive.png' },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (index: any) => {
    setSelectedCategory(index);
  };
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 justify-around items-center px-4 py-20">
      {categories.map((category, index) => (
        <div key={index} className="hover:text-blue-900 hover:font-semibold">
          <div
            className={`w-20 h-20 mb-2 mx-auto border-2 border-secondary rounded-full flex items-center justify-center p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-900 ${
              selectedCategory === index
                ? 'border-blue-800'
                : 'border-secondary'
            }`}
            onClick={() => handleClick(index)}
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={50}
              height={50}
            />
          </div>
          <div className="text-sm text-center m-2 ">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
