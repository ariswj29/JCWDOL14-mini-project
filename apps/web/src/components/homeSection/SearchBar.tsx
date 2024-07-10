'use client';
import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="container mx-auto px-12 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search events"
            className="py-2 px-4 rounded-l-md border border-secondary w-full"
          />
          <button className="bg-secondary text-white py-2 px-4 border-2 border-secondary rounded-r-md hover:font-bold focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50">
            <span>
              <FaSearch size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
