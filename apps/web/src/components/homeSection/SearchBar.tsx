'use client';
import React from 'react';
import Image from 'next/image';

const SearchBar = () => {
  return (
    <div className="container mx-auto mt-8 px-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search events"
            className="py-2 px-4 rounded-l-md border border-secondary  w-full"
          />
          <button className="bg-secondary text-white py-2 px-4 rounded-r-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50">
            <Image
              src={'/search.png'}
              alt="searchIcon"
              width={25}
              height={25}
            />
          </button>
        </div>
        <button className="ml-2 bg-secondary text-blue-900 py-2 px-4 rounded-md hover:text-secondary hover:bg-blue-900 focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50">
          Sort By
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
